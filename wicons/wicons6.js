const h = g.getHeight();
const w = g.getWidth();

// sun 48, 1 bit, max contrast, brightness set to 85
// 1 but transparency to color
var img = require("heatshrink").decompress(atob("mEwgIWTgOAAsFwAoMOAoN4AoMeAoN8AoM+AoICCvgCBj4CB/ACBh8H8HwAoMHj/48AqCv/+Gof4DIQ6B+EPHgUB8EHAofAgYFCAYIHBAo0f+YFB54mBAogXLFIw1GIIhNFLIsHn/8MoRxFPoqJFSoqhFVorXjACA"));

// original image is black on transparent
// RESULT - black on white, white on white
// RESULT - black on white, white on white

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
