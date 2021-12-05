
var hackmenu = eval(require("Storage").read("hackmenu.js"));
var m = {
  "" : { "title" : "Settings" },
  "Make Connectable" : function() { LED1.set(); },
  "App/Widget Settings" : function() { LED1.reset(); },
  "BLE" : function() { LED1.set(); },
  "Debug Info" : function() { LED1.reset(); },
  "Beep" : function() { LED1.set(); },
  "Vibration" : function() { LED1.reset(); },
  "Quiet Mode" : function() { LED1.reset(); },
  "Locale" : function() { LED1.reset(); },
  "Exit" : function() { }, // nothing for now
};
hackmenu(m);
