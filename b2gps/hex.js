/*
byteArray = new Uint8Array([255,254,253,252]);

function toHexString(byteArray) {
  return Array.prototype.map.call(byteArray, function(byte) {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  }).join('');
}


toHexString(byteArray);

*/

/*
function buf2hex(buffer) { // buffer is an ArrayBuffer
   return [...new Uint8Array(buffer)]
      .map(x => x.toString(16).padStart(2, '0'))
      .join('');
}
*/

function buf2hex(buffer) {
  let v = new Uint8Array(buffer);
  let m = v.map(x => x.toString(16).padStart(2, '0'));
  print(m);
  return m.join('');
}

// EXAMPLE:
const buffer = (new Uint8Array([4, 8, 12, 16])).buffer;
print(buffer);
console.log(buf2hex(buffer)); // = 04080c10

/*
new Uint8Array([4, 8, 12, 16]).buffer
new Uint8Array([4, 8, 0, 10])
48010
*/
