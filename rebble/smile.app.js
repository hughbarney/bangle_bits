const locale = require('locale');
const weather = require('weather');
let current = weather.get();

Graphics.prototype.setFontLECO1976Regular40 = function(scale) {
  // Actual height 41 (40 - 0)
  g.setFontCustom(atob("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//+fgAf//8/AA///5+AB///z8AD///n4AH//+PwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/4AAAAP/wAAAAf/gAAAA//AAAAB/+AAAAD/8AAAAAAAAAAAAAAAAAAf/gAAAA//AAAAB/+AAAAD/8AAAAH/4AAAAP/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfg/AAA////+AB////8AD////4AH////wAP////gAf////AAA/B+AAAB+D8AAAD8H4AAAH4PwAAAPwfgAAAfg/AAA////+AB////8AD////4AH////wAP////gAf////AAA/B+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//+D8AD//8H4AH//4PwAP//wfgAf//g/AA///B+AB+B+D8D/8D8H///4H4P///wPwf///gfg////A/B///+B+D/8D8D8H4AH4H//wAPwP//gAfgf//AA/A//+AB+B//8AD8D//4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH//4AAAP//wAAAf//gAAA///ACAB8A+AcAD4B8B4AHwD4PwAPgHw/gAf//n/AA///f8AB////wAD///+AAH///4AAAAH/AAAAAf8AAAAD/gAAAAP+AAAAB/wAAAAH///wAA////gAD////AAP///+AB/z//8AD/HwD4AH4PgHwAPgfAPgAcA+AfAAwB//+AAAD//8AAAH//4AAAP//wAAAP//gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////gAf////AA////+AB////8AD////4AH////wAPwPwfgAfgfg/AA/A/B+AB+B+D8AD8D8H4AH4H4PwAPwPwfgAfgfg/AA/A//+AB+B//8AD8D//4AH4H//wAPwP//gAfgf//AAAA/AAAAAB+AAAAAD8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/+AAAAD/8AAAAH/4AAAAP/wAAAAf/gAAAA//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+AAAAAP/gAAAB//4AAAf//+AAH////AB/////wf//j//9//4A////+AAP///gAAD//8AAAA//AAAAAPwAAAAACAAAAAAAAAAAAAEAAAAAAfAAAAAH/wAAAB//8AAAP///AAD////gA//7//4P//x/////8Af////AAH///wAAB//8AAAAf/gAAAAH4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIIAAAAA4cAAAAHx8AAAAP34AAAAP/gAAAAP/AAAAH//wAAAP//wAAAf//gAAA///AAAB//+AAAAP+AAAAA/+AAAAB9+AAAAH58AAAAHj4AAAAGDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwAAAAAfgAAAAA/AAAAAB+AAAAAD8AAAAD//4AAAP//wAAAf//gAAA///AAAB//+AAAD//8AAAD//4AAAAPwAAAAAfgAAAAA/AAAAAB+AAAAAD8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/4AAAAP/wAAAAf/gAAAA//AAAAB/+AAAAD/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AAAAAH4AAAAAPwAAAAAfgAAAAA/AAAAAB+AAAAAD8AAAAAH4AAAAAPwAAAAAfgAAAAA/AAAAAB+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB+AAAAAD8AAAAAH4AAAAAPwAAAAAfgAAAAA/AAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAHgAAAAD/AAAAA/+AAAAf/8AAAH//4AAB///wAA///4AAP//+AAA///gAAB//wAAAD/8AAAAH+AAAAAPgAAAAAYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////gAf////AA////+AB////8AD////4AH////wAPwAAfgAfgAA/AA/AAB+AB+AAD8AD8AAH4AH4AAPwAPwAAfgAfgAA/AA////+AB////8AD////4AH////wAP////gAf////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/AAB+AB+AAD8AD8AAH4AH4AAPwAPwAAfgAf////AA////+AB////8AD////4AH////wAP////gAf////AAAAAB+AAAAAD8AAAAAH4AAAAAPwAAAAAfgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP+P//gAf8f//AA/4//+AB/x//8AD/j//4AH/H//wAPwPwfgAfgfg/AA/A/B+AB+B+D8AD8D8H4AH4H4PwAPwPwfgAfgfg/AA///B+AB//+D8AD//8H4AH//4PwAP//wfgAf//g/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/AAB+AB+AAD8AD8D4H4AH4H4PwAPwPwfgAfgfg/AA/A/B+AB+B+D8AD8D8H4AH4H4PwAPwPwfgAfgfg/AA/A/B+AB+B+D8AD////4AH////wAP////gAf////AA////+AB////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//8AAAH//4AAAP//wAAAf//gAAA///AAAB//+AAAAAD8AAAAAH4AAAAAPwAAAAAfgAAAAA/AAAAAB+AAAAAD8AAAAAH4AAAP////gAf////AA////+AB////8AD////4AH////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//z/gAf//n/AA///P+AB//+f8AD//8/4AH//5/wAPwPwfgAfgfg/AA/A/B+AB+B+D8AD8D8H4AH4H4PwAPwPwfgAfgfg/AA/A//+AB+B//8AD8D//4AH4H//wAPwP//gAfgf//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////+AB////8AD////4AH////wAP////gAf////AA/A/B+AB+B+D8AD8D8H4AH4H4PwAPwPwfgAfgfg/AA/A/B+AB+B+D8AD8D//4AH4H//wAPwP//gAfgf//AA/A//+AB+B//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAA/4AAAAB/wAAAAD/gAAAAH/AAAAAP+AAAAAf8AAAAA/AAAAAB+AAAAAD8AAAAAH4AAAAAPwAAAAAfgAAAAA/AAAAAB+AAAAAD8AAAAAH////wAP////gAf////AA////+AB////8AD////4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////4AH////wAP////gAf////AA////+AB////8AD8D8H4AH4H4PwAPwPwfgAfgfg/AA/A/B+AB+B+D8AD8D8H4AH4H4PwAP////gAf////AA////+AB////8AD////4AH////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//wfgAf//g/AA///B+AB//+D8AD//8H4AH//4PwAPwPwfgAfgfg/AA/A/B+AB+B+D8AD8D8H4AH4H4PwAPwPwfgAfgfg/AA////+AB////8AD////4AH////wAP////gAf////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/AB+AAB+AD8AAD8AH4AAH4APwAAPwAfgAAfgA/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfgA//AA/AB/+AB+AD/8AD8AH/4AH4AP/wAPwAf/gAAAAAAAAAAAAAAAAAAAAAAH8AAAAAP4AAAAA/4AAAAB/wAAAAD/gAAAAP/gAAAAf/AAAAB//AAAAD9+AAAAH78AAAAfj8AAAA/H4AAAD+P4AAAH4PwAAAfwfwAAA/AfgAAB+A/AAAH4A/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8H4AAAH4PwAAAPwfgAAAfg/AAAA/B+AAAB+D8AAAD8H4AAAH4PwAAAPwfgAAAfg/AAAA/B+AAAB+D8AAAD8H4AAAH4PwAAAPwfgAAAfg/AAAA/B+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH8B/AAAH4D8AAAP4P4AAAPwfgAAAfg/AAAA/j+AAAA/H4AAAB/fwAAAB+/AAAAD/+AAAAD/4AAAAH/wAAAAP/gAAAAP+AAAAAf8AAAAAfwAAAAA/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf8AAAAA/4AAAAB/wAAAAD/gAAAAH/AAAAAP+P8fgAfgf8/AA/A/5+AB+B/z8AD8D/n4AH4H/PwAPwP8fgAfgfgAAA/A/AAAB//+AAAD//8AAAH//4AAAP//wAAAf//gAAA///AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/////8D/////4H/////wP/////gf/////A/////+B+AAAD8D8AAAH4H4//+PwPx//8fgfj//4/A/H//x+B+P//j8D8f//H4H4/B+PwPx+D8fgfj8H4/A////x+B////j8D////H4H///+PwP///8fgf///4/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////+AB////8AD////4AH////wAP////gAf////AA/A/AAAB+B+AAAD8D8AAAH4H4AAAPwPwAAAfgfgAAA/A/AAAB+B+AAAD////4AH////wAP////gAf////AA////+AB////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////4AH////wAP////gAf////AA////+AB////8AD8D8H4AH4H4PwAPwPwfgAfgfg/AA/A/B+AB+B+D8AD8D8H4AH4H4PwAP////gAf////AA////+AB////8AD//P/4AH/8P/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////gAf////AA////+AB////8AD////4AH////wAPwAAfgAfgAA/AA/AAB+AB+AAD8AD8AAH4AH4AAPwAPwAAfgAfgAA/AA/AAB+AB+AAD8AD8AAH4AH4AAPwAPwAAfgAfgAA/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////+AB////8AD////4AH////wAP////gAf////AA/AAB+AB+AAD8AD8AAH4AH4AAPwAPwAAfgAfgAA/AA/gAD+AB/gAP8AD////4AD////gAD///+AAD///4AAD///gAAD//+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////4AH////wAP////gAf////AA////+AB////8AD8D8H4AH4H4PwAPwPwfgAfgfg/AA/A/B+AB+B+D8AD8D8H4AH4H4PwAPwPwfgAfgfg/AA/A/B+AB+AAD8AD8AAH4AH4AAPwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////gAf////AA////+AB////8AD////4AH////wAPwPwAAAfgfgAAA/A/AAAB+B+AAAD8D8AAAH4H4AAAPwPwAAAfgfgAAA/A/AAAB+B+AAAD8D8AAAH4AAAAAPwAAAAAfgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////gAf////AA////+AB////8AD////4AH////wAPwAAfgAfgAA/AA/A/B+AB+B+D8AD8D8H4AH4H4PwAPwPwfgAfgfg/AA/A//+AB+B//8AD8D//4AH4H//wAPwP//gAfgf//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////+AB////8AD////4AH////wAP////gAf////AAAA/AAAAAB+AAAAAD8AAAAAH4AAAAAPwAAAAAfgAAAAA/AAAAAB+AAAD////4AH////wAP////gAf////AA////+AB////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////4AH////wAP////gAf////AA////+AB////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB+AAD8AD8AAH4AH4AAPwAPwAAfgAfgAA/AA/AAB+AB+AAD8AD8AAH4AH4AAPwAPwAAfgAfgAA/AA/AAB+AB+AAD8AD////4AH////wAP////gAf////AA////+AB////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB////8AD////4AH////wAP////gAf////AA////+AAAH+AAAAAf8AAAAB/4AAAAP/wAAAA//gAAAH//AAAAf/+AAAB/78AAAH/H//wAP8P//gAfwf//AA+A//+AB4B//8ADAD//4AEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH////wAP////gAf////AA////+AB////8AD////4AAAAAPwAAAAAfgAAAAA/AAAAAB+AAAAAD8AAAAAH4AAAAAPwAAAAAfgAAAAA/AAAAAB+AAAAAD8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB////8AD////4AH////wAP////gAf////AA//wAAAA//4AAAAP/+AAAAH//AAAAB//wAAAAf/4AAAAP/+AAAAD/8AAAAA/4AAAAA/wAAAAP/gAAAD//AAAAf/8AAAH//AAAB//wAAAP/+AAAD//gAAAf/8AAAA////+AB////8AD////4AH////wAP////gAf////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf////AA////+AB////8AD////4AH////wAP/wAAAAP/wAAAAH/4AAAAH/8AAAAD/+AAAAB//AAAAA//AAAAAf/gAAAAP/wAAAAH/4AAAAD/4AH////wAP////gAf////AA////+AB////8AD////4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////4AH////wAP////gAf////AA////+AB////8AD8AAH4AH4AAPwAPwAAfgAfgAA/AA/AAB+AB+AAD8AD8AAH4AH4AAPwAP////gAf////AA////+AB////8AD////4AH////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////gAf////AA////+AB////8AD////4AH////wAPwPwAAAfgfgAAA/A/AAAB+B+AAAD8D8AAAH4H4AAAPwPwAAAfgfgAAA///AAAB//+AAAD//8AAAH//4AAAP//wAAAf//gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////gAf////AA////+AB////8AD////4AH////wAPwAAfgAfgAA/AA/AAB+AB+AAD8AD8AAH4AH4AAPwAPwAAfgAfgAA/AA/////+B/////8D/////4H/////wP/////gf/////AAAAAB+AAAAAD8AAAAAH4AAAAAPwAAAAAAAAAAAAAAAAAAAAB////8AD////4AH////wAP////gAf////AA////+AB+B/AAAD8D/AAAH4H/gAAPwP/gAAfgf/gAA/A//wAB+B//wAD8D//wAH//5/wAP//x/gAf//g/AA///A+AB//+A8AD//8AYAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH//4PwAP//wfgAf//g/AA///B+AB//+D8AD//8H4AH4H4PwAPwPwfgAfgfg/AA/A/B+AB+B+D8AD8D8H4AH4H4PwAPwPwfgAfgf//AA/A//+AB+B//8AD8D//4AH4H//wAPwP//gAAAAAAAAAAAAAAAAAAAAAAAAAAAAH4AAAAAPwAAAAAfgAAAAA/AAAAAB+AAAAAD8AAAAAH4AAAAAP////gAf////AA////+AB////8AD////4AH////wAP////gAfgAAAAA/AAAAAB+AAAAAD8AAAAAH4AAAAAPwAAAAAfgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////gAf////AA////+AB////8AD////4AH////wAAAAAfgAAAAA/AAAAAB+AAAAAD8AAAAAH4AAAAAPwAAAAAfgAAAAA/AA////+AB////8AD////4AH////wAP////gAf////AAAAAAAAAAAAAAAAAAAAAAGAAAAAAPgAAAAAf4AAAAA/+AAAAB//AAAAD//wAAAD//8AAAA///AAAAP//wAAAD//8AAAA//8AAAAP/4AAAAD/wAAAAP/gAAAD//AAAA//+AAAP//wAAD//8AAA///AAAP//4AAAf/+AAAA//gAAAB/4AAAAD+AAAAAHgAAAAAMAAAAAAcAAAAAA/gAAAAB/8AAAAD//gAAAH//8AAAP///gAAP///8AAA///+AAAH//8AAAAf/4AAAAD/wAAAAf/gAAAP//AAAP//+AAH///8AD///+AAH///AAAP//gAAAf/wAAAA//8AAAB///AAAD///4AAA////AAAH///gAAA///AAAAD/+AAAAA/8AAAAP/4AAAP//wAAH///gAH////AA////AAB///gAAD//wAAAH/4AAAAP8AAAAAeAAAAAAgAAACABwAAAcADwAAB4AH4AAPwAP4AA/gAf8AH/AA/8Af+AA/+D/4AA/+P/gAAf//8AAAf//wAAAP/+AAAAP/4AAAAf/wAAAB//wAAAP//4AAA///4AAH/x/8AA//B/+AB/4A/8AD/AAf4AH8AAfwAPgAAPgAeAAAPAAwAAAGABAAAAEAAAAAAAAAAAAAAAAAAAAAAf//gAAA///AAAB//+AAAD//8AAAH//4AAAP//wAAAAAfgAAAAA//+AAAB//8AAAD//4AAAH//wAAAP//gAAAf//AAAA/AAAB//+AAAD//8AAAH//4AAAP//wAAAf//gAAA///AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB+B//8AD8D//4AH4H//wAPwP//gAfgf//AA/A//+AB+B+D8AD8D8H4AH4H4PwAPwPwfgAfgfg/AA/A/B+AB+B+D8AD8D8H4AH//4PwAP//wfgAf//g/AA///B+AB//+D8AD//8H4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/////////////////////////////////////////4AAAAP/wAAAAf/gAAAA//AAAAB/+AAAAD/8AAAAH4AAAAAAAAAAAAAQAAAAAA8AAAAAB/gAAAAD/4AAAAH//AAAAP//wAAAf//8AAAD///gAAA///4AAAP//4AAAB//wAAAAf/gAAAAD/AAAAAA+AAAAAAMAAAAAAAAAAAAAAAPwAAAAf/gAAAA//AAAAB/+AAAAD/8AAAAH/4AAAAP/////////////////////////////////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAA4AAAAAPwAAAAB/gAAAAf/AAAAD/+AAAAf/8AAAD//AAAAP/4AAAAf+AAAAA/wAAAAB/8AAAAD/+AAAAD//AAAAB//wAAAA//gAAAAP/AAAAAH+AAAAAD8AAAAAA4AAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwAAAAAfgAAAAA/AAAAAB+AAAAAD8AAAAAH4AAAAAPwAAAAAfgAAAAA/AAAAAB+AAAAAD8AAAAAH4AAAAAPwAAAAAfgAAAAA/AAAAAB+AAAAAD8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP+P//gAf8f//AA/4//+AB/x//8AD/j//4AH/H//wAPwPwfgAfgfg/AA/A/B+AB+B+D8AD8D8H4AH4H4PwAPwPwfgAfgfg/AA////+AB////8AD////4AH////wAP////gAf////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwAAfgAfgAA/AA/AAB+AB////8AD////4AH////wAP////gAf////AA////+AB+B+D8AD8D8H4AH4H4PwAPwPwfgAfgfg/AA/A/B+AB+B+D8AD////4AH////wAP////gAf////AA////+AB////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////4AH////wAP////gAf////AA////+AB////8AD8AAH4AH4AAPwAPwAAfgAfgAA/AA/AAB+AB+AAD8AD8AAH4AH4AAPwAP+AD/gAf8AH/AA/4AP+AB/wAf8AD/gA/4AH/AB/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AAH4AH4AAPwAPwAAfgAf////AA////+AB////8AD////4AH////wAP////gAfgAA/AA/AAB+AB+AAD8AD8AAH4AH4AAPwAPwAAfgAfgAA/AA////+AB////8AD////4AH////wAP////gAf////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////+AB////8AD////4AH////wAP////gAf////AA/A/B+AB+B+D8AD8D8H4AH4H4PwAPwPwfgAfgfg/AA/A/B+AB+B+D8AD//8/4AH//5/wAP//z/gAf//n/AA///P+AB//+f8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////4AH////wAP////gAf////AA////+AB////8AD8D8AAAH4H4AAAPwPwAAAfgfgAAA/A/AAAB+B+AAAD8D8AAAH4H4AAAP+PwAAAf8fgAAA/4/AAAB/wAAAAD/gAAAAH/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//8/4AH//5/wAP//z/gAf//n/AA///P+AB//+f8AD8D8H4AH4H4PwAPwPwfgAfgfg/AA/A/B+AB+B+D8AD8D8H4AH4H4PwAP////gAf////AA////+AB////8AD////4AH////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////gAf////AA////+AB////8AD////4AH////wAAAPwAAAAAfgAAAAA/AAAAAB+AAAAAD8AAAAAH4AAAAAPwAAAAAfgAAA////+AB////8AD////4AH////wAP////gAf////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////+AB////8AD////4AH////wAP////gAf////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfgAH/AA/AAP+AB+AAf8AD8AA/4AH4AB/wAPwAD/gAfgAA/AA/AAB+AB+AAD8AD8AAH4AH4AAPwAPwAAfgAfgAA/AA////+AB////8AD////4AH////wAP////gAf////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf////AA////+AB////8AD////4AH////wAP////gAAA/gAAAAB/AAAAAD+AAAAAH8AAAAAP4AAAAAf//gAAA///AAAB//+AB////8AD////4AH////wAP//wfgAf//g/AA///B+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB////8AD////4AH////wAP////gAf////AA////+AAAAAD8AAAAAH4AAAAAPwAAAAAfgAAAAA/AAAAAB+AAAAAD8AAAAAH4AAAAAPwAAAAAfgAAAAA/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf////AA////+AB////8AD////4AH////wAP////gAfgAAAAA/AAAAAB+AAAAAD8AAAAAH4AAAAAP////gAf////AA////+AB////8AD////4AH////wAPwAAAAAfgAAAAA/AAAAAB+AAAAAD8AAAAAH4AAAAAP////gAf////AA////+AB////8AD////4AH////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH////wAP////gAf////AA////+AB////8AD////4AH4AAAAAPwAAAAAfgAAAAA/AAAAAB+AAAAAD8AAAAAH4AAAAAPwAAAAAf////AA////+AB////8AD////4AH////wAP////gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf////AA////+AB////8AD////4AH////wAP////gAfgAA/AA/AAB+AB+AAD8AD8AAH4AH4AAPwAPwAAfgAfgAA/AA/AAB+AB////8AD////4AH////wAP////gAf////AA////+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB////8AD////4AH////wAP////gAf////AA////+AB+B+AAAD8D8AAAH4H4AAAPwPwAAAfgfgAAA/A/AAAB+B+AAAD8D8AAAH//4AAAP//wAAAf//gAAA///AAAB//+AAAD//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB////8AD////4AH////wAP////gAf////AA////+AB+AAD8AD8AAH4AH4AAPwAPwAAfgAfgAA/AA/AAB+AB+AAD8AD8AAH4AH/////wP/////gf/////A/////+B/////8D/////4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH////wAP////gAf////AA////+AB////8AD////4AH4H4AAAPwPwAAAfgfgAAA/A/AAAB+B+AAAD8D//4AH4H//wAPwP//gAf////AA////+AB////8AD//8H4AH//4PwAP//wfgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf//n/AA///P+AB//+f8AD//8/4AH//5/wAP//z/gAfgfg/AA/A/B+AB+B+D8AD8D8H4AH4H4PwAPwPwfgAfgfg/AA/A/B+AB/x//8AD/j//4AH/H//wAP+P//gAf8f//AA/4//+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAfgAAAAA/AAAAAB+AAAAAD8AAAAAH4AAAAAPwAAAAAfgAAAAA////+AB////8AD////4AH////wAP////gAf////AA////+AB+AAAAAD8AAAAAH4AAAAAPwAAAAAfgAAAAA/AAAAAB+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////+AB////8AD////4AH////wAP////gAf////AAAAAB+AAAAAD8AAAAAH4AAAAAPwAAAAAfgAAAAA/AAAAAB+AAAAAD8AD////4AH////wAP////gAf////AA////+AB////8AAAAAH4AAAAAPwAAAAAfgAAAAAAAAAAAAAAAAAAAAAAAAAAAAH////wAP////gAf////AA////+AB////8AD////4AAAAAPwAAAAAfgAAAAA/AAAAAB+AAAAAD8AAAAAH4AAAAAPwAAAAAfgAf////AA////+AB////8AD////4AH////wAP////gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf////AA////+AB////8AD////4AH////wAP////gAAAAA/AAAAAB+AAAAAD8AAAAAH4AAAAAPwAP////gAf////AA////+AB////8AD////4AH////wAAAAAfgAAAAA/AAAAAB+AAAAAD8AAAAAH4AAAAAPwAP////gAf////AA////+AB////8AD////4AH////wAAAAAAAAAAAAAAAAAAAAAB+AAD8AD8AAH4AH4AAPwAP////gAf////AA////+AB////8AD////4AH////wAAAPwAAAAAfgAAAAA/AAAAAB+AAAAAD8AAAAAH4AAAP////gAf////AA////+AB////8AD////4AH////wAPwAAfgAfgAA/AA/AAB+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAf//n/AA///P+AB//+f8AD//8/4AH//5/wAP//z/gAAAfg/AAAA/B+AAAB+D8AAAD8H4AAAH4PwAAAPwfgAAAfg/AAAA/B+AB////8AD////4AH////wAP////gAf////AA////+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/x//8AD/j//4AH/H//wAP+P//gAf8f//AA/4//+AB+B+D8AD8D8H4AH4H4PwAPwPwfgAfgfg/AA/A/B+AB+B+D8AD8D8H4AH//5/wAP//z/gAf//n/AA///P+AB//+f8AD//8/4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB+AAAAAD8AAAAAH4AAAP////wA/////wH/////wf/////x///P//3//8P///wAAAAf/gAAAA//AAAAB/+AAAAD/8AAAAH/4AAAAPwAAAAAAAAAAAAAAAAAAAAAAAAAAD////////////////////////////////////////8AAAAAAAAAAAAAAAAAAAAfgAAAA//AAAAB/+AAAAD/8AAAAH/4AAAAP/wAAAAf///w///f//z//8f/////wf/////Af////8Af////wAAAfgAAAAA/AAAAAB+AAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAGAAAAAA8AAAAAD4AAAAAPwAAAAAfgAAAAA+AAAAAB4AAAAADwAAAAAHwAAAAAPwAAAAAfgAAAAAfAAAAAAeAAAAAA8AAAAAD4AAAAAPwAAAAAfAAAAAA8AAAAABwAAAAADAAAAAAEAAAAAAAAAAAAAAAAA"), 32, atob("DQsUGholGwsRERcXCxELERoWGhoaGhoYGhoLCxYXFhodGhoaGhoYGhoLGBoWIhsaGBsaGhcaGiUaGhoQERAXFxoaGhoaGhgaGgsYGhYiGhoYGhoaFxsaIhoaGhELERoA"), 41+(scale<<8)+(1<<16));
}

var img = require("heatshrink").decompress(atob("rVCwkEogA/AH4A/AH4A/AH4A/AH4AIiIJSADEQigIGoMBFkNAiQsHgQshKBBiIWkcQkgsiWZAriAF0RAAorkoMAAArfjbAMTmYADmMBJi54FJYlBgM//4AD+cQLS0QPApLELAIrEAAJaWJgMjPIhLDLA5aIdB5MHJYZYILQ0RdBxMIJYRYJLQtBgBZOJhJLBLBRaEfQKxPJhBLBLBS1ILCpLDFZQOCggrOUpZLCl4sL+IsIoURAAilMLQUiAAhAFFhMhgAAFFhn/CowUFFhFCiEjJYzTLRw8RCggsIkMCUw5aNRwwUEFg5YBZQ5aaFg5YHLTgsGLBJabFgxYJLRXyGgnzIwpaDFgpYLLRMwCgnyj5aIFgsxLBRaDFiRCBA4IsFmAQGAA0yFifygYQBigsSAAwsPOIMkoMkFk7LBolAgJcBFivyRonzfY3ygMQFANBiAwBFio6OgAnBAANBiIsmbwizXFhxYDFn4AHkYsqDwM/LNUgiYsqLRgsImMCaisgiIACGA0xiIsGoMQl5aVFYUSBQvziEUFg1EkJaWABMxQo4ABoRaWABBYKAAMRLTxYKLUBYMWr5YMLTxYOLQUBiIAYiBYNLQQrZAAJYOAH4A/AGA="));

const h = g.getHeight();
const w = g.getWidth();
const h1 = 4*h/6;
const h2 = 5*h/6;

let w_timestamp = "w1";
let w_temp = "w2";
let w_wind = "w3";
let w_location = "w4";
let w_condition = "w4";

function draw() {
  let date = new Date();
  let da = date.toString().split(" ");
  let hh = da[4].substr(0,2);
  let mm = da[4].substr(3,2);
  const t = 6;

  nextInfo();
  g.reset();
  
  // top section
  g.setColor('#0ff');
  g.fillRect(0, 24, w, h);

  // cloud
  //g.drawImage(img, (w - 112)/2, 20, { scale: 1.25 });
  //g.setFont('6x8',2);
  //g.setColor('#000');
  //g.setFont('Vector', 15);
  //g.drawString(w_timestamp, 10, 30);
  //g.drawString(w_temp + ' ' + w_wind, 10, 50);
  //g.drawString(w_location, 10, 70);
  //g.drawString(w_condition, 10, 90);
  
  // time
  g.setColor('#000');
  g.setFontLECO1976Regular40();
  g.setFontAlign(0, -1);
  g.drawString(hh + ':' + mm, w/2, h1 - 8);
  
  // bottom black rectangle
  g.setColor('#000');
  g.fillRect(t, h2, w -t, h2 + 4);

  // bottom status line
  g.setColor('#000');
  g.setFont('Vector', 18);
  g.setFontAlign(0, -1);
  g.drawString((infoData[infoMode].calc()), w/2, h - 20);
}

const infoData = {
//  ID_BLANK: { calc: () => '' },
//  ID_DATE:  { calc: () => {var d = (new Date).toString().split(" "); return d[2] + ' ' + d[1] + ' ' + d[3];} },
//  ID_DAY:   { calc: () => {var d = require("locale").dow(new Date).toLowerCase(); return d[0].toUpperCase() + d.substring(1);} },
  ID_TEMP:  { calc: () => w_temp },
  ID_WIND:  { calc: () => w_wind },
  ID_COND:  { calc: () => w_condition },
  ID_TST:   { calc: () => w_timestamp },
  ID_LOC:   { calc: () => w_location }
};

const infoList = Object.keys(infoData).sort();
let infoMode = infoList[0];

function nextInfo() {
  let idx = infoList.indexOf(infoMode);
  if (idx > -1) {
    if (idx === infoList.length - 1) infoMode = infoList[0];
    else infoMode = infoList[idx + 1];
  }
}

function prevInfo() {
  let idx = infoList.indexOf(infoMode);
  if (idx > -1) {
    if (idx === 0) infoMode = infoList[infoList.length - 1];
    else infoMode = infoList[idx - 1];
  }
}

function formatDuration(millis) {
  let pluralize = (n, w) => n + " " + w + (n == 1 ? "" : "s");
  if (millis < 60000) return "< 1 min";
  if (millis < 3600000) return pluralize(Math.floor(millis/60000), "min");
  if (millis < 86400000) return pluralize(Math.floor(millis/3600000), "hr");
  return pluralize(Math.floor(millis/86400000), "day");
}

function update() {
  current = weather.get();
  NRF.removeListener("connect", update);
  if (current) {
    w_timestamp = `${formatDuration(Date.now() - current.time)} ago`;
    w_temp = "Temp " + locale.temp(current.temp-273.15).match(/^(\D*\d*)(.*)$/)[0];
    w_wind = "Wind " + locale.speed(current.wind).match(/^(\D*\d*)(.*)$/)[0];
    w_condition = current.txt.charAt(0).toUpperCase()+(current.txt||'').slice(1);
    w_location = current.loc.charAt(0) + current.loc.toLowerCase().slice(1);
    draw();
  } else {
    if (NRF.getSecurityStatus().connected) {
      E.showMessage("Weather\nunknown\n\nIs Gadgetbridge\nweather\nreporting set\nup on your\nphone?");
    } else {
      E.showMessage("Weather\nunknown\n\nGadgetbridge\nnot connected");
      NRF.on("connect", update);
    }
  }
}

Bangle.setUI("clockupdown", btn=> {
  if (btn<0) prevInfo();
  if (btn>0) nextInfo();
  draw();
});

g.setTheme({bg:"#0ff",fg:"#000",dark:false}).clear();
Bangle.loadWidgets();
Bangle.drawWidgets();
/*
 * we are not drawing the widgets as we are taking over the whole screen
 * so we will blank out the draw() functions of each widget
 */
//for (let wd of WIDGETS) {wd.draw=()=>{};}
setInterval(draw, 15000); // refresh every 15s
weather.on("update", update);
update();
draw();
