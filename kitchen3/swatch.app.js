
function STOPWATCH() {
  this.tTotal = Date.now();
  this.tStart = Date.now();
  this.tCurrent = Date.now();
  this.running = false;
  this.timeY = 45;
  this.TtimeY = 75;
  this.lapTimes = [];
  this.displayInterval;
  this.redrawButtons = true;
  this.redrawLaps = true;
}
  
STOPWATCH.prototype.log_debug = function(o) {
  console.log(o);
}

STOPWATCH.prototype.timeToText = function(t) {
  let hrs = Math.floor(t/3600000);
  let mins = Math.floor(t/60000)%60;
  let secs = Math.floor(t/1000)%60;

  let text = ("00"+hrs).substr(-3) + ":" + ("0"+mins).substr(-2) + ":" + ("0"+secs).substr(-2);
  this.log_debug(text);
  return text;
}

STOPWATCH.prototype.getLapTimesArray = function() {
  this.lapTimes.push(tCurrent-tTotal);
  return this.lapTimes.map(timeToText).reverse();
}

STOPWATCH.prototype.stopStart = function() {
  this.log_debug("stopStart()");

  if (this.running)
    this.stopTimer();

  this.running = !this.running;

  if (this.running)
    this.tStart = Date.now() + this.tStart - this.tCurrent;  
  this.tTotal = Date.now() + this.tTotal - this.tCurrent;
  this.tCurrent = Date.now();

  this.redrawButtons = true;
  this.redrawLaps = true;
  if (this.running) {
    this.startTimer();
  } else {
    this.draw();
  }
}

STOPWATCH.prototype.lap = function() {
  this.log_debug("lap()");
  if (this.running) {
    this.tCurrent = Date.now();
    this.lapTimes.unshift(this.tCurrent - this.tStart);
    console.log(this.tCurrent - this.tStart);
  }

  this.tStart = this.tCurrent;
  this.redrawButtons = true;
  this.redrawLaps = true;
  this.draw();
}

STOPWATCH.prototype.reset = function() {
  this.log_debug("reset()");
  if (this.running === false) {
    this.tStart = this.tCurrent = this.tTotal = Date.now();
    this.lapTimes = [];
  }
  g.clear();
  this.draw();
}

// lap or reset
STOPWATCH.prototype.lapOrReset = function() {
  this.redrawButtons = true;
  this.redrawLaptimes = true;

  this.log_debug("lapReset()");
  if (this.running)
    this.lap()
  else
    this.reset();
}

STOPWATCH.prototype.draw = function() {
  if (this.running) this.tCurrent = Date.now();
  this.log_debug("draw()" + getTime());

  g.setColor(1,1,1);
  if (this.redrawButtons) this.drawButtons();
  this.drawTime();
  if (this.redrawLaps) this.drawLaptimes();
}

STOPWATCH.prototype.drawButtons = function() {
  this.log_debug("drawButtons()");

  g.clearRect(0,23,g.getWidth()-1,g.getHeight()-24);
  g.setColor(1,1,1);
  g.setFont("Vector", 20);
  g.setFontAlign(0,0,3);
  g.drawString(this.running? "STOP" : "GO",    230, 50); // BTN1
  g.drawString(this.running? "LAP"  : "RESET", 230, 120); // BTN2
  this.redrawButtons = false;
}

STOPWATCH.prototype.drawLaptimes = function() {
  g.setFont("Vector",24);
  g.setFontAlign(-1,-1);
  g.clearRect(4, 205, 239, 229); // clear the last line of the lap times
  
  let laps = 0;
  for (let i in this.lapTimes) {
    g.drawString(this.lapTimes.length-i + ": " + this.timeToText(this.lapTimes[i]), 4, this.timeY + 40 + i*24);
    if (++laps > 5) break;
  }
  this.redrawLaps = false;
}

STOPWATCH.prototype.drawTime = function() {
  this.log_debug("drawTime()");
  let t = this.tCurrent - this.tStart;
  let Tt = this.tCurrent - this.tTotal;

  let txt = this.timeToText(t);
  let Ttxt = this.timeToText(Tt);
  
  let x = 100;
  let Tx = 125;

  // total time
  g.setFont("Vector",38);
  g.setFontAlign(0,0);
  g.clearRect(0,this.timeY-21,200,this.timeY+21);
  g.setColor(0xFFC0); 
  g.drawString(Ttxt,x,this.timeY);

  // current lap time
  g.setFont("Vector", 20);
  g.clearRect(0, this.TtimeY-7,200, this.TtimeY+7);
  g.setColor(1,1,1);
  g.drawString(txt,Tx, this.TtimeY);
}

STOPWATCH.prototype.startTimer = function() {
  this.log_debug("startTimer()");
  this.draw();
  this.displayInterval = setInterval(draw, 1000);
}

STOPWATCH.prototype.stopTimer = function() {
  this.log_debug("stopTimer()");
  if (this.displayInterval) {
    clearInterval(this.displayInterval);
    this.displayInterval = undefined;
  }
}

function draw() { swObj.draw(); }
function stopStart() { swObj.stopStart(); }
function lapOrReset() { swObj.lapOrReset(); }

function setupButtons(obj) {
  setWatch(stopStart, BTN1, {repeat:true,edge:"rising"});
  setWatch(lapOrReset, BTN2, {repeat:true,edge:"rising"});
}

let swObj = new STOPWATCH();

g.reset();
g.clear();
swObj.draw();
setupButtons();
Bangle.loadWidgets();
Bangle.drawWidgets();
