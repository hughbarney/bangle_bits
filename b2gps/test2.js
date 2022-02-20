/**************************************************

ckSum = (class << 24) + (id << 16) + len;
for (i = 0; i <(len / 4); i++){
  ckSum = ckSum + payload [i];
}

var cs = new Uint32Array(1);
var id = new Uint32Array(1);
var ck = new Uint32Array(1);

cs[0] = 0xBACE;
cs[0] = cs[0] << 24 ;

id[0] = 0x0600;
id[0] = id[0] << 16;

//                     len    pl
ck[0] = cs[0] + id[0] + 0   + 0;

console.log(ck[0].toString(16));

d4 00 00 00;
**************************************************/

Bangle.on('GPS-raw',function (d) {
  print("GPS",E.toUint8Array(d).join(","));
});

Bangle.on('GPS-raw',function (d) {
  if (d[0]=="$") return;
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


// CFG-PRT       cc       len        id       p  
//            ---------  --------  ---------  ----
Serial1.write([0xBA,0xCE,0x00,0x00,0x06,0x00, 0x00, 0xd4,0x00,0x00,0x00]);



