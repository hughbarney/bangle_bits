const h = g.getHeight();
const w = g.getWidth();
const scale = 1;

function draw() {
  var line = 0;
  g.reset();
  g.clearRect(0, 24, w, h);

  g.getFonts().forEach(f => {
    g.setFontAlign(0, -1);

    if (f == "Vector") {
      g.setFont(f, 10 * scale);
      g.drawString(f + '(' + 10*scale + ')', w/2, 24 + line);
    } else {
      g.setFont(f, scale);
      g.drawString(f + '(' + scale + ')', w/2, 24 + line);
    }
    line += g.getFontHeight();
  });
}

Bangle.setUI("clockupdown", btn=> {
  if (btn<0) {if (scale > 1) scale--;}
  if (btn>0) {if (scale < 4) scale++;}
  draw();
});

g.clear();
Bangle.loadWidgets();
Bangle.drawWidgets();
draw();
