


// send on Serial 1
Serial1.setup(9600,{tx:D31});

// receive on Serial 2
Serial2.setup(9600,{rx:D30});

/*
Serial2.on('data', function(data) {
  print("DATA: " + data);
});
*/

Serial2.on('data',function (d) {
  if (d[0]=="$") return;
  if (d.startsWith("\xB5\x62\x05\x01")) print("GPS ACK");
  else if (d.startsWith("\xB5\x62\x05\x00")) print("GPS NACK");
  // 181,98 sync chars  
  else print("GPS",E.toUint8Array(d).join(","));
});

function pon() {

   //Bangle.setGPSPower(1);
D29.write(1); // turn GPS on

}


Serial1.write([0xBA,0xCE,0x00,0x00,0x06,0x00, 0x00,0x06,0x00,0x00]);



