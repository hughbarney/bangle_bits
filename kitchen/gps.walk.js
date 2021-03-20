(() => {
  function getFace(){
    var intervalRefSec;

    const GPS_OFF = "gps_off";
    const GPS_TIME = "gps_time";
    const GPS_SATS = "gps_sats";
    const GPS_RUNNING = "gps_running";

    const GDISP_OS = "g_osref";
    const GDISP_LATLN = "g_latln";
    const GDISP_SPEED = "g_speed";
    const GDISP_ALT = "g_alt";
    const GDISP_COURSE = "g_course";

    const Y_TIME = 30;
    const Y_ACTIVITY = 120;
    const Y_MODELINE = 200;

    let gpsState = GPS_OFF;
    let gpsPowerState = false;
    let gpsDisplay = GDISP_OS;
    let clearActivityArea = true;
    let last_fix;
    let listenerCount;

    function log_debug(o) {
      //console.log(o);
    }

    function init() {
      log_debug("gps init");
      gpsPowerState = Bangle.isGPSOn();
      gpsDisplay = GDISP_OS;
      clearActivityArea = true;
      resetLastFix();
      listenerCount = 0;
      determineGPSState();
    }

    function freeResources() {
      if (Bangle.isGPSOn()) {
        if (listenerCount > 0) {
          Bangle.removeListener("GPS", processFix);
          listenerCount--;
          log_debug("freeRes - listener removed " + listenerCount);
        }
      }
    }
    
    function startTimer() {
      draw();
      intervalRefSec = setInterval(draw, 5000);
    }

    function stopTimer() {
      if(intervalRefSec) {intervalRefSec=clearInterval(intervalRefSec);}
    }

    function getGPSfix() {
      return last_fix;
    }

    function setGPSfix(f) {
      last_fix = f;
      log_debug("setGPSfix:");
      log_debug(f);
      determineGPSState();
    }

    function determineGPSState() {
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
    
    function onButtonShort(btn) {
      if (btn === 1) cycleGPSDisplay();
    }

    function onButtonLong(btn) {
      if (btn === 1) toggleGPSPower();
    }

    function draw(){
      drawGPSTime();
      drawGPSData();
    }

    function drawGPSTime() {  
      var d = new Date();
      var da = d.toString().split(" ");
      var time = da[4].substr(0,5);

      g.reset();
      g.clearRect(0,Y_TIME, 239, Y_ACTIVITY - 1);
      
      g.setColor(1,1,1);  // white
      g.setFontAlign(0, -1);

      if (last_fix.time !== undefined && last_fix.time.toUTCString !== undefined &&
          (gpsState == GPS_SATS || gpsState == GPS_RUNNING)) {
        time = last_fix.time.toUTCString().split(" ");
        time = time[4];
        g.setFont("Vector", 56);
      } else {
        g.setFont("Vector", 80);
      }
      
      g.drawString(time, 120, Y_TIME);
    }

    function drawGPSData() {
      if (clearActivityArea) {
        g.clearRect(0, Y_ACTIVITY, 239, Y_MODELINE - 1);
        clearActivityArea = false;
      }

      g.setFontVector(26);
      g.setColor(0xFFC0); 
      g.setFontAlign(0, -1);

      if (!gpsPowerState) {
        g.drawString("GPS off", 120, Y_ACTIVITY);
        return;
      }

      if (gpsState == GPS_TIME) {
        g.drawString("Waiting for", 120, Y_ACTIVITY);
        g.drawString("GPS", 120, Y_ACTIVITY + 36);
        return;
      }

      if (gpsState == GPS_SATS) {
        g.drawString("Satellites", 120, Y_ACTIVITY);
        g.drawString(last_fix.satellites, 120, Y_ACTIVITY + 36);
        return;
      }

      if (gpsState == GPS_RUNNING) {
        let time = formatTime(last_fix.time);
        let age = timeSince(time);
        let os = OsGridRef.latLongToOsGrid(last_fix);
        let ref = to_map_ref(6, os.easting, os.northing);
        let speed;
        let activityStr = "";
        
        if (age < 0) age = 0;
        g.setFontVector(40);
        g.setColor(0xFFC0); 

        switch(gpsDisplay) {
        case GDISP_OS:
          activityStr = ref;
          break;
        case GDISP_LATLN:
          g.setFontVector(26);
          activityStr = last_fix.lat.toFixed(4) + ", " + last_fix.lon.toFixed(4);
          break;
        case GDISP_SPEED:
          speed = last_fix.speed;
          speed = speed.toFixed(1);
          activityStr = speed + "kph"; 
          break;
        case GDISP_ALT:
          activityStr = last_fix.alt + "m";
          break;
        case GDISP_COURSE:
          activityStr = last_fix.course;
          break;
        }

        g.clearRect(0, Y_ACTIVITY, 239, Y_MODELINE - 1);
        g.drawString(activityStr, 120, Y_ACTIVITY);
        g.setFont("6x8",2);
        g.setColor(1,1,1); 
        g.drawString(age, 120, Y_ACTIVITY + 46);
      }
    }

    function toggleGPSPower() {
      gpsPowerState = !gpsPowerState;
      Bangle.setGPSPower(gpsPowerState ? 1 : 0);

      resetLastFix();
      determineGPSState();

      // poke the gps widget indicator to change
      if (WIDGETS.gps !== undefined) {
        WIDGETS.gps.draw();
      }
      
      clearActivityArea = true;
      draw();
    }

    function cycleGPSDisplay() {
      if (gpsState !== GPS_RUNNING) return;
      
      switch (gpsDisplay) {
      case GDISP_OS:
        gpsDisplay = GDISP_SPEED;
        break;
      case GDISP_SPEED:
        gpsDisplay = GDISP_ALT;
        break;
      case GDISP_ALT:
        gpsDisplay = GDISP_LATLN;
        break;
      case GDISP_LATLN:
        gpsDisplay = GDISP_COURSE;
        break;
      case GDISP_COURSE:
      default:
        gpsDisplay = GDISP_OS;
        break;
      }
      
      clearActivityArea = true;
      drawGPSData();
    }

    function resetLastFix() {
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

    function processFix(fix) {
      last_fix.time = fix.time;

      log_debug("processFix()");
      log_debug(fix);

      if (gpsState == GPS_TIME) {
        gpsState = GPS_SATS;
        clearActivityArea = true;
        drawGPSData();
      }
      
      if (fix.fix) {
        if (!last_fix.fix) {
          Bangle.buzz(); // buzz on first position
          gpsState = GPS_RUNNING;
          clearActivityArea = true;
          drawGPSData();
        }
        gpsState = GPS_RUNNING;
        last_fix = fix;
      }
    }

    /*************     GPS  / OSREF Code **************************/

    function formatTime(now) {
      var fd = now.toUTCString().split(" ");
      return fd[4];
    }

    function timeSince(t) {
      var hms = t.split(":");
      var now = new Date();
      
      var sn = 3600*(now.getHours()) + 60*(now.getMinutes()) + 1*(now.getSeconds());
      var st = 3600*(hms[0]) + 60*(hms[1]) + 1*(hms[2]);
      
      return (sn - st);
    }

    Number.prototype.toRad = function() { return this*Math.PI/180; };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
    /*  Ordnance Survey Grid Reference functions  (c) Chris Veness 2005-2014                          */
    /*   - www.movable-type.co.uk/scripts/gridref.js                                                  */
    /*   - www.movable-type.co.uk/scripts/latlon-gridref.html                                         */
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
    function OsGridRef(easting, northing) {
      this.easting = 0|easting;
      this.northing = 0|northing;
    }
    OsGridRef.latLongToOsGrid = function(point) {
      var lat = point.lat.toRad();
      var lon = point.lon.toRad();

      var a = 6377563.396, b = 6356256.909;          // Airy 1830 major & minor semi-axes
      var F0 = 0.9996012717;                         // NatGrid scale factor on central meridian
      var lat0 = (49).toRad(), lon0 = (-2).toRad();  // NatGrid true origin is 49Ã¯Â¿Â½N,2Ã¯Â¿Â½W
      var N0 = -100000, E0 = 400000;                 // northing & easting of true origin, metres
      var e2 = 1 - (b*b)/(a*a);                      // eccentricity squared
      var n = (a-b)/(a+b), n2 = n*n, n3 = n*n*n;

      var cosLat = Math.cos(lat), sinLat = Math.sin(lat);
      var nu = a*F0/Math.sqrt(1-e2*sinLat*sinLat);              // transverse radius of curvature
      var rho = a*F0*(1-e2)/Math.pow(1-e2*sinLat*sinLat, 1.5);  // meridional radius of curvature
      var eta2 = nu/rho-1;

      var Ma = (1 + n + (5/4)*n2 + (5/4)*n3) * (lat-lat0);
      var Mb = (3*n + 3*n*n + (21/8)*n3) * Math.sin(lat-lat0) * Math.cos(lat+lat0);
      var Mc = ((15/8)*n2 + (15/8)*n3) * Math.sin(2*(lat-lat0)) * Math.cos(2*(lat+lat0));
      var Md = (35/24)*n3 * Math.sin(3*(lat-lat0)) * Math.cos(3*(lat+lat0));
      var M = b * F0 * (Ma - Mb + Mc - Md);              // meridional arc

      var cos3lat = cosLat*cosLat*cosLat;
      var cos5lat = cos3lat*cosLat*cosLat;
      var tan2lat = Math.tan(lat)*Math.tan(lat);
      var tan4lat = tan2lat*tan2lat;

      var I = M + N0;
      var II = (nu/2)*sinLat*cosLat;
      var III = (nu/24)*sinLat*cos3lat*(5-tan2lat+9*eta2);
      var IIIA = (nu/720)*sinLat*cos5lat*(61-58*tan2lat+tan4lat);
      var IV = nu*cosLat;
      var V = (nu/6)*cos3lat*(nu/rho-tan2lat);
      var VI = (nu/120) * cos5lat * (5 - 18*tan2lat + tan4lat + 14*eta2 - 58*tan2lat*eta2);

      var dLon = lon-lon0;
      var dLon2 = dLon*dLon, dLon3 = dLon2*dLon, dLon4 = dLon3*dLon, dLon5 = dLon4*dLon, dLon6 = dLon5*dLon;

      var N = I + II*dLon2 + III*dLon4 + IIIA*dLon6;
      var E = E0 + IV*dLon + V*dLon3 + VI*dLon5;

      return new OsGridRef(E, N);
    };

    /*
     * converts northing, easting to standard OS grid reference.
     *
     * [digits=10] - precision (10 digits = metres)
     *   to_map_ref(8, 651409, 313177); => 'TG 5140 1317'
     *   to_map_ref(0, 651409, 313177); => '651409,313177'
     *
     */
    function to_map_ref(digits, easting, northing) {
      if (![ 0,2,4,6,8,10,12,14,16 ].includes(Number(digits))) throw new RangeError(`invalid precision '${digits}'`); // eslint-disable-line comma-spacing

      let e = easting;
      let n = northing;

      // use digits = 0 to return numeric format (in metres) - note northing may be >= 1e7
      if (digits == 0) {
        const format = { useGrouping: false,  minimumIntegerDigits: 6, maximumFractionDigits: 3 };
        const ePad = e.toLocaleString('en', format);
        const nPad = n.toLocaleString('en', format);
        return `${ePad},${nPad}`;
      }

      // get the 100km-grid indices
      const e100km = Math.floor(e / 100000), n100km = Math.floor(n / 100000);

      // translate those into numeric equivalents of the grid letters
      let l1 = (19 - n100km) - (19 - n100km) % 5 + Math.floor((e100km + 10) / 5);
      let l2 = (19 - n100km) * 5 % 25 + e100km % 5;

      // compensate for skipped 'I' and build grid letter-pairs
      if (l1 > 7) l1++;
      if (l2 > 7) l2++;
      const letterPair = String.fromCharCode(l1 + 'A'.charCodeAt(0), l2 + 'A'.charCodeAt(0));

      // strip 100km-grid indices from easting & northing, and reduce precision
      e = Math.floor((e % 100000) / Math.pow(10, 5 - digits / 2));
      n = Math.floor((n % 100000) / Math.pow(10, 5 - digits / 2));

      // pad eastings & northings with leading zeros
      e = e.toString().padStart(digits/2, '0');
      n = n.toString().padStart(digits/2, '0');

      return `${letterPair} ${e} ${n}`;
    }

    return {init:init, freeResources:freeResources, startTimer:startTimer, stopTimer:stopTimer,
            onButtonShort:onButtonShort, onButtonLong:onButtonLong,
            setGPSfix:setGPSfix, getGPSfix:getGPSfix
           };
  }

  return getFace;

})();
