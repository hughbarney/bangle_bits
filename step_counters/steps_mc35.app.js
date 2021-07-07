/**
 * Javascript step counting app, with state machine to ensure we only
 * start counting after X steps in X seconds we use the state machine
 * to check each step is within the expected period for that step To
 * reduce the impact of the Low Pass Filter ringing we use the raw
 * accelerometer data to gate the output from the filter.  This leads
 * to better cut off within 1 second when a step sequence has
 * stopped.
 *
 * FIR filter designed with http://t-filter.appspot.com
 * sampling frequency: 12.5 Hz
 * fixed point precision: 10 bits
 *
 * 0   Hz - 1.1 Hz,  gain = 0  desired attenuation = -40 dB
 * 1.3 Hz - 2.5 Hz,  gain = 1  desired ripple = 5 dB
 * 2.7 Hz - 6.25 Hz, gain = 0  desired attenuation = -40 dB
 *
 *   --------     ------------------    --------------------   ---------------------   -----------
 *   | accel |    | raw thresold   |    |                  |   |                   |   |  state  |
 *   |       |----| to gate filter |----| Low Pass Filter  |---| Step Up/Down      |---| machine |-- increment
 *   |1      |    | output        2|    |                 3|   | cycle detection 4 |   |        5|   step count
 *    ---------    ------------------    --------------------   ---------------------   -----------
 *
 *  2,5 improvements identified and tested by Hugh Barney, July 2021
 *
 * V3.1 bypass the filter if the accelerometer is not over threshold for more than 1 second of samples
 * V3.2 fixed assignment issue in if statement
 * v3.3 over counting by 1 step after 5 reached, could be the last 1 second before we bypass the filter
 * v3.4 set X_STEPS_COUNT=5 (dont change again), use OFFSET and set V_REGISTER = 17
 * v3.5 X_STEPS_COUNT removed, now uses X_STEPS which is set to 7 following tests driving, OFFSET removed
 *
 *
 */

const version = "3.5";


const X_STEPS = 7;            // we need to see X steps in X seconds to move to STEPPING state
const V_REGISTER = 17;        // raw threshold we must cross to start registering raw acceleration values
const N_ACTIVE_SAMPLES = 12;  // number of samples raw acceleration must be over threshold before pass to filter
const T_MAX_STEP = 1000;      // upper limit for time for 1 step (ms)
const T_MIN_STEP = 167;       // lower limit for time for 1 step (ms)


var bypass_filter = true;
var active_sample_count = 0;

// (3) Low Pass filter 
var filter_taps = new Int8Array([ -2, 4, 4, 1, -1, 0, 2, -3, -12, -13, 2, 24, 29, 6, -25, -33, -13, 10, 11, -1, 3, 29, 41, 4, -62, -89, -34, 62, 110, 62, -34, -89, -62, 4, 41, 29, 3, -1, 11, 10, -13, -33, -25, 6, 29, 24, 2, -13, -12, -3, 2, 0, -1, 1, 4, 4, -2 ]);

// create a history buffer the same lenght as the filter taps array
var history = new Int8Array(filter_taps.length);

/**
 * stepCounterThreshold of the filtered data used by the f/w by
 * default.  In practice increasing this threshold does not make a
 * lot of difference as the range of the filtered output is approx
 * -4000 to +4000.  This value ensures consistant Up / Down step edge
 * detection.  Any two places on a sine wave 180 degress apart will
 * do for detecting a full up / down cycle.
 *
 */
const stepCounterThreshold = 1000;
var stepWasLow = false;  // has filtered acceleration passed stepCounterThreshold
var step_count = 0;      // total steps since app start
var pass_count = 0;      // number of seperate passes through the STATE machine that lead to STEPPING
var reject_count = 0;    // number of rejections through the STATE machine

// acceleromter operates at 12.5Hz
function onAccel(a) {

  // scale to fit and clip
  var m = a.mag;
  var v = ((m-1)*8192)>>5;

  /**
   * create a new Int8Array from the existing but starting from pos 1
   * of the existing history this drops off index 0 and moves
   * everything up, leaving the last entry to be filled with the new
   * value
   */
  history.set(new Int8Array(history.buffer,1));
  /**
   * (1) Accelerometer input data
   *
   * Set last value to the clipped value from the accel. The clipping
   * is needed otherwise the history will need to be stored in an
   * In16Array which will double the memory requirements of the
   * filter in the C code.
   */
  var raw_clipped = E.clip(v, -128, 127);
  history[history.length-1] = raw_clipped;


  /**
   * (2) Gating output of the filter
   *
   * The filter rings 5-6 cycles after 1 impulse which look like 5 or
   * 6 additional steps, when in fact we stopped 5 steps ago.
   *
   * The accelerometer responds to movement or lack of movement very
   * quickly and does not ring (unlike the filter). So we can rely on
   * the accelerometer telling us when we have stopped moving.
   *
   * We wait for N_ACTIVE_SAMPLES over threshold before we take the
   * output of the filter.  Likewise we stop taking the output of the
   * filter within N_ACTIVE_SAMPLES of having stopped moving.
   *
   * This reduces the impact of the ringing on the filter to within
   * +/- 1 second almost a perfect filter. It means we might over
   * count by 1 step due to late shutting off BUT this is blanced by
   * late switching on when we first detected acceleration.
   *
   */

  if ( v > V_REGISTER || v < -1*V_REGISTER ) {
    if (active_sample_count < N_ACTIVE_SAMPLES)
      active_sample_count++;
    if (active_sample_count == N_ACTIVE_SAMPLES)
      bypass_filter = false;
  } else {
    if (active_sample_count > 0)
      active_sample_count--;
    if (active_sample_count == 0)
      bypass_filter = true;
  }
  
  var accFiltered;
  
  if (bypass_filter) {
    accFiltered = 0;
  } else {
    // (3) Low Pass filter output - gated by (2)
    // digital filter, output has to be scaled down as the calculation is integer based, no floating point
    accFiltered = E.convolve(filter_taps, history, 0) >> 2;
  }

  var t = Math.round((getTime() - t_start)*1000);
  // this is useful to generate a CSV file of TIME, RAW, FILTERED values
  console.log(t + "," + raw_clipped + "," + accFiltered);

  // (4) check for steps, a bottom, followed by top threshold crossing = a step
  var hadStep = false;
  var t = 0;
  if (accFiltered < -stepCounterThreshold) {
    stepWasLow = true;
  } else if ((accFiltered > stepCounterThreshold) && stepWasLow) {
    stepWasLow = false;
    // We now have something resembling a step
    // now call state machine to ensure we only count steps when we have done X steps in X seconds
    hadStep = true;
    // (5) state machine
    step_count += step_machine.step_state();
  }
}

/**
 * (5) State Machine
 *
 * The state machine ensure all steps are checked that they fall
 * between T_MIN_STEP and T_MAX_STEP. The 2v9.90 firmare uses X steps
 * in Y seconds but this just enforces that the step X steps ago was
 * within 6 seconds (75 samples).  It is possible to have 4 steps
 * within 1 second and then not get the 5th until T5 seconds.  This
 * could mean that the F/W would would be letting through 2 batches
 * of steps that actually would not meet the threshold as the step at
 * T5 could be the last.  The F/W version also does not give back the
 * X steps detected whilst it is waiting for X steps in Y seconds.
 * After 100 cycles of the algorithm this would amount to 500 steps
 * which is a 5% error over 10K steps.  In practice the number of
 * passes through the step machine from STEP_1 state to STEPPING
 * state can be as high as 500 events.  So using the state machine
 * approach avoids this source of error.
 *
 */

function STEP_STATE() {
  this.S_STILL = 0;       // just created state m/c no steps yet
  this.S_STEP_1 = 1;      // first step recorded
  this.S_STEP_22N = 2;    // counting 2-X steps
  this.S_STEPPING = 3;    // we've had X steps in X seconds
  this.reset();
};

STEP_STATE.prototype.reset = function() {
  this.state = this.S_STILL;
  this.hold_steps = 0;
  this.t_prev = getTime();
};

STEP_STATE.prototype.get_hold_steps = function() {
  return this.hold_steps;
};

STEP_STATE.prototype.step_state = function() {
  var st = this.state;
  var t;
  
  switch (st) {
  case this.S_STILL:
    //console.log("S_STILL");
    this.state = this.S_STEP_1;
    this.t_prev = getTime();
    this.hold_steps = 1;
    return 0;
    
  case this.S_STEP_1:
    t = Math.round((getTime() - this.t_prev)*1000);
    //console.log(t + " S_STEP_1");
    this.t_prev = getTime();
    
    // we got a step within 0.167s (6 min/mile) and 1 second
    if (t <= T_MAX_STEP && t >= T_MIN_STEP) {
      this.state = this.S_STEP_22N;
      this.hold_steps = 2;
    } else {
      // we stay in STEP_1 state
      reject_count++;
    }
    return 0;

  case this.S_STEP_22N:
    t = Math.round((getTime() - this.t_prev)*1000);
    //console.log(t + " S_STEP_22N");
    this.t_prev = getTime();
    
    // we got a step within 0.167s (6min/mile) and 1 second
    if (t <= T_MAX_STEP && t >= T_MIN_STEP) {
      this.hold_steps++;

      if (this.hold_steps >= X_STEPS) {
        this.state = this.S_STEPPING;
        this.hold_steps = 1;
        pass_count++;  // we are going to STEPPING STATE
        return X_STEPS;
      }
    } else {
      // we did not get the step in time, back to STEP_1
      this.state = this.S_STEP_1;
      this.hold_steps = 1;
      reject_count++;
    }
    return 0;

  case this.S_STEPPING:
    this.hold_steps = 1;
    t = Math.round((getTime() - this.t_prev)*1000);
    //console.log(t + " S_STEPPING");
    this.t_prev = getTime();
    
    // we got a step within T_MAX_STEP
    if (t <= T_MAX_STEP) {
      this.state = this.S_STEPPING;
      return 1;
    } else {
      // we did not get the step in time, back to STEP_1
      this.state = this.S_STEP_1;
      reject_count++;
    }
    return 0;
  }

  // should never get here
  return 0;
};


STEP_STATE.prototype.get_state = function() {
  switch(this.state) {
  case this.S_STILL: return "S_STILL";
  case this.S_STEP_1: return "S_STEP_1";
  case this.S_STEP_22N: return "S_STEP_22N";
  case this.S_STEPPING: return "S_STEPPING";
  default: return "ERROR";
  }
};

let step_machine = new STEP_STATE();

/**
 * standard UI code for the App, not part of the algorithm
 */

function draw() {
  g.clear();
  g.setColor(0);
  g.setColor(1,1,1);
  g.setFont("Vector",20);
  g.setFontAlign(0,-1);
  g.drawString(version + " " + step_machine.get_state() + "  ", 120, 40, true);
  g.drawString("Hold " + step_machine.get_hold_steps() + "  ", 120, 70, true);
  g.drawString("BATT: " + E.getBattery() + "%", 120, 100, true);
  g.drawString("Ps: " + pass_count + "  Rj: " + reject_count, 120, 130, true);
  
  if (running) {
    g.setColor(0xFFC0); // yellow
    g.setFont("Vector",60);
    g.drawString("" + step_count, 120, 160, true);
  } else {
    g.drawString("(" + step_count + ") BTN1 to START", 120, 170, true);
  }
}

var running = false;
var t_start = 0;

function onStartStop() {

  running = !running;
  
  if (running) {
    step_count = 0; // reset
    step_machine.reset();
    t_start = getTime();
    Bangle.on('accel',onAccel);
  } else {
    Bangle.removeListener('accel', onAccel);
  }
}

// handle switch display on by pressing BTN1
Bangle.on('lcdPower', function(on) {
  if (on) draw();
});


// test2 - use these options through a sleep period
// uncomment the 2 lines below
running = false;  // will get negated by onStartStop()
onStartStop();

g.clear();
setInterval(draw, 1000); // refresh every second
draw();

// test1 - START / STOP
// uncomment to experiment using BTN1 for START / STOP
// running = false;  // will get negated by onStartStop()
//setWatch(onStartStop, BTN1, {repeat:true,edge:"rising"});

