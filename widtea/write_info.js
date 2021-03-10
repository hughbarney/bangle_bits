

const INFO_FILE = "widtea.info";

let teainfo = {
  "id":"widtea",
  "name":"TEA Widget",
  "type":"widget",
  "version":"0.01",
  "files":"widtea.info, widtea.wid.js,widtea.app.js"
};


require("Storage").write(INFO_FILE, teainfo);
teainfo = require("Storage").readJSON(INFO_FILE,1)||{};
console.log(teainfo);

