var i = 0;
var cx=120;
var cy=174;
var r = 56;

g.clear();

function radians(a) {
  return a*Math.PI/180;
}

var percent = 0.35;

var startrot = 0 - 180;
var midrot = -180 - (360 * percent);
var endrot = -360  - 180;

  var d = new Date();
  var da = d.toString().split(" ");
  var time = da[4].substr(0,5);  
  g.setColor(1,1,1);  // white
  g.setFontAlign(0, -1);
  g.setFont("Vector", 80);
  g.drawString(time, 120,  30);

//g.setColor(0,0,1); // blue
//g.setColor(0x07FF);  // cyan
//g.setColor(255, 216, 62);
//g.setColor(255,255,0);  // yellow, not bad
g.setColor(0xAFE5);   // green-yellow

for (i = startrot; i > midrot; i--) {
  x = cx + r * Math.sin(radians(i));
  y = cy + r * Math.cos(radians(i));
  g.fillCircle(x,y,4);
}

g.setColor(0.2,0.2,0.2); // off = grey

for (i = midrot; i > endrot; i--) {
  x = cx + r * Math.sin(radians(i));
  y = cy + r * Math.cos(radians(i));
  g.fillCircle(x,y,4);
}

//g.setColor(0,1,0);

g.setColor(1,1,1);
g.setFont("Vector", 24);
g.setFontAlign(0,0);
g.drawString("1234", 120, cy);

