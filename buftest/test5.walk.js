// test5: heading, pointer and attempt to dampen
// problem - compass just sets back to NaN on power On
(() => {
  function getFace(){
    var heading = 0;
    var oldHeading = 0;
    var intervalRefSec;

    function init() {
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
      r=r*Math.PI/180;
      var p = Math.PI*3/4;
      g.setColor(c);
      g.fillPoly([
        120+80*Math.sin(r),    120-80*Math.cos(r),
        120+40*Math.sin(r+p),  120-40*Math.cos(r+p),
        120-20*Math.sin(r),    120+20*Math.cos(r),
        120+40*Math.sin(r+-p), 120-40*Math.cos(r-p),
      ]);
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
    
    function draw() {
      var t1 = getTime();
      var m = Bangle.getCompass();
      var d = Math.round(m.heading);

      console.log("d=" + d);
      
      arrow(oldHeading,0);

      if (!isNaN(d))
        heading = newHeading(d, heading);
      else
        heading = 0;

      console.log("heading=" + heading);
      
      arrow(heading, 0xAFE5); // YellowGreen
      oldHeading = heading;
      
      g.setColor(1,1,1);
      g.setFont("Vector", 30);
      g.setFontAlign(-1,-1);
      
      g.clearRect(0, 200, 239, 239);
      g.drawString(heading, 0, 200);
      //var t = Math.round((getTime() - t1)*1000);
      //console.log("t=" + t);
    }
    
    return {init:init, freeResources:freeResources, startTimer:startTimer, stopTimer:stopTimer,
            onButtonShort:onButtonShort, onButtonLong:onButtonLong};
  }
  return getFace;
})();
