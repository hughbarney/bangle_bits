(() => {
  function getFace(){
    var intervalRefSec;
    var buf;

    function init() {
      buf = Graphics.createArrayBuffer(240,92,1,{msb:true});
      if (!Bangle.isCompassOn()) Bangle.setCompassPower(1);
    }

    function freeResources() {
      buf = undefined;
      if (Bangle.isCompassOn()) Bangle.setCompassPower(0);
    }
    
    function flip() {
      g.setColor(1,1,1);
      g.drawImage({width:buf.getWidth(),height:buf.getHeight(),buffer:buf.buffer},0,85);
    }

    function startTimer() {
      draw();
      intervalRefSec = setInterval(draw, 1000);
    }

    function stopTimer() {
      if(intervalRefSec) {intervalRefSec=clearInterval(intervalRefSec);}
    }

    function onButtonShort(btn) {}
    function onButtonLong(btn) {}
    
    function draw() {
      var m = Bangle.getCompass();
      var h = Math.round(m.heading);
      buf.clear();
      buf.setColor(1);
      buf.setFont("Vector",30);
      buf.setFontAlign(0,-1);
      buf.drawString("Heading: " + h, buf.getWidth()/2, 0);
      flip();
    }

    return {init:init, freeResources:freeResources, startTimer:startTimer, stopTimer:stopTimer,
            onButtonShort:onButtonShort, onButtonLong:onButtonLong};
  }
  return getFace;
})();
