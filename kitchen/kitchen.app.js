// read in the faces
var FACES = [];
var STOR = require("Storage");
STOR.list(/\.walk\.js$/).forEach(face=>FACES.push(eval(require("Storage").read(face))));
var iface = 0;
var face = FACES[iface]();
var firstPress
var pressTimer;

function stopdraw() {
  face.stopTimer();
}

function startdraw() {
  Bangle.drawWidgets();
  face.startTimer();
}

function nextFace(){
  iface += 1
  iface = iface % FACES.length;
  stopdraw();
  face.freeResources();
  face = FACES[iface]();
  g.clear();
  g.reset();
  face.init();
  startdraw();
}

// when you feel the buzzer you know you have done a long press
function longPressCheck() {
  Bangle.buzz();
  if (pressTimer) {
    clearInterval(pressTimer);
    pressTimer = undefined;
  }
}

// start a timer and buzz when held long enough
function buttonPressed(btn) {
  if (btn === 3) {
    nextFace();
  } else {
    firstPress = getTime();
    pressTimer = setInterval(longPressCheck, 1500);
  }
}

// if you release too soon there is no buzz as timer is cleared
function buttonReleased(btn) {
  var dur = getTime() - firstPress;
  if (pressTimer) {
    clearInterval(pressTimer);
    pressTimer = undefined;
  }
    
  if ( dur >= 1.5 ) {
    switch(btn) {
    case 1:
      face.onButtonLong(btn);
      break;
    case 2:
      Bangle.showLauncher();
      break;
    case 3:
      // do nothing
      break;
    }
    return;
  }

  if (btn !== 3) face.onButtonShort(btn);
}
  
function setButtons(){
  setWatch(buttonPressed.bind(null,1), BTN1, {repeat:true,edge:"rising"});
  setWatch(buttonPressed.bind(null,2), BTN2, {repeat:true,edge:"rising"});
  setWatch(nextFace, BTN3, {repeat:true,edge:"rising"});

  setWatch(buttonReleased.bind(null,1), BTN1, {repeat:true,edge:"falling"});
  setWatch(buttonReleased.bind(null,2), BTN2, {repeat:true,edge:"falling"});
  // BTN 3 long press should always reset the bangle
}

Bangle.on('kill',()=>{
  Bangle.setCompassPower(0);
  Bangle.setGPSPower(0);
});

Bangle.on('lcdPower',function(on) {
  if (on) {
    startdraw();
  } else {
    stopdraw();
  }
});

g.clear();
Bangle.loadWidgets();
face.init();
startdraw();
setButtons();
