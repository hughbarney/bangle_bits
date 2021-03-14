// a lift and shift of magnav.js

(() => {
  function getFace(){
    var intervalRefSec;
    const Yoff = 80;
    var pal2color;
    var buf;
    const labels;
    var brg;
    var heading = 0;
    var CALIBDATA;

    function init() {
      buf = Graphics.createArrayBuffer(240,60,2,{msb:true});
      pal2color = new Uint16Array([0x0000,0xffff,0x07ff,0xC618],0,2);
      labels = ["N","NE","E","SE","S","SW","W","NW"];
      heading = 0;
      brg=null;
      Bangle.setLCDTimeout(15);
      CALIBDATA = require("Storage").readJSON("magnav.json",1)||null;

      g.clear();
      g.setColor(1,0.5,0.5);
      g.fillPoly([120,Yoff+60,110,Yoff+80,130,Yoff+80]);
      g.setColor(1,1,1);

      if (!Bangle.isCompassOn()) Bangle.setCompassPower(1);
    }

    function freeResources() {
      buf = undefined;
      pal2color = undefined;
      labels = undefined;
      brg=null;
      CALIBDATA = null;
      if (Bangle.isCompassOn()) Bangle.setCompassPower(0);
    }

    function flip(b,y) {
      g.drawImage({width:240,height:60,bpp:2,buffer:b.buffer, palette:pal2color},0,y);
      b.clear();
    }

    function startTimer() {
      intervalRefSec = setInterval(reading, 200);
    }

    function stopTimer() {
      if(intervalRefSec) {intervalRefSec=clearInterval(intervalRefSec);}
    }

    function onButtonShort(btn) {}
    function onButtonLong(btn) {}

    function drawCompass(course) {
      var t1 = getTime();
      buf.setColor(1);
      buf.setFont("Vector",24);
      var start = course-90;
      if (start<0) start+=360;
      buf.fillRect(28,45,212,49);
      var xpos = 30;
      var frag = 15 - start%15;
      if (frag<15) xpos+=frag; else frag = 0;
      for (var i=frag;i<=180-frag;i+=15){
        var res = start + i;
        if (res%90==0) {
          buf.drawString(labels[Math.floor(res/45)%8],xpos-8,0);
          buf.fillRect(xpos-2,25,xpos+2,45);
        } else if (res%45==0) {
          buf.drawString(labels[Math.floor(res/45)%8],xpos-12,0);
          buf.fillRect(xpos-2,30,xpos+2,45);
        } else if (res%15==0) {
          buf.fillRect(xpos,35,xpos+1,45);
        }
        xpos+=15;
      }
      if (brg) {
        var bpos = brg - course;
        if (bpos>180) bpos -=360;
        if (bpos<-180) bpos +=360;
        bpos+=120;
        if (bpos<30) bpos = 14;
        if (bpos>210) bpos = 226;
        buf.setColor(2);
        buf.fillCircle(bpos,40,8);
      }
      flip(buf,Yoff);
      return Math.round((getTime() - t1)*1000);
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
      var t = drawCompass(heading);
      buf.setColor(1);
      buf.setFont("6x8",2);
      buf.setFontAlign(-1,-1);
      //buf.drawString("o",170,0);
      buf.drawString("ms",170,0);
      buf.setFont("Vector",54);
      var course = Math.round(heading);
      var cs = course.toString();
      cs = course<10?"00"+cs : course<100 ?"0"+cs : cs;
      //buf.drawString(cs,70,10);
      buf.drawString(t,70,10);
      flip(buf,Yoff+80);
    }
    
    return {init:init, freeResources:freeResources, startTimer:startTimer, stopTimer:stopTimer,
            onButtonShort:onButtonShort, onButtonLong:onButtonLong};
  }
  return getFace;
})();
