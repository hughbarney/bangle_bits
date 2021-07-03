/**
 * accellog3
 *
 *
 * Got this out of State Machine step counter paper
 *
 * Try a low pass filter 3Hz cut off, 12.5Hz sampling
 * a = 6Pi /  (6Pi + 0.08)     where 0.08 ~ 12.5hz
 *
 * When plotted in EXCEL could not see much difference in the plots
 * xn and yn were too close to call.
 *
 *
 */

var y_n1 = 0;

// acceleromter operates at 12.5Hz
function onAccel(a) {
  var m = a.mag;
  var xn = (m-1)*1000 >>0;
  var t = Math.round((getTime() - t_start)*1000);

  var yn = (9958 * xn) + 24*y_n1; 
  console.log( [t, xn, yn ].join(",") );

  y_n1 = yn;
}

function draw() {
  g.clear();
  g.setColor(0);
  g.setColor(1,1,1);
  g.setFont("Vector",20);
  g.setFontAlign(0,-1);
  
  var line = 40;
  var status = running ? "BTN1 to STOP" : "BTN1 to START"; 
  g.drawString(status, 120, line, true);
}

var running = false;
var t_start = 0;

function onStartStop() {
  running = !running;
  
  if (running) {
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
setInterval(draw, 1000); // refresh every second
draw();
setWatch(onStartStop, BTN1, {repeat:true,edge:"rising"});

