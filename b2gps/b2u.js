
const a = new Uint8Array([0,1,0,15]);
print(a.buffer);

const b = new Uint32Array(a.buffer);
print(b.buffer);

print(a[0]);
print(b[0]);

print(b[0].toString(16));

