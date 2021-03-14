(() => {

  function getFace(){
    var pal_by;
    var pal_bw;
    var pal_bb;
    var buf1;
    var buf2;
    var arrow_img;
    var intervalRefSec;
    var CALIBDATA;
    var waypoints;
    var wp;
    var wp_bearing;
    var direction;
    var wpindex;
    var loc;
    var speed;
    var satellites;
    var wp;
    var dist;
    var previous;

    function init() {
      pal_by = new Uint16Array([0x0000,0xFFC0],0,1); // black, yellow
      pal_bw = new Uint16Array([0x0000,0xffff],0,1);  // black, white
      pal_bb = new Uint16Array([0x0000,0x07ff],0,1); // black, blue

      // having 3 2 color pallette keeps the memory requirement lower
      buf1 = Graphics.createArrayBuffer(160,160,1, {msb:true});
      buf2 = Graphics.createArrayBuffer(80,40,1, {msb:true});
      arrow_img = require("heatshrink").decompress(atob("lEowIPMjAEDngEDvwED/4DCgP/wAEBgf/4AEBg//8AEBh//+AEBj///AEBn///gEBv///wmCAAImCAAIoBFggE/AkaaEABo="));

      intervalRefSec;
      CALIBDATA = require("Storage").readJSON("magnav.json",1)||null;
      waypoints = require("Storage").readJSON("waypoints.json")||[{name:"NONE"}];
      wp=waypoints[0];

      //candraw = true;
      wp_bearing = 0;
      direction = 0;
      wpindex=0;
      wp = waypoints[0];
      loc = require("locale");
      speed = 0;
      satellites = 0;
      dist=0;
    
      previous = {
        bs: '',
        dst: '',
        wp_name: '',
        course: 0
        //selected: false,
      };
      
      if (!Bangle.isCompassOn())
        Bangle.setCompassPower(1);
    }
    
    function freeResources() {
      pal_by = undefined;
      pal_bw = undefined;
      pal_bb = undefined;
      buf1 = undefined;
      buf2 = undefined;
      arrow_img = undefined;
      intervalRefSec = undefined;
      CALIBDATA = [];
      waypoints = [];
      wp = undefined;
      wp_bearing = undefined;
      direction = undefined;
      wpindex = undefined;
      loc = undefined;
      speed = undefined;
      satellites = undefined;
      wp = undefined;
      dist = undefined;
      previous = undefined;

      Bangle.removeListener('GPS', onWaypointerGPS);
      Bangle.setCompassPower(0);
    }
    
    function startTimer() {
      clear_previous();
      draw();
      intervalRefSec = setInterval(read_compass, 300);
    }

    function stopTimer() {
      previous.course = -1;
      if(intervalRefSec) {intervalRefSec=clearInterval(intervalRefSec);}
    }

    function flip1(x,y) {
      g.drawImage({width:160,height:160,bpp:1,buffer:buf1.buffer, palette:pal_by},x,y);
      buf1.clear();
    }

    function flip2_bw(x,y) {
      g.drawImage({width:80,height:40,bpp:1,buffer:buf2.buffer, palette:pal_bw},x,y);
      buf2.clear();
    }

    function flip2_bb(x,y) {
      g.drawImage({width:80,height:40,bpp:1,buffer:buf2.buffer, palette:pal_bb},x,y);
      buf2.clear();
    }

    function onButtonShort(btn) {
      switch(btn) {
      case 1:
        nextwp(-1); // prev wp
        break;
      case 2:
        nextwp(1);  // next wp
        break;
      }
    }

    function onButtonLong(btn) {
      if (btn === 1) {
        if (Bangle.isGPSOn() === false) {
          Bangle.setGPSPower(1);
          Bangle.on('GPS', onWaypointerGPS);
        } else {
          Bangle.removeListener('GPS', onWaypointerGPS);
          Bangle.setGPSPower(0);
        }
      }
    }
    
    // clear the attributes that control the display refresh
    function clear_previous() {
      previous.bs = '-';
      previous.dst = '-';
      previous.wp_name = '-';
      previous.course = -999;
    }

    //var c = 0;
    function drawCompass(course) {
      //if (c++ % 3 === 0) console.log("compass:draw");
      if (previous === undefined) return;
      if (Math.abs(previous.course - course) < 9) return; // reduce number of draws due to compass jitter
      previous.course = course;
  
      buf1.setColor(1);
      buf1.fillCircle(80,80,79,79);
      buf1.setColor(0);
      buf1.fillCircle(80,80,69,69);
      buf1.setColor(1);
      buf1.drawImage(arrow_img, 80, 80, {scale:3,  rotate:radians(course)} );
      flip1(40, 30);
    }

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

    function tiltfixread(O,S){
      var start = Date.now();
      var m = Bangle.getCompass();
      var g = Bangle.getAccel();
      m.dx =(m.x-O.x)*S.x; m.dy=(m.y-O.y)*S.y; m.dz=(m.z-O.z)*S.z;
      var d = Math.atan2(-m.dx,m.dy)*180/Math.PI;
      if (d<0) d+=360;
      var phi = Math.atan(-g.x/-g.z);
      var cosphi = Math.cos(phi), sinphi = Math.sin(phi);
      var theta = Math.atan(-g.y/(-g.x*sinphi-g.z*cosphi));
      var costheta = Math.cos(theta), sintheta = Math.sin(theta);
      var xh = m.dy*costheta + m.dx*sinphi*sintheta + m.dz*cosphi*sintheta;
      var yh = m.dz*sinphi - m.dx*cosphi;
      var psi = Math.atan2(yh,xh)*180/Math.PI;
      if (psi<0) psi+=360;
      return psi;
    }

    // Note actual mag is 360-m, error in firmware
    function read_compass() {
      var d = tiltfixread(CALIBDATA.offset,CALIBDATA.scale);
      heading = newHeading(d,heading);
      direction = wp_bearing - heading;
      if (direction < 0) direction += 360;
      if (direction > 360) direction -= 360;
      drawCompass(direction);
    }

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

    function drawN(){
      buf2.setFont("Vector",24);
      var bs = wp_bearing.toString();
      bs = wp_bearing<10?"00"+bs : wp_bearing<100 ?"0"+bs : bs;
      var dst = loc.distance(dist);
      
      // -1=left (default), 0=center, 1=right
      
      // show distance on the left
      if (previous.dst !== dst) {
        previous.dst = dst
        buf2.setColor(1);
        buf2.setFontAlign(-1,-1);
        buf2.setFont("Vector", 20);
        buf2.drawString(dst,0,0);
        flip2_bw(0, 200);
      }
      
      // bearing, place in middle at bottom of compass
      if (previous.bs !== bs) {
        previous.bs = bs;
        buf2.setColor(1);
        buf2.setFontAlign(0, -1);
        buf2.setFont("Vector",38);
        buf2.drawString(bs,40,0);
        flip2_bw(80, 200);
      }

      // waypoint name on right
      if (previous.wp_name !== wp.name) {
        //previous.selected = selected;
        buf2.setColor(1);
        buf2.setFontAlign(1,-1);     // right, bottom
        buf2.setFont("Vector", 20);
        buf2.drawString(wp.name, 80, 0);
        flip2_bw(160, 200);
      }
    }

    var savedfix;

    function onWaypointerGPS(fix) {
      savedfix = fix;
      if (fix!==undefined){
        satellites = fix.satellites;
      }
      
      if (fix!==undefined && fix.fix==1){
        dist = distance(fix,wp);
        if (isNaN(dist)) dist = 0;
        wp_bearing = bearing(fix,wp);
        if (isNaN(wp_bearing)) wp_bearing = 0;
        if (buf2 !== undefined) drawN();
      }
    }

    function draw(){
      g.setColor(1,1,1);
      drawN();
      drawCompass(direction);
    }

    function nextwp(inc){
      //if (!selected) return;
      wpindex+=inc;
      if (wpindex>=waypoints.length) wpindex=0;
      if (wpindex<0) wpindex = waypoints.length-1;
      wp = waypoints[wpindex];
      drawN();
    }

    /*
    function doselect(){
      if (selected && wpindex!=0 && waypoints[wpindex].lat===undefined && savedfix.fix) {
        waypoints[wpindex] ={name:"@"+wp.name, lat:savedfix.lat, lon:savedfix.lon};
        wp = waypoints[wpindex];
        require("Storage").writeJSON("waypoints.json", waypoints);
      }
      selected=!selected;
      drawN();
    }
    */

    return {init:init, freeResources:freeResources, startTimer:startTimer, stopTimer:stopTimer,
            onButtonShort:onButtonShort, onButtonLong:onButtonLong};
  }

  return getFace;

})();
