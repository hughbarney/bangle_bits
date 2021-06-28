// values for debug plotting
var lastAccel = 120;      // BLUE
var lastAccelFilt = 120;  // YELLOW
var lastThresh = 120;     // RED

// question: where do these values come from ? what does tap mean ?
// question: is this a low pass 3Hz filter ?
var filter_taps = new Int8Array([ -2, 4, 4, 1, -1, 0, 2, -3, -12, -13, 2, 24, 29, 6, -25, -33, -13, 10, 11, -1, 3, 29, 41, 4, -62, -89, -34, 62, 110, 62, -34, -89, -62, 4, 41, 29, 3, -1, 11, 10, -13, -33, -25, 6, 29, 24, 2, -13, -12, -3, 2, 0, -1, 1, 4, 4, -2 ]);

// create a history buffer and populate it with the tap values ?
var history = new Int8Array(filter_taps.length);

// what units is this in ? 
const stepCounterThresholdMin = 1500;
const stepCounterAvr = 1;
/// Theshold in filtered acceleration for detecting a step
var stepCounterThreshold = stepCounterThresholdMin;

/// has filtered acceleration passed stepCounterThresholdLow?
var stepWasLow = false;


function onAccel(a) {

  // question - onAccel is event driven, so events could be irregular, papers seem to suggest 20Hz sampling frequency
  // will this event driven approach provide regular sampling of approx 20Hz or will it be subject to CPU performance etc


  // scale to fit and clip
  var v = ((a.mag-1)*8192)>>5;

  // create a new Int8Array from the existing but starting from pos 1 of the existing history
  // this drops off index 0 and moves everything up, leaving the last entry to be filled
  // with the new value
  history.set(new Int8Array(history.buffer,1));
  // set last value to the clipped value from the accel
  history[history.length-1] = E.clip(v, -128, 127);

  console.log("history");
  console.log(history);

  
  // do filtering
  //  what is convolution ??
  //https://homepages.inf.ed.ac.uk/rbf/HIPR2/convolve.htm#:~:text=Convolution%20provides%20a%20way%20of,numbers%20of%20the%20same%20dimensionality.&text=In%20an%20image%20processing%20context,normally%20just%20a%20graylevel%20image.


  // question: - is this a low pass filter at 3Hz to get rid of noise ?
  // question: - why is accFiltered much larger than v , why >>2 to make it bigger ? 
  var accFiltered = E.convolve(filter_taps, history, 0) >> 2;

  console.log("accFiltered");
  console.log(accFiltered);
  
  /*
  // Simple average-based threshold
  if (stepCounterAvr) {
    var a = accFiltered;
    if (a<0) a=-a;
    stepCounterThreshold = (stepCounterThreshold*(32-stepCounterAvr) + a*stepCounterAvr) >> 5;
    if (stepCounterThreshold < stepCounterThresholdMin)
      stepCounterThreshold = stepCounterThresholdMin;
  }*/
  
  // Set threshold based on the 'middle' history item - the one making the big spikes.
  // Try and scale it appropriately


  /*
    question:  why would middle history item represent a big spike ?
    the history starts out blank and samples shuffle along in a FIFO manner
    initially history[32] will be 0 until the 32nd accel event has been captured ?

    question: having filtered why are we using the raw data again and not a scalled form of accFiltered ?
   */
  
  var a = history[32] * 55;
  if (a<0) a=-a;
  if (a > stepCounterThreshold) 
    stepCounterThreshold = a;//(stepCounterThreshold+a) >> 1;
  
  stepCounterThreshold -= 48;  // question: why -= 48 ??
  
  if (stepCounterThreshold < stepCounterThresholdMin)
    stepCounterThreshold = stepCounterThresholdMin;  
  
  // check for steps, a bottom, followed by top threshold crossing = a step
  var hadStep = false;
  if (accFiltered < -stepCounterThreshold) 
    stepWasLow = true;
  else if ((accFiltered > stepCounterThreshold) && stepWasLow) {
    stepWasLow = false;
    hadStep = true;
  }
  // output data
  g.scroll(0,1);
  var n;


  // question: cyan markers on the edge of the screen mean that
  // we crossed the threshold ??
  if (accFiltered < -stepCounterThreshold)
    g.setColor("#0ff").fillRect(0,0,8,0);
  if (accFiltered > stepCounterThreshold)
    g.setColor("#0ff").fillRect(232,0,240,0);
  
  n = 120+v;
  g.setColor("#00f").fillRect(lastAccel,0,n,0);
  lastAccel = n;
  n = 120+(accFiltered>>6);
  g.setColor("#ff0").fillRect(lastAccelFilt,0,n,0);
  lastAccelFilt = n;
  n = 120+(stepCounterThreshold>>6);
  g.setColor("#f00").fillRect(lastThresh,0,n,0);
  lastThresh = n;

  if (hadStep) {
    g.setColor(-1).drawString("STEP",60,0);
  }
}
Bangle.on('accel',onAccel);
Bangle.setLCDTimeout(0);
