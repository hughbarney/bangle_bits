var pal1color = new Uint16Array([0x0000,0xFFC0],0,1);
var pal2color = new Uint16Array([0x0000,0xffff],0,1);
var buf1 = Graphics.createArrayBuffer(160,160,1,{msb:true});
var buf2 = Graphics.createArrayBuffer(80,40,1,{msb:true});
var img = require("heatshrink").decompress(atob("lEowIPMjAEDngEDvwED/4DCgP/wAEBgf/4AEBg//8AEBh//+AEBj///AEBn///gEBv///wmCAAImCAAIoBFggE/AkaaEABo="));

var bearing=0; // always point north
var heading = 0;
var candraw = false;
var CALIBDATA = require("Storage").readJSON("magnav.json",1)||null;

var intervalPerf;
var tPerf;

Bangle.setLCDTimeout(30);

function flip1(x,y) {
 g.drawImage({width:160,height:160,bpp:1,buffer:buf1.buffer, palette:pal1color},x,y);
 buf1.clear();
}

function flip2(x,y) {
 g.drawImage({width:80,height:40,bpp:1,buffer:buf2.buffer, palette:pal2color},x,y);
 buf2.clear();
}

function radians(d) {
  return (d*Math.PI) / 180;
}

function drawCompass(course) {
  if(!candraw) return;

  buf1.setColor(1);
  buf1.fillCircle(80,80,79,79);
  buf1.setColor(0);
  buf1.fillCircle(80,80,69,69);
  buf1.setColor(1);
  buf1.drawImage(img, 80, 80, {scale:3,  rotate:radians(course)} );
  flip1(40, 30);
}

function newHeading(m,h){ 
    var s = Math.abs(m - h);
    var delta = (m>h)?1:-1;
    if (s>=180){s=360-s; delta = -delta;} 
    if (s<2) return h;
    var hd = h + delta*(1 + Math.round(s/5));
    if (hd<0) hd+=360;
    if (hd>360)hd-= 360;
    return hd;
}

function tiltfixread(O,S){
  var start = Date.now();
  var m = Bangle.getCompass();
  var g = Bangle.getAccel();
  m.dx =(m.x-O.x)*S.x; m.dy=(m.y-O.y)*S.y; m.dz=(m.z-O.z)*S.z;
  var d = Math.atan2(-m.dx,m.dy)*180/Math.PI;
  if (d<0) d+=360;
  var phi = Math.atan(-g.x/-g.z);
  var cosphi = Math.cos(phi), sinphi = Math.sin(phi);
  var theta = Math.atan(-g.y/(-g.x*sinphi-g.z*cosphi));
  var costheta = Math.cos(theta), sintheta = Math.sin(theta);
  var xh = m.dy*costheta + m.dx*sinphi*sintheta + m.dz*cosphi*sintheta;
  var yh = m.dz*sinphi - m.dx*cosphi;
  var psi = Math.atan2(yh,xh)*180/Math.PI;
  if (psi<0) psi+=360;
  return psi;
}

// Note actual mag is 360-m, error in firmware
function reading() {
  var d = tiltfixread(CALIBDATA.offset,CALIBDATA.scale);
  heading = newHeading(d,heading);
  var dir = bearing - heading;
  if (dir < 0) dir += 360;
  if (dir > 360) dir -= 360;
  drawCompass(dir);  // we want compass to show us where to go
  buf2.setColor(1);
  buf2.setFontAlign(-1,-1);
  buf2.setFont("Vector",38);
  var course = Math.round(heading);
  var cs = course.toString();
  cs = course<10?"00"+cs : course<100 ?"0"+cs : cs;
  buf2.drawString(cs,0,0);
  flip2(90, 200);
}

function perfCheck() {
  var tNow  = getTime();
  var tDiff = 1000*(tNow - tPerf) - 1000;
  tPerf = tNow;
  console.log("perf=" + tDiff);
}

var intervalRef;

function startdraw(){
  g.clear();
  g.setColor(1,1,1);
  Bangle.drawWidgets();
  candraw = true;
  intervalRef = setInterval(reading,200);
  intervalPerf = setInterval(perfCheck, 1000);
}

function stopdraw() {
  candraw=false;
  if(intervalRef) {clearInterval(intervalRef);}
  if(intervalPerf) {intervalPerf=clearInterval(intervalPerf);}
}

function setButtons(){
  setWatch(()=>{load();}, BTN1, {repeat:false,edge:"falling"});
  setWatch(Bangle.showLauncher, BTN2, {repeat:false,edge:"falling"});
  //setWatch(docalibrate, BTN3, {repeat:false,edge:"falling"});
}
 
Bangle.on('lcdPower',function(on) {
  if (on) {
    startdraw();
  } else {
    stopdraw();
  }
});

Bangle.on('kill',()=>{Bangle.setCompassPower(0);});

Bangle.loadWidgets();
Bangle.setCompassPower(1);
startdraw();
setButtons();
