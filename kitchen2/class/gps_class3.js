
function GPS() {
  this.GPS_OFF = 0;
  this.GPS_TIME = 1;
  this.GPS_SATS = 2;
  this.GPS_RUNNING = 3;
  this.gpsState = GPS_OFF;
  this.gpsPowerState = false;
  this.last_fix = {
    fix: 0,
    alt: 0,
    lat: 0,
    lon: 0,
    speed: 0,
    time: 0,
    satellites: 0
  };
  this.listenerCount = 0;
}

GPS.log_debug = function(o) {
  console.log(o);
};

GPS.determineGPSState = function() {
  this.log_debug("gps determine state");
  gpsPowerState = Bangle.isGPSOn();
  
  this.log_debug("last_fix.fix " + this.last_fix.fix);
  this.log_debug("gpsPowerState " + this.gpsPowerState);
  this.log_debug("last_fix.satellites " + this.last_fix.satellites);
  
  if (!gpsPowerState) {
    this.gpsState = GPS_OFF;
    this.resetLastFix();
  } else if (this.last_fix.fix && this.gpsPowerState && this.last_fix.satellites > 0) {
    this.gpsState = this.GPS_RUNNING;
  } else {
    this.gpsState = this.GPS_SATS;
  }
  
  this.log_debug("gpsState=" + this.gpsState);
  
  if (this.gpsState !== this.GPS_OFF) {
    if (this.listenerCount === 0) {
      Bangle.on('GPS', this.processFix);
      this.listenerCount++;
      this.log_debug("listener added " + this.listenerCount);
    }
  } else {
    if (this.listenerCount > 0) {
      Bangle.removeListener("GPS", this.processFix);
      listenerCount--;
      this.log_debug("listener removed " + this.listenerCount);
    }
  }
};

GPS.getGPSTime = function() {  
  var time;
  
  if (this.last_fix !== undefined && this.last_fix.time !== undefined && this.last_fix.time.toUTCString !== undefined &&
      (this.gpsState == this.GPS_SATS || this.gpsState == this.GPS_RUNNING)) {
    time = last_fix.time.toUTCString().split(" ");
    return time[4];
  } else {
    var d = new Date();
    var da = d.toString().split(" ");
    time = da[4].substr(0,5);
    return time;
  }
};

GPS.toggleGPSPower = function() {
  this.gpsPowerState = Bangle.isGPSOn();
  this.gpsPowerState = !this.gpsPowerState;
  Bangle.setGPSPower(this.gpsPowerState ? 1 : 0);
  
  this.resetLastFix();
  this.determineGPSState();

  // poke the gps widget indicator to change
  if (WIDGETS.gps !== undefined) {
    WIDGETS.gps.draw();
  }
};

GPS.resetLastFix = function() {
  this.last_fix = {
    fix: 0,
    alt: 0,
    lat: 0,
    lon: 0,
    speed: 0,
    time: 0,
    satellites: 0
  };
};

GPS.processFix = function(fix) {
  this.last_fix.time = fix.time;
  this.log_debug("processFix()");
  this.log_debug(fix);
  
  if (this.gpsState == this.GPS_TIME) {
    this.gpsState = this.GPS_SATS;
  }
  
  if (fix.fix) {
    this.gpsState = this.GPS_RUNNING;
    if (!this.last_fix.fix) Bangle.buzz(); // buzz on first position
    this.last_fix = fix;
  }
};

GPS.formatTime = function(now) {
  var fd = now.toUTCString().split(" ");
  return fd[4];
};

GPS.timeSince = function(t) {
  var hms = t.split(":");
  var now = new Date();
  
  var sn = 3600*(now.getHours()) + 60*(now.getMinutes()) + 1*(now.getSeconds());
  var st = 3600*(hms[0]) + 60*(hms[1]) + 1*(hms[2]);
  
  return (sn - st);
};

GPS.getOsRef = function() {
  let os = OsGridRef.latLongToOsGrid(this.last_fix);
  let ref = to_map_ref(6, os.easting, os.northing);
  return ref;
};
