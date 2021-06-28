/**
 * javascript version of the Bangle firmware step counter 2v09.90
 * 
 * See: https://github.com/espruino/Espruino/blob/master/libs/misc/stepcount.c
 *
 */

// values for debug plotting
var lastAccel = 120;      // BLUE    - raw
var lastAccelFilt = 120;  // GREEN   - filtered
var lastThresh = 120;     // RED

/**
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
var group_count = 0; // record how many steps in a row before we time out

const STEPCOUNTERHISTORY = 5;        // keep a history of last 5 steps
const STEPCOUNTERHISTORY_TIME = 75;  // 6*12.5Hz = 75 values samples ~ 6 seconds
var stepHistory = new Int16Array(STEPCOUNTERHISTORY);
var i;

// initialise the history with values 255 (timedout)
for (i=0;i<STEPCOUNTERHISTORY;i++)
  stepHistory[i]=255;


// acceleromter operates at 12.5Hz
function onAccel(a) {

  // scale to fit and clip
  var v = ((a.mag-1)*8192)>>5;

  /**
   *  create a new Int8Array from the existing but starting from pos 1 of the existing history
   *  this drops off index 0 and moves everything up, leaving the last entry to be filled
   *  with the new value
   */
  history.set(new Int8Array(history.buffer,1));
  // set last value to the clipped value from the accel
  var raw_clipped = E.clip(v, -128, 127);
  history[history.length-1] = raw_clipped;

  // digital filter, output has to be scaled down as the calculation is integer based, no floating point
  var accFiltered = E.convolve(filter_taps, history, 0) >> 2;
  
  // increment step count history counters, each slot records how many samples ago the
  // step was from the currently detected step
  for (var i = 0 ;i < STEPCOUNTERHISTORY; i++)
    if (stepHistory[i] < 255)
      stepHistory[i]++;
  
  // check for steps, a bottom, followed by top threshold crossing = a step
  var hadStep = false;
  if (accFiltered < -stepCounterThreshold) {
    stepWasLow = true;
  } else if ((accFiltered > stepCounterThreshold) && stepWasLow) {
    stepWasLow = false;
    // We now have something resembling a step!
    // Don't register it unless we've already had X steps within Y time period
    if (stepHistory[0] < STEPCOUNTERHISTORY_TIME) {
      hadStep = true;
    }
    
    // Add it to our history anyway so we can keep track of how many steps we have
    for (i=0;i<STEPCOUNTERHISTORY-1;i++)
      stepHistory[i] = stepHistory[i+1];
    stepHistory[STEPCOUNTERHISTORY-1] = 0;
  }

  // output data
  g.scroll(0,1);
  var n;

  // cyan markers on the edge of the screen mean that we crossed the threshold
  if (accFiltered < -stepCounterThreshold)
    g.setColor("#0ff").fillRect(0,0,8,0);
  if (accFiltered > stepCounterThreshold)
    g.setColor("#0ff").fillRect(232,0,240,0);
  
  // plot raw value BLUE
  n = 120+v;
  g.setColor("#00f").fillRect(lastAccel,0,n,0);
  lastAccel = n;
  
  // plot filtered value, in GREEN
  n = 120+(accFiltered>>6);
  g.setColor("#0f0").fillRect(lastAccelFilt,0,n,0);
  lastAccelFilt = n;
  
  // plot threshold in RED
  n = 120+(stepCounterThreshold>>6);
  g.setColor("#f00").fillRect(lastThresh,0,n,0);
  lastThresh = n;

  if (hadStep) {
    g.setColor(-1).drawString("STEP",60,0);
  }
}

g.clear();
Bangle.on('accel',onAccel);
Bangle.setLCDTimeout(0);

