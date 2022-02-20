
// send on Serial 1
Serial1.setup(9600,{tx:D31});

// receive on Serial 2
Serial2.setup(9600,{rx:D30});

/*
Serial2.on('data', function(data) {
  print("DATA: " + data);
});
*/


var state = 0;
var NMEA='';


Serial2.on('data',function (d) {
  if (d[0]=="$") {
    read2LF();
    return;
  }

  print("DATA:",E.toUint8Array(d).join(","));
  print("  >>" + d);
});


function read2LF() {
  print("readUntilLF START");

  var i = 0;
  var str ='';
  var ch;
  
  while(1) {
    ch = Serial2.read(1);
    str = str + ch;
    i++;

    //print("len = " + ch.length);
    
    if (++i > 2048) {
      print("ERROR: break loop");
      print("ERR: NMEA:  "+ str);
      return;
    }
    
    if (ch == '\n') {
      print("NMEA:  "+ str);
      return;
    }
  }
}

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


