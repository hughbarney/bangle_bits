(() => {
  function getFace(){
    var intervalRefSec;
    var pal1color;
    var pal2color;
    var buf1;
    var buf2;
    var img;
    var bearing;
    var heading;
    var CALIBDATA;

    function init() {
      pal1color = new Uint16Array([0x0000,0xFFC0],0,1);
      pal2color = new Uint16Array([0x0000,0xffff],0,1);
      buf1 = Graphics.createArrayBuffer(160,160,1,{msb:true});
      buf2 = Graphics.createArrayBuffer(80,40,1,{msb:true});
      img = require("heatshrink").decompress(atob("lEowIPMjAEDngEDvwED/4DCgP/wAEBgf/4AEBg//8AEBh//+AEBj///AEBn///gEBv///wmCAAImCAAIoBFggE/AkaaEABo="));

      intervalRefSec = undefined;

      bearing = 0; // always point north
      heading = 0;
      tPerf = 0;
      CALIBDATA = require("Storage").readJSON("magnav.json",1)||null;
      // compass should be powered on before startDraw is called
      // otherwise compass power widget will not come on
      if (!Bangle.isCompassOn()) Bangle.setCompassPower(1);
    }

    function freeResources() {
      pal1color = undefined;
      pal2color = undefined;
      buf1 = undefined;
      buf2 = undefined;
      img = undefined;
      
      intervalRefSec = undefined;

      bearing = 0;
      heading = 0;
      tPerf = 0;
      CALIBDATA = undefined;
      if (Bangle.isCompassOn()) Bangle.setCompassPower(0);
    }

    function flip1(x,y) {
      g.drawImage({width:160,height:160,bpp:1,buffer:buf1.buffer, palette:pal1color},x,y);
      buf1.clear();
    }

    function flip2(x,y) {
      g.drawImage({width:80,height:40,bpp:1,buffer:buf2.buffer, palette:pal2color},x,y);
      buf2.clear();
    }
    
    function startTimer() {
      if (!Bangle.isCompassOn()) Bangle.setCompassPower(1);
      draw();
      readCompass();
      if (intervalRefSec === undefined) intervalRefSec = setInterval(readCompass, 500);
    }

    function stopTimer() {
      if (Bangle.isCompassOn()) Bangle.setCompassPower(0);
      
      clearInterval(intervalRefSec);
      intervalRefSec = undefined;
    }

    function onButtonShort(btn) {}
    function onButtonLong(btn) {}

    function radians(d) {
      return (d*Math.PI) / 180;
    }

    // takes ~95-100ms, have seen it take 1200ms though which will cause tasks to back up
    function drawCompass(hd) {
      var t1 = getTime();
      buf1.setColor(1);
      buf1.fillCircle(80,80,79,79);
      buf1.setColor(0);
      buf1.fillCircle(80,80,69,69);
      buf1.setColor(1);
      buf1.drawImage(img, 80, 80, {scale:3,  rotate:radians(hd)} );
      flip1(40, 30);
      var t = Math.round((getTime() - t1)*1000);
      LED1.write((t > 130));
    }

    // stops violent compass swings and wobbles, takes 3ms
    function newHeading(m,h){ 
      var t1 = getTime();
      var s = Math.abs(m - h);
      var delta = (m>h)?1:-1;
      if (s>=180){s=360-s; delta = -delta;} 
      if (s<2) return h;
      if (s<3) return h;
      var hd = h + delta*(1 + Math.round(s/5));
      if (hd<0) hd+=360;
      if (hd>360)hd-= 360;
      var t2 = getTime();
      return hd;
    }

    // takes approx 7ms
    function tiltfixread(O,S){
      var t1 = getTime();
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
      var t2 = getTime();
      return psi;
    }

    function readCompass() {
      var d = tiltfixread(CALIBDATA.offset,CALIBDATA.scale);
      heading = newHeading(d,heading);
      draw();
    }

    function draw() {
      var dir = bearing - heading;
      if (dir < 0) dir += 360;
      if (dir > 360) dir -= 360;
      drawCompass(dir);  // we want compass to show us where to go
      buf2.setColor(1);
      buf2.setFontAlign(-1,-1);
      buf2.setFont("Vector",38);
      var hding = Math.round(heading);
      var hd = hding.toString();
      hd = hding < 10 ? "00"+hd : hding < 100 ? "0"+hd : hd;
      buf2.drawString(hd,0,0);
      flip2(90, 200);
    }
    
    return {init:init, freeResources:freeResources, startTimer:startTimer, stopTimer:stopTimer,
            onButtonShort:onButtonShort, onButtonLong:onButtonLong};
  }

  return getFace;

})();
