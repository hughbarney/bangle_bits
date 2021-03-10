

// option (1) draw using fillpoly to the screen direct
// example: gps Route Viwer
g.fillPoly(....);

// option (2) have the image as a Object String in a function
// example widgps (most widgets)
var img = E.toArrayBuffer(atob("...."));
g.drawImage(img, x, y);

// option (3) draw image read out of flash
// example ??
g.drawImage(require("Storage").read("cloud.img"));

// option (4) write the image to an ArrayBuffer
// example magnav, arrow compass
var buf1 = Graphics.createArrayBuffer(160,160,1, {msb:true});

function d() {
  var img = require("heatshrink").decompress(atob("..."));
  buf1.drawImage(img, 80, 80, {scale:3,  rotate:radians(course)} );
  // other draws, then call a flip function
  flip1(40, 30);  // draws the image into the graphics array
}


