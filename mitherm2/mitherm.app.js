var filterTemperature = [{
  serviceData: {
    "181a": {}
  }
}];
var results = {};
var macs = [];

var aliases = require("Storage").readJSON("mitherm.json", true);
if (!aliases) aliases = {};

var lastSeen = {};
var current = 0;
var scanning = false;
var timeoutDraw;
var timeoutScan;

function debug(s) {
  //console.log(s);
}


const scan = function() {
  debug("scan started");
  if (!scanning) { // Don't start scanning if already doing so.
    scanning = true;
    if (timeoutScan) clearTimeout(timeoutScan);
    timeoutScan = setTimeout(scan, 300000); // Scan again in 5 minutes.
    drawScanState(scanning);
    NRF.findDevices(function(devices) {
      onDevices(devices);
    }, {
      filters: filterTemperature,
      timeout: 30000  // Scan for 30s
    });
  }
  debug("scan end");
};


const onDevices = function(devices) {
  debug("onDevices() Start");
  let now = Date.now();
  for (let i = 0; i < devices.length; i++) {
    let device = devices[i];

    let processedData = extractData(device.data);
    /*
    console.log({
      rssi: device.rssi,
      data: processedData
    });
    */
    if (!macs.includes(processedData.MAC)) {
      macs.push(processedData.MAC);
    }
    results[processedData.MAC] = processedData;
    lastSeen[processedData.MAC] = now;
  }
  debug("onDevices() scan complete");
  debug("macs=" + macs);
  scanning = false;
  writeOutput();
};


const extractData = function(thedata) {
  debug("extractDate() start");
  let data = DataView(thedata);
  let MAC = [];
  for (let i = 9; i > 3; i--) {
    MAC.push(data.getUint8(i, true).toString(16).padStart(2, "0"));
  }
  out = {
    size: data.getUint8(0, true),
    uid: data.getUint8(1, true),
    UUID: data.getUint16(2, true),
    MAC: MAC.join(":"),
    temperature: data.getInt16(10, true) * 0.01,
    humidity: data.getUint16(12, true) * 0.01,
    battery_mv: data.getUint16(14, true),
    battery_level: data.getUint8(16, true),
  };
  debug("extractDate() end");
  debug(out.toString());
  return out;
};


const writeOutput = function() {
  debug("writeOutput() start()");
  let now = Date.now();
  if (timeoutDraw) clearTimeout(timeoutDraw);
  timeoutDraw = setTimeout(writeOutput, 60000); // Refresh in 1 minute.

  g.reset();
  g.setColor(g.theme.bg);
  g.fillRect(Bangle.appRect);

  drawScanState(scanning);

  if (macs.length == 0) {
    debug("mac length is 0 - we are screwed");
    return;
  }

  processedData = results[macs[current]];
  g.setFont12x20(2);
  g.drawString(`${processedData.temperature.toFixed(2)}°C`, 10, 30);
  //g.drawString(`${processedData.humidity.toFixed(2)} %`, 10, 70);

  //g.setFont6x15();
  g.setFont('Vector', 16);
  g.drawString(`${((now - lastSeen[macs[current]]) / 60000).toFixed(0)} min ago`, 10, 110);
  g.drawString(`${processedData.battery_level} % battery`, 10, 130);
  g.drawString(` ${processedData.MAC in aliases ? aliases[processedData.MAC] : processedData.MAC}: ${current + 1} / ${macs.length}`, 10, 150);
  debug("writeOutput() end()");
};


const scrollDevices = function(directionLR) {
  // Swipe left or right to move between devices.
  debug("scrollDevices()>");
  current -= directionLR; // inverted feels a more familiar gesture.
  if (current + 1 > macs.length)
    current = 0;
  if (current < 0)
    current = macs.length - 1;
  writeOutput();
  debug("<scrollDevices()");
};

const drawScanState = function(state) {
  debug("drawScanState()>");
  
  if (state)
    g.fillRect(160, 160, 170, 170);
  else
    g.clearRect(160, 160, 170, 170);
  debug("<drawScanState()");
};

const setAlias = function(mac, alias) {
  if (alias === "") {
    delete aliases[mac];
  }
  else {
    aliases[mac] = alias;
    require("Storage").writeJSON("mitherm.json", aliases);
  }
};

const changeAlias = function(mac) {
  g.clear();
  require("textinput").input((mac in aliases) ? aliases[mac] : "").then(function(text) {
    setAlias(mac, text);
    setUI();
    writeOutput();
  });
};


const setUI = function() {
  Bangle.setUI({
    mode: "custom",
    swipe: scrollDevices,
    btn: function() {
      E.showMenu(actionsMenu);
    }
  });
};


const actionsMenu = {
  "": {
    "title": "-- Actions --",
    "back": function() {
      E.showMenu();
    },
    "remove": function() {
      setUI();
      writeOutput();
    },
  },
  "Scan now": function() {
    scan();
    E.showMenu();
  },
  "Edit alias": function() {
    changeAlias(macs[current]);
  },
};

setUI();
Bangle.loadWidgets();
Bangle.drawWidgets();
//g.setClipRect(Bangle.appRect);
scan();
writeOutput();
