var fileNumber = 0;
var MAXLOGS = 9;


function getFileName(n) {
  return "accellog."+n+".csv";
}

function showMenu() {
  var menu = {
    "" : { title : "Accel Logger" },
    "File No" : {
      value : fileNumber,
      min : 0,
      max : MAXLOGS,
      onchange : v => { fileNumber=v; }
    },
    "Start" : function() {
      E.showMenu();
      startRecord();
    },
    "View Logs" : function() {
      viewLogs();
    },
    "Exit" : function() {
      load();
    },
  };
  E.showMenu(menu);
}

function viewLog(n) {
  E.showMessage("Loading...");
  var f = require("Storage").open(getFileName(n), "r");
  var records = 0, l = "", ll="";
  while ((l=f.readLine())!==undefined) {records++;ll=l;}
  var length = 0;
  if (ll) length = (ll.split(",")[0]|0)/1000;

  var menu = {
    "" : { title : "Log "+n }
  };
  menu[records+" Records"] = "";
  menu[length+" Seconds"] = "";
  menu["DELETE"] = function() {
    E.showPrompt("Delete Log "+n).then(ok=>{
      if (ok) {
        E.showMessage("Erasing...");
        f.erase();
        viewLogs();
      } else viewLog(n);
    });
  };
  menu["< Back"] = function() {
    viewLogs();
  };

  E.showMenu(menu);
}

function viewLogs() {
  var menu = {
    "" : { title : "Logs" }
  };

  var hadLogs = false;
  for (var i=0;i<=MAXLOGS;i++) {
    var f = require("Storage").open(getFileName(i), "r");
    if (f.readLine()!==undefined) {
      (function(i) {
        menu["Log "+i] = () => viewLog(i);
      })(i);
      hadLogs = true;
    }
  }
  if (!hadLogs)
    menu["No Logs Found"] = function(){};
  menu["< Back"] = function() { showMenu(); };
  E.showMenu(menu);
}

function startRecord(force) {
  if (!force) {
    // check for existing file
    var f = require("Storage").open(getFileName(fileNumber), "r");
    if (f.readLine()!==undefined)
      return E.showPrompt("Overwrite Log "+fileNumber+"?").then(ok=>{
        if (ok) startRecord(true); else showMenu();
      });
  }
  // display
  g.clear(1);
  Bangle.drawWidgets();
  var w = g.getWidth();
  var h = g.getHeight();
  g.setColor("#ff0000").fillRect(0,h-48,w,h);
  g.setColor("#ffffff").setFont("6x8",2).setFontAlign(0,0).drawString("RECORDING", w/2,h-24);
  g.setFont("6x8").drawString("Samples:",w/2,h/3 - 20);
  g.setFont("6x8").drawString("Time:",w/2,h*2/3 - 20);
  g.setFont("6x8",2).setFontAlign(0,0,1).drawString("STOP",w-10,h/2);

  // now start writing
  f = require("Storage").open(getFileName(fileNumber), "w");
  f.write("Time, MAdj, MClip, MScale, M\n");
  
  var start = getTime();
  var sampleCount = 0;
  var countOfPositives = 0;
  var countOfNegatives = 0;
  var totalPositive = 0;
  var totalNegative = 0;
  var totalOfValues = 0;
  var stepWasLow = false;
  var stepCount = 0;
  
  function writeStats() {
    var offset = totalOfValues / sampleCount;
    var avgPositives = totalPositive / countOfPositives;
    var avgNegatives = totalNegative / countOfNegatives;

    f.write("\n\nSTATS: steps=" + stepCount + " offset=" + offset + " avgPositives=" + avgPositives + " avgNegatives=" + avgNegatives);
    console.log("\n\nSTATS: steps=" + stepCount + " offset=" + Math.round(offset) + " avgPositives=" + Math.round(avgPositives) + " avgNegatives=" + Math.round(avgNegatives) );
  }
  
  function accelHandler(accel) {
    var t = Math.round((getTime() - start)*1000);
    
    var mag = accel.mag;
    var mag_scaled = mag;
    if (mag_scaled > 1)
      mag_scaled = mag_scaled - 1;
    else
      mag_scaled = -1*(1 - mag_scaled);

    mag_scaled = (mag_scaled * 8192);

    var mag_clipped = Math.round(mag_scaled);

    if (mag_scaled > 4096) mag_clipped = 4096;
    if (mag_scaled < -4096) mag_clipped = -4096;

    if (mag_clipped > 0) {
      totalPositive += mag_clipped;
      countOfPositives++;
    } else {
      totalNegative += mag_clipped;
      countOfNegatives++;
    }

    totalOfValues += mag_clipped;

    // step detection
    var hadStep = 0;
    if (mag_clipped < 0) {
      stepWasLow = true;
    } else if (mag_clipped >= 400 && stepWasLow) {
      stepWasLow = false;
      hadStep = 1;
      stepCount++;
    }

    // "Time, MAdj, MClip, MScale, M\n"
    f.write(t + ","  + mag_clipped + "," + stepCount + "," + mag_scaled + "," + mag + "\n");
    
    sampleCount++;
    g.reset().setFont("6x8",3).setFontAlign(0,0);
    g.drawString("  "+sampleCount+"  ",w/2,h/3,true);
    g.drawString("  "+Math.round(t/1000)+"  s  ",w/2,h*2/3,true);
  }

  Bangle.setPollInterval(80); // 12.5 Hz
  Bangle.on('accel', accelHandler);
  setWatch(()=>{
    Bangle.removeListener('accel', accelHandler);
    writeStats();
    showMenu();
  }, BTN2);
}


Bangle.loadWidgets();
Bangle.drawWidgets();
showMenu();
