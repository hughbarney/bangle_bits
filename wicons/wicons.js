const h = g.getHeight();
const w = g.getWidth();

// cloud, sun, partSun, snow, rain, storm, error
var w_cloud_32 = require("heatshrink").decompress(atob("kEggIfch+AAYM44ADBsEgAYNAiADBwEYAYUPCAIWBmEDAYMQhwNBhARChAZCAZcYCYUQhg1Cg///48CADoA="));
var w_sun_32 = require("heatshrink").decompress(atob("kEggIPMgOAAZgcCAgOAAoVAgQDBg/gAYMMmADBiEIAYMwhg7CgkAjwDBvADDBYYTEDYYjDFYYzDHYRDEK5wALA=="));
var w_part_sun_32 = require("heatshrink").decompress(atob("kEggILImADFiADCjEAoEAhkAwEAgl5BYMB5gDCgH4gECgeOAYMGgcA+UEBoMChkB0EDEAP8gOIgEGgGcBwMEGYMDhAyBgMQ4AqCAYsCIQQbBC4McgEf//wNo5QBgFggEIBQcQOAwABA="));
var w_snow_32 = require("heatshrink").decompress(atob("kEggITQh+AAYMw8ADBsEwAYPAiADBwEbAYUPCAIWBmEHAYMYhgNBhEYAYQZCAZcYCYUwDYVgg////AJZBGCgPACoVAhwMCjgCBgQGCgYDCg4DCPIwA=="));
var w_rain_32 = require("heatshrink").decompress(atob("kEggIPMg4DCn/AAYNgkADBoEQAYPAjADBwEPCAOAhFggeAgEQh4DBjARChAZCAZgTCiEMAYMwg///48CAA0BFgMAwYVBMAMIEIQCBgkYsAGCoCCQ"));

var w_cloud_48 = require("heatshrink").decompress(atob("mEwgJC/AAd/4AFD//gAgUB4E4AoUDgEYAoUGgEMAoUOA4QABBIMGuAFDg/+AocDw+AgEIFgcAvgbC4EB/gFCsEDCYIABuEHS4gyDAoI+DArFgAoopE4A1DH4MDQIUfRAQABMoQA/AAw="));
var w_sun_48  = require("heatshrink").decompress(atob("mEwgIcZgOAAsA+BwEMAoM4AQMcAQgIChwCBuACBgwXBsAeCh/wFIc8ngFDuAZCAAPgg4FD4EDIAhCDAowCBAoMP8YFB4/wAooRFEZg1FIIxNFLIplEOIp9FRIqVFuAXBCgUgAoMEaMAAVA=="));
var w_part_sun_48 = require("heatshrink").decompress(atob("mEwgIQNwAEDgIFPggFEgwFBmAFBg4jBsAFBgYQB4AcC4AYEw/xFIcfvAFDnEIiBXDgH/AoVggfHEgVgGIPggH8sEOgFwgH+sEcDQQRBjEAAIIFDj4eBuAPBj/wQ4UAhE4gEcDYQgBhgnBgAsB4P4OAeDLwUDgZABAoUGgwFDggFESAIFIDYIRDAYIFDGoITBIIcBN4MAHwX/AAIICABruDhgmEPoJWDOII4DJIg/DAAY/BAAagCAAoA="));
var w_snow_48 = require("heatshrink").decompress(atob("mEwgIoln+AAof/8AECgPAuAFCgcAjAFCg0AhgFEhwFCBIIHBAocH/wFDgfPAoMIgECgY3BnAVC4EB/gFCsED4AFDg55EFgYFBHwYFYsAFFFInAGoZ6BIIcPKYP/AAJlCn4FB+CmNGAggBAokfUYQABjwFBGQRCBg56DAoLGDgkAAoYqFCAgqCApI0DABYA=="));
var w_rain_48 = require("heatshrink").decompress(atob("mEwgIifn+AAof/8AECgPAuAFCgeAjAFCg0AhgFIAYIHBAocH/wFDgffAoMIgECEwMAnAVC4EA/gFCsEDA4IFCg5zEFgYFBHAYFYuAFEsApE4A1DPQJBDg+AgP/AAJlCn4FB+CnOgKnDhkDFAIFBjkGPgUAUoMDDhGAmBDEsCRCDQLFDDQVgfL4AF"));

var w_error_32 = require("heatshrink").decompress(atob("kEggIPMgOAAYMD4ADBgVAAYMGsADBgkgAYMIiADBjEYAYMQhADBmEMAYMhwgDBsOGAYNBwQDBwOBGQIDBwEBG4OAgYDB4ECAYNAgwDBsEMAYMwFoUQGoUYiALBhEwAYMMJIUEKIUGLoUD/4ACOQ4"));


function draw() {
  var x = 0;
  var y = 24;

  g.reset();
  g.setColor(g.theme.bg);
  g.fillRect(0, 24, w, h);

  console.log("START...");
  g.setColor(g.theme.fg);

  g.drawImage(w_cloud_32, x, y);
  x += 32;
  g.drawImage(w_sun_32, x, y);
  x += 32;
  g.drawImage(w_part_sun_32, x, y);
  x += 32;
  g.drawImage(w_snow_32, x, y);
  x += 32;
  g.drawImage(w_rain_32, x, y);

  y += 32;  x= 0;
  g.drawImage(w_cloud_48, x, y);
  x += 48;
  g.drawImage(w_sun_48, x, y);
  x += 48;
  g.drawImage(w_part_sun_48, x, y);

  
  y += 48; x = 0;
  g.drawImage(w_snow_48, x, y);
  x += 48;
  g.drawImage(w_rain_48, x, y);


}

g.clear();
Bangle.loadWidgets();
Bangle.drawWidgets();
draw();
Bangle.setUI("clock");
