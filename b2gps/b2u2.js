

/*

test case
0F030201
00040201
--------
0F070402

const a = new Uint8Array([1,2,3,15,1,2,4,0]);
print(a.buffer);
let s = sum_payload(a.buffer);
print(s.toString(16).padStart(8,'0'));

*/

function sum_payload(p) {
  const v32 = new Uint32Array(p);
  var sum = 0;
  
  for (var i = 0; i < v32.length; i++)
    sum += v32[i];

  return sum;
}


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

  const c1 = new Unit8Array([len0,len1,cl,id]);
  let cksum = new Unit32Array(c1.buffer);                        
  let pl = new Unit32Array(payload);

  let cksum = cksum + sum_payload(pl.buffer);

  print(cksum.toString(16).padStart(8,'0'));
  return cksum;
}

