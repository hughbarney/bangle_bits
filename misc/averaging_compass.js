var compass_count = 0;
var buf_size = 16;
var head_xbuf = [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0];
var head_ybuf = [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0];
var head_xavg;
var head_yabg;

var tg = Graphics.createArrayBuffer(120,20,1,{msb:true});
var timg = {
  width:tg.getWidth(),
  height:tg.getHeight(),
  bpp:1,
  buffer:tg.buffer
};

var ag = Graphics.createArrayBuffer(160,160,2,{msb:true});
var aimg = {
  width:ag.getWidth(),
  height:ag.getHeight(),
  bpp:2,
  buffer:ag.buffer,
  palette:new Uint16Array([0,0x03FF,0xF800,0x001F])
};

ag.setColor(1);
ag.fillCircle(80,80,79,79);
ag.setColor(0);
ag.fillCircle(80,80,69,69);

function deg_to_rad(d) {
  return (d*Math.PI) / 180;
}

function rad_to_deg(r) {
  return (r*180) / Math.PI;
}

// get average in buffer b
function average(b) {
  var i;
  var tot = 0;
  
  for (i=0; i < buf_size; i++) {
    tot = tot +  b[i];
  }  
  return tot / buf_size;
}

function arrow(r,c) {
  r=r*Math.PI/180;
  var p = Math.PI/2;
  ag.setColor(c);
  ag.fillPoly([
    80+60*Math.sin(r), 80-60*Math.cos(r),
    80+10*Math.sin(r+p), 80-10*Math.cos(r+p),
    80+10*Math.sin(r-p), 80-10*Math.cos(r-p),
  ]);
}

var oldHeading = 0;
Bangle.on('mag', function(m) {
  if (!Bangle.isLCDOn()) return;
  var heading = 0;
  tg.clear();
  tg.setFont("6x8",1);
  tg.setColor(1);
  if (isNaN(m.heading)) {
    tg.setFontAlign(0,-1);
    tg.setFont("6x8",1);
    tg.drawString("Uncalibrated",60,4);
    tg.drawString("turn 360° around",60,12);
  } else {
    // dampen the reading
    // https://kingtidesailing.blogspot.com/2016/02/how-to-dampen-heading-course-and-speeds.html
    head_xbuf[compass_count % buf_size] = Math.cos(deg_to_rad(m.heading));
    head_ybuf[compass_count % buf_size] = Math.sin(deg_to_rad(m.heading));
    head_xavg = average(head_xbuf);
    head_yavg = average(head_ybuf);
    compass_count++;
    
    heading = Math.atan2(head_yavg, head_xavg);  
    heading = Math.round(rad_to_deg(heading));
    /*
     * atan2 returns in range -PI to +PI
     * between 0-180 will get 0-180
     * then get -170 for 190d, -160 fo 200d etc
     */
    if (heading < 0) heading += 360; 
    
    tg.setFontAlign(0,0);
    tg.setFont("6x8",2);
    tg.drawString(heading, 60, 12);
  }
  
  g.drawImage(timg,0,0,{scale:2});
  ag.setColor(0);
  arrow(oldHeading,0);
  arrow(oldHeading+180,0);
  
  arrow(heading, 2);
  arrow(heading + 180, 3);
  g.drawImage(aimg,40,50);
  oldHeading = heading;
});
Bangle.setCompassPower(1);
