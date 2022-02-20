const h = g.getHeight();
const w = g.getWidth();

// sun 48, 1 bit, max contrast, brightness set to max
// 1 bit transparency INVERTED
//var img = require("heatshrink").decompress(atob("mEwwIdagOAAsEwAoMMAoM4AQMcAQgIChwCBuACBgwXBsAeCh/wFIc8ngFDuAZCAAPgg4FD4EDIAhCDAowCBAoMP8YFB4/wAooRFEZg1FIIxNFLIplEOIp9FRIqVFuAXBCgUgAoMEaMAAVA=="));

var img = require("heatshrink").decompress(atob("mEwwIXUgfAAq8DAgPgAoMHAoPwAoMPAoP4AoMfAoP8AoM+AoN+AQN8AQM/CgQCBj8H+HwAoMPj/48A1Cnk8HYdwhwFD8A6CgEBIwOAAoWAA4JSCAocf+YIB5/wAqIdFAow1CIJB+BJol8LIcHn/4NYcP+B3DRgSDERgV+SoIICTYQUCU4StCWYQ8Dbq4AVA="));


// original image is black on transparent
// RESULT - black on white,   white on white
// RESULT - black on green,   white on green

function draw() {
  var x = 0;
  var y = 24;

  console.log("START...");
  g.reset();

  // top half bg
  g.setColor(g.theme.bg);
  g.fillRect(0, 24, w, h/2);

  // bottom half green
  g.setColor('#0f0');
  g.fillRect(0, h/2, w, h);

  
  // top half
  g.setColor(g.theme.fg);
  g.drawImage(img, x, y);

  x += 48;
  g.setColor(g.theme.bg);
  g.drawImage(img, x, y);

  
  // bottom half, green background
  y = h/2 + 20;  x = 0;
  g.setColor(g.theme.fg);
  g.drawImage(img, x, y);

  x += 48;
  g.setColor(g.theme.bg);
  g.drawImage(img, x, y);
}

g.clear();
Bangle.loadWidgets();
Bangle.drawWidgets();
draw();
Bangle.setUI("clock");
