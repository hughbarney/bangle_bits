Graphics.prototype.setFontcopasetic = function(scale) {
  // Actual height 41 (44 - 4)
  g.setFontCustom(atob("AAAAAAAAAAAAAAAPAAAAAAAB+AAAAAAAP4AAAAAAA/gAAAAAAB+AAAAAAAHwAAAAAAAEAAAAAAAAAAAAAAAAAwAAAAAAAfAAAAAAAP8AAAAAAH/wAAAAAD//AAAAAB//8AAAAA///wAAAAf//4AAAAP//8AAAAH//+AAAAD///AAAAD///gAAAA///wAAAAD//4AAAAAP/8AAAAAA/+AAAAAAD/AAAAAAAPgAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAf/gAAAAAP//wAAAAD///wAAAA////wAAAH////gAAA/////AAAH/+H/+AAA/+AB/8AAH/gAA/4AAf4AAB/gAD/AAAD/AAP4AAAH8AA/gAAAfwAD+AAAB/AAP4AAAH8AA/gAAAfwAD+AAAB/AAP8AAAP8AAf4AAB/gAB/wAAP+AAD/wAD/wAAH/8B//AAAf////4AAAf////AAAA////wAAAB///+AAAAB///gAAAAA//wAAAAAACAAAAAAAAAAAAAAAGAAAAAAAA8AAAAAAAH4AAAAAAA/wAAAAAAH/AAAAAAA/4AAAAAAD/////wAAf/////AAD/////8AAf/////wAD//////AAf/////8AD//////wAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAADAAAAAAAA8AAMAAAAHwAB8AAAA/AAH8AAAH8AAfwAAB/wAD+AAAP/AAP4AAB/8AA/gAAP/wAD+AAD//AAP4AAf/8AA/gAD//wAD+AAf//AAP8AH/z8AAf4A/+PwAB/wH/g/AAD///8D8AAH///gPwAAf//8A/AAA///AD8AAA//4APwAAB//AA/AAAA/gAAAAAAAAAAAAAAAAAAAAAAPwEAAAAAA/AwAAPwAD8PAAA/AAPx+AAD8AA/P4AAPwAD//gAB/AAP/+AAH8AA//8AAfwAD//wAB/AAP//gAP4AA//+AB/gAD//+AP+AAP8/8D/wAA/h///+AAD8D///wAAPgH//+AAA4AP//wAADAAf/+AAAIAAf/gAAAAAAHwAAAAAAAAAAAAAAAAAwAAAAAAAPAAAAAAAD8AAAAAAA/wAAAAAAP/AAAAAAD/8AAAAAA//wAAAAAP//AAAAAD//8AAAAA///wAAAAP///AAAAD//j8AAAA//4PwAAAP/+A/AAAD//gD8AAAP/4APwAAA/+B///wAD/gH///AAP4Af//8AA+AB///wADgAH///AAIAAf//8AAAAB///wAAAAAD8AAAAAAAPwAAAAAAAAAAAAAAAAAAAAAAeAAAAAAA/4AAPwAB//gAA/AAP/+AAD8AA//4AAPwAD//gAB/AAP/+AAH8AA//4AAfwAD8fwAB/AAPx/AAP8AA/H+AA/gAD8P8AH+AAPw/4B/wAA/B/8//AAD8H///4AAPwP///AAA/Af//4AAAAA///AAAAAA//wAAAAAA/8AAAAAAAAAAAAAAAAAAAAAAAB/8AAAAAA//8AAAAAP//8AAAAB///4AAAAf///wAAAD////gAAAf/4f/AAAD/+Af8AAAf/gAf4AAD/8AA/gAAP/wAD/AAB/+AAH8AAP/4AAfwAA//gAB/AAH/8AAH8AAf/4AAfwAB+/gAB/AAP7+AAH8AA/v4AAfwAD+fwAD+AAP5/gAf4AA/n/AD/gAD8P/A/8AAAAf///gAAAA///8AAAAB///gAAAAD//8AAAAAH//gAAAAAH/4AAAAAAD8AAAAAAAAAAAAD8AAAAAAAPwAAAAMAA/AAAAHwAD8AAAD/AAPwAAB/8AA/AAA//wAD8AAf//AAPwAP//8AA/AD///AAD8B///gAAPw///wAAA////4AAAD///+AAAAP///AAAAA///gAAAAD//wAAAAAP/4AAAAAA/8AAAAAAD+AAAAAAAPAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAA/8AAAAAAP/8AAAAAB//8AAAAAf//4AAAAD///wAAAAf///gAAAB/4f/AAAHv+Af8AAB//gAf4AAP/8AA/gAB//wAD/AAH/+AAH8AA//4AAfwAD//gAB/AAP78AAH8AA//4AAfwAD//gAB/AAP/+AAH8AAf/4AAfwAA//wAD+AAB//gAf4AAD//AD/gAAAP/A/8AAAAf///gAAAA///8AAAAB///gAAAAD//8AAAAAH//gAAAAAH/4AAAAAAD8AAAAAAAAAAAAAAP/AAAAAAD//AAAAAA///AAAAAH//+AAAAA///8AAAAH///4AAAA/+H/w/AAD/gH/H8AAf4AH+fwAB/AAP5/AAP8AA/38AA/gAB/fwAD+AAH9+AAP4AAf34AA/gAA//gAD+AAD/8AAP4AAf/wAA/gAB/+AAD+AAH/4AAH8AA//AAAf4AH/4AAB/wA//gAAD/wP/8AAAH////gAAAP///4AAAAf///AAAAA///wAAAAB//+AAAAAB//AAAAAAA/AAAAAAAAAAAAAAAAAB4A8AAAAAPwH4AAAAA/g/gAAAAD+D+AAAAAPwH4AAAAAfAfAAAAAAQAQA"), 46, atob("CBUeDxoVGxYfFx8fCA=="), 52+(scale<<8)+(1<<16));
};

g.clear();
g.setColor('#fff');
g.fillRect(0,0,g.getWidth(), g.getHeight());

g.setFontcopasetic(2);
g.setFontAlign(0,0);

g.setColor('#000');
g.drawString("09", g.getWidth()/2, g.getHeight()/4);

//g.setColor('#fb8');
g.drawString("30", g.getWidth()/2, 3*g.getHeight()/4);