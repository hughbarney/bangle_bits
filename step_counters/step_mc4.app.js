/**
 * javascript step counting app, with state machine to ensure
 * we only start counting after X steps in Y seconds
 *
 * FIR filter designed with http://t-filter.appspot.com
 * sampling frequency: 12.5 Hz
 * fixed point precision: 10 bits
 *
 * 0   Hz - 1.1 Hz,  gain = 0  desired attenuation = -40 dB
 * 1.3 Hz - 2.5 Hz,  gain = 1  desired ripple = 5 dB
 * 2.7 Hz - 6.25 Hz, gain = 0  desired attenuation = -40 dB
 *
 * V4  1.1 m2s = stepping
 *
 *
 *
 */


const X_STEPS = 9;         // we need to see X steps in X seconds to move to STEPPING state
const X_STEPS_COUNT = 4;   // count Y steps once in STEPPING state, let 'ringing' give back 5 steps when stop


var filter_taps = new Int8Array([ -2, 4, 4, 1, -1, 0, 2, -3, -12, -13, 2, 24, 29, 6, -25, -33, -13, 10, 11, -1, 3, 29, 41, 4, -62, -89, -34, 62, 110, 62, -34, -89, -62, 4, 41, 29, 3, -1, 11, 10, -13, -33, -25, 6, 29, 24, 2, -13, -12, -3, 2, 0, -1, 1, 4, 4, -2 ]);

// create a history buffer the same lenght as the filter taps array
//var history = new Int16Array(filter_taps.length);
var history = new Int16Array(5);

// value used in the f/m by default
const stepCounterThreshold = 1000;
/// has filtered acceleration passed stepCounterThreshold
var stepWasLow = false;
var step_count = 0;  // total steps since app start
var vMax = -1;
var vMin = 1000;


// acceleromter operates at 12.5Hz
function onAccel(a) {

  // scale to fit and clip
  var m = a.mag;
  //var v = ((m-1)*8192)>>5;
  var v = ((m-1)*256)>>0;
  

  /**
   *  create a new Int8Array from the existing but starting from pos 1 of the existing history
   *  this drops off index 0 and moves everything up, leaving the last entry to be filled
   *  with the new value
   */
  history.set(new Int16Array(history.buffer,1));
  // set last value to the clipped value from the accel
  //var raw_clipped = E.clip(v, -128, 127);
  history[history.length-1] = v;

  console.log("len=" + history.length);
  
  // digital filter, output has to be scaled down as the calculation is integer based, no floating point
  //var accFiltered = E.convolve(filter_taps, history, 0) >> 2;
  
  // check for steps, a bottom, followed by top threshold crossing = a step
  var hadStep = false;
  var t = 0;

  vMax = max(history.buffer);
  vMin = min(history.buffer);
  console.log("x:" + vMax + " min:" + vMin + "  >> " + history.buffer);
  var h = vMax - vMin;
  
  console.log([t,m,v,vMax, vMin,h].join(", "));

/*
  if (accFiltered < -stepCounterThreshold) {
    stepWasLow = true;
    //console.log(" LOW");
    t = Math.round((getTime() - t_start)*1000);
    console.log(t + "," +  m + "," + raw_clipped + "," + accFiltered + "," +
                step_count + "," + step_machine.get_state() + "," + step_machine.get_hold_steps());

  } else if ((accFiltered > stepCounterThreshold) && stepWasLow) {
    stepWasLow = false;
    //console.log(" HIGH");
    // We now have something resembling a step
    // now call state machine to ensure we only count steps when we have done X steps in X seconds
    // 2s of silence will reset the state to STEP1 state
    hadStep = true;
    step_count += step_machine.step_state();
    t = Math.round((getTime() - t_start)*1000);
    console.log(t + "," +  m + "," + raw_clipped + "," + accFiltered + "," +
                step_count + "," + step_machine.get_state() + "," + step_machine.get_hold_steps());
    console.log(t + "," +  m + "," + v+ ","); 
}
*/

}


function max(a) {
  var m = -Infinity;

  for(var i=0; i< a.length; i++)
    if(a[i] > m) m = a[i];
  return m;
}

function min(a) {
  var m = Infinity;

  for(var i=0; i< a.length; i++)
    if(a[i] < m) m = a[i];
  return m;
}
  
function STEP_STATE() {
  this.S_STILL = 0;       // just created state m/c no steps yet
  this.S_STEP_1 = 1;      // first step recorded
  this.S_STEP_22N = 2;    // counting 2-X steps
  this.S_STEPPING = 3;    // we've had X steps in X seconds
  
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
    
    // we got a step within 1 second
    if (t <= 1000) {
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
    
    // we got a step within 1 second
    if (t <= 1000) {
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
    t = Math.round((getTime() - this.t_prev)*1000);
    //console.log(t + " S_STEPPING");
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
  g.drawString("  " + step_machine.get_state() + "  ", 120, 40, true);
  g.drawString(" Hold " + step_machine.get_hold_steps() + "  ", 120, 70, true);
  g.drawString("  BATT: " + E.getBattery() + "%", 120, 100, true);

  if (running) {
    g.drawString("Steps: " + step_count, 120, 130, true);
  } else {
    g.drawString("(" + step_count + ") BTN1 to START", 120, 120, true);
  }
}

var running = false;
var t_start = 0;

function onStartStop() {

  running = !running;
  
  if (running) {
    step_count = 0; // reset
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
//running = false;  // will get negated by onStartStop()
//onStartStop();

// test1 - START / STOP
// uncomment to experiment using BTN1 for START / STOP
setWatch(onStartStop, BTN1, {repeat:true,edge:"rising"});

