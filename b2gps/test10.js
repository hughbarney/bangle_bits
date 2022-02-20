
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
  //if (d.startsWith("\xBA\xCE\x05\x01")) print("GPS ACK");
  //if (d.startsWith("\xBA\xCE\x05\x00")) print("GPS NACK");

  print("DATA:",E.toUint8Array(d).join(","));
  print("   => " + d);
});

function pon() {
  //Bangle.setGPSPower(1);
  D29.write(1); // turn GPS on
}

function pof() {
  //Bangle.setGPSPower(1);
  D29.write(0); // turn GPS off
}

function prt() {
  print("");
  print("");
  print("SENDING PRT CASIC COMMAND");
  Serial1.write([0xBA,0xCE,0x00,0x00,0x06,0x00, 0x00,0x06,0x00,0x00]);
  print("");
  print("");
  print("");
}


