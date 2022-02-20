// Nerdic binary watch
const RED="#FF0000",GREEN="#00FF00",BLUE="#0000FF",
      GRAY="#101010",WHITE="#FFFFFF",BLACK="#000000";

g.reset();
g.setTheme({bg:"#000000"});
g.setBgColor(0,0,0);
g.clear();

var SW=g.getWidth(), SH=g.getHeight();
var FS=0.2*SH;
g.setFont("Vector",FS);
var HW=g.stringWidth("00:00:00");

var BangleVer = (SW==240)?1:(SW==176)?2:0;

var hoursColor = (BangleVer==1)?RED: WHITE,
    minutesColor = (BangleVer==1)?GREEN: WHITE,
    secondsColor = (BangleVer==1)?BLUE: WHITE;

var hintDuration=-1, hintMaxduration=5;
var showSeconds = 2; // when to show second's row - 0:never, 1:when unlocked, 2:always

// LEDsz is LED diameter, distance between LEDs is 0.5 of LEDsz
var LEDsz=SW/8.5, // with this size LED row takes full width
    L=(SW - (6*LEDsz+2.5*LEDsz))/2, //Left
    T=(SH - (3*LEDsz+LEDsz))/2; //Top

function drawLED(row, col, status){
  var x1=L+col*LEDsz*1.5, y1=T+row*LEDsz*1.5,
      x2=x1+LEDsz, y2=y1+LEDsz;
  if(status){
    g.fillEllipse(x1,y1,x2,y2);
  }else{
    g.drawEllipse(x1,y1,x2,y2);
  }
}

var row2isClear = false;
function clearLEDrow(row){
  var y1=T+row*LEDsz*1.5, y2=y1+LEDsz,
      x1=L, x2=x1+5*LEDsz*1.5+LEDsz;
  g.clearRect(x1,y1,x2,y2);
  if(row==2) row2isClear=true;
}

function drawLEDrow(row, V){
  var y1=T+row*LEDsz*1.5, y2=y1+LEDsz,
      x1=L, x2=x1+5*LEDsz*1.5+LEDsz;
  switch(row){
    case 0: g.setColor(hoursColor); break;
    case 1: g.setColor(minutesColor); break;
    case 2: g.setColor(secondsColor); break;
  }
  g.clearRect(x1,y1,x2,y2);
  for(let i=0,m=32; i<6; i++,m>>=1) drawLED(row,i,V&m);
  if(row==2) row2isClear=false;
}

var _H=-1,_M=-1,_S=-1;
E.setTimeZone(-5);

function draw(D){
  H = D.getHours();
  if( _H != H ){ drawLEDrow(0,H); _H = H; }

  M = D.getMinutes();
  if( _M != M ){ drawLEDrow(1,M); _M = M; }

  if(showSeconds>1 || (showSeconds>0 && !Bangle.isLocked())){
    S = D.getSeconds();
    if( _S != S ){ drawLEDrow(2,S); _S = S; }
  }
  else
    if(!row2isClear)
      clearLEDrow(2);

  var x=(SW-HW)/2, y=T+4.5*LEDsz;
  if(hintDuration>0){
    g.setColor(g.theme.bg);
    g.fillRect(x-2,y-2,x+HW,y+FS);
    g.setColor(g.theme.fg);
    g.setFont("Vector",FS);
    g.drawString(D.toString().substr(16,8),x,y);
    hintDuration--;
  }else{
    if(hintDuration==0){
      //g.clearRect(x-2,y-2,x+HW,y+FS);
      g.setColor(g.theme.bg);
      g.fillRect(x-2,y-2,x+HW,y+FS);
      Bangle.drawWidgets();
      hintDuration--;
    }
  }

}

function onInterval(){
  D = new Date();
  if(showSeconds<2 && Bangle.isLocked()){ 
    if(D.getSeconds() == 0) draw(D); 
    else if(!row2isClear) clearLEDrow(2);
  }
  else draw(D);
}

var settings = Object.assign({
  hours_color:   (BangleVer==1)?GREEN:WHITE,
  minutes_color: (BangleVer==1)?GREEN:WHITE,
  seconds_color: (BangleVer==1)?GREEN:WHITE,
  hint_duration: 5,
  show_seconds: 2 // 0:never, 1:when unlocked, 2:always
}, require('Storage').readJSON("nerdic.json", true) || {});

hoursColor = settings.hours_color!==undefined ? settings.hours_color : hoursColor;
minutesColor = settings.minutes_color!==undefined ? settings.minutes_color : minutesColor;
secondsColor = settings.seconds_color!==undefined ? settings.seconds_color : secondsColor;
hintMaxduration = settings.hint_duration!==undefined ? settings.hint_duration : 5;
showSeconds = settings.show_seconds!==undefined ? settings.show_seconds : 2; 

// ---------------- STARTUP ----------------- //
// Clear the screen once, at startup
g.clear();
// draw immediately at first
onInterval();


var secondInterval = setInterval(onInterval, 1000);
// Stop updates when LCD is off, restart when on
Bangle.on('lcdPower',on=>{
  if (on) {
    if(secondInterval === undefined)
      secondInterval = setInterval(onInterval, 1000);
    onInterval(); // draw immediately
  }else{
    if (secondInterval) clearInterval(secondInterval);
    secondInterval = undefined;
  }
});

/*
Bangle.on('tap', function(data) {
  if(data.double)
    hintDuration = hintMaxduration;
});
*/

Bangle.on('touch', function(button, xy) {
  print("touch");
  hintDuration = hintMaxduration;
});

//g.setColor("#FFF").drawLine(0,SH-24,SW,SH-24)

// Show launcher when middle button pressed
Bangle.setUI("clock");
// Load widgets
Bangle.loadWidgets();
Bangle.drawWidgets();
