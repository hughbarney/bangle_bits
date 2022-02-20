
Bangle.on('GPS-raw',function (d) {
  //if (d.startsWith("$GNGGA")) return;
  //if (d.startsWith("$GNGLL")) return;
  //if (d.startsWith("$GNGSA")) return;
  //if (d.startsWith("$GPGSV")) return;
  //if (d.startsWith("$BDGSV")) return;
  //if (d.startsWith("$GNRMC")) return;
  //if (d.startsWith("$GNVTG")) return;
  //if (d.startsWith("$GNZDA")) return;
  //if (d.includes("ANTENNA OPEN*25")) return;
  print(d);
});

function checksum(val) {
  var cs = 0;
  for (const c of val) {
    cs = cs ^ c.charCodeAt(0); //XOR
  }
  return cs.toString(16).toUpperCase().padStart(2, '0');
}

function sendCommand(command) {
  cmd = "P" + command;
  cs = this.checksum(cmd);
  cmd = "$" + cmd + "*" + cs;
  print(cmd);
  Serial1.println(cmd);
}

function pon() {
  Bangle.setGPSPower(1);
  print(Bangle.isGPSOn() ? "GPS On" : "GPS Off");
}

function pof() {
  Bangle.setGPSPower(0);
  print(Bangle.isGPSOn() ? "GPS On" : "GPS Off");
}

function cas10() {
  sendCommand("CAS10,0"); // hot start
}

// try and slow the output down 
function cas02() {
  // example $PCAS02,1000*2E  - 1 second in milliseconds
  sendCommand("CAS02,5000");  // does not work
}

// try and stop the NMEA output
function stp() {
  //example:  $PCAS03,1,1,1,1,1,1,1,1,0,0,,,1,1,,,,1*33
  // attempt no output - did not work
  //sendCommand("CAS03,0,0,0,0,0,0,0,0,0,0,,,0,0,,,,0");
  // attempt every 100, does not work
  sendCommand("CAS03,100,100,100,100,100,100,100,100,100,100,,,100,100,,,,100");
}

