// test6: heading, pointer and attempt to dampen
// ADD the tilt readcompass way
// T7: sort out bearing, try not to redraw if heading is the same as last
(() => {
  function getFace(){
    var heading = 0;
    var bearing = 0;
    var oldHeading = 0;
    var intervalRefSec;
    var CALIBDATA;

    function init() {
      CALIBDATA = require("Storage").readJSON("magnav.json",1)||null;
      Bangle.setLCDTimeout(15);
      if (!Bangle.isCompassOn()) Bangle.setCompassPower(1);
    }

    function freeResources() {
      if (Bangle.isCompassOn()) Bangle.setCompassPower(0);
    }
    
    function startTimer() {
      if (!Bangle.isCompassOn()) Bangle.setCompassPower(1);
      draw();
      intervalRefSec = setInterval(draw, 500);
    }

    function stopTimer() {
      if(intervalRefSec) {intervalRefSec=clearInterval(intervalRefSec);}
      if (Bangle.isCompassOn()) Bangle.setCompassPower(0);
    }

    function onButtonShort(btn) {}
    function onButtonLong(btn) {}

    function arrow(r,c) {
      var t1 = getTime();
      r=r*Math.PI/180;
      var p = Math.PI*3/4;
      g.setColor(c);
      g.fillPoly([
        120+80*Math.sin(r),    120-80*Math.cos(r),
        120+40*Math.sin(r+p),  120-40*Math.cos(r+p),
        120-20*Math.sin(r),    120+20*Math.cos(r),
        120+40*Math.sin(r+-p), 120-40*Math.cos(r-p),
      ]);

      var t = Math.round((getTime() - t1)*1000);
      LED1.write((t > 30));
      //console.log("T7: " + t);
      return t;
    }

    // stops violent compass swings and wobbles, takes 3ms
    function newHeading(m,h){
      var s = Math.abs(m - h);
      var delta = (m>h)?1:-1;
      if (s>=180){s=360-s; delta = -delta;} 
      if (s<2) return h;
      if (s<3) return h;
      var hd = h + delta*(1 + Math.round(s/5));
      if (hd<0) hd+=360;
      if (hd>360)hd-= 360;
      return hd;
    }
    
    // takes approx 7ms
    function tiltfixread(O,S){
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

    function draw() {
      var d = tiltfixread(CALIBDATA.offset,CALIBDATA.scale);
      heading = newHeading(d,heading);

      var dir = bearing - heading;
      if (dir < 0) dir += 360;
      if (dir > 360) dir -= 360;

      var t1 = 0;
      var t2 = 0;
      if (dir != oldHeading) {
        t1 = arrow(oldHeading, 0);
        t2 = arrow(dir, 0xFFC0); // Yellow
        oldHeading = dir;
      }
      
      g.setColor(1,1,1);
      g.setFont("Vector", 30);
      g.setFontAlign(-1,-1);
      g.clearRect(0, 200, 239, 239);
      //g.drawString("T7: " + heading, 0, 200);
      var t = t1 + t2;
      g.drawString("T7: " + t, 0, 200);
    }
    
    return {init:init, freeResources:freeResources, startTimer:startTimer, stopTimer:stopTimer,
            onButtonShort:onButtonShort, onButtonLong:onButtonLong};
  }
  return getFace;
})();
