var pal1color = new Uint16Array([0x0000,0xFFC0],0,1);
var buf1 = Graphics.createArrayBuffer(160,160,1,{msb:true});

function flip1(x,y) {
 g.drawImage({width:160,height:160,bpp:1,buffer:buf1.buffer, palette:pal1color},x,y);
 buf1.clear();
}

g.clear();


buf1.setColor(1);
buf1.setFont("Vector", 20);
buf1.setFontAlign(0,-1);
buf1.drawString("Figure 8s",0, 40);
buf1.drawString("to",0, 80);
buf1.drawString("Calibrate",0, 120);
flip1(40,40);
