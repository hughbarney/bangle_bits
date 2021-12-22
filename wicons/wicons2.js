const h = g.getHeight();
const w = g.getWidth();

// cloud, sun, partSun, snow, rain, storm, error
// create 1 bit, max contrast, brightness set to 85
var cloudIcon = require("heatshrink").decompress(atob("kEggIfcj+AAYM/8ADBuFwAYPAmADCCAMBwEf8ADBhFwg4aBnEPAYMYjAVBhgDDDoQDHCYc4jwDB+EP///FYIDBMTgA=="));
var sunIcon = require("heatshrink").decompress(atob("kEggILIgOAAZkDAYPAgeBwPAgIFBBgPhw4TBp/yAYMcnADBnEcAYMwhgDBsEGgE/AYP8AYYLDCYgbDEYYrD8fHIwI7CIYZLDL54AHA=="));
var sunPartIcon = require("heatshrink").decompress(atob("kEggIHEmADJjEwsEAjkw8EAh0B4EAg35wEAgP+CYMDwv8AYMDBAP2g8HgH+g0DBYMMgPwAYX8gOMEwMG3kAg8OvgSBjg2BgcYGQIcBAY5CBg0Av//HAM///4MYgNBEIMOCoUMDoUAnBwGkEA"));
var snowIcon = require("heatshrink").decompress(atob("kEggITQj/AAYM98ADBsEwAYPAjADCj+AgOAj/gAYMIuEHwEAjEPAYQVChk4AYQhCAYcYBYQTDnEPgEB+EH///IAQACE4IAB8EICIPghwDB4EeBYNAjgDBg8EAYQYCg4bCgZuFA=="));
var rainIcon = require("heatshrink").decompress(atob("kEggIPMh+AAYM/8ADBuFwAYPgmADB4EbAYOAj/ggOAhnwg4aBnAeCjEcCIMMjADCDoQDHjAPCnAXCuEP///8EDAYJECAAXBwkAgPDhwDBwUMgEEhkggEOjFgFgMQLYQAOA=="));
var errIcon = require("heatshrink").decompress(atob("kEggILIgOAAYsD4ADBg/gAYMGsADBhkwAYsYjADCjgDBmEMAYNxxwDBsOGAYPBwYDEgOBwOAgYDB4EDHYPAgwDBsADDhgDBFIcwjAHBjE4AYMcmADBhhNCKIcG/4AGOw4A=="));

function draw() {
  var x = 0;
  var y = 24;

  g.reset();
  g.setColor(g.theme.bg);
  g.fillRect(0, 24, w, h);

  console.log("START...");
  g.setColor(g.theme.fg);

  g.drawImage(cloudIcon, x, y);
  x += 32;
  g.drawImage(sunIcon, x, y);
  x += 32;
  g.drawImage(sunPartIcon, x, y);
  x += 32;
  g.drawImage(snowIcon, x, y);
  x += 32;
  g.drawImage(rainIcon, x, y);

  y += 32; x = 0;
  g.drawImage(errIcon, x, y);  
}

g.clear();
Bangle.loadWidgets();
Bangle.drawWidgets();
draw();
Bangle.setUI("clock");
