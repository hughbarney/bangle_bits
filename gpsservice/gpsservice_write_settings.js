const SETTINGS_FILE = "gpsservice.settings.json";
let settings = {"gpsservice":false, "power_mode":"SuperE", "update":120, "search":6}
require("Storage").write(SETTINGS_FILE, settings);
settings = require("Storage").readJSON(SETTINGS_FILE,1)||{};
console.log(settings);

