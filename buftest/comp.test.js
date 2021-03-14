var pal1color = new Uint16Array([0x0000,0xFFC0],0,1);
var buf1 = Graphics.createArrayBuffer(160,160,1,{msb:true});
var img = require("heatshrink").decompress(atob("lEowIPMjAEDngEDvwED/4DCgP/wAEBgf/4AEBg//8AEBh//+AEBj///AEBn///gEBv///wmCAAImCAAIoBFggE/AkaaEABo="));
var tPerf;
var tDiff;
var i = -1;

function flip1(x,y) {
  g.drawImage({width:160,height:160,bpp:1,buffer:buf1.buffer, palette:pal1color},x,y);
  buf1.clear();
}

function perfCheck() {
  var tNow  = getTime();
  tDiff = 1000*(tNow - tPerf) - 1000;
  tDiff = Math.round(tDiff);
  tPerf = tNow;
  LED1.write((tDiff > 50));
}

function radians(d) {
  return (d*Math.PI) / 180;
}

function draw() {

  var m = Bangle.getCompass();
  var g = Bangle.getAccel();

  i += 15;
  i = i % 360;
  var t1 = getTime();
  buf1.setColor(1);
  buf1.fillCircle(80,80,79,79);
  buf1.setColor(0);
  buf1.fillCircle(80,80,69,69);
  buf1.setColor(1);
  buf1.drawImage(img, 80, 80, {scale:3,  rotate:radians(i)} );
  flip1(40, 30);
  var t2 = getTime();
  console.log("draw: ", Math.round(m.heading),  Math.round((t2 - t1)*1000), tDiff);
}

function startTest() {
  g.reset();
  g.clear();
  var intervalPerf = setInterval(perfCheck, 1000);
  var intervalDraw = setInterval(draw, 150);
}

Bangle.setCompassPower(1);

// startTest();
