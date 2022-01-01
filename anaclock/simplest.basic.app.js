g.clear();
Bangle.loadWidgets();
Bangle.drawWidgets();

const drawSecondHand = false;
const fontSize = 30;
const UPDATE_PERIOD = (drawSecondHand ? 1000 : 60000);
var drawTimeout;

const w = g.getWidth();
const h = g.getHeight();
const cx = (w/2);
const cy = (h/2) + (Bangle.appRect.y/2); 
const outerRadius = (h - Bangle.appRect.y)/2;

console.log("simplest.app.js");
console.log("cx=" + cx);
console.log("cy=" + cy);
console.log("outerRadius=" + outerRadius);
console.log("y12=" + (cy - outerRadius));
console.log("y6=" + (cy + outerRadius));

const HourHandLength = outerRadius * 0.5;
const HourHandWidth  = 2*3, halfHourHandWidth = HourHandWidth/2;
const MinuteHandLength = outerRadius * 0.7;
const MinuteHandWidth  = 2*2, halfMinuteHandWidth = MinuteHandWidth/2;
const SecondHandLength = outerRadius * 0.9;
const SecondHandOffset = 6;

const twoPi  = 2*Math.PI;
const Pi     = Math.PI;
const halfPi = Math.PI/2;

let HourHandPolygon = [
  -halfHourHandWidth,halfHourHandWidth,
  -halfHourHandWidth,halfHourHandWidth-HourHandLength,
  halfHourHandWidth,halfHourHandWidth-HourHandLength,
  halfHourHandWidth,halfHourHandWidth,
];

let MinuteHandPolygon = [
  -halfMinuteHandWidth,halfMinuteHandWidth,
  -halfMinuteHandWidth,halfMinuteHandWidth-MinuteHandLength,
  halfMinuteHandWidth,halfMinuteHandWidth-MinuteHandLength,
  halfMinuteHandWidth,halfMinuteHandWidth,
];

let transformedPolygon = new Array(HourHandPolygon.length);

function transformPolygon (originalPolygon, OriginX,OriginY, Phi) {
  let sPhi = Math.sin(Phi), cPhi = Math.cos(Phi), x,y;

  for (let i = 0, l = originalPolygon.length; i < l; i+=2) {
    x = originalPolygon[i];
    y = originalPolygon[i+1];

    transformedPolygon[i]   = OriginX + x*cPhi + y*sPhi;
    transformedPolygon[i+1] = OriginY + x*sPhi - y*cPhi;
  }
}

function drawNumbers() {
  g.setColor(g.theme.fg);
  g.setFont('Vector', fontSize);
  //g.setFontLimelight();
  //g.setFontGochiHand();
  //g.setFontmarqueemoon();
  //g.setFontGrenadierNF();
  //g.setFontMonoton();
  
  g.setFontAlign(0,-1);
  g.drawString('12', cx, cy - outerRadius);

  g.setFontAlign(1,0);
  g.drawString('3', cx + outerRadius, cy);

  g.setFontAlign(0,1);
  g.drawString('6', cx, cy + outerRadius);

  g.setFontAlign(-1,0);
  g.drawString('9', cx - outerRadius,cy);
}


function drawHands () {
  let now = new Date();
  let Hours   = now.getHours() % 12;
  let Minutes = now.getMinutes();
  let Seconds = now.getSeconds();

  let HoursAngle   = (Hours+(Minutes/60))/12 * twoPi - Pi;
  let MinutesAngle = (Minutes/60)            * twoPi - Pi;
  let SecondsAngle = (Seconds/60)            * twoPi - Pi;

  g.setColor(g.theme.fg);
  transformPolygon(HourHandPolygon, cx,cy, HoursAngle);
  g.fillPoly(transformedPolygon);
  transformPolygon(MinuteHandPolygon, cx,cy, MinutesAngle);
  g.fillPoly(transformedPolygon);

  if (drawSecondHand) {
    let sPhi = Math.sin(SecondsAngle), cPhi = Math.cos(SecondsAngle);
    g.setColor('#FF0000');
    g.drawLine(
      cx + SecondHandOffset*sPhi,
      cy - SecondHandOffset*cPhi,
      cx - SecondHandLength*sPhi,
      cy + SecondHandLength*cPhi
    );
  }
}

function draw() {
  g.setColor(g.theme.bg);
  g.fillRect(Bangle.appRect);

  drawNumbers();
  drawHands();
  queueDraw();
}

// schedule a draw for the next minute
function queueDraw() {
  if (drawTimeout) clearTimeout(drawTimeout);
  drawTimeout = setTimeout(function() {
    drawTimeout = undefined;
    draw();
  }, UPDATE_PERIOD - (Date.now() % UPDATE_PERIOD));
}

// Stop updates when LCD is off, restart when on
Bangle.on('lcdPower',on=>{
  if (on) {
    draw(); // draw immediately, queue redraw
  } else { // stop draw timer
    if (drawTimeout) clearTimeout(drawTimeout);
    drawTimeout = undefined;
  }
});

Bangle.setUI('clock');
draw();
