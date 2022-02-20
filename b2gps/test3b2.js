

// test3b2.js - found example that had the bytes in the checksum the otherway round

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

Serial1.on('data', function(data) {
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
  stat();
}

function pof() {
  Bangle.setGPSPower(0);
  stat();
}

function stat() {
  print(Bangle.isGPSOn() ? "GPS On" : "GPS Off");
}

/***************************************************************
        ckSum = 0x010B0038;
	for (i = 0; i < 14; i++)
	{
		ckSum += pDataBuff[i];
	}

	aidIniMsg[0] = 0xBA;
	aidIniMsg[1] = 0xCE;
	aidIniMsg[2] = 0x38;		// LENGTH
	aidIniMsg[3] = 0x00;
	aidIniMsg[4] = 0x0B;		// CLASS	ID
	aidIniMsg[5] = 0x01;		// MESSAGE	ID

***************************************************************/

function prt() {
  // CFG-PRT          head       len clas   id  checksum
  //             --------- --------- ---------  -------------------
          print([0xBA,0xCE,0x00,0x00,0x06,0x00, 0x00,0x06,0x00,0x00]);
  Serial1.write([0xBA,0xCE,0x00,0x00,0x06,0x00, 0x00,0x06,0x00,0x00]);
}


function cas10() {
  sendCommand("CAS10,0"); // hot start
}
