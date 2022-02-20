var SunCalc = require("https://raw.githubusercontent.com/mourner/suncalc/master/suncalc.js");
const SETTINGS_FILE = "rebble.json";
const LOCATION_FILE = "mylocation.json";
let settings;
let location;

Graphics.prototype.setFontKdamThmor = function(scale) {
  // Actual height 72 (71 - 0)
  g.setFontCustom(atob("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4AAAAAAAAAAAAAH+AAAAAAAAAAAAAP/AAAAAAAAAAAAAf/gAAAAAAAAAAAA//gAAAAAAAAAAAA//wAAAAAAAAAAAA//wAAAAAAAAAAAA//wAAAAAAAAAAAA//wAAAAAAAAAAAA//gAAAAAAAAAAAAf/gAAAAAAAAAAAAf/AAAAAAAAAAAAAP+AAAAAAAAAAAAAD8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfAAAAAAAAAAAAAB/AAAAAAAAAAAAAP/AAAAAAAAAAAAA//AAAAAAAAAAAAH/+AAAAAAAAAAAAf/+AAAAAAAAAAAD//+AAAAAAAAAAAf//8AAAAAAAAAAB///4AAAAAAAAAAP///wAAAAAAAAAA////AAAAAAAAAAH///4AAAAAAAAAAf///gAAAAAAAAAD///8AAAAAAAAAAf///wAAAAAAAAAB///+AAAAAAAAAAP///4AAAAAAAAAA////AAAAAAAAAAH///4AAAAAAAAAAf///gAAAAAAAAAD///8AAAAAAAAAAP///wAAAAAAAAAB///+AAAAAAAAAAP///4AAAAAAAAAA////AAAAAAAAAAD///4AAAAAAAAAAP///gAAAAAAAAAAf//8AAAAAAAAAAA///wAAAAAAAAAAA//+AAAAAAAAAAAA//4AAAAAAAAAAAA//AAAAAAAAAAAAA/4AAAAAAAAAAAAA/gAAAAAAAAAAAAA8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf//AAAAAAAAAAAP///+AAAAAAAAAD/////wAAAAAAAAP/////+AAAAAAAA///////gAAAAAAD///////4AAAAAAH///////8AAAAAAf///////+AAAAAA/////////gAAAAB/////////wAAAAB/////////wAAAAD/////////4AAAAH///AAA///8AAAAH//wAAAB//8AAAAP/+AAAAAP/+AAAAP/4AAAAAD/+AAAAf/gAAAAAA//AAAAf/AAAAAAAf/AAAAf+AAAAAAAP/AAAA/+AAAAAAAP/gAAA/8AAAAAAAH/gAAA/8AAAAAAAH/gAAA/8AAAAAAAH/gAAA/8AAAAAAAH/gAAA/8AAAAAAAH/gAAA/8AAAAAAAH/gAAA/8AAAAAAAH/gAAA/8AAAAAAAH/gAAA/+AAAAAAAP/gAAAf+AAAAAAAP/AAAAf/AAAAAAAf/AAAAf/gAAAAAA//AAAAP/4AAAAAD/+AAAAP/+AAAAAP/+AAAAH//gAAAA//8AAAAH///AAAf//8AAAAD/////////4AAAAD/////////wAAAAB/////////wAAAAA/////////gAAAAAf////////AAAAAAH///////8AAAAAAD///////4AAAAAAA///////gAAAAAAAP/////+AAAAAAAAD/////4AAAAAAAAAf////AAAAAAAAAAA///gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAADwAAAAAAAAAAAAAD4AAAAAAAAAAAAAH8AAAAAAAAAAAAAP+AAAAAAAAAAAAAf/AAAAAH/AAAAAA//AAAAAH/AAAAAB//AAAAAH/AAAAAB//AAAAAH/AAAAAD/+AAAAAH/AAAAAH/8AAAAAH/AAAAAP/4AAAAAH/AAAAAf/wAAAAAH/AAAAA//gAAAAAH/AAAAB//gAAAAAH/AAAAB//AAAAAAH/AAAAD/+AAAAAAH/AAAAH/8AAAAAAH/AAAAP//////////AAAAf//////////AAAAf//////////AAAAf//////////AAAAf//////////AAAAf//////////AAAAf//////////AAAAf//////////AAAAf//////////AAAAf//////////AAAAf//////////AAAAf//////////AAAAAAAAAAAAAH/AAAAAAAAAAAAAH/AAAAAAAAAAAAAH/AAAAAAAAAAAAAH/AAAAAAAAAAAAAH/AAAAAAAAAAAAAH/AAAAAAAAAAAAAH/AAAAAAAAAAAAAH/AAAAAAAAAAAAAH/AAAAAAAAAAAAAH/AAAAAAAAAAAAAH/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/AAAAAAHgAAAAAD/AAAAAA/wAAAAAH/AAAAAD/wAAAAAP/AAAAAH/wAAAAAf/AAAAAP/wAAAAA//AAAAA//wAAAAB//AAAAB//wAAAAD//AAAAB//wAAAAH//AAAAD//wAAAAP//AAAAH//wAAAAf//AAAAH//gAAAA///AAAAP/+AAAAB///AAAAP/4AAAAD///AAAAf/gAAAAH///AAAAf/AAAAAP///AAAAf+AAAAAf///AAAAf+AAAAA//v/AAAA/8AAAAB//P/AAAA/8AAAAD/+P/AAAA/8AAAAH/8P/AAAA/8AAAAP/4P/AAAA/8AAAAf/wf/AAAA/8AAAA//gf/AAAA/8AAAD//Af/AAAA/8AAAH/+Af/AAAA/+AAAP/8Af/AAAA/+AAAf/4Af/AAAAf/AAB//wAf/AAAAf/gAD//gAf/AAAAf/wAf//AAf/AAAAf/+D//+AAf/AAAAP/////8AAf/AAAAP/////4AAf/AAAAH/////wAAf/AAAAH/////gAAf/AAAAD/////AAAf/AAAAB////8AAAf/AAAAA////4AAAf/AAAAAf///wAAAf/AAAAAP///AAAAf/AAAAAD//8AAAAf/AAAAAA//gAAAAP/AAAAAABwAAAAAH/AAAAAAAAAAAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYAAAAAAAAAAAAAAfAAAAAAAAHgAAAA/wAAAAAAA/wAAAA/8AAAAAAD/wAAAB/+AAAAAAH/wAAAB//AAAAAAP/wAAAB//gAAAAA//wAAAB//wAAAAB//wAAAB//4AAAAB//wAAAB//8AAAAD//wAAAA//8AAAAH//wAAAAf/+AAAAH//gAAAAH/+AAAAP/+AAAAAB//AAAAP/4AAAAAA//AAAAf/gAAAAAAf/AAAAf/AAAAAAAf/AAAAf/AAAAAAAP/gAAAf+AAAAAAAP/gAAA/+AAD/gAAH/gAAA/8AAD/gAAH/gAAA/8AAD/gAAH/gAAA/8AAD/gAAH/gAAA/8AAD/gAAH/gAAA/8AAD/gAAH/gAAA/8AAD/gAAH/gAAA/8AAH/wAAH/gAAA/8AAH/wAAP/gAAA/+AAH/wAAP/AAAAf/AAP/4AAf/AAAAf/AAf/4AA//AAAAf/wA//8AB//AAAAf/+H//+AD/+AAAAP//////4f/+AAAAP////v////8AAAAH////v////8AAAAH////H////4AAAAD////H////wAAAAB///+D////wAAAAA///8D////gAAAAAf//4B////AAAAAAP//wA///+AAAAAAD//AAf//4AAAAAAAf4AAH//gAAAAAAAAAAAB/+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8AAAAAAAAAAAAAD/gAAAAAAAAAAAAP/wAAAAAAAAAAAAf/wAAAAAAAAAAAA//wAAAAAAAAAAAD//wAAAAAAAAAAAH//wAAAAAAAAAAAP//wAAAAAAAAAAA///wAAAAAAAAAAB///wAAAAAAAAAAD///wAAAAAAAAAAP///wAAAAAAAAAAf///wAAAAAAAAAA//9/wAAAAAAAAAD//x/wAAAAAAAAAH//h/wAAAAAAAAAP/+B/wAAAAAAAAA//8B/wAAAAAAAAB//4B/wAAAAAAAAD//gB/wAAAAAAAAP//AB/wAAAAAAAAf/+AB/wAAAAAAAA//4AB/wAAAAAAAD//wAB/wAAAAAAAH//AAB/wAAAAAAAP/+AAB/wAAAAAAA//8AAB/wAAAAAAB//wAAB/wAAAAAAD//gAAB/wAAAAAAP/+AAAB/wAAAAAAf/8AAAB/wAAAAAAf/5////////AAAAf//////////AAAAf//////////AAAAf//////////AAAAf//////////AAAAf//////////AAAAf//////////AAAAf//////////AAAAf//////////AAAAf//////////AAAAf//////////AAAAAAAAAAB/wAAAAAAAAAAAAB/wAAAAAAAAAAAAB/wAAAAAAAAAAAAB/wAAAAAAAAAAAAB/wAAAAAAAAAAAAB/wAAAAAAAAAAAAB/wAAAAAAAAAAAAB/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAAAAAAAAAAPgAAAAAAAAAAAAA/wAAAAAAAAD4AAB/4AAAAAAAD/4AAB/4AAAAAAD//4AAB/8AAAAAD///8AAB/8AAAAD////8AAB/+AAAAf////8AAA/+AAAAf////+AAA/+AAAAf////+AAAf/AAAAf////8AAAf/AAAAf////8AAAP/AAAAf////8AAAP/AAAAf//4/4AAAH/gAAAf/8A/4AAAH/gAAAf+AA/4AAAH/gAAAf+AA/4AAAH/gAAAf+AA/4AAAH/gAAAf+AA/4AAAH/gAAAf+AA/4AAAH/gAAAf+AB/4AAAH/gAAAf+AB/4AAAH/gAAAf+AA/8AAAP/gAAAf+AA/8AAAP/AAAAf+AA/8AAAP/AAAAf+AA/+AAAf/AAAAf+AA/+AAA//AAAAf+AA//AAB/+AAAAf+AAf/gAD/+AAAAf+AAf/4Af/8AAAAf+AAf/////8AAAAf+AAP/////4AAAAf+AAP/////wAAAAf+AAH/////wAAAAf+AAD/////gAAAAf+AAD/////AAAAAf+AAB////+AAAAAf8AAA////8AAAAAf4AAAP///wAAAAAfgAAAH///AAAAAAAAAAAA//8AAAAAAAAAAAAH/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/4AAAAAAAAAAAB///AAAAAAAAAAAP///wAAAAAAAAAA////8AAAAAAAAAB////+AAAAAAAAAH/////AAAAAAAAAP/////gAAAAAAAA//////wAAAAAAAB//////4AAAAAAAH//////8AAAAAAAP//////8AAAAAAAf//+AP/+AAAAAAB///4AB/+AAAAAAD///wAA/+AAAAAAH///gAAf/AAAAAAf///AAAP/AAAAAA///+AAAP/AAAAAB///+AAAH/gAAAAH//3+AAAH/gAAAAP//v8AAAH/gAAAAf//P8AAAH/gAAAB//+P8AAAH/gAAAD//4f8AAAH/gAAAH//wf8AAAH/gAAAP//gf8AAAH/gAAAf//Af8AAAH/gAAAf/8Af+AAAH/gAAAf/4Af+AAAP/AAAAf/wAf+AAAP/AAAAf/gAf/AAAf/AAAAf/AAP/gAA//AAAAf8AAP/wAB/+AAAAf4AAP/4AD/+AAAAfwAAP//Af/8AAAAfgAAH/////8AAAAeAAAH/////4AAAAcAAAD/////4AAAAYAAAD/////wAAAAQAAAB/////gAAAAAAAAA/////AAAAAAAAAAf///+AAAAAAAAAAP///8AAAAAAAAAAD///wAAAAAAAAAAB///AAAAAAAAAAAAP/8AAAAAAAAAAAAAeAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf8AAAAAAAAAAAAAf+AAAAAAAAAAAAAf+AAAAAAAAAAAAAf+AAAAAAAAAAAAAf+AAAAAAAAAAAAAf+AAAAAAAABAAAAf+AAAAAAAAHAAAAf+AAAAAAAAfAAAAf+AAAAAAAB/AAAAf+AAAAAAAH/AAAAf+AAAAAAAf/AAAAf+AAAAAAB//AAAAf+AAAAAAH//AAAAf+AAAAAAf//AAAAf+AAAAAB///AAAAf+AAAAAH///AAAAf+AAAAAf///AAAAf+AAAAB///+AAAAf+AAAAH///8AAAAf+AAAAf///wAAAAf+AAAA////AAAAAf+AAAD///8AAAAAf+AAAP///wAAAAAf+AAA////AAAAAAf+AAD///8AAAAAAf+AAP///wAAAAAAf+AA////AAAAAAAf+AD///8AAAAAAAf+AP///wAAAAAAAf+A////AAAAAAAAf+D///8AAAAAAAAf+P///wAAAAAAAAf+f//+AAAAAAAAAf////4AAAAAAAAAf////gAAAAAAAAAf///+AAAAAAAAAAf///4AAAAAAAAAAf///gAAAAAAAAAAf//+AAAAAAAAAAAf//4AAAAAAAAAAAf//gAAAAAAAAAAAf/+AAAAAAAAAAAAf/4AAAAAAAAAAAAf/gAAAAAAAAAAAAf+AAAAAAAAAAAAAfgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP4AAAAAAAAAAAAB//gAAAAAAADwAAH//4AAAAAAA//AAf//8AAAAAAD//wA////AAAAAAP//4B////gAAAAAf//+B////wAAAAA////D////wAAAAB////H////4AAAAD////n////8AAAAH/////////8AAAAH/////////+AAAAP//////wP/+AAAAP//////AB/+AAAAf/wD//8AA//AAAAf/AA//4AAf/AAAAf+AAf/4AAP/AAAAf8AAP/wAAH/AAAA/8AAH/wAAH/gAAA/4AAH/gAAH/gAAA/4AAH/gAAD/gAAA/4AAD/gAAD/gAAA/4AAD/gAAD/gAAA/4AAD/gAAD/gAAA/4AAD/gAAD/gAAA/4AAD/gAAD/gAAA/4AAH/gAAH/gAAA/8AAH/wAAH/gAAAf8AAP/wAAH/gAAAf+AAP/wAAP/AAAAf/AAf/4AAf/AAAAf/wB//8AAf/AAAAP/////+AB//AAAAP//////wH/+AAAAH/////////+AAAAH/////////8AAAAD////n////8AAAAB////H////4AAAAA////D////wAAAAAf//+B////wAAAAAP//8B////gAAAAAH//wA////AAAAAAB//AAf//8AAAAAAAH4AAH//4AAAAAAAAAAAB//gAAAAAAAAAAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/8AAAAAAAAAAAAf//AAAAAAAAAAAB///wAAAAAAAAAAH///4AAAAAAAAAAP///+AAAAAAAAAAf////AAAAAAAAAA/////AAAADAAAAB/////gAAAHAAAAD/////wAAAPAAAAH/////wAAAfAAAAH/////4AAB/AAAAP//A//4AAD/AAAAP/4AH/8AAH/AAAAf/gAD/8AAP/AAAAf/AAB/8AA//AAAAf+AAA/8AB//AAAAf+AAA/8AD//AAAA/8AAAf8AH//AAAA/8AAAf8Af//AAAA/8AAAf8A//+AAAA/8AAAf8B//+AAAA/8AAAf8D//8AAAA/8AAAf8P//wAAAA/8AAAf8f//gAAAA/8AAAf4//+AAAAA/8AAAf5//8AAAAA/8AAAf3//4AAAAAf+AAA////gAAAAAf+AAB////AAAAAAf/AAB///8AAAAAAf/gAD///4AAAAAAP/4AP///gAAAAAAP//B////AAAAAAAH//////+AAAAAAAH//////4AAAAAAAD//////wAAAAAAAB//////AAAAAAAAA/////+AAAAAAAAAf////4AAAAAAAAAP////wAAAAAAAAAH////AAAAAAAAAAB///8AAAAAAAAAAAf//gAAAAAAAAAAAB/4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwAAAD8AAAAAAAA/4AAAP+AAAAAAAB/8AAAf/AAAAAAAB/+AAAf/gAAAAAAD/+AAA//gAAAAAAD//AAA//wAAAAAAD//AAA//wAAAAAAD//AAA//wAAAAAAD//AAA//wAAAAAAD/+AAA//gAAAAAAB/+AAAf/gAAAAAAA/8AAAP/AAAAAAAAf4AAAH+AAAAAAAAHgAAAB4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"), 46, atob("FCM0NDQ0NDQ0NDQ0GA=="), 90+(scale<<8)+(1<<16));
}

var boot_img = require("heatshrink").decompress(atob("oFAwkEogA/AH4A/AH4A/AH4A/AE8AAAoeXoAfeDQUBmcyD7A+Dh///8QD649CiAfaHwUvD4sEHy0DDYIfEICg+Cn4fHICY+DD4nxcgojOHwgfEIAYfRCIQaDD4ZAFD5r7DH4//kAfRCIZ/GAAnwD5p9DX44fTHgYSBf4ofVDAQEBl4fFUAgfOXoQzBgIfFBAIfPP4RAEAoYAB+cRiK/SG4h/WIBAfXIA7CBAAswD55AHn6fUIBMCD65AHl4gCmcziAfQQJqfQQJpiDgk0IDXxQLRAEECaBM+QgRYRYgUIA0CD4ggSQJiDCiAKBICszAAswD55AHABKBVD7BAFABIqBD5pAFABPxD55AOD6BADiIAJQAyxLABwf/gaAPAH4A/AH4ARA=="));
var sunrise_img = require("heatshrink").decompress(atob("oFAwkEogA/AH4A/AH4A/AH4ACp5A/AH4A/AH4AIoEAggfcgAABD/4f/D/4f/CiNPmgfUoYIHoEAggfSoEQgYJGmAUJD5QJBgQ/IIBBKJChiVSCYR1LBZAzTICQyNICAxOICAwPD40xA4UTc5xAFiAuDiAWCAAMBc5hgHDxAgFeCKEDh//AAPwdiKDHh9PD4X0EAX0DyQ+BHoYgFh4+UDwofB/68OAAlBHw6CEQKITBDxAABMCReHUQhgSLxRgDDx9CD4g8DD4sUbqEUH5SABUB4fBDxYfKkQAFkEAiQJGAAcjgECBQ6qBAH4A9Y5wA/AH4Aw"));
var sunset_img = require("heatshrink").decompress(atob("oFAwkEogA/AH4A/AH4A/AH4A/AH4A/AH4AMoEAggfcgAABD/4f/D/4f/CqU0D6lDBA9AgEED6VAiEDBI0wChIfKBIMCH5BAIJRIUMSqQTCOpYLIGaZASGRpAQGJxAQGB4fGmIHCibnOIAsQFwcQCwQABgLnMMA4eIEArwRQgY0DAwwARC44gC+geSORJ8PHw4KTABFBGhRAT+AzLgEPLzZgUKRhgBDx9CD50UbqARMUCBROD5MiAAsggESBIwADkcAgQKHVQIA/AHrHOAH4A/AGA"));

// cloud, sun, partSun, snow, rain, storm, error
// create 1 bit, max contrast, brightness set to 85
//var cloudIcon = require("heatshrink").decompress(atob("kEggIfcj+AAYM/8ADBuFwAYPAmADCCAMBwEf8ADBhFwg4aBnEPAYMYjAVBhgDDDoQDHCYc4jwDB+EP///FYIDBMTgA=="));
//var sunIcon = require("heatshrink").decompress(atob("kEggILIgOAAZkDAYPAgeBwPAgIFBBgPhw4TBp/yAYMcnADBnEcAYMwhgDBsEGgE/AYP8AYYLDCYgbDEYYrD8fHIwI7CIYZLDL54AHA=="));
var sunPartIcon = require("heatshrink").decompress(atob("kEggIHEmADJjEwsEAjkw8EAh0B4EAg35wEAgP+CYMDwv8AYMDBAP2g8HgH+g0DBYMMgPwAYX8gOMEwMG3kAg8OvgSBjg2BgcYGQIcBAY5CBg0Av//HAM///4MYgNBEIMOCoUMDoUAnBwGkEA"));
var snowIcon = require("heatshrink").decompress(atob("kEggITQj/AAYM98ADBsEwAYPAjADCj+AgOAj/gAYMIuEHwEAjEPAYQVChk4AYQhCAYcYBYQTDnEPgEB+EH///IAQACE4IAB8EICIPghwDB4EeBYNAjgDBg8EAYQYCg4bCgZuFA=="));
var rainIcon = require("heatshrink").decompress(atob("kEggIPMh+AAYM/8ADBuFwAYPgmADB4EbAYOAj/ggOAhnwg4aBnAeCjEcCIMMjADCDoQDHjAPCnAXCuEP///8EDAYJECAAXBwkAgPDhwDBwUMgEEhkggEOjFgFgMQLYQAOA=="));
var errIcon = require("heatshrink").decompress(atob("kEggILIgOAAYsD4ADBg/gAYMGsADBhkwAYsYjADCjgDBmEMAYNxxwDBsOGAYPBwYDEgOBwOAgYDB4EDHYPAgwDBsADDhgDBFIcwjAHBjE4AYMcmADBhhNCKIcG/4AGOw4A=="));

// ~/src/bits/wicons4, sun64w, 2 bit transparency, white centre
var sunIcon = require("heatshrink").decompress(atob("oFA4UA///A4IDBiGEIW0B6APOqAP/B9AKEAgkCCgkBqgPHgoPFqoPHio0FqtAB4wIDCwwPDFAg2DIAQPDA4ZAHgNgHxA3IAwwYCuBnIIAtYgGVquAHw6RDgtVqtYRooAEqgeBAAMFHw64Cqta1JNIAAUJquq1WVeJUFrQPB0pOIOAVqB4OpqwPN1R+IAAOVBwRABwAPIJwQPCMBNWB5K1BAANgB4mloIKCqAPDqAPJsCaBD5o/J0pPJL5/VP50V9SfNX57fD1LfKhNXf5qEBrWpQoIPJqGVRQWFN5EBqkFBwIDBGBEFJQIgBwAFCNw4ZEbIKuIHIoGGDAkBLoQmFHwgPBBYRAHC4YPDIA43DB4ZAGCwgPEM41UiAPGSIoKEAhJzGbpQP/B+YAYA="));
var cloudIcon = require("heatshrink").decompress(atob("oFA4UA/4ACI/4A/AG8K1Wq0APLBwIABDxogMBwYgKgQPFwAuKitVGBUq1WhqtVpWq1A+JDwNVqhAIHwOoBwIABEoJAGB4OFB4daB45OByoPDqxQGLogACIAIPFBwI+EIARgEDwWpB4tqB4hWBPoYADpQPEVAReESIa7FgoOFOAQgCB4ItGAANSaQZOBFowPEEAIPBPggPGIIJ0BBw6gCGAUqPgyBFUQMqJxAxE0Gq0oPKYQOoB5jCCNxKyFB5qiBB6A/MSQQPOP5gvCT5gPDX5JvEb5SPEf5SvEgQCBZ5kAeYQeIlQPCAYIALwEAIAIALgEAIAIAK1APBGBguBEBgeDAH4A/AFw="));

var drawCount = 0;
var sideBar = 0;
var sunRise = "00:00";
var sunSet = "00:00";

function log_debug(o) {
  //console.log(o);
}

// requires the myLocation app
function loadLocation() {
  location = require("Storage").readJSON(LOCATION_FILE,1)||{"lat":51.5072,"lon":0.1276,"location":"London"};
}

function loadSettings() {
  settings = require("Storage").readJSON(SETTINGS_FILE,1)|| {'bg': '#0f0', 'color': 'Green'};
}

function extractTime(d){
  var h = d.getHours(), m = d.getMinutes();
  return(("0"+h).substr(-2) + ":" + ("0"+m).substr(-2));
}

function updateSunRiseSunSet(lat, lon){
  // get today's sunlight times for lat/lon
  var times = SunCalc.getTimes(new Date(), lat, lon);

  // format sunrise time from the Date object
  sunRise = extractTime(times.sunrise);
  sunSet = extractTime(times.sunset);
}

// wrapper, makes it easier if we want to switch to a different font later
function setSmallFont() {
  g.setFont('Vector', 20);
}

// set the text color of the sidebar elements that dont change with the Theme
function setTextColor() {
  // day and steps
  if (settings.color == 'Blue' || settings.color == 'Red') {
    g.setColor('#fff'); // white on blue or red best contrast
  } else {
    g.setColor('#000'); // otherwise black regardless of theme
  }
}


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
  let jsonWeather = require("Storage").readJSON('weather.json');
  return jsonWeather;
}

const h = g.getHeight();
const w = g.getWidth();
const ha = 2*h/5 - 8;
const h2 = 3*h/5 - 10;
const h3 = 7*h/8;
const w2 = Math.max(9*w/14, 64);
const w3 = w2 + ((w - w2)/2);  // centre line of the sidebar
const ws = w - w2; // sidebar width
const wb = 40; // battery width

function draw() {
  log_debug("draw()");
  let date = new Date();
  let da = date.toString().split(" ");
  let hh = da[4].substr(0,2);
  let mm = da[4].substr(3,2);
  //const t = 6;

  if (drawCount % 60 == 0)
    updateSunRiseSunSet(location.lat, location.lon);
  
  g.reset();
  g.setColor(g.theme.bg);
  g.fillRect(0, 0, w2, h);
  g.setColor(settings.bg);
  g.fillRect(w2, 0, w, h);

  // time
  g.setColor(g.theme.fg);
  g.setFontKdamThmor();
  g.setFontAlign(0, -1);
  g.drawString(hh, w2/2, 10 + 0);
  g.drawString(mm, w2/2, 10 + h/2);

  switch(sideBar) {
  case 0:
    drawSideBar1();
    break;
  case 1:
    //drawSideBar2();
    drawSideBar2B();
    break;
  case 2:
    drawSideBar3();
    break;
  }
  
  drawCount++;
  queueDraw();
}

// battery and calendar
function drawSideBar1() {
  let date = new Date();
  let da = date.toString().split(" ");

  drawBattery(w2 + (w-w2-wb)/2,  h/10, wb, 17);

  setTextColor();
  g.setFont('Vector', 20);
  g.setFontAlign(0, -1);
  g.drawString(E.getBattery() + '%', w3,  (h/10) + 17 + 7);
  
  drawDateAndCalendar(w3, h/2, da[0], da[2], da[1]);
}

// battery and steps
function drawSideBar2() {
  drawBattery(w2 + (w-w2-wb)/2,  h/10, wb, 17);

  setTextColor();
  g.setFont('Vector', 20);
  g.setFontAlign(0, -1);
  g.drawString(E.getBattery() + '%', w3,  (h/10) + 17 + 7);

  // steps
  g.drawImage(boot_img, w2 + (ws - 64)/2, h/2, { scale: 1 });
  setSmallFont();
  g.setFontAlign(0, -1);
  g.drawString(formatSteps(), w3, 7*h/8);
}

// weather and steps
function drawSideBar2B() {
  var weatherJson = getWeather();
  var w_temp;
  var w_icon;
  var w_wind;

  if (settings.weather && weatherJson && weatherJson.weather) {
    var currentWeather = weatherJson.weather;
    const temp = locale.temp(currentWeather.temp-273.15).match(/^(\D*\d*)(.*)$/);
    w_temp = temp[1] + " " + temp[2];
    //w_icon = chooseIcon(currentWeather.txt);
    w_icon = cloudIcon;
    const wind = locale.speed(currentWeather.wind).match(/^(\D*\d*)(.*)$/);
    w_wind = wind[1] + " " + wind[2] + " " + (currentWeather.wrose||'').toUpperCase();
  } else {
    w_temp = "Err";
    w_temp = "4'";
    w_wind = "???";
    w_icon = errIcon;
    w_icon = cloudIcon;
  }

  g.setColor(g.theme.fg);
  g.drawImage(w_icon, w2 + (ws - 64)/2,  5, { scale: 1 });
  setSmallFont();
  g.setFontAlign(0,-1); // centre aligned
  // w_temp or w_wind
  g.drawString(w_temp, w3,  5 + 64 + 2);
  // display first 2 words of the wind string eg '4 mph'
  // g.drawString( (w_wind.split(' ').slice(0, 2).join(' ')), (w/2) + 6, 24 + ((y - 24)/2));

  // steps
  g.drawImage(boot_img, w2 + (ws - 64)/2, h/2, { scale: 1 });
  setSmallFont();
  g.setFontAlign(0, -1);
  g.drawString(formatSteps(), w3, 7*h/8);
}

// sunrise, sunset times
function drawSideBar3() {
  g.setColor('#fff'); // sunrise white
  g.drawImage(sunrise_img, w2 + (ws - 64)/2, 0, { scale: 1 });
  setTextColor();
  setSmallFont();
  g.setFontAlign(0, -1);
  g.drawString(sunRise, w3, 64);

  g.setColor('#000'); // sunset black
  g.drawImage(sunset_img, w2 + (ws - 64)/2, h/2, { scale: 1 });
  setTextColor();
  setSmallFont();
  g.setFontAlign(0, -1);
  g.drawString(sunSet, w3, (h/2) + 64);
}

function drawDateAndCalendar(x,y,dy,dd,mm) {
  // day
  setTextColor();
  setSmallFont();
  g.setFontAlign(0, -1);
  g.drawString(dy.toUpperCase(), x, y);

  drawCalendar(x - (w/10), y + 28, w/5, 3, dd);

  // month
  setTextColor();
  setSmallFont();
  g.setFontAlign(0, -1);
  g.drawString(mm.toUpperCase(), x, y + 70);
}

// at x,y width:wi thicknes:th
function drawCalendar(x,y,wi,th,str) {
  g.setColor(g.theme.fg);
  g.fillRect(x, y, x + wi, y + wi);
  g.setColor(g.theme.bg);
  g.fillRect(x + th, y + th, x + wi - th, y + wi - th);
  g.setColor(g.theme.fg);

  let hook_t = 6;
  // first calendar hook, one third in
  g.fillRect(x + (wi/3) - (th/2), y - hook_t, x + wi/3 + th - (th/2), y + hook_t);
  // second calendar hook, two thirds in
  g.fillRect(x + (2*wi/3) -(th/2), y - hook_t, x + 2*wi/3 + th - (th/2), y + hook_t);

  setSmallFont();
  g.setFontAlign(0, 0);
  g.drawString(str, x + wi/2 + th/2, y + wi/2 + th/2);
}

function drawBattery(x,y,wi,hi) {
  g.reset();
  g.setColor(g.theme.fg);
  g.fillRect(x,y+2,x+wi-4,y+2+hi); // outer
  g.clearRect(x+2,y+2+2,x+wi-4-2,y+2+hi-2); // centre
  g.setColor(g.theme.fg);
  g.fillRect(x+wi-3,y+2+(((hi - 1)/2)-1),x+wi-2,y+2+(((hi - 1)/2)-1)+4); // contact
  g.fillRect(x+3, y+5, x +4 + E.getBattery()*(wi-12)/100, y+hi-1); // the level
}
  
function getSteps() {
  if (WIDGETS.wpedom !== undefined) {
    return WIDGETS.wpedom.getSteps();
  }
  return '????';
}

// format steps so they fit in the place
function formatSteps() {
  var s = getSteps();

  if ( s == '????') {
    return s;
  } else if (s < 1000) {
    return s + '';
  } else if (s < 10000) {
    return '' + (s/1000).toFixed(1) + 'K';
  }
  return Math.floor(s / 1000) + 'K';
}

function nextSidebar() {
  if (++sideBar > 2) sideBar = 0;
  log_debug("next: " + sideBar);
}

function prevSidebar() {
  if (--sideBar < 0) sideBar = 2;
  log_debug("prev: " + sideBar);
}

Bangle.setUI("clockupdown", btn=> {
  if (btn<0) prevSidebar();
  if (btn>0) nextSidebar();
  draw();
});


// timeout used to update every minute
var drawTimeout;

// schedule a draw for the next minute
function queueDraw() {
  if (drawTimeout) clearTimeout(drawTimeout);
  drawTimeout = setTimeout(function() {
    drawTimeout = undefined;
    nextSidebar();
    draw();
  }, 60000 - (Date.now() % 60000));
}


log_debug("starting..");
g.clear();
Bangle.loadWidgets();
/*
 * we are not drawing the widgets as we are taking over the whole screen
 * so we will blank out the draw() functions of each widget and change the
 * area to the top bar doesn't get cleared.
 */
for (let wd of WIDGETS) {wd.draw=()=>{};wd.area="";}
loadSettings();
loadLocation();
draw();  // queues the next draw for a minutes time
