Graphics.prototype.setFontcopasetic = function(scale) {
  // Actual height 40 (46 - 7)
  g.setFontCustom(atob("AAAAAAAAAAAAAAABwAAAAAAAPgAAAAAAB+AAAAAAAH4AAAAAAAPgAAAAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAADwAAAAAAB/AAAAAAA/8AAAAAAf/wAAAAAP/8AAAAAH/+AAAAAD//AAAAAB//gAAAAA//wAAAAAf/4AAAAAP/8AAAAAH/+AAAAAB//AAAAAAH/gAAAAAAfwAAAAAAB4AAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAf4AAAAAA//+AAAAAP///AAAAD////AAAA////+AAAH/wA/8AAA/wAAf4AAH8AAAfwAA/gAAAfgAD8AAAA+AAfgAAAD8AB8AAAAHwAHwAAAAfAAfAAAAB8AB8AAAAHwAHwAAAAfAAfAAAAB8AB8AAAAHwAH4AAAA/AAPgAAAD4AA/AAAAfgAB/AAAH8AAD/AAB/gAAH/gA/8AAAP////gAAAP///8AAAAf///AAAAAP//wAAAAAD/wAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAcAAAAAAAD4AAAAAAAfwAAAAAAD+AAAAAAAfwAAAAAAB+AAAAAAAP/////wAB//////AAP/////8AB//////wAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAADAAEAAAAAcAA4AAAADwAD4AAAA/AAfAAAAH8AB8AAAA/wAHwAAAH/AAfAAAB/8AB8AAAP/wAHwAAB/fAAfAAAP58AB8AAD/HwAH4AAf4fAAPgAD+B8AA/AA/wHwAB/AH+AfAAD/B/wB8AAH//8AHwAAP//gAfAAAf/8AB8AAAf/AADwAAAPgAAAAAAAAAAAAAAAAAAAAAAHgAAAAAAAfAAAAA8AB8DAAAHwAHweAAAfAAfD4AAB8AB8/gAAHwAH3+AAAfAAf/4AAB8AB//wAAPwAH//AAA+AAf9+AAH4AB/D8AA/AAH4H4AH8AAfAf4A/gAB4A/8/8AAGAB///gAAQAD//8AAAAAD//AAAAAAD/wAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAADgAAAAAAA+AAAAAAAP4AAAAAAD/gAAAAAA/+AAAAAAP/4AAAAAD//gAAAAA/+eAAAAAP/h4AAAAD/4HgAAAA/+AeAAAAP/gB4AAAD/4AHgAAA/+AAeAAAH/gAB4AAAf4AAHgAAB+AA///wAHgAH///AAYAAf//8AAAAB///wAAAAD///AAAAAAHgAAAAAAAeAAAAAAAAAAAAAAAAAAAAAADgAAAAAAH+AAAAAAP/4AAB8AB//gAAHwAH/+AAAfAAf/4AAB8AB+PgAAHwAHw+AAAfAAfB8AAB8AB8HwAAPgAHwfgAB+AAfA+AAHwAB8D8AA/AAHwH8AP4AAfAP8D/AAB4Af//4AAAAA///AAAAAB//4AAAAAB/+AAAAAAA/AAAAAAAAAAAAAAAAAAAAAAAAD/gAAAAAB//gAAAAA///gAAAAP///AAAAB////AAAAP/gH+AAAD/4AH4AAAf/AAPwAAD/4AAfgAAP/AAA+AAB/8AAD4AAP/gAAHwAA++AAAfAAHz4AAB8AAfPgAAHwAD4+AAAfAAPj4AAB8AB8PgAAHwAHw+AAAfAAfD4AAB8AB8HwAAPgAHwfgAB+AAfA/AAHwAAAD+AB/AAAAH8AP4AAAAP+H/AAAAAf//4AAAAA///AAAAAA//wAAAAAA/8AAAAAAAAAAAAAAAAAAAAB4AAAAAAAHwAAAAAAAfAAAAAMAB8AAAAHwAHwAAAD/AAfAAAB/8AB8AAA//wAHwAAf/8AAfAAP/+AAB8AD//AAAHwB//gAAAfA//wAAAB8f/4AAAAH//+AAAAAf//AAAAAB//gAAAAAH/wAAAAAAf4AAAAAAB8AAAAAAAGAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/gAAAAAAf/gAAAAAH//gAAAAA///gAAAAP///AAAAB/gH+AAAAH4AH4AAAA/AAPwAADz4AAfgAA//AAA+AAH/8AAD4AA//gAAHwAH/+AAAfAAfH4AAB8AB8PgAAHwAHw+AAAfAAfH4AAB8AB//gAAHwAD/+AAAfAAP/4AAB8AAf/wAAPgAAf/gAB+AAAA/AAHwAAAD+AB/AAAAH8AP4AAAAP+H/AAAAAf//4AAAAA///AAAAAA//wAAAAAA/8AAAAAAAAAAAAAAAAAAAAAAD/AAAAAAA//AAAAAAP//AAAAAD//+AAAAAf//+AAAAD/AP8AAAAPwAPwAAAB+AAfgPAAPwAA/B8AA+AAB8HwAD4AAHwfAAfAAAPh8AB8AAA+HwAHwAAD4+AAfAAAPj4AB8AAA+PgAHwAAD58AAfAAAPvwAB8AAA++AAH4AAD/4AAPgAAf/AAA/AAD/4AAB+AAP/AAAH8AD/4AAAP4Af/AAAAf8P/4AAAA///+AAAAB///wAAAAB//4AAAAAB/+AAAAAAAAAAAAAAAAAAAAAAAAAABwcAAAAAAPj4AAAAAB+fgAAAAAH5+AAAAAAPj4AAAAAAcHAAAAAAAAAA="), 46, atob("CBQfDRkVGhYgFiAgCA=="), 52+(scale<<8)+(1<<16));
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
