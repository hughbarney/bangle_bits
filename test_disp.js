var pal1color = new Uint16Array([0x0000,0xFFC0],0,1);
var buf1 = Graphics.createArrayBuffer(160,160,1,{msb:true});

function flip1(x,y) {
 g.drawImage({width:160,height:160,bpp:1,buffer:buf1.buffer, palette:pal1color},x,y);
 buf1.clear();
}

function drawCompass(course) {
  //if(!candraw) return;

  var img = require("heatshrink").decompress(atob("lEowIPMjAEDngEDvwED/4DCgP/wAEBgf/4AEBg//8AEBh//+AEBj///AEBn///gEBv///wmCAAImCAAIoBFggE/AkaaEABo="));

  buf1.setColor(1);
  buf1.fillCircle(80,80,79,79);
  buf1.setColor(0);
  buf1.fillCircle(80,80,69,69);

  buf1.setColor(1);
  //buf1.drawImage(img, 80, 80, {scale:3,  rotate:deg_to_rad(course)} );
  buf1.drawImage(img, 80, 80, {scale:3, rotate: 2} );  
  flip1(40, 40);
}

g.clear();
drawCompass(0);
