const INFO_FILE = "picoclock.info";

let info = {
  "id":"picoclock",
  "name":"Picoclock",
  "description": "A minimal (pico) clock, leaving plenty of the screen",
  "src":"picoclock.app.js",
  "version":"0.01",
  "tags": "clock",
  "icon":"picoclock.img",
  "type":"clock",
  "files":"picoclock.info,picoclock.app.js,picoclock.img"
};

require("Storage").write(INFO_FILE, info);
info = require("Storage").readJSON(INFO_FILE,1)||{};
console.log(info);
