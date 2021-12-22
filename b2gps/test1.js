
Bangle.on('GPS-raw',function (d) {
  print("GPS",E.toUint8Array(d).join(","));
});

//                    F3     F4       F5      F6
// 2 byte-head 2b-len 1 byte 1 bytye  payload 4b-chksum
//

// CFG-RATE read
// head        len           ID        pay   chksum
// 0xBA 0xCE   0x00 0x00     0x06 0x04 0x0   4 byte checksum
// simple read

Bangle.setGPSPower(1);

//                                                --- bad checksum
Serial1.write([0xBA,0xCE,0x00,0x00,0x06,0x04,0x00,0xFF,0xFF,0xFF,0xFF]);
