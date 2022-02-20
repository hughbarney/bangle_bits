const h = g.getHeight();
const w = g.getWidth();

function draw() {
  var date = new Date();
  var timeStr = require("locale").time(date,1);
  
  g.reset();
  g.setColor(g.theme.bg);
  g.fillRect(Bangle.appRect);

  drawGauge(w/2, h/2, 0.6);

  g.setFont('Vector', w/4);
  g.setFontAlign(0, 0);
  g.setColor(g.theme.fg);
  g.drawString(timeStr, w/2, h/2);

}

function radians(a) {
  return a*Math.PI/180;
}

// p will be the number of segments for now
function drawGauge(cx,cy,p) {
  var r1 = (w/2) - 4;
  var r2 = (w/2) - 10;

  g.setColor("#0ff");
  g.fillCircle(w/2, h/2, r1); 

  g.setColor(g.theme.bg);
  g.fillCircle(w/2, h/2, r2); 
}


g.clear();
Bangle.setUI("clock");
draw();
