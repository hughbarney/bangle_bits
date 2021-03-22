

function showMem(msg) {
  var val = process.memory();
  var str = msg + " " + Math.round(val.usage*100/val.total) + "%";
  console.log(str);
}

showMem("start");
/*
var GPS_OFF = "gps_off";
var GPS_TIME = "gps_time";
var GPS_SATS = "gps_sats";
var GPS_RUNNING = "gps_running";

var GDISP_OS = "g_osref";
var GDISP_LATLN = "g_latln";
var GDISP_SPEED = "g_speed";
var GDISP_ALT = "g_alt";
var GDISP_COURSE = "g_course";
*/

var GPS_OFF = 0;
var GPS_TIME = 1;
var GPS_SATS = 2;
var GPS_RUNNING = 3;

var GDISP_OS = 4;
var GDISP_LATLN = 5;
var GDISP_SPEED = 6;
var GDISP_ALT = 7;
var GDISP_COURSE 8;

showMem("end");
