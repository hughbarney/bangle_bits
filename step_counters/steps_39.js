/**
 * Javascript step counting app, with state machine to ensure we only
 * start counting after X steps in X seconds we use the state machine
 * to check each step is within the expected period.
 *
 * Using the Low Pass filter design in the Bangle JS v2.10.9 Firmware
 *
 * LPF filter designed with http://t-filter.appspot.com
 * sampling frequency: 12.5 Hz
 * fixed point precision: 10 bits
 * cut off at 3Hz
 *
 *   --------     --------------------   ---------------------   -----------
 *   | accel |    |                  |   |                   |   |  state  |
 *   |       |----| Low Pass Filter  |---| Step Up/Down      |---| machine |-- increment
 *   |1      |    |                 2|   | cycle detection  3|   |        4|   step count
 *    ---------    ------------------    ---------------------   -----------
 *
 * v3.9 21 Aug 2021
 *
 * DRIVING TEST - 15 mins  Amiz 0,     Bangle 3.91 29 steps  - GOOD
 * WALKING                 Amiz 3302,  Bangle 3.91 2319  70% - TERRIBLE
 *
 * On investigation it is because the filter output does not always 
 * pass the positive or negative threshold, so the state machine does
 * not get called.  This is why PEAK detection would be better.
 *
 *
 */

const version = "3.91";
const X_STEPS = 5;            // we need to see X steps in X seconds to move to STEPPING state
const T_MAX_STEP = 1300;      // upper limit for time for 1 step (ms)
const T_MIN_STEP = 333;       // lower limit for time for 1 step (ms)


// (2) Low Pass filter 
var filter_taps = new Int8Array([5, 6, -4, -17, -15, 4, 11, -10, -27, 8, 80, 118, 80, 8, -27, -10, 11, 4, -15, -17, -4, 6, 5]);

// create a history buffer the same length as the filter taps array
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

  // digital filter, output has to be scaled down as the calculation is integer based, no floating point
  var accFiltered = E.convolve(filter_taps, history, 0) >> 2;

  var t = Math.round((getTime() - t_start)*1000);
  // this is useful to generate a CSV file of TIME, RAW, FILTERED values
  //var s = stepWasLow ? "LOW" : "HI";
  console.log(t + "," + raw_clipped + "," + accFiltered + ",1000, -1000");

  // (3) check for steps, a bottom, followed by top threshold crossing = a step
  var hadStep = false;
  if (accFiltered < -stepCounterThreshold) {
    stepWasLow = true;
  } else if ((accFiltered > stepCounterThreshold) && stepWasLow) {
    stepWasLow = false;
    // We now have something resembling a step
    // now call state machine to ensure we only count steps when we have done X steps in X seconds
    hadStep = true;
    // (4) state machine
    step_count += step_machine.step_state();
  }
}

/**
 * (4) State Machine
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


STEP_STATE.prototype.log_debug = function(s) {
  console.log("       " + s);
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
    this.state = this.S_STEP_1;
    this.t_prev = getTime();
    this.hold_steps = 1;
    return 0;
    
  case this.S_STEP_1:
    this.hold_steps = 1;
    t = Math.round((getTime() - this.t_prev)*1000);
    this.t_prev = getTime();
    
    // we got a step within expected period
    if (t <= T_MAX_STEP && t >= T_MIN_STEP) {
      this.log_debug(t + "  S_STEP_1 -> S_STEP_22N");
      this.state = this.S_STEP_22N;
      this.hold_steps = 2;
    } else {
      // we stay in STEP_1 state
      this.log_debug(t + "  S_STEP_1 -> S_STEP_1");
      reject_count++;
    }
    return 0;

  case this.S_STEP_22N:
    t = Math.round((getTime() - this.t_prev)*1000);
    this.t_prev = getTime();
    
    // we got a step within expected time range
    if (t <= T_MAX_STEP && t >= T_MIN_STEP) {
      this.hold_steps++;

      if (this.hold_steps >= X_STEPS) {
        this.state = this.S_STEPPING;
        pass_count++;  // we are going to STEPPING STATE
        this.log_debug(t + "  S_STEP_22N -> S_STEPPING");
        return X_STEPS;
      }

      this.log_debug(t + "  S_STEP_22N -> S_STEP_22N");
    } else {
      // we did not get the step in time, back to STEP_1
      this.state = this.S_STEP_1;
      this.log_debug(t + "  S_STEP_22N -> S_STEP_1");
      reject_count++;
    }
    return 0;

  case this.S_STEPPING:
    t = Math.round((getTime() - this.t_prev)*1000);
    this.t_prev = getTime();
    
    // we got a step within the expected window
    if (t <= T_MAX_STEP && t >= T_MIN_STEP) {
      this.state = this.S_STEPPING;
      this.log_debug(t + "  S_STEPPING -> S_STEPPING");
      return 1;
    } else {
      // we did not get the step in time, back to STEP_1
      this.state = this.S_STEP_1;
      this.log_debug(t + "  S_STEPPING -> S_STEP_1");
      reject_count++;
    }
    return 0;
  }

  // should never get here
  this.log_debug(t + "  ERROR");
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
    pass_count = 0;
    reject_count = 0;

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
//running = false;  // will get negated by onStartStop()
//onStartStop();

g.clear();
setInterval(draw, 1000); // refresh every second
draw();

// test1 - START / STOP
// uncomment to experiment using BTN1 for START / STOP
running = false;  // will get negated by onStartStop()
setWatch(onStartStop, BTN1, {repeat:true,edge:"rising"});

