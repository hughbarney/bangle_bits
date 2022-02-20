function buf2hex(buffer) {
  let v = new Uint8Array(buffer);
  let m = v.map(x => x.toString(16).padStart(2, '0'));
  return m.join('');
}

const b = (new Uint8Array([4, 8, 12, 16])).buffer;
print(b);
print(buf2hex(b));

// should return 04080c10, instead returns 48010
