// prt() demo

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

function pon() {
  Bangle.setGPSPower(1);
  print(Bangle.isGPSOn() ? "GPS On" : "GPS Off");
}

function pof() {
  Bangle.setGPSPower(0);
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

/*
load following code into the IDE
type pon(); on the left hand side, turns GPS on
type prt(); on the left hand side
result - no response
*/

