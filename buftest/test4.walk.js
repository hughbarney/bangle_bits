// just a heading and a pointer, no slugging
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

    function draw() {
      var t1 = getTime();
      var m = Bangle.getCompass();
      
      arrow(oldHeading,0);
      var heading = Math.round(m.heading);
      arrow(heading, 0xAFE5); // YellowGreen
      oldHeading = heading;
      
      g.setColor(1,1,1);
      g.setFont("Vector", 30);
      g.setFontAlign(0,-1);
      
      g.clearRect(0, 200, 239, 239);
      g.drawString("Heading: " + heading, 120, 200);
      var t = Math.round((getTime() - t1)*1000);
      //console.log("t=" + t);
    }
    
    return {init:init, freeResources:freeResources, startTimer:startTimer, stopTimer:stopTimer,
            onButtonShort:onButtonShort, onButtonLong:onButtonLong};
  }
  return getFace;
})();
