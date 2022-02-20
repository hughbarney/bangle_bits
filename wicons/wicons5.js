const h = g.getHeight();
const w = g.getWidth();

// sun 48, 1 bit, max contrast, brightness set to 85
// 1 bit transparency
var img = require("heatshrink").decompress(atob("mEwwMB/4AY/1/AsHPAoPzAoPHAQPjAQgIC+ICBx4CB/IXBz4eC+EPFIfD4YFDx4ZCAAMf/AFDn/8IAhCDAowCBAoPwjgFBnEPAooRFEZg1FIIxNFLIplEOIp9FRIqVFx4XBCgXfAoP7aMAAV"));

// original image is black on transparent
// RESULT - nothing on top
// RESULT - white on green regardless


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
