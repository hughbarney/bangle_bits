
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

function prt0() {
  // CFG-PRT            cc       len        id     p  checksum
  //             --------- --------- ---------  ----  -------------------
          print([0xBA,0xCE,0x00,0x00,0x06,0x00, 0x00, 0xd4,0x00,0x00,0x00]);
  Serial1.write([0xBA,0xCE,0x00,0x00,0x06,0x00, 0x00, 0xd4,0x00,0x00,0x00]);
}

function prt1() {
  // CFG-PRT            cc       len        id     checksum
  //             --------- --------- ---------  -------------------
          print([0xBA,0xCE,0x00,0x00,0x06,0x00, 0xd4,0x00,0x00,0x00]);
  Serial1.write([0xBA,0xCE,0x00,0x00,0x06,0x00, 0xd4,0x00,0x00,0x00]);
}

function prt2() {
  // CFG-PRT            cc       len        id     p                    checksum
  //             --------- --------- ---------  ------------------      -------------------
          print([0xBA,0xCE,0x00,0x00,0x06,0x00, 0x00,0x00,0x00,0x00,    0xd4,0x00,0x00,0x00]);
  Serial1.write([0xBA,0xCE,0x00,0x00,0x06,0x00, 0x00,0x00,0x00,0x00,    0xd4,0x00,0x00,0x00]);
}


// ck = d4040000
function rate() {
  // CFG-PRT       cc       len        id       p  
  //            ---------  --------  ---------  ----
  print([0xBA,0xCE,0x00,0x00,0x06,0x04, 0x00, 0xd4,0x04,0x00,0x00]);
  Serial1.write([0xBA,0xCE,0x00,0x00,0x06,0x04, 0x00, 0xd4,0x04,0x00,0x00]);
}

function ck(id,len,pl) {
  var clas = new Uint32Array(1);
  var i = new Uint32Array(1);
  var sum = new Uint32Array(1);

  clas[0] = 0xBACE;
  clas[0] = clas[0] << 24 ;

  i[0] = id;
  i[0] = i[0] << 16;

  //                       len     pl
  sum[0] = clas[0] + i[0] + len   + 0;
  print(sum[0].toString(16));
}

// 
// ck(0x0604,0);


//sendCommand("CAS02,10000");
//Bangle.setGPSPower(0);

// this works

// Bangle.setGPSPower(0);


function case10() {
  sendCommand("CAS10,0"); // hot start
}

function cas12() {
  sendCommand("CAS12,30");
}

