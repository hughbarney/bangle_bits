(() => {

  function getFace(){
    var msg = "NONE";
    var intervalRefSec;
    var buf;

    function init() {
      buf = Graphics.createArrayBuffer(240,92,1,{msb:true});
    }

    function freeResources() {
      buf = undefined;
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

    function onButtonShort(btn) {
      switch(btn) {
      case 1:
        msg = "Short BTN1";
        break;
      case 2:
        msg = "Short BTN2";
        break;
      case 3:
        msg = "Short BTN3";
        break;
      }
    }

    function onButtonLong(btn) {
      switch(btn) {
      case 1:
        msg = "Long BTN1";
        break;
      case 2:
        msg = "Long BTN2";
        break;
      case 3:
        msg = "Long BTN3";
        break;
      }
    }
    
    function draw() {
      buf.clear();
      buf.setColor(1);
      var d = new Date();
      var da = d.toString().split(" ");
      var time = da[4];
      buf.setFont("Vector",54);
      buf.setFontAlign(0,-1);
      buf.drawString(time,buf.getWidth()/2,0);
      buf.setFont("6x8",2);
      buf.setFontAlign(0,-1);
      var date = d.toString().substr(0,15);
      //buf.drawString(date, buf.getWidth()/2, 70);
      buf.drawString(msg, buf.getWidth()/2, 70);
      flip();
    }

    return {init:init, freeResources:freeResources, startTimer:startTimer, stopTimer:stopTimer,
            onButtonShort:onButtonShort, onButtonLong:onButtonLong};

  }

  return getFace;

})();
