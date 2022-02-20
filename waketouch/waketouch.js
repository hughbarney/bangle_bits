
const h = g.getHeight();
const w = g.getWidth();

let t_count = 0;

Bangle.on('touch', function(x) { t_count++; });

function draw() {
  g.reset();
  g.clearRect(0, 30, w, 99);
  g.setFontAlign(0, -1);
  g.setFont("Vector", 30);
  g.drawString('tcount='+ t_count, w/2, 40);
}

// handle switch display on by pressing BTN1
Bangle.on('lcdPower', function(on) {
  if (on) draw();
});

g.clear();
Bangle.loadWidgets();
Bangle.drawWidgets();
setInterval(draw, 1000); // refresh every second
draw();
// Show launcher when button pressed
Bangle.setUI("clock");
