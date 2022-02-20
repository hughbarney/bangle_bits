const h = g.getHeight();
const w = g.getWidth();

function draw() {
  var date = new Date();
  var timeStr = require("locale").time(date,1);
  
  g.reset();
  g.setColor(g.theme.bg);
  g.fillRect(Bangle.appRect);

  g.setFont('Vector', w/3);
  g.setFontAlign(0, -1);
  g.setColor(g.theme.fg);
  g.drawString(timeStr, w/2, 30);

  drawGauge(40, 130, 0.9);
}

var gaugeImg = {
  width : 8, height : 7, bpp : 2,
  transparent : 1,
  buffer : E.toArrayBuffer(atob("qqWqqqqqqqmqqaqpVqk="))
};

/*
var gaugeImg = {
  width : 8, height : 7, bpp : 1,
  transparent : 0,
  buffer : E.toArrayBuffer(atob("AwAAAQEB4Q=="))
};
*/

function radians(a) {
  return a*Math.PI/180;
}

// p will be the number of segments for now
function drawGauge(cx,cy,p) {
  var i = 0;
  var r = 25;
  var x;
  var y;
     
  var startrot = 0 - 180;
  var midrot = -180 - (360 * p);
  var endrot = -360  - 180;

  g.setColor('#0ff'); // cyan
  
  // draw guauge
  for (i = startrot; i > midrot; i -= 6) {
    x = cx + r * Math.sin(radians(i));
    y = cy + r * Math.cos(radians(i));
    g.drawImage(gaugeImg, x, y, {rotate: i});
  }

  g.setColor('#888'); // grey

  // draw remainder of guage in grey
  for (i = midrot; i > endrot; i -= 6) {
    x = cx + r * Math.sin(radians(i));
    y = cy + r * Math.cos(radians(i));
    g.drawImage(gaugeImg, x, y, {rotate: i});
  }
}


g.clear();
Bangle.setUI("clock");
Bangle.loadWidgets();
Bangle.drawWidgets();
setInterval(draw, 60000);
draw();
