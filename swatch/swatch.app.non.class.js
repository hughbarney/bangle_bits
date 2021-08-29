let tTotal = Date.now();
let tStart = Date.now();
let tCurrent = Date.now();
let running = false;
let timeY = 45;
let TtimeY = 75;
let lapTimes = [];
let displayInterval;
let redrawButtons = true;
let redrawLaps = true;

function log_debug(o) {
  console.log(o);
}

function timeToText(t) {
  let hrs = Math.floor(t/3600000);
  let mins = Math.floor(t/60000)%60;
  let secs = Math.floor(t/1000)%60;

  let text = ("00"+hrs).substr(-3) + ":" + ("0"+mins).substr(-2) + ":" + ("0"+secs).substr(-2);
  console.log(text);
  return text;
}

function drawButtons() {
  log_debug("drawButtons()");

  g.clearRect(0,23,g.getWidth()-1,g.getHeight()-24);
  g.setColor(1,1,1);
  g.setFont("Vector", 20);
  g.setFontAlign(0,0,3);
  g.drawString(running? "STOP" : "GO",    230, 50); // BTN1
  g.drawString(running? "LAP"  : "RESET", 230, 120); // BTN2
  redrawButtons = false;
}

function drawLaptimes() {
  g.setFont("Vector",24);
  g.setFontAlign(-1,-1);
  g.clearRect(4, 205, 239, 229); // clear the last line of the lap times
  
  let laps = 0;
  for (let i in lapTimes) {
    g.drawString(lapTimes.length-i + ": " + timeToText(lapTimes[i]), 4, timeY + 40 + i*24);
    if (++laps > 5) break;
  }
  redrawLaps = false;
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

  // current lap time
  g.setFont("Vector", 20);
  g.clearRect(0,TtimeY-7,200,TtimeY+7);
  g.setColor(1,1,1);
  g.drawString(txt,Tx,TtimeY);
}

function getLapTimesArray() {
  lapTimes.push(tCurrent-tTotal);
  return lapTimes.map(timeToText).reverse();
}
                                  
function draw() {
  let last = tCurrent;
  if (running) tCurrent = Date.now();
  log_debug("draw()" + getTime());

  g.setColor(1,1,1);
  if (redrawButtons) drawButtons();
  drawTime();
  if (redrawLaps) drawLaptimes();
}

function startTimer() {
  log_debug("startTimer()");
  draw();
  displayInterval = setInterval(draw, 1000);
}

function stopTimer() {
  log_debug("stopTimer()");
  if (displayInterval) {
    clearInterval(displayInterval);
    displayInterval = undefined;
  }
}

// BTN1
function lap() {
  log_debug("lap()");
  Bangle.beep();
  if (running) {
    tCurrent = Date.now();
    lapTimes.unshift(tCurrent-tStart);
    console.log(tCurrent-tStart);
  }

  tStart = tCurrent;
  redrawButtons = true;
  redrawLaps = true;
  draw();
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
  redrawLaps = true;
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
    lapTimes = [];
  }
  g.clear();
  draw();
}

// lap or reset
function lapReset() {
  redrawButtons = true;
  redrawLaptimes = true;

  log_debug("lapReset()");
  if (running)
    lap()
  else
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
