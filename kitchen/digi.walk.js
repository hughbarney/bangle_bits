(() => {
  function getFace(){
    var intervalRefSec;
    var buf;
    var days;
    var prevInfo;
    var prevDate;
    var prevTime;
    var infoMode;
    
    const INFO_NONE = "none";
    const INFO_BATT = "batt";
    const INFO_MEM = "mem";
    const Y_TIME = 30;
    const Y_ACTIVITY = 116;
    const Y_MODELINE = 200;
    
    function init() {
      days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday","Friday", "Saturday"];
      prevInfo = "";
      prevTimeStr = "";
      prevDateStr = "";
      infoMode = INFO_NONE;
      g.clear();
    }

    function freeResources() {
      days = undefined;
      prevInfo = undefined;
      prevTime = undefined;
      prevDate = undefined;
    }
    
    function startTimer() {
      draw();
      intervalRefSec = setInterval(draw, 5000);
    }
    
    function stopTimer() {
      if(intervalRefSec) {intervalRefSec=clearInterval(intervalRefSec);}
    }

    function onButtonShort(btn) {
      if (btn === 1) cycleInfoMode();
    }
    
    function onButtonLong(btn) {}
    function getGPSfix() { return undefined; }
    function setGPSfix(f) {}
   
    function draw() {
      var d = new Date();
      var da = d.toString().split(" ");
      var time = da[4].substr(0,5);

      if (time !== prevTime) {
        prevTime = time;
        g.setColor(0);
        g.fillRect(0, Y_TIME, 239, Y_ACTIVITY -1);       
        g.setColor(1,1,1);
        g.setFont("Vector",80);
        g.setFontAlign(0,-1);
        g.drawString(time, 120, Y_TIME);
      }
      
      var day = days[d.getDay()];
      var dateStr = da[2] + " " + da[1] + " " + da[3];

      if (dateStr !== prevDate) {
        prevDate = dateStr;
        g.setColor(0);
        g.fillRect(0, Y_ACTIVITY, 239, Y_MODELINE - 3);       
        g.setColor(1,1,1);
        g.setFont("Vector",26);
        g.drawString(day, 120, Y_ACTIVITY);
        g.drawString(dateStr, 120, Y_ACTIVITY + 40);
      }

      drawInfo();
    }

    function cycleInfoMode() {
      switch(infoMode) {
      case INFO_NONE:
        infoMode = INFO_BATT;
        break;
      case INFO_BATT:
        infoMode = INFO_MEM
        break;
      case INFO_MEM:
      default:
        infoMode = INFO_NONE;
        break;
      }
      drawInfo();
    }

    function drawInfo() {
      let val;
      let str = "";
      let col = 0x07FF; // cyan 
  
      switch(infoMode) {
      case INFO_NONE:
        col = 0x0000;
        str = "";
        break;
      case INFO_MEM:
        val = process.memory();
        str = "Memory: " + Math.round(val.usage*100/val.total) + "%";
        break;
      case INFO_BATT:
      default:
        str = "Battery: " + E.getBattery() + "%";
      }
      
      // check if we need to draw, avoid flicker
      if (str == prevInfo)
        return;
      
      prevInfo = str;
      g.setFont("6x8", 3);
      g.setColor(col);
      g.fillRect(0, Y_MODELINE - 3, 239, Y_MODELINE + 25);
      g.setColor(0,0,0);
      g.setFontAlign(0, -1);
      g.drawString(str, 120, Y_MODELINE);
    }

    return {init:init, freeResources:freeResources, startTimer:startTimer, stopTimer:stopTimer,
            onButtonShort:onButtonShort, onButtonLong:onButtonLong,
            setGPSfix:setGPSfix, getGPSfix:getGPSfix
           };
  }

  return getFace;
})();
