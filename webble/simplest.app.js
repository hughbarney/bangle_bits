const storage = require('Storage');
const locale = require("locale");

Graphics.prototype.setFontsquaresansserif7 = function(scale) {
  // Actual height 27 (40 - 14)
  g.setFontCustom(atob("AAAAAH+AAAAAAAH+AAAAAAAH+AAAAAAAH+AAAAAAAH+AAAAAAAH+AAAAAAAH+AAAAAAAH+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAeAAAAAAAA+AAAAAAAB+AAAAAAAB+AAAAAAAD+AAAAAAAH8AAAAAAAP8AAAAAAAP4AAAAAAAfwAAAAAAA/gAAAAAAB/gAAAAAAB/AAAAAAAD+AAAAAAAH8AAAAAAAP8AAAAAAAP4AAAAAAAfwAAAAAAA/gAAAAAAB/gAAAAAAB/AAAAAAAD+AAAAAAAH8AAAAAAAP8AAAAAAAP4AAAAAAAfwAAAAAAA/gAAAAAAB/gAAAAAAB/AAAAAAAD+AAAAAAAH8AAAAAAAP8AAAAAAAP4AAAAAAAPwAAAAAAAPgAAAAAAAPgAAAAAAAPAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///+AAAAP///+AAAAP///+AAAAP///+AAAAP///+AAAAP///+AAAAPwAB+AAAAPwAB+AAAAPwAB+AAAAPwAB+AAAAPwAB+AAAAPwAB+AAAAPwAB+AAAAPwAB+AAAAPwAB+AAAAPwAB+AAAAPwAB+AAAAPwAB+AAAAPwAB+AAAAPwAB+AAAAPwAB+AAAAPwAB+AAAAPwAB+AAAAPwAB+AAAAPwAB+AAAAPwAB+AAAAPwAB+AAAAPwAB+AAAAPwAB+AAAAPwAB+AAAAPwAB+AAAAPwAB+AAAAP///+AAAAP///+AAAAP///+AAAAP///+AAAAP///+AAAAP///+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///+AAAAP///+AAAAP///+AAAAP///+AAAAP///+AAAAP///+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwf/+AAAAPwf/+AAAAPwf/+AAAAPwf/+AAAAPwf/+AAAAPwf/+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAP//h+AAAAP//h+AAAAP//h+AAAAP//h+AAAAP//h+AAAAP//h+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAP///+AAAAP///+AAAAP///+AAAAP///+AAAAP///+AAAAP///+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//gAAAAAP//gAAAAAP//gAAAAAP//gAAAAAP//gAAAAAP//gAAAAAAAfgAAAAAAAfgAAAAAAAfgAAAAAAAfgAAAAAAAfgAAAAAAAfgAAAAAAAfgAAAAAAAfgAAAAAAAfgAAAAAAAfgAAAAAAAfgAAAAAAAfgAAAAAAAfgAAAAAAAfgAAAAAAAfgAAAAAAAfgAAAAAAAfgAAAAAAAfgAAAAAAAfgAAAAAAAfgAAAAAAAfgAAAAAAAfgAAAAAAAfgAAAAAAAfgAAAAAAAfgAAAAAAAfgAAAAAP///+AAAAP///+AAAAP///+AAAAP///+AAAAP///+AAAAP///+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//h+AAAAP//h+AAAAP//h+AAAAP//h+AAAAP//h+AAAAP//h+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwf/+AAAAPwf/+AAAAPwf/+AAAAPwf/+AAAAPwf/+AAAAPwf/+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///+AAAAP///+AAAAP///+AAAAP///+AAAAP///+AAAAP///+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwf/+AAAAPwf/+AAAAPwf/+AAAAPwf/+AAAAPwf/+AAAAPwf/+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwAAAAAAAPwAAAAAAAPwAAAAAAAPwAAAAAAAPwAAAAAAAPwAAAAAAAPwAAAAAAAPwAAAAAAAPwAAAAAAAPwAAAAAAAPwAAAAAAAPwAAAAAAAPwAAAAAAAPwAAAAAAAPwAAAAAAAPwAAAAAAAPwAAAAAAAPwAAAAAAAPwAAAAAAAPwAAAAAAAPwAAAAAAAPwAAAAAAAPwAAAAAAAPwAAAAAAAPwAAAAAAAPwAAAAAAAPwAAAAAAAPwAAAAAAAPwAAAAAAAPwAAAAAAAPwAAAAAAAPwAAAAAAAP///+AAAAP///+AAAAP///+AAAAP///+AAAAP///+AAAAP///+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///+AAAAP///+AAAAP///+AAAAP///+AAAAP///+AAAAP///+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAP///+AAAAP///+AAAAP///+AAAAP///+AAAAP///+AAAAP///+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//h+AAAAP//h+AAAAP//h+AAAAP//h+AAAAP//h+AAAAP//h+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAPwfh+AAAAP///+AAAAP///+AAAAP///+AAAAP///+AAAAP///+AAAAP///+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/A/wAAAAD/A/wAAAAD/A/wAAAAD/A/wAAAAD/A/wAAAAD/A/wAAAAD/A/wAAAAD/A/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="), 46, atob("DSsrCysrKysrKysrDQ=="), 54+(scale<<8)+(1<<16));
}

Graphics.prototype.setFontsquaresansserif7small = function(scale) {
  // Actual height 16 (23 - 8)
  g.setFontCustom(atob("AAAfAAAAHwAAAB8AAAAfAAAAHwAAAAAAAAAAAAAAAAAAAAMAAAAHAAAADwAAAA8AAAAeAAAAPgAAAHwAAAB4AAAA8AAAAfAAAAPgAAADwAAAB4AAAA+AAAAfAAAAHgAAADwAAAB8AAAA+AAAAPAAAADgAAAA4AAAAMAAAAAAAAAAAAAAAAAAAAD//wAA//8AAP//AADwDwAA4AcAAOAHAADgBwAA4AcAAOAHAADgBwAA4AcAAOAHAADgBwAA4AcAAOAHAADgBwAA4AcAAOAHAADgBwAA//8AAP//AAD//wAA//8AAAAAAAAAAAAAAAAAAP//AAD//wAA//8AAAAAAAAAAAAAAAAAAOP/AADj/wAA4/8AAOPPAADjhwAA44cAAOOHAADjhwAA44cAAOOHAADjhwAA44cAAOOHAADjhwAA44cAAOOHAADjhwAA44cAAOOHAAD/hwAA/4cAAP+HAAD/hwAAAAAAAAAAAAAAAAAA44cAAOOHAADjhwAA44cAAOOHAADjhwAA44cAAOOHAADjhwAA44cAAOOHAADjhwAA44cAAOOHAADjhwAA44cAAOOHAADjhwAA44cAAP//AAD//wAA//8AAP//AAAAAAAAAAAAAAAAAAD/gAAA/4AAAP+AAAADgAAAA4AAAAOAAAADgAAAA4AAAAOAAAADgAAAA4AAAAOAAAADgAAAA4AAAAOAAAADgAAAA4AAAAOAAAADgAAA//8AAP//AAD//wAA//8AAAAAAAAAAAAAAAAAAP+HAAD/hwAA/4cAAPOHAADjhwAA44cAAOOHAADjhwAA44cAAOOHAADjhwAA44cAAOOHAADjhwAA44cAAOOHAADjhwAA44cAAOOHAADj/wAA4/8AAOP/AADj/wAAAAAAAAAAAAAAAAAA//8AAP//AAD//wAA888AAOOHAADjhwAA44cAAOOHAADjhwAA44cAAOOHAADjhwAA44cAAOOHAADjhwAA44cAAOOHAADjhwAA44cAAOP/AADj/wAA4/8AAOP/AAAAAAAAAAAAAAAAAADgAAAA4AAAAOAAAADgAAAA4AAAAOAAAADgAAAA4AAAAOAAAADgAAAA4AAAAOAAAADgAAAA4AAAAOAAAADgAAAA4AAAAOAAAADgAAAA//8AAP//AAD//wAA//8AAAAAAAAAAAAAAAAAAP//AAD//wAA//8AAPPPAADjhwAA44cAAOOHAADjhwAA44cAAOOHAADjhwAA44cAAOOHAADjhwAA44cAAOOHAADjhwAA44cAAOOHAAD//wAA//8AAP//AAD//wAAAAAAAAAAAAAAAAAA/4cAAP+HAAD/hwAA84cAAOOHAADjhwAA44cAAOOHAADjhwAA44cAAOOHAADjhwAA44cAAOOHAADjhwAA44cAAOOHAADjhwAA44cAAP//AAD//wAA//8AAP//AAAAAAAAAAAAAAAAAAB8fAAAfHwAAHx8AAB8fAAAfHwAAAAAAAAAAAAAAAAA"), 46, atob("CBoaBhoaGhoaGhoaCA=="), 32+(scale<<8)+(1<<16));
}

const h = g.getHeight();
const w = g.getWidth();

var cloudIcon = require("heatshrink").decompress(atob("oFA4UA/4ACBIPPvZL/AH4A/AH4AjgWqAAeoB7OVqoACvAP/B/17B516UQOgB5d////B5gAC8APTlQ3BB5krG4PVB5cpBgwP/B/4PXV4QAHd4jPCAA7/GAH4A/AH4A/ABYA=="));
// weather icons from https://icons8.com/icon/set/weather/color
var sunIcon = require("heatshrink").decompress(atob("mEwwhC/AH4AbhvQC6vd7ouVC4IwUCwIwUFwQwQCYgAHDZQXc9wACC6QWDDAgXN7wXF9oXPCwowDC5guGGAYXMCw4wCC5RGJJAZGTJBiNISIylQVJrLCC5owGF65fXR7AwBC5jvhC7JIILxapDFxAXOGAy9KC4owGBAQXODAgHDC54AHC8T0FAAQSOGg4qPGA4WUGAIuVC7AA/AH4AEA="));
var partSunIcon = require("heatshrink").decompress(atob("mEwwhC/AH4AY6AWVhvdC6vd7owUFwIABFiYAFGR4Xa93u9oXTCwIYDC6HeC4fuC56MBC4ySOIwpIQXYQXHmYABRpwXECwQYKF5HjC4kwL5gQCAYYwO7wqFAAowK7wWKJBgXLJBPd6YX/AAoVMAAM/Cw0DC5yRHCx5JGFyAwGCyIwFC/4XyR4inXa64wRFwowQCw4A/AH4AkA"));
//var cloudIcon = require("heatshrink").decompress(atob("mEwwhC/AH4A/AH4AtgczmYWWDCgWDmcwIKAuEGBoSGGCAWKC7BIKIxYX6CpgABn4tUSJIWPJIwuQGAwWRGAoX/C+SPEU67XXGCIuFGCAWHAH4A/AH4A/ADg="));
var snowIcon = require("heatshrink").decompress(atob("mEwwhC/AH4AhxGAC9YUBC4QZRhAVBAIWIC6QAEI6IYEI5cIBgwWOC64NCKohHPNox3RBgqnQEo7XPHpKONR5AXYAH4ASLa4XWXILiBC6r5LDBgWWDBRrKC5hsCEacIHawvMCIwvQC5QvQFAROEfZ5ADLJ4YGCywvVI7CPGC9IA/AH4AF"));
var rainIcon = require("heatshrink").decompress(atob("mEwwhC/AH4AFgczmYWWDCgWDmcwIKAuEGBoSGGCAWKC7BIKIxYX6CpgABn4tUSJIWPJIwuQGAwWRGAoX/C+SPEU67XXGCIuFGCAWHAGeIBJEIwAVJhGIC5AJBC5QMJEJQMEC44JBC6QSCC54FHLxgNBBgYSEDgKpPMhQXneSwuUAH4A/AA4="));
var stormIcon = require("heatshrink").decompress(atob("mEwwhC/AFEzmcwCyoYUgYXDmYuVGAY0OFwocHC6pNLCxYXYJBQXuCxhhJRpgYKCyBKFFyIXFCyJIFC/4XaO66nU3eza6k7C4IWFGBwXBCwwwO3ewC5AZMC6RaCIxZiI3e7AYYwRCQIIBC4QwPIQIpDC5owDhYREIxgAEFIouNC4orDFyBGBGAcLC6BaFhYWRLSRIFISQXcCyqhRAH4Az"));
var errIcon = require("heatshrink").decompress(atob("mEwwkBiIA/AH4AZUAIWUiAXBWqgXXdIYuVGCgXBgICCIyYXCJCQTDC6QrEMCQSEJCQRFC6ApGJCCiDDQSpQFAYXEJBqNGJCA/EC4ZIOEwgXFJBgNEAhKlNAgxIKBgoXEJBjsLC5TsIeRycMBhRrMMBKzQEozjOBxAgHGww+IA6wfSH4hnIC47OMSJqlRIJAXCACIXaGoQARPwwuTAH4A/ABw"));

/**
Choose weather icon to display based on condition.
Based on function from the Bangle weather app so it should handle all of the conditions
sent from gadget bridge.
*/
function chooseIcon(condition) {
  condition = condition.toLowerCase();
  if (condition.includes("thunderstorm")) return stormIcon;
  if (condition.includes("freezing")||condition.includes("snow")||
    condition.includes("sleet")) {
    return snowIcon;
  }
  if (condition.includes("drizzle")||
    condition.includes("shower")) {
    return rainIcon;
  }
  if (condition.includes("rain")) return rainIcon;
  if (condition.includes("clear")) return sunIcon;
  if (condition.includes("few clouds")) return partSunIcon;
  if (condition.includes("scattered clouds")) return cloudIcon;
  if (condition.includes("clouds")) return cloudIcon;
  if (condition.includes("mist") ||
    condition.includes("smoke") ||
    condition.includes("haze") ||
    condition.includes("sand") ||
    condition.includes("dust") ||
    condition.includes("fog") ||
    condition.includes("ash") ||
    condition.includes("squalls") ||
    condition.includes("tornado")) {
    return cloudIcon;
  }
  return cloudIcon;
}

/**
Get weather stored in json file by weather app.
*/
function getWeather() {
  let jsonWeather = storage.readJSON('weather.json');
  return jsonWeather;
}

function draw() {
  var d = new Date();
  var da = d.toString().split(" ");
  var time = da[4].substr(0,5);
  var dd = String(d.getDate()).padStart(2, '0');
  var mm = String(d.getMonth() + 1).padStart(2, '0'); //January is 0!

  var weatherJson = getWeather();
  var w_temp;
  var w_icon;
  var w_wind;

  if (weatherJson && weatherJson.weather) {
      var currentWeather = weatherJson.weather;
      const temp = locale.temp(currentWeather.temp-273.15).match(/^(\D*\d*)(.*)$/);
      w_temp = temp[1] + " " + temp[2];
      w_icon = chooseIcon(currentWeather.txt);
      const wind = locale.speed(currentWeather.wind).match(/^(\D*\d*)(.*)$/);
      w_wind = wind[1] + " " + wind[2] + " " + (currentWeather.wrose||'').toUpperCase();
  } else {
      w_temp = "Err";
      w_wind = "???";
      w_icon = errIcon;
  }

  //w_icon = snowIcon;
  
  g.reset();

  // top half
  g.setColor('#00f');
  g.fillRect(0, 0, w, h/2);
  g.setColor('#fff');
  g.setFontAlign(0, -1);
  g.setFontsquaresansserif7();
  g.drawString(time, w/2, h/16);
  //g.drawString('17:36', w/2, h/16);

  // date, month
  g.setColor('#ff0');
  g.setFontsquaresansserif7small();
  g.setFontAlign(1, -1);
  g.drawString(dd + '.' + mm, w - 6, 5*h/16);

  // bottom half
  g.setColor('#0ff');
  g.fillRect(0, 1 +(h/2), w, h);
  g.setColor('#000');
  
  g.setFontAlign(1, -1);
  g.setFont('6x8', 2);
  g.drawString("o", w - 6, (9*h/16) - 4); 
  g.setFontsquaresansserif7();
  g.drawString(w_temp, w -6 - 8, 9*h/16);

  g.drawImage(w_icon, 0, 8*h/16, {scale: 1.25});
  queueDraw();
}

// timeout used to update every minute
var drawTimeout;

// schedule a draw for the next minute
function queueDraw() {
  if (drawTimeout) clearTimeout(drawTimeout);
  drawTimeout = setTimeout(function() {
    drawTimeout = undefined;
    draw();
  }, 60000 - (Date.now() % 60000));
}

console.log("starting..");
g.clear();
// Show launcher when middle button pressed
Bangle.setUI("clock");
Bangle.loadWidgets();
/*
 * we are not drawing the widgets as we are taking over the whole screen
 * so we will blank out the draw() functions of each widget and change the
 * area to the top bar doesn't get cleared.
 */
for (let wd of WIDGETS) {wd.draw=()=>{};wd.area="";}
draw();  // queues the next draw for a minutes time
