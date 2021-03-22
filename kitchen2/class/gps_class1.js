

let GPS = class {

  constructor() {
    this.GPS_OFF = 0;
    this.GPS_TIME = 1;
    this.GPS_SATS = 2;
    this.GPS_RUNNING = 3;
    this.gpsState = GPS_OFF;
    this.gpsPowerState = false;
    this.last_fix = {};
    this.listenerCount = 0;
  }
  
  log_debug(o) {
    //console.log(o);
  }
  
  determineGPSState() {
    log_debug("gps determine state");
    gpsPowerState = Bangle.isGPSOn();
    
    log_debug("last_fix.fix " + last_fix.fix);
    log_debug("gpsPowerState " + gpsPowerState);
    log_debug("last_fix.satellites " + last_fix.satellites);
    
    if (!gpsPowerState) {
      gpsState = GPS_OFF;
      resetLastFix();
    } else if (last_fix.fix && gpsPowerState && last_fix.satellites > 0) {
      gpsState = GPS_RUNNING;
    } else {
      gpsState = GPS_SATS;
    }
    
    log_debug("gpsState=" + gpsState);
    
    if (gpsState !== GPS_OFF) {
      if (listenerCount === 0) {
        Bangle.on('GPS', processFix);
        listenerCount++;
        log_debug("listener added " + listenerCount);
      }
    } else {
      if (listenerCount > 0) {
        Bangle.removeListener("GPS", processFix);
        listenerCount--;
        log_debug("listener removed " + listenerCount);
      }
    }
  }
  
  getGPSTime() {  
    var time;
    
    if (last_fix !== undefined && last_fix.time !== undefined && last_fix.time.toUTCString !== undefined &&
        (gpsState == GPS_SATS || gpsState == GPS_RUNNING)) {
      time = last_fix.time.toUTCString().split(" ");
      return time[4];
    } else {
      var d = new Date();
      var da = d.toString().split(" ");
      time = da[4].substr(0,5);
      return time;
    }
  }

  toggleGPSPower() {
    gpsPowerState = Bangle.isGPSOn();
    gpsPowerState = !gpsPowerState;
    Bangle.setGPSPower(gpsPowerState ? 1 : 0);
    
    resetLastFix();
    determineGPSState();

    // poke the gps widget indicator to change
    if (WIDGETS.gps !== undefined) {
      WIDGETS.gps.draw();
    }
  }

  resetLastFix() {
    last_fix = {
      fix: 0,
      alt: 0,
      lat: 0,
      lon: 0,
      speed: 0,
      time: 0,
      satellites: 0
    };
  }

  processFix(fix) {
    last_fix.time = fix.time;
    
    log_debug("processFix()");
    log_debug(fix);
    
    if (gpsState == GPS_TIME) {
      gpsState = GPS_SATS;
    }
    
    if (fix.fix) {
      gpsState = GPS_RUNNING;
      if (!last_fix.fix) Bangle.buzz(); // buzz on first position
      last_fix = fix;
    }
  }

  formatTime(now) {
    var fd = now.toUTCString().split(" ");
    return fd[4];
  }

  timeSince(t) {
    var hms = t.split(":");
    var now = new Date();
    
    var sn = 3600*(now.getHours()) + 60*(now.getMinutes()) + 1*(now.getSeconds());
    var st = 3600*(hms[0]) + 60*(hms[1]) + 1*(hms[2]);
    
    return (sn - st);
  }
  
  getOsRef() {
    let os = OsGridRef.latLongToOsGrid(last_fix);
    let ref = to_map_ref(6, os.easting, os.northing);
    return ref;
  }

};


