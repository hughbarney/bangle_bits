

Bangle.on('GPS-raw',function (d) {
  if (d[0]=="$") return;
  if (d.startsWith("\xB5\x62\x05\x01")) print("GPS ACK");
  else if (d.startsWith("\xB5\x62\x05\x00")) print("GPS NACK");
  // 181,98 sync chars  
  else print("GPS",E.toUint8Array(d).join(","));
});

function writeGPScmd(cmd) {
  var d = [0xB5,0x62]; // sync chars
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


function UBX_CFG_INTERVAL(period, ontime) {
  writeGPScmd([0x06,0x86, // msg class + type
         8,0, //length
         //v0,  interval     period             ontime           reserved
         0x00,  0x02,        period,        0,  ontime,     0,    0,      0  ]);
         // the values are little endian, least significant byte first
}

/*
 * set update baud rate
 *
 * the setting is in milliseconds in 2 bytes, max 65 seconds
 * we are passing in a value in seconds
 * we set the most significant byte only
 * 8 seconds ~ 8192ms 0x2000, 0x20 = 32 = 4*8
 *
 */
function UBX_CFG_RATE(rate) {
  rate = (rate * 4) % 256;
  //console.log("rate=" + rate);
   
  writeGPScmd([0x06,0x08,  // class, id 
           0x06, 0,          // length
           0x00, rate,       // b0: 8192ms 0x2000,  0x00FF (~65sec)
           0x01, 0x00,       // b2: 
           0x01, 0x00]);     // b4: timeref GPS
}

/*
 * Save configuration otherwise it will reset when the GPS wakes up
 *
 */
function UBX_CFG_SAVE() {
  writeGPScmd([0x06, 0x09,   // class id
           0x0D, 0x00,   // length
           0x00, 0x00, 0x00, 0x00,  // clear mask
           0xFF, 0xFF, 0x00, 0x00,  // save mask
           0x00, 0x00, 0x00, 0x00,  // load mask
           0x07]);                  // b2=eeprom b1=flash b0=bat backed ram
                                        // code on github had 7 - all 3 set ?
}

// convert an integer to an array of bytes
function int_2_bytes( x ){
    var bytes = [];
    var i = 4;
    do {
      bytes[--i] = x & (255);
      x = x>>8;
    } while (i);
  
    return bytes;
}


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
