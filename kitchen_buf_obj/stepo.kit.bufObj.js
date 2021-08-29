(() => {
  function getFace(){
    var bObject;
    var intervalRefSec;

    function init(g,sw,hrm,b) {
      bObject = b;
      console.log("2 bObject=" + bObject);
    }

    function freeResources() {
      bObject = undefined;
    }
    
    function showMem(msg) {
      var val = process.memory();
      var str = msg + " " + Math.round(val.usage*100/val.total) + "%";
      //console.log(str);
    }

    function onButtonShort(btn) {}
    function onButtonLong(btn) {}
    
    function radians(a) {
      return a*Math.PI/180;
    }

    function startTimer() {
      draw();
      intervalRefSec = setInterval(draw, 5000);
    }

    function stopTimer() {
      if(intervalRefSec) {intervalRefSec=clearInterval(intervalRefSec);}
    }

    function drawSteps() {
      var i = 0;
      var cx = 60;
      var cy = 60;
      var r = 56;
      var steps = getSteps();
      var percent = steps / 10000;

      if (percent > 1) percent = 1;
      
      var startrot = 0 - 180;
      var midrot = -180 - (360 * percent);
      var endrot = -360  - 180;

      console.log("2 bObject=" + bObject);
      
      bObject.buf.setColor(3);   // green-yellow

      // draw guauge
      for (i = startrot; i > midrot; i -= 4) {
        x = cx + r * Math.sin(radians(i));
        y = cy + r * Math.cos(radians(i));
        bObject.buf.fillCircle(x,y,4);
      }

      bObject.buf.setColor(2); // grey

      // draw remainder of guage in grey
      for (i = midrot; i > endrot; i -= 4) {
        x = cx + r * Math.sin(radians(i));
        y = cy + r * Math.cos(radians(i));
        bObject.buf.fillCircle(x,y,4);
      }

      // draw steps
      bObject.buf.setColor(1); // white
      bObject.buf.setFont("Vector", 24);
      bObject.buf.setFontAlign(0,0);
      bObject.buf.drawString(steps, cx, cy);

      // change the remaining color to RED if battery is below 25%
      if (E.getBattery() > 25) 
        bObject.flip(60,115);
      else
        bObject.flip_red(60,115);
    }

    function draw() {
      var d = new Date();
      var da = d.toString().split(" ");
      var time = da[4].substr(0,5);

      g.clearRect(0, 30, 239, 99);
      g.setColor(1,1,1);
      g.setFontAlign(0, -1);
      g.setFont("Vector", 80);
      g.drawString(time, 120, 30, true);

      drawSteps();
    }

    function getSteps() {
      if (stepsWidget() !== undefined)
        return stepsWidget().getSteps();
      return "E-STEPS";
    }

    function stepsWidget() {
      if (WIDGETS.activepedom !== undefined) {
        return WIDGETS.activepedom;
      } else if (WIDGETS.wpedom !== undefined) {
        return WIDGETS.wpedom;
      }
      return undefined;
    }

    return {init:init, freeResources:freeResources, startTimer:startTimer, stopTimer:stopTimer,
            onButtonShort:onButtonShort, onButtonLong:onButtonLong};
  }

  return getFace;

})();
