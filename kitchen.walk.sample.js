(() => {
  function getFace(){
    var buf1;
    // desclare variables

    function init() {
      buf1 = Graphics.createArrayBuffer(160,160,1, {msb:true});
      // etc
    }

    function freeResources() {
      buf1 = undefined;
      // etc
    }

    // other functions as required
    return {init:init, freeResources:freeResources, startTimer:startTimer, stopTimer:stopTimer,
            onButtonShort:onButtonShort, onButtonLong:onButtonLong};
  }
  return getFace;
})();


// then in the multiclock code I do
function stopdraw() {
  face.stopTimer();
  face.freeResources();
}

function startdraw() {
  Bangle.drawWidgets();
  face.init();
  face.startTimer();
}

function setButtons(){

  function nextFace(){
    iface += 1
    iface = iface % FACES.length;
    stopdraw();
    face = FACES[iface]();
    g.clear();
    g.reset();
    startdraw();
  }
/////
