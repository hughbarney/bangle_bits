/**
 * accellog2
 */

var rolling_average = 0;
var max = -100;
var min = 100;
var samples = 0;
var running_total = 0;


/*
v0 = ((m-1)*8192)>>0;
v5 = ((m-1)*8192)>>5;

v0 
---
seems to have an average of 150 when bangle is say still

v5
--

-2   > 9   , avg 4 - at rest
-111 > 180 , avg 2 - moving watch to read, scratch head
-97  > 198 , avg 34 - walking !!!



*/

// acceleromter operates at 12.5Hz
function onAccel(a) {
  var m = a.mag;
  //var v = ((m-1)*8192)>>0;
  var v = ((m-1)*8192)>>5;
  var t = Math.round((getTime() - t_start)*1000);

  // bangle at rest noise
  //if (v > 0 && v < 150 ) v = 0;
  //if (v < 0 && v > 150 ) v = 0;
  
  samples++;
  running_total += v;
  rolling_average = running_total / samples;
  max = Math.max(max, v);
  min = Math.min(min, v);

  console.log(  [t, samples, v, min, max, rolling_average].map(n=>Math.round(n)).join(",")+"\n");
}

function draw() {
  g.clear();
  g.setColor(0);
  g.setColor(1,1,1);
  g.setFont("Vector",20);
  g.setFontAlign(0,-1);
  
  var line = 40;
  var status = running ? "BTN1 to STOP" : "BTN1 to START"; 

  g.drawString(Math.round(rolling_average) + " average ", 120, line, true);
  line += 30;
  g.drawString(min + " min ", 120, line, true);
  line += 30;
  g.drawString(max + " max ", 120, line, true);
  line += 30;

  g.drawString(status, 120, line, true);
}

var running = true;
var t_start = 0;

function onStartStop() {
  running = !running;
  
  if (running) {
    t_start = getTime();

    rolling_average = 0;
    max = -100;
    min = 100;
    samples = 0;
    running_total = 0;

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
setInterval(draw, 1000); // refresh every second
draw();
setWatch(onStartStop, BTN1, {repeat:true,edge:"rising"});

