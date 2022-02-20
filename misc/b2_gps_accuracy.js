
let last_fix = {
  fix: 0,
  alt: 0,
  lat: 0,
  lon: 0,
  speed: 0,
  time: 0,
  satellites: 0
};

function radians(a) {
  return a*Math.PI/180;
}

function degrees(a) {
  var d = a*180/Math.PI;
  return (d+360)%360;
}

function distance(a,b){
  var x = radians(a.lon-b.lon) * Math.cos(radians((a.lat+b.lat)/2));
  var y = radians(b.lat-a.lat);
  return Math.round(Math.sqrt(x*x + y*y) * 6371000);
}

var total_dist = 0;
var max_dist = 0;
var avg_dist = 0;
var fix_cnt = 1;

function onGPS(fix) {
  if (fix.fix) {
    if (fix_cnt < 2) {
      last_fix = fix;
      fix_cnt++;
      return;
    }
    
    fix_cnt++;
    console.log("\n");
    console.log(fix);
    var dist = distance(last_fix, fix);

    last_fix = fix;

    console.log("distance: " + dist);
    if (dist > max_dist) max_dist = dist;
    total_dist = total_dist + dist
    avg_dist = total_dist / fix_cnt;
    console.log("avg=" + avg_dist + " max_dist " + max_dist);

  } else {
    console.log("Sats: " + fix.satellites);
  }

}

Bangle.setGPSPower(1);
Bangle.on('GPS',onGPS);
