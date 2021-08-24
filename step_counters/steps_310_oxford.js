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
 * v3.10 21 Aug 2021 - uses Oxford LPF
 *
 */

const version = "3.10 Oxford";
const X_STEPS = 5;            // we need to see X steps in X seconds to move to STEPPING state
const T_MAX_STEP = 1300;      // upper limit for time for 1 step (ms)
const T_MIN_STEP = 333;       // lower limit for time for 1 step (ms)
const RAW_THRESHOLD = 10;
const N_ACTIVE_SAMPLES = 3;


// (2) Low Pass filter
// a scalled down oxford LPF
var filter_taps = new Int8Array([-11, -15, 44, 68, 44, -15, -11]);

// create a history buffer the same length as the filter taps array
var history = new Int8Array(filter_taps.length);
var peak = new Int16Array([0,0,0]);

/**
 * stepCounterThreshold of the filtered data used by the f/w by
 * default.  In practice increasing this threshold does not make a
 * lot of difference as the range of the filtered output is approx
 * -4000 to +4000.  This value ensures consistant Up / Down step edge
 * detection.  Any two places on a sine wave 180 degress apart will
 * do for detecting a full up / down cycle.
 *
 */
const stepCounterThreshold = 300;
var step_count = 0;           // total steps since app start
var pass_count = 0;           // number of seperate passes through the STATE machine that lead to STEPPING
var reject_count = 0;         // number of rejections through the STATE machine
var active_sample_count = 0; 
var gate_open = false;        // start closed

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

  if (raw_clipped > RAW_THRESHOLD || raw_clipped < -1*RAW_THRESHOLD) {
    if (active_sample_count < N_ACTIVE_SAMPLES)
      active_sample_count++;
    if (active_sample_count == N_ACTIVE_SAMPLES)
      gate_open = true;
  } else {
    if (active_sample_count > 0)
      active_sample_count--;
    if (active_sample_count == 0)
      gate_open = false;
  }

  if (!gate_open)
    accFiltered = 0;

  var t = Math.round((getTime() - t_start)*1000);
  // this is useful to generate a CSV file of TIME, RAW, FILTERED values
  log_debug(t + "," + raw_clipped + "," + accFiltered);

  //peak detection
  peak[0] = peak[1]; peak[1] = peak[2]; peak[2] = accFiltered;
  
  if (peak[1] > peak[0] && peak[1] > peak[2] && accFiltered > stepCounterThreshold) {
    //log_debug("  PEAK:   " + peak);
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
  log_debug("       " + s);
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

function log_debug(s) {
  if (process.env.HWVERSION==1)
    console.log(s);
  // not for v2 yet as it prints to display and cant turn it off
}

/**
 * standard UI code for the App, not part of the algorithm
 */
function draw() {
  if (process.env.HWVERSION==1)
    draw_bangle_v1();
  else
    draw_bangle_v2();
}

function draw_bangle_v1() {
  var w = g.getWidth();
  var h = g.getHeight();
  var info = "h" + step_machine.get_hold_steps() + " b" + E.getBattery() + " p" + pass_count + " r" + reject_count;
      
  g.clearRect(0, 30, w - 1, h - 1);
  g.setColor(0);
  g.setColor(1,1,1);
  g.setFont("Vector",20);
  g.setFontAlign(0,-1);
  g.drawString(version + " " + step_machine.get_state() + "  ", w/2, 40, true);

  g.drawString(info, w/2, 70, true);

  var fw_steps = getFwSteps(); // get step count from firmware for comparison
  
  if (running) {
    g.setColor(0xFFC0); // yellow
    g.setFont("Vector",60);
    g.drawString("F" + fw_steps, w/2, h/2, true);
    g.setColor(0x07E0); // green
    g.drawString("A" + step_count, w/2, 180, true);
  } else {
    g.drawString("(" + step_count + ") BTN1 to START", w/2, 170, true);
  }
}

function draw_bangle_v2() {
  var size = Math.floor(g.getWidth()/(7*6));
  var x = (g.getWidth()/2) - size*6,
  var y = (g.getHeight()/2) - size*7;
  var w = g.getWidth();
  var h = g.getHeight();
  
  var info = "h" + step_machine.get_hold_steps() + " b" + E.getBattery() + " p" + pass_count + " r" + reject_count;

  /*
  g.setColor(1,1,1);
  g.setFont("Vector",20);
  g.drawString(version + " " + step_machine.get_state() + "  ", w/2, 40, true);
  g.drawString(info, w/2, 70, true);
  */
  
  g.reset().clearRect(0, y, w, h);
  g.setColor(0x0000); // black
  g.setFontAlign(0,-1);
  g.setFont("Vector",20);
  g.drawString(version, w/2, 40, true);

  //g.setColor(0xFFC0); // yellow
  g.setFont("Vector",40);
  g.drawString("A" + step_count, w/2, h - 60, true);
}

function getFwSteps() {
  if (WIDGETS.wpedom !== undefined) {
    return WIDGETS.wpedom.getSteps();
  }
  return "-";
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
running = false;  // will get negated by onStartStop()
onStartStop();

Bangle.loadWidgets();
Bangle.drawWidgets();

g.clear();
setInterval(draw, 1000); // refresh every second
draw();

// test1 - START / STOP
// uncomment to experiment using BTN1 for START / STOP
//running = false;  // will get negated by onStartStop()
//setWatch(onStartStop, BTN1, {repeat:true,edge:"rising"});

