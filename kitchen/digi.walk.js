(() => {
  function getFace(){
    var intervalRefSec;
    var buf;
    var days;
    
    function init() {
      buf = Graphics.createArrayBuffer(240,70,1,{msb:true});
      days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday","Friday", "Saturday"];
    }

    function freeResources() {
      buf = undefined;
      days = [];
    }
    
    function flip(x,y) {
      g.setColor(1,1,1);
      g.drawImage({width:buf.getWidth(),height:buf.getHeight(),buffer:buf.buffer},x, y);
      buf.clear();
    }

    function startTimer() {
      draw();
      intervalRefSec = setInterval(draw, 5000);
    }
    
    function stopTimer() {
      if(intervalRefSec) {intervalRefSec=clearInterval(intervalRefSec);}
    }

    function onButtonShort(btn) {}
    function onButtonLong(btn) {}
    function getGPSfix() { return undefined; }
    function setGPSfix(f) {}
   
    function draw() {
      buf.clear();
      buf.setColor(1);
      var d = new Date();
      var da = d.toString().split(" ");
      var time = da[4].substr(0,5);
      
      buf.setFont("Vector",80);
      buf.setFontAlign(0,-1);
      buf.drawString(time,buf.getWidth()/2, 0);
      flip(0,30);
      
      buf.setFont("Vector",26);
      buf.setFontAlign(0,-1);
      var day = days[d.getDay()];
      var dateStr = da[2] + " " + da[1] + " " + da[3];
      
      buf.drawString(day, buf.getWidth()/2, 40);
      buf.drawString(dateStr, buf.getWidth()/2, 0);
      flip(0,120);
    }

    return {init:init, freeResources:freeResources, startTimer:startTimer, stopTimer:stopTimer,
            onButtonShort:onButtonShort, onButtonLong:onButtonLong,
            setGPSfix:setGPSfix, getGPSfix:getGPSfix
           };
  }

  return getFace;
})();
