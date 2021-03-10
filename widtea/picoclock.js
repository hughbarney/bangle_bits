
function draw() {
  let time = new Date().toString().split(" ")[4];
  g.reset();
  g.setFont("6x8",2);
  g.setFontAlign(1, 0);
  g.drawString(time, 239, 230, true);
}

// handle switch display on by pressing BTN1
Bangle.on('lcdPower', function(on) {
  if (on) draw();
});

// clean app screen
g.clear();
Bangle.loadWidgets();
Bangle.drawWidgets();

setInterval(draw, 1000);
draw();
setWatch(Bangle.showLauncher, BTN2, {repeat:false,edge:"falling"});
