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
 */
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
  //console.log("history: " + history);

  // digital filter, output has to be scaled down as the calculation is integer based, no floating point
  var accFiltered = E.convolve(filter_taps, history, 0) >> 2;
  console.log("m: " + m + " r: " + v + " rc: " + raw_clipped + " f: " + accFiltered);
  
  // check for steps, a bottom, followed by top threshold crossing = a step
  var hadStep = false;
  if (accFiltered < -stepCounterThreshold) {
    stepWasLow = true;
    console.log(" LOW");
  } else if ((accFiltered > stepCounterThreshold) && stepWasLow) {
    stepWasLow = false;
    console.log(" HIGH");
    // We now have something resembling a step
    // now call state machine to ensure we only count steps when we have done 5 steps in 5 seconds
    // 2s of silence will reset the state to STEP1 state
    hadStep = true;
    step_count += step_machine.step_state();
    console.log(" *STEP*  " + step_count);
  }
}

function STEP_STATE() {
  this.S_STILL = 0;       // just created state m/c no steps yet
  this.S_STEP_1 = 1;      // first step recorded
  this.S_STEP_225 = 2;    // counting 2-5 steps
  this.S_STEPPING = 3;    // we've had 5 steps in 5 seconds
  
  this.state = this.S_STILL;
  this.hold_steps = 0;
  this.t_prev = getTime();
}

STEP_STATE.prototype.step_state = function() {
  var st = this.state;
  var t;
  
  switch (st) {
  case this.S_STILL:
    console.log("S_STILL");
    this.state = this.S_STEP_1;
    this.t_prev = getTime();
    this.hold_steps = 1;
    return 0;
    
  case this.S_STEP_1:
    t = Math.round((getTime() - this.t_prev)*1000);
    console.log(t + " S_STEP_1");
    this.t_prev = getTime();
    
    // we got a step within 1 second
    if (t <= 1000) {
      this.state = this.S_STEP_225;
      this.hold_steps = 2;
    } else {
      // we stay in STEP_1 state
    }
    return 0;

  case this.S_STEP_225:
    t = Math.round((getTime() - this.t_prev)*1000);
    console.log(t + " S_STEP_225");
    this.t_prev = getTime();
    
    // we got a step within 1 second
    if (t <= 1000) {
      this.hold_steps++;

      if (this.hold_steps >= 5) {
        this.state = this.S_STEPPING;
        return 5;
      }
    } else {
      // we did not get the step in time, back to STEP_1
      this.state = this.S_STEP_1;
      this.hold_steps = 1;
    }
    return 0;

  case this.S_STEPPING:
    t = Math.round((getTime() - this.t_prev)*1000);
    console.log(t + " S_STEPPING");
    this.t_prev = getTime();
    
    // we got a step within 2 seconds, otherwise we stopped stepping
    if (t <= 2000) {
      this.state = this.S_STEPPING;
      return 1;
    } else {
      // we did not get the step in time, back to STEP_1
      this.state = this.S_STEP_1;
      this.hold_steps = 1;
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
  case this.S_STEP_225: return "S_STEP_255";
  case this.S_STEPPING: return "S_STEPPING";
  default: return "ERROR";
  }
}

let step_machine = new STEP_STATE();

function draw() {
  g.clear();
  g.setColor(0);
  g.setColor(1,1,1);
  g.setFont("Vector",20);
  g.setFontAlign(0,-1);
  g.drawString("  " + step_machine.get_state() + "  ", 120, 30, true);

  if (running) {
    g.drawString(step_count, 120, 100, true);
  } else {
    g.drawString("(" + step_count + ") BTN1 to START", 120, 100, true);
  }
}

var running = false;

function onStartStop() {

  running = !running;
  
  if (running) {
    step_count = 0; // reset
    Bangle.on('accel',onAccel);
  } else {
    Bangle.removeListener('accel', onAccel);
    console.log("STOP  -------------------------------------");
  }
}

// handle switch display on by pressing BTN1
Bangle.on('lcdPower', function(on) {
  if (on) draw();
});

g.clear();
Bangle.loadWidgets();
Bangle.drawWidgets();
setInterval(draw, 1000); // refresh every second
draw();
setWatch(Bangle.showLauncher, BTN2, {repeat:false,edge:"falling"});
setWatch(onStartStop, BTN1, {repeat:true,edge:"rising"});

