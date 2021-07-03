/**
 * javascript step counting app, with state machine to ensure
 * we only start counting after 5 steps in 5 seconds
 *
 * FIR filter designed with http://t-filter.appspot.com
 * sampling frequency: 12.5 Hz
 * fixed point precision: 10 bits
 *
 * 0   Hz - 1.1 Hz,  gain = 0  desired attenuation = -40 dB
 * 1.3 Hz - 2.5 Hz,  gain = 1  desired ripple = 5 dB
 * 2.7 Hz - 6.25 Hz, gain = 0  desired attenuation = -40 dB
 *
 * V3.1 bypass the filter if the accelerometer is not over threshold for more than 1 second of samples
 * V3.2 fixed assignment issue in if statement
 * v3.3 over counting by 1 step after 5 reached, could be the last 1 second before we bypass the filter
 *      for this version set X_STEP_COUNT = 4
 *
 *
 */

const version = "3.3";
const X_STEPS = 5;         // we need to see X steps in X seconds to move to STEPPING state
const X_STEPS_COUNT = 4;   // count Y steps once in STEPPING state
const V_REGISTER = 15;
const N_ACTIVE_SAMPLES = 12;

var bypass_filter = true;
var active_sample_count = 0;

var filter_taps = new Int8Array([ -2, 4, 4, 1, -1, 0, 2, -3, -12, -13, 2, 24, 29, 6, -25, -33, -13, 10, 11, -1, 3, 29, 41, 4, -62, -89, -34, 62, 110, 62, -34, -89, -62, 4, 41, 29, 3, -1, 11, 10, -13, -33, -25, 6, 29, 24, 2, -13, -12, -3, 2, 0, -1, 1, 4, 4, -2 ]);

// create a history buffer the same lenght as the filter taps array
var history = new Int8Array(filter_taps.length);

// value used in the f/m by default
const stepCounterThreshold = 1000;
/// has filtered acceleration passed stepCounterThreshold
var stepWasLow = false;
var step_count = 0;  // total steps since app start

// acceleromter operates at 12.5Hz
function onAccel(a) {

  // scale to fit and clip
  var m = a.mag;
  var v = ((m-1)*8192)>>5;

  /**
   *  create a new Int8Array from the existing but starting from pos 1 of the existing history
   *  this drops off index 0 and moves everything up, leaving the last entry to be filled
   *  with the new value
   */
  history.set(new Int8Array(history.buffer,1));
  // set last value to the clipped value from the accel
  var raw_clipped = E.clip(v, -128, 127);
  history[history.length-1] = raw_clipped;


  /**
   * The accelerometer responds to movement or lack of movement very
   * quickly and does not ring. So we can rely on the accelerometer
   * telling us when we have stopped moving.
   *
   * we wait for N_ACTIVE_SAMPLES over threshold before we pass the
   * signal onto the filter.  Likewise we stop passing the signal
   * onto the filter if we have stopped moving for N_ACTIVE_SAMPLES
   *
   * This reduces the impact of the ringing on the filter to within
   * +/- 1 second almost a perfect filter.
   *
   */

  if (v > V_REGISTER || v < -V_REGISTER) {
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
    // digital filter, output has to be scaled down as the calculation is integer based, no floating point
    accFiltered = E.convolve(filter_taps, history, 0) >> 2;
  }

  var t = Math.round((getTime() - t_start)*1000);
  console.log(t + "," + raw_clipped + "," + accFiltered);

  // check for steps, a bottom, followed by top threshold crossing = a step
  var hadStep = false;
  var t = 0;
  if (accFiltered < -stepCounterThreshold) {
    stepWasLow = true;
  } else if ((accFiltered > stepCounterThreshold) && stepWasLow) {
    stepWasLow = false;
    // We now have something resembling a step
    // now call state machine to ensure we only count steps when we have done X steps in X seconds
    hadStep = true;
    step_count += step_machine.step_state();
  }
}

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
    if (t <= 1000 && t >= 167) {
      this.state = this.S_STEP_22N;
      this.hold_steps = 2;
    } else {
      // we stay in STEP_1 state
    }
    return 0;

  case this.S_STEP_22N:
    t = Math.round((getTime() - this.t_prev)*1000);
    //console.log(t + " S_STEP_22N");
    this.t_prev = getTime();
    
    // we got a step within 0.167s (6min/mile) and 1 second
    if (t <= 1000 && t >= 167) {
      this.hold_steps++;

      if (this.hold_steps >= X_STEPS) {
        this.state = this.S_STEPPING;
        this.hold_steps = 1;
        return X_STEPS_COUNT;
      }
    } else {
      // we did not get the step in time, back to STEP_1
      this.state = this.S_STEP_1;
      this.hold_steps = 1;
    }
    return 0;

  case this.S_STEPPING:
    this.hold_steps = 1;
    t = Math.round((getTime() - this.t_prev)*1000);
    //console.log(t + " S_STEPPING");
    this.t_prev = getTime();
    
    // we got a step within 1 second
    if (t <= 1000) {
      this.state = this.S_STEPPING;
      return 1;
    } else {
      // we did not get the step in time, back to STEP_1
      this.state = this.S_STEP_1;
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

function draw() {
  g.clear();
  g.setColor(0);
  g.setColor(1,1,1);
  g.setFont("Vector",20);
  g.setFontAlign(0,-1);
  g.drawString(version + " " + step_machine.get_state() + "  ", 120, 40, true);
  g.drawString(" Hold " + step_machine.get_hold_steps() + "  ", 120, 70, true);
  g.drawString("  BATT: " + E.getBattery() + "%", 120, 100, true);

  
  if (running) {
    g.setColor(0xFFC0); // yellow
    g.setFont("Vector",60);
    g.drawString("" + step_count, 120, 140, true);
  } else {
    g.drawString("(" + step_count + ") BTN1 to START", 120, 130, true);
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

g.clear();
//Bangle.loadWidgets();
//Bangle.drawWidgets();
setInterval(draw, 1000); // refresh every second
draw();

// test2 - use these options through a sleep period
// uncomment the 2 lines below
running = false;  // will get negated by onStartStop()
onStartStop();

// test1 - START / STOP
// uncomment to experiment using BTN1 for START / STOP
//setWatch(onStartStop, BTN1, {repeat:true,edge:"rising"});

