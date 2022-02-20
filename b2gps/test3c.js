
// TEST 3C - send it as a string rather than Serial1.write();


/************************************
$GNGGA - rx positioning data
$GNGLL - lat / lot
$GNGSA - DOP
$GPGSV - visible satellite
$BDGSV - ??
$GNRMC
************************************/

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
  stat();
}

function pof() {
  Bangle.setGPSPower(0);
  stat();
}

function stat() {
  print(Bangle.isGPSOn() ? "GPS On" : "GPS Off");
}


// big endian checksum
function prt0() {
  // CFG-PRT                                 cc       len   msg   id   checksum
  //                                 ---------  ---------  ---------   ------------------
                               print([0xBA,0xCE, 0x00,0x00, 0x06,0x00, 0x00,0x00,0x00,0x06]);
  Serial1.println(String.fromCharCode(0xBA,0xCE, 0x00,0x00, 0x06,0x00, 0x06,0x00,0x00,0x00));
}

// little endian checksum
function prt1() {
  // CFG-PRT                                 cc       len   msg   id   checksum
  //                                 ---------  ---------  ---------   ------------------
                               print([0xBA,0xCE, 0x00,0x00, 0x06,0x00, 0x00,0x00,0x00,0x06]);
  Serial1.println(String.fromCharCode(0xBA,0xCE, 0x00,0x00, 0x06,0x00, 0x00,0x00,0x00,0x06));
}

function cas10() {
  sendCommand("CAS10,0"); // hot start
}
