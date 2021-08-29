

let coordScale=0.574472224867884;
let coords = Int32Array([-177381,7349711,-177255,7349705,-177262,7349655,-177458,7349669,-177451,7349718,-177404,7349714]);

let min={"x":-177458,"y":7349655};
let max={"x":-177255,"y":7349718};

var gcoords = new Uint8Array(coords.length);
var coordDistance = new Uint16Array(coords.length/2);
var PT_DISTANCE = 30; // distance to a point before we consider it complete


function log_debug(o) { console.log(o); }

function toScr(p) {
  return {
    x : 10 + (p.x-min.x)*100/(max.x-min.x),
    y : 230 - (p.y-min.y)*100/(max.y-min.y)
  };
}


var last;
var totalDistance = 0;
for (var i=0;i<coords.length;i+=2) {
  var c = {x:coords[i],y:coords[i+1]};
  var s = toScr(c);
  gcoords[i  ] = s.x;
  gcoords[i+1] = s.y;
  if (last) {
    var dx = c.x-last.x;
    var dy = c.y-last.y;
    totalDistance += Math.sqrt(dx*dx+dy*dy)*coordScale;
    coordDistance[i/2] = totalDistance;
  }
  last = c;
}

var fix, lastFix;
var nextPtIdx = 0; // 2x the number of points
var nextPt = {x:coords[nextPtIdx], y:coords[nextPtIdx+1]};
var nextAngle = 0;
var nextDist = 0;
var currentDist = 0;

function drawMap() {
  g.clearRect(0,0,239,120);

  // draw the distance to next point
  g.setFontAlign(0,0);
  //.setColor(1,0,0);
  g.setColor(0,255,0);
  g.setFontVector(40);
  g.drawString((currentDist===undefined)?"?":(Math.round(currentDist)+"m"), 160, 30);

  // draw total distance of route
  g.setColor(1,1,1);
  g.setFont("6x8",3);
  g.drawString(Math.round(totalDistance)+"m", 160, 70);
  g.drawString((nextPtIdx/2)+"/"+coordDistance.length, 50, 20);

  // gps stats
  if (!fix.fix) {
    g.setColor(0,255,0);
    g.drawString("No GPS", 50, 50);
    //g.setFont("6x8",1);
    g.drawString(fix.satellites+" Sats", 50, 70);
  }

  // undraw last position ?
  if (lastFix && lastFix.fix) {
    g.setColor(0,0,0);
    //g.drawCircle(lastFix.s.x, lastFix.s.y, 10);
    g.drawCircle(lastFix.s.x, lastFix.s.y, 30);
  }

  // draw the route
  var thick = 3;
  for (var i=0;i<gcoords.length;i+=2) {
    g.setColor((i<=nextPtIdx) ? 63488 : 46486); // red/grey
    //g.fillRect(gcoords[i]-2, gcoords[i+1]-2, gcoords[i]+2, gcoords[i+1]+2);
    g.fillRect(gcoords[i]-thick, gcoords[i+1]-thick, gcoords[i]+thick, gcoords[i+1]+thick);
  }

  g.setColor(1,0,0); // first part of path
  g.drawPoly(new Uint8Array(gcoords.buffer, 0, nextPtIdx+2));
  g.setColor(1,1,1); // remaining part of path
  g.drawPoly(new Uint8Array(gcoords.buffer, nextPtIdx));

  // draw where we are ?
  if (fix && fix.fix) {
    //g.setColor(1,0,0);
    g.setColor(0x3ef); // DarkCyan
    //g.drawCircle(fix.s.x,fix.s.y,10);
    g.drawCircle(fix.s.x,fix.s.y, 30);
  }
  lastFix = fix;
}

function getNextPtInfo() {
  var dx = nextPt.x - fix.p.x;
  var dy = nextPt.y - fix.p.y;
  nextAngle = Math.atan2(dx,dy)*180/Math.PI;
  nextDist = Math.sqrt(dx*dx+dy*dy)*coordScale;
}

function onGPS(f) {
  fix = f;
  fix.p = Bangle.project(fix);
  fix.s = toScr(fix.p);
  getNextPtInfo();

  if ((nextDist < PT_DISTANCE) &&
      (nextPtIdx < coords.length)) {
    nextPtIdx+=2;
    nextPt = {x:coords[nextPtIdx], y:coords[nextPtIdx+1]};
    getNextPtInfo();
  }

  // work out how far we are (based on distance to next point)
  if (!fix.fix) {
    currentDist = undefined
  } else if (nextPtIdx+2 < coordDistance.length) {
    currentDist = coordDistance[1+(nextPtIdx/2)] - nextDist;
  } else if (nextPtIdx+2 == coordDistance.length) {
    currentDist = totalDistance - nextDist;
  } else {
    currentDist = totalDistance;
  }
  if (!Bangle.isLCDOn()) return;
  drawMap();
}

function arrow(r,c) {
  r=r*Math.PI/180;
  var p = Math.PI*3/4;
  g.setColor(c);
  g.fillPoly([
    180+40*Math.sin(r), 180-40*Math.cos(r),
    180+20*Math.sin(r+p), 180-20*Math.cos(r+p),
    180-10*Math.sin(r), 180+10*Math.cos(r),
    180+20*Math.sin(r+-p), 180-20*Math.cos(r-p),
    ]);
}

function onCompass(m) {
  if (!Bangle.isLCDOn()) return;
  arrow(oldHeading,0);
  var heading = m.heading + nextAngle;
  arrow(heading,0xF800);
  oldHeading = heading;
}

// draw the heading
var oldHeading = 0;
Bangle.on('GPS', onGPS);
Bangle.on('mag', onCompass);
Bangle.setGPSPower(1);
Bangle.setCompassPower(1);
g.clear();
