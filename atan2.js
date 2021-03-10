var d;

for (d=0; d<361; d += 10) {
  var x = Math.cos(d*Math.PI/180);
  var y = Math.sin(d*Math.PI/180);
  var at = Math.atan2(y,x);
  var d2 = at*180 / Math.PI;
  console.log("d=" + d + " d2=" + d2);
}

