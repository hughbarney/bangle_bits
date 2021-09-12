let tTotal = Date.now();
let tStart = Date.now();
let tCurrent = Date.now();
let running = false;
let timeY = 45;
let TtimeY = 75;
let lapTimes = [];
let displayInterval;
let redrawButtons = true;

function log_debug(o) {
  console.log(o);
}

function timeToText(t) {
  let hrs = Math.floor(t/3600000);
  let mins = Math.floor(t/60000)%60;
  let secs = Math.floor(t/1000)%60;
  let tnth = Math.floor(t/100)%10;
  let text;

  if (hrs === 0) 
    text = ("0"+mins).substr(-2) + ":" + ("0"+secs).substr(-2) + "." + tnth;
  else
    text = (""+hrs) + ":" + ("0"+mins).substr(-2) + ":" + ("0"+secs).substr(-2) + "." + tnth;

  log_debug(text);
  return text;
}

function drawButtons() {
  log_debug("drawButtons()");

  g.clearRect(0,23,g.getWidth()-1,g.getHeight()-24);
  g.setColor(1,1,1);
  g.setFont("Vector", 20);
  g.setFontAlign(0,0,3);
  g.drawString(running? "STOP" : "GO",    230, 50); // BTN1
  g.drawString(running? ""  : "RESET", 230, 120); // BTN2
  redrawButtons = false;
}

function drawTime() {
  log_debug("drawTime()");
  let t = tCurrent-tStart;
  let Tt = tCurrent-tTotal;

  let txt = timeToText(t);
  let Ttxt = timeToText(Tt);
  
  let x = 100;
  let Tx = 125;

  // total time
  g.setFont("Vector",38);
  g.setFontAlign(0,0);
  g.clearRect(0,timeY-21,200,timeY+21);
  g.setColor(0xFFC0); 
  g.drawString(Ttxt,x,timeY);
}

function draw() {
  let last = tCurrent;
  if (running) tCurrent = Date.now();
  log_debug("draw()" + getTime());

  g.setColor(1,1,1);
  if (redrawButtons) drawButtons();
  drawTime();
}

function startTimer() {
  log_debug("startTimer()");
  draw();
  displayInterval = setInterval(draw, 100);
}

function stopTimer() {
  log_debug("stopTimer()");
  if (displayInterval) {
    clearInterval(displayInterval);
    displayInterval = undefined;
  }
}

// BTN2 stop start
function stopStart() {
  log_debug("stopStart()");

  if (running)
    stopTimer();

  running = !running;
  Bangle.beep();

  if (running)
    tStart = Date.now() + tStart- tCurrent;  
  tTotal = Date.now() + tTotal - tCurrent;
  tCurrent = Date.now();

  redrawButtons = true;
  if (running) {
    startTimer();
  } else {
    draw();
  }
}

function reset() {
  log_debug("reset()");
  if (!running) {
    Bangle.beep();
    tStart = tCurrent = tTotal = Date.now();
  }
  g.clear();
  draw();
}

// lap or reset
function lapReset() {
  redrawButtons = true;
  log_debug("lapReset()");
  if (!running)
    reset();
}

function setupButtons() {
  setWatch(stopStart, BTN1, {repeat:true,edge:"rising"});
  setWatch(lapReset, BTN2, {repeat:true,edge:"rising"});
}

g.reset();
g.clear();
draw();
setupButtons();
Bangle.loadWidgets();
Bangle.drawWidgets();
