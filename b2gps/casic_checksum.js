
/*
sum = (msg_id << 24) + (msg_class << 16) ++ (len_byte1 << 8) + (len_byte0)

From the CASIC Manual
The calculation of the check value can follow the following algorithm:

ckSum = (id << 24) + (class << 16) + len;
for (i = 0; i <(len / 4); i++)
{
    ckSum = ckSum + payload [i];
}
*/

function casic_checksum(id, cl, len1, len0, payload) {
  print("id:" + id + " cl:" + cl + " len1:" + len1 + " len0:" + len0 + " pl:" + payload);
  
  const c1 =  new Uint8Array([len0,len1,cl,id]);
  const pl = new Uint8Array(payload);
  let cksum = new Uint32Array(c1.buffer);

  print("cksum initial=" + cksum[0].toString(16).padStart(8,'0'));
  
  for (var i = 0; i < pl.length; i += 4) {
    print("pl["+(i+0) + "]=" + pl[i]);
    print("pl["+(i+1) + "]=" + pl[i+1]);
    print("pl["+(i+2) + "]=" + pl[i+2]);
    print("pl["+(i+3) + "]=" + pl[i+3]);


    
    cksum[0] = cksum[0] + pl[i] + (pl[i+1] * 256) + (pl[i+2] * 256 * 256) + (pl[i+3] * 256 *256 *256);
    print("cksum=" + cksum[0].toString(16).padStart(8,'0'));
  }

  print(cksum[0].toString(16).padStart(8,'0'));
  return cksum[0];
}

/**
{
  "hdr": "0xBACE",
  "len": 8, "class": 6, "msgId": 0,
  "payload": [ 1, 7, 192, 8, 0, 194, 1, 0 ],
  "checkSum": 164218632,
  "checkSum16": "0x9C9C708"
 }

{
  "hdr": "0xBACE",
  "len": 4, "class": 5, "msgId": 1,
  "payload": [ 6, 0, 0, 0 ],
  "checkSum": 167773441,
  "checkSum16": "0xA000501"
 }

01 05 00 04  (id, class, 00, 04)
00 00 00 06  payload
-----------
01 05 00 0A  - seem to calculate checksum, but send least sig byte first

 (the one received first is in the low order)


*/

function test() {
  let c;
  //                id, cl, len1, len0, payload)
  print("");
  c = casic_checksum(1,  5,    0,    4, [6, 0, 0, 0]);
  print("test1 - expecting 0xA000501");
  print(c.toString(16).padStart(8,'0'));  

  print("");
  print("");
  print("");

  //                id, cl, len1, len0, payload)
  c = casic_checksum(0,  6,    0,    8, [1, 7, 192, 8, 0, 194, 1, 0]);
  print("test2 - expecting 0x9C9C708");
  print(c.toString(16).padStart(8,'0'));
}

