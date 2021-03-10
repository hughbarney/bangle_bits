var pal2color = new Uint16Array([0x0000,0xFFFF,0x07E0,0xFFC0],0,2);
var buf = Graphics.createArrayBuffer(240,60,2,{msb:true});

function flip(b,y) {
  g.drawImage({width:240,height:50,bpp:2,buffer:b.buffer, palette:pal2color},0,y);
  b.clear();
}

var count = 0;

function draw() {
  var t;
  count++;

  // first
  buf.reset();
  buf.setFontAlign(0, -1);
  t = "23:" + (count % 6);
  t = t + (count % 9);
  t = t + ":" + (count % 5);
  t = t + (count % 7);
  buf.setFont("Vector", 56);
  buf.setColor(1);
  buf.drawString(t, 120, 0);
  flip(buf, 40);

  // second area
  /*
  buf.reset();
  buf.setFontAlign(0, -1);
  buf.setFont("Vector", 60);
  buf.setColor(2);
  buf.drawString(count + 5635, 120, 0);
  flip(buf, 80);
  */
  
  // third area
  buf.reset();
  buf.setFontAlign(0, -1);
  buf.setFont("Vector", 40);
  buf.setColor(3);
  buf.drawString("CZ 206 603", 120, 0);
  flip(buf, 120);  

  g.reset();
  g.setFontAlign(0, -1);
  g.setFont("6x8",2);
  g.setColor(1); 
  g.drawString(count % 119, 120, 1660);
}

g.clear();
var click = setInterval(draw, 1000);
