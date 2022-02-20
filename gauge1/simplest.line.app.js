const h = g.getHeight();
const w = g.getWidth();

function draw() {
  drawGauge(w/2, h/2, 0.6);
}

function radians(a) {
  return a*Math.PI/180;
}

// p will be the number of segments for now
function drawGauge(cx,cy,p) {
  var i = 0;
  var r1 = (w/2) - 8;
  var r2 = (w/2) - 2;
  
  var x1,x2;
  var y1,y2;
     
  var startrot = 0 - 180;
  var midrot = -180 - (360 * p);
  var endrot = -360  - 180;

  g.setColor('#0ff'); // cyan
  
  // draw guauge
  for (i = startrot; i > midrot; i -= 1) {
    x1 = cx + r1 * Math.sin(radians(i));
    x2 = cx + r2 * Math.sin(radians(i));
    y1 = cy + r1 * Math.cos(radians(i));
    y2 = cy + r2 * Math.cos(radians(i));
    g.drawLine(x1, y1, x2, y2);
    print("g.drawLine(" + x1 + ',' + y1 + ',' + x2 + ',' + y2 + ");");
  }

  g.setColor('#fff');

  // draw remainder of guage in grey
  for (i = midrot; i > endrot; i -= 1) {
    x1 = cx + r1 * Math.sin(radians(i));
    x2 = cx + r2 * Math.sin(radians(i));
    y1 = cy + r1 * Math.cos(radians(i));
    y2 = cy + r2 * Math.cos(radians(i));
    g.drawLine(x1, y1, x2, y2);
  }
}


g.clear();
Bangle.setUI("clock");
//Bangle.loadWidgets();
//Bangle.drawWidgets();
setInterval(draw, 60000);
draw();
