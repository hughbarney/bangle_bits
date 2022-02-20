
/*
Bangle.on('GPS-raw',function (d) {
  //if (d.startsWith("$GNGGA")) return;
  if (d.startsWith("$GNGLL")) return;
  if (d.startsWith("$GNGSA")) return;
  if (d.startsWith("$GPGSV")) return;
  if (d.startsWith("$BDGSV")) return;
  if (d.startsWith("$GNRMC")) return;
  if (d.startsWith("$GNVTG")) return;
  if (d.startsWith("$GNZDA")) return;
  if (d.includes("ANTENNA OPEN*25")) return;
  print(d);
});
*/


// send on Serial 1
Serial1.setup(9600,{tx:D31});

// receive on Serial 2
Serial2.setup(9600,{rx:D30});


Serial2.on('data', function(data) {
  print("DATA: " + data);
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
  sendCommand("CAS10,3"); // factory reset
}

function prt() {
  // CFG-PRT          head       len clas   id  checksum
  //             --------- --------- ---------  -------------------
          print([0xBA,0xCE,0x00,0x00,0x06,0x00, 0x00,0x06,0x00,0x00]);
  Serial1.write([0xBA,0xCE,0x00,0x00,0x06,0x00, 0x00,0x06,0x00,0x00]);
}

