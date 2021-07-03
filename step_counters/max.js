const a = new Uint8Array([10, 60, 5, 90, 110, 3, 45, 1, 24, 54, 29]);

function max(o) {
  var m = -Infinity;

  for(var i=0; i< a.length; i++)
    if(a[i] > m) m = a[i];
  return m;
}

function min(o) {
  var m = Infinity;

  for(var i=0; i< a.length; i++)
    if(a[i] < m) m = a[i];
  return m;
}


console.log(max(a));
console.log(min(a));

