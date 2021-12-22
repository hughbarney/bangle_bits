
Bangle.on('GPS-raw',function (d) {
  if (d[0]=="$") return;
  if (d.startsWith("\xB5\x62\x05\x01")) print("GPS ACK");
  else if (d.startsWith("\xB5\x62\x05\x00")) print("GPS NACK");
  // 181,98 sync chars  
  else print("GPS",E.toUint8Array(d).join(","));
});

function writeGPScmd(cmd) {
  var d = [0xBA,0xCE]; // header
  d = d.concat(cmd);
  var a=0,b=0;
  for (var i=2;i<d.length;i++) {
    a += d[i];
    b += a;
  }
  d.push(a&255,b&255);
  console.log(d);
  Serial1.write(d);
}

// quick hack
function wait(ms){
  var start = new Date().getTime();
  var end = start;
  while(end < start + ms) {
    end = new Date().getTime();
  }
}

//                    F3     F4       F5      F6
// 2 byte-head 2b-len 1 byte 1 bytye  payload 4b-chksum
//



// CFG-RATE read
// head        len           ID        pay   chksum
// 0xBA 0xCE   0x00 0x00     0x06 0x04 0x0   4 byte checksum
// simple read

//                                  --- bad checksum
[0xBA,0xCE,0x00,0x00,0x06,0x04,0x00,0xFF,0xFF,0xFF,0xFF];



/*
function UBX_CFG_PMS() {
  writeGPScmd([0x06,0x04, // msg class + type
         8,0,//length
         0x00,0x03, 0,0, 0,0, 0,0]);  
}
*/

function onGPS(fix) {
  console.log(fix);
}

function setupGPS() {
  Bangle.setGPSPower(1);

  UBX_CFG_RESET();
  wait(100);

  //UBX_CFG_RESTORE_NMEA();
  //wait(20);

  UBX_CFG_PM2(120,5);
  wait(20);
  
  UBX_CFG_RXM();
  wait(20);
    
  UBX_CFG_SAVE();
  wait(20);
  
  Bangle.on('GPS',onGPS);
}
