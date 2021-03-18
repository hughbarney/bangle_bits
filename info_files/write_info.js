

const INFO_FILE = "widhrt.info";

let hrtinfo = {
  "id":"widhrt",
  "name":"HRM Widget",
  "type":"widget",
  "version":"0.01",
  "files":"widhrt.info,widhrt.wid.js"
};


require("Storage").write(INFO_FILE, hrtinfo);
hrtinfo = require("Storage").readJSON(INFO_FILE,1)||{};
console.log(hrtinfo);

