// T9: add rings round compass
(() => {
  function getFace(){
    var heading = 0;
    var bearing = 0;
    var oldHeading = 0;
    var intervalRefSec;
    var firstTimeDraw;
    var CALIBDATA;

    function init() {
      CALIBDATA = require("Storage").readJSON("magnav.json",1)||null;
      if (!Bangle.isCompassOn()) Bangle.setCompassPower(1);
      firstTimeDraw=true;
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

    function arrow(angle,col) {
      var t1 = getTime();

      if (firstTimeDraw) {
        g.setColor(col);
        g.fillCircle(120,120,90,90);
        g.setColor(0);
        g.fillCircle(120,120,80,80);
        firstTimeDraw = false;
      }
      
      angle=angle*Math.PI/180;
      var p = [0, 1.1071, Math.PI/4, 2.8198, 3.4633, 7*Math.PI/4 , 5.1760];
      
      g.setColor(col);

      var poly = [
        120+60*Math.sin(angle+p[0]),       120-60*Math.cos(angle+p[0]),
        120+44.7214*Math.sin(angle+p[1]),  120-44.7214*Math.cos(angle+p[1]),
        120+28.2843*Math.sin(angle+p[2]),  120-28.2843*Math.cos(angle+p[2]),
        120+63.2455*Math.sin(angle+p[3]),  120-63.2455*Math.cos(angle+p[3]),
        120+63.2455*Math.sin(angle+p[4]),  120-63.2455*Math.cos(angle+p[4]),
        120+28.2843*Math.sin(angle+p[5]),  120-28.2843*Math.cos(angle+p[5]),
        120+44.7214*Math.sin(angle+p[6]),  120-44.7214*Math.cos(angle+p[6])
      ];
      
      //console.log(poly);
      g.fillPoly(poly);
      console.log("arrow: " + Math.round((getTime() - t1)*1000) );
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

    function draw() {
      var d = tiltfixread(CALIBDATA.offset,CALIBDATA.scale);
      heading = newHeading(d,heading);

      var dir = bearing - heading;
      if (dir < 0) dir += 360;
      if (dir > 360) dir -= 360;

      if (dir != oldHeading) {
        arrow(oldHeading, 0);
        arrow(dir, 0xFFC0); // Yellow
        oldHeading = dir;
      }
      
      g.setColor(1,1,1);
      g.setFont("6x8", 2);
      g.setFontAlign(-1,-1);
      g.clearRect(0, 220, 239, 239);
      g.drawString("T9: " + heading, 0, 220);
    }
    
    return {init:init, freeResources:freeResources, startTimer:startTimer, stopTimer:stopTimer,
            onButtonShort:onButtonShort, onButtonLong:onButtonLong};
  }
  return getFace;
})();
