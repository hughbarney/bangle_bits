const Yoff = 40;
var pal2color = new Uint16Array([0x0000,0xffff,0x07ff,0xC618],0,2);
var buf = Graphics.createArrayBuffer(240,60,2,{msb:true});
var candraw = true;

function flip(b,x,y) {
 g.drawImage({width:240,height:60,bpp:2,buffer:b.buffer, palette:pal2color},x,y);
 b.clear();
}

var wp_bearing = 0;
var wpindex=0;
var loc = require("locale");

function drawCompass(course) {
  if (!candraw) return;
  var img = E.toArrayBuffer(atob("QECBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/+AAAAAAAD///AAAAAAB/wD/gAAAAAfwAA/gAAAAD4AAAfAAAAA+AAAAfAAAAHgAAAAeAAAA8AAAAA8AAAHgAAAAB4AAA8AAAAADwAAHgAAAAAHgAA8AAAAAAPAADgAAAAAAcAAcAAAAAAA4ADgAABgAABwAOAAAPAAAHABwAAB+AAAOAHAAAP8AAA4AYAAB/4AABgDgAAP/wAAHAOAAB//gAAcAwAAP//AAAwHAAA//8AADgcAAABgAAAOBwAAAGAAAA4GAAAAYAAABgYAAABgAAAGBgAAAGAAAAYGAAAAYAAABgYAAABgAAAGBgAAAGAAAAYGAAAAYAAABgYAAABgAAAGBwAAAGAAAA4HAAAAYAAADgcAAABgAAAOAwAAAGAAAAwDgAAAYAAAHAOAAABgAAAcAYAAAGAAABgBwAAAYAAAOAHAAABgAAA4AOAAAGAAAHAA4AAAYAAAcABwAABgAADgADgAAGAAAcAAPAAAAAADwAAeAAAAAAeAAA8AAAAADwAAB4AAAAAeAAADwAAAADwAAAHgAAAAeAAAAPgAAAHwAAAAPgAAB8AAAAAfwAA/gAAAAAf8A/4AAAAAAP//8AAAAAAAH/+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"));

  buf.setColor(1);
  buf.drawImage(img, 120, 30, {scale:1, rotate: radians(course)} );  
  flip(buf, 0, 30);
}


//displayed heading
/*
var heading = 0;
function newHeading(m,h){ 
    var s = Math.abs(m - h);
    var delta = (m>h)?1:-1;
    if (s>=180){s=360-s; delta = -delta;} 
    if (s<2) return h;
    var hd = h + delta*(1 + Math.round(s/5));
    if (hd<0) hd+=360;
    if (hd>360)hd-= 360;
    return hd;
}
*/

//var course =0;
var speed = 0;
var satellites = 0;
var wp;
var dist=0;

function radians(a) {
  return a*Math.PI/180;
}

function degrees(a) {
  var d = a*180/Math.PI;
  return (d+360)%360;
}

function bearing(a,b){
  var delta = radians(b.lon-a.lon);
  var alat = radians(a.lat);
  var blat = radians(b.lat);
  var y = Math.sin(delta) * Math.cos(blat);
  var x = Math.cos(alat)*Math.sin(blat) -
        Math.sin(alat)*Math.cos(blat)*Math.cos(delta);
  return Math.round(degrees(Math.atan2(y, x)));
}

function distance(a,b){
  var x = radians(a.lon-b.lon) * Math.cos(radians((a.lat+b.lat)/2));
  var y = radians(b.lat-a.lat);
  return Math.round(Math.sqrt(x*x + y*y) * 6371000);
}

var selected = false;

function drawN(){
  //var txt = loc.speed(speed);
  //buf.setColor(1);
  //buf.setFont("6x8",2);
  //buf.drawString("o",100,0);
  //buf.setFont("6x8",1);
  //buf.drawString(txt.substring(txt.length-3),220,40);
  //buf.setFont("Vector",48);
  //var cs = course.toString();
  //cs = course<10?"00"+cs : course<100 ?"0"+cs : cs;
  //buf.drawString(cs,10,0);
  //buf.drawString(txt.substring(0,txt.length-3),140,4);
  //flip(buf,Yoff+70);
  buf.setColor(1);
  buf.setFont("Vector",24);
  var bs = wp_bearing.toString();
  bs = wp_bearing<10?"00"+bs : wp_bearing<100 ?"0"+bs : bs;
  buf.setColor(3);
  buf.drawString("Brg: ",0,0);
  buf.drawString("Dist: ",0,30);
  buf.setColor(selected?1:2);
  buf.drawString(wp.name,140,0);
  buf.setColor(1);
  buf.drawString(wp_bearing,60,0);
  buf.drawString(loc.distance(dist),60,30);
  flip(buf,0, Yoff+130);
  //g.setFont("6x8",1);
  //g.setColor(0,0,0);
  //g.fillRect(10,230,60,239);
  //g.setColor(1,1,1);
  //g.drawString("Sats " + satellites.toString(),10,230);     
}

var savedfix;

function onGPS(fix) {
  savedfix = fix;
  if (fix!==undefined){
    //course = isNaN(fix.course) ? course : Math.round(fix.course);
    //speed  = isNaN(fix.speed) ? speed : fix.speed;
    satellites = fix.satellites;
    console.log("satellites=" + satellites);
  }
  
  if (candraw) {
    if (fix!==undefined && fix.fix==1){
      dist = distance(fix,wp);
      if (isNaN(dist)) dist = 0;
      wp_bearing = bearing(fix,wp);
      if (isNaN(wp_bearing)) wp_bearing = 0;
    }
    //drawN();
    drawAll();
  }
}

var intervalRef;

function stopdraw() {
  candraw=false;
  //if(intervalRef) {clearInterval(intervalRef);}
}

/*
function startTimers() {
  candraw=true;
  intervalRefSec = setInterval(function() {
    heading = newHeading(course,heading);
    if (course!=heading) drawCompass(heading);
  },200);
}
*/

function drawAll(){
  //g.setColor(1,0.5,0.5);
  //g.fillPoly([120,Yoff+50,110,Yoff+70,130,Yoff+70]);
  g.setColor(1,1,1);
  drawN();
  drawCompass(wp_bearing);
  //drawCompass(heading);
}

function startdraw(){
  g.clear();
  Bangle.drawWidgets();
  //startTimers();
  candraw=true;
  drawAll();
}

function setButtons(){
  setWatch(nextwp.bind(null,-1), BTN1, {repeat:true,edge:"falling"});
  setWatch(doselect, BTN2, {repeat:true,edge:"falling"});
  setWatch(nextwp.bind(null,1), BTN3, {repeat:true,edge:"falling"});
}

var SCREENACCESS = {
      withApp:true,
      request:function(){
        this.withApp=false;
        stopdraw();
        clearWatch();
      },
      release:function(){
        this.withApp=true;
        startdraw(); 
        setButtons();
      }
} 
 
Bangle.on('lcdPower',function(on) {
  if (!SCREENACCESS.withApp) return;
  if (on) {
    startdraw();
  } else {
    stopdraw();
  }
});

var waypoints = require("Storage").readJSON("waypoints.json")||[{name:"NONE"}];
wp=waypoints[0];

function nextwp(inc){
  if (!selected) return;
  wpindex+=inc;
  if (wpindex>=waypoints.length) wpindex=0;
  if (wpindex<0) wpindex = waypoints.length-1;
  wp = waypoints[wpindex];
  drawN();
}

function doselect(){
  if (selected && wpindex!=0 && waypoints[wpindex].lat===undefined && savedfix.fix) {
     waypoints[wpindex] ={name:"@"+wp.name, lat:savedfix.lat, lon:savedfix.lon};
     wp = waypoints[wpindex];
     require("Storage").writeJSON("waypoints.json", waypoints);
  }
  selected=!selected;
  drawN();
}

g.clear();
Bangle.setLCDBrightness(1);
Bangle.loadWidgets();
Bangle.drawWidgets();
// load widgets can turn off GPS
Bangle.setGPSPower(1);
drawAll();
//startTimers();
Bangle.on('GPS', onGPS);
// Toggle selected
setButtons();
