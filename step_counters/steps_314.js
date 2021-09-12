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
 * v3.12 26 Aug 2021 - uses Oxford LPF, no threshold on filter, gate from raw
 * v3.13 28 Aug 2021 - uses Oxford LPF, X=6,TH=14
 * v3.14 31 Aug 2021 - as 3.13 with UI changes, roll over to 0 at midnight
 *
 */

const version = "3.14-6-14";
const X_STEPS = 6;            // we need to see X steps in X seconds to move to STEPPING state
const T_MAX_STEP = 1300;      // upper limit for time for 1 step (ms)
const T_MIN_STEP = 333;       // lower limit for time for 1 step (ms)
const RAW_THRESHOLD = 14;
const N_ACTIVE_SAMPLES = 3;


// (2) Low Pass filter
// a scalled down oxford LPF
var filter_taps = new Int8Array([-11, -15, 44, 68, 44, -15, -11]);

// create a history buffer the same length as the filter taps array
var history = new Int8Array(filter_taps.length);
var peak = new Int16Array([0,0,0]);

var step_count = 0;           // total steps since app start
var pass_count = 0;           // number of seperate passes through the STATE machine that lead to STEPPING
var reject_count = 0;         // number of rejections through the STATE machine
var active_sample_count = 0; 
var gate_open = false;        // start closed
var t_start = getTime();
let lastUpdate = new Date();

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

  var t = Math.round((getTime() - t_start)*1000);
  // this is useful to generate a CSV file of TIME, RAW, FILTERED values
  log_debug(t + "," + raw_clipped + "," + accFiltered);

  //peak detection
  peak[0] = peak[1]; peak[1] = peak[2]; peak[2] = accFiltered;
  
  if (gate_open && peak[1] > peak[0] && peak[1] > peak[2]) {
    //log_debug("  PEAK:   " + peak);
    step_count += step_machine.step_state();
  }

  // reset at midnight
  let date = new Date();
  if (lastUpdate.getDate() != date.getDate()){
    step_count = 1;
    pass_count = 1;
  }
  lastUpdate = date
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
step_machine.reset();

function log_debug(s) {
  if (process.env.HWVERSION==1) {
    //console.log(s);
  }
  // not for v2 yet as it prints to display and cant turn it off
}

/**
 * standard UI code for the App, not part of the algorithm
 */
function draw() {
  var size = Math.floor(g.getWidth()/(7*6));
  var x = (g.getWidth()/2);
  var y = (g.getHeight()/2) - size*12;

  var d = new Date();
  var da = d.toString().split(" ");
  var hh = da[4].substr(0,2);
  var mm = da[4].substr(3,2);
  
  // draw the clock
  g.reset();
  g.clearRect(0, y, g.getWidth(), g.getHeight());
  g.setFont("Vector", 12*size);
  g.setFontAlign(1,-1);  // right aligned
  g.drawString(hh, x, y);
  g.setFontAlign(-1,-1); // left aligned
  if (d.getSeconds()&1) g.drawString(":", x,y);
  g.drawString(mm ,x + size*5, y);

  g.setFontAlign(0,-1);
  g.setFont("Vector", 8*size);
  if (process.env.HWVERSION==1) g.setColor(0x07E0); // green
  g.drawString(step_count, x, y + 16*size);

  // show version
  g.reset();
  g.setFont("6x8",2);
  g.setFontAlign(1,-1);
  g.drawString(version, g.getWidth(), g.getHeight() - 16);

  // show passes
  g.setFontAlign(-1,-1);
  let pc = pass_count;
  // pad the string as bangle 1 screen is curved in the corner
  if (process.env.HWVERSION==1) pc = "  " + pass_count;
  g.drawString(pc, 0, g.getHeight() - 16);
}

// Only update when display turns on
if (process.env.BOARD!="SMAQ3") // hack for Q3 which is always-on
Bangle.on('lcdPower', function(on) {
  if (secondInterval)
    clearInterval(secondInterval);
  secondInterval = undefined;
  if (on)
    secondInterval = setInterval(draw, 1000);
  draw();
});

var secondInterval = setInterval(draw, 1000);
g.clear();

// Show launcher when button pressed
Bangle.setUI("clock");
Bangle.loadWidgets();
Bangle.drawWidgets();

draw();
Bangle.on('accel',onAccel);

Bangle.on('kill',()=>{
  Bangle.removeListener('accel', onAccel);
});

