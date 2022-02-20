const h = g.getHeight();
const w = g.getWidth();

var img = require("heatshrink").decompress(atob("2Wy4P/AoP/g5H/AG8B////wVRh4VB//8CqE/CoX/+AVPCgYAB4BWQAAZaOgYRDj5DPCoWAAoMHAoIVOQAiJBFhgVB/AHEv4sMCoPgOowsLCo5xCCpiqHFhYVJOALFLaxBLHCpsPcBQVJBRd/BRMPXQoVEJpb8CAAs/CpKzBThAJJUwRvIh7pLn5kHg5iJBhUH/gVKTgJvGgYVMJ48BaJQNK/4VLN5E/XRBmEIQ0feRIADIQ0PbhQkJGY7fHWQoGGABF/RgqwMKJCwMEpE/CpoPGj6wMPwRCETRxCGgaaNIQ0BTRxCGTRwQGQh4QFQh5CFh/AISaEQIQiEQIQt8Cp8AE4aEQCIkPQh5CBQATMFABZqDgKEQgE+eabDEDIZCOHwTzQAAN+OQpCPFAJuSgaXCeaDwENyJrBNyjaCNyRVCNyRVDNyQ/CNyQ/CWgSbSWgabRNyYpCZQSbSZQSbSg5uSCYJuTNgTHSNgTHSNgTHTegMDewIARLALHSgE8Y6hWBY6avBLQL0TWYT0TLFjHSgF4gPgCqUeC4IVSIAIXBACJABLH5Y/LGXACyX4gPwCqU+gF8CqUPwEfCqUDLC0ALCc8AIRYSAIRYS4BaBY6RWBLQIARV4KzBACKvBg+ACqITBgJYTCYL0TNgL0TNgKdBY6abTg4pBTaTHCh6bSQQKbTjwYDNyI/BTaUDH4ICCNySbTKoRbCNyS0CNyRFDNyLeSFAbeSNwRCSHwbeRHwZCRS4beRKghCReAcfNyhCRE4n8QiBuCISI9EISDZFISAQEISCEDISImFIR6EEDYOACpsHHghCPQgpCQB4pCPvzNFGQoAIn4cLTRI7FRYqaOOoP4TSRJIAAxnHh6yMgKqGA44AG/yMHWRl/MA6yMEZAeHCppvMj6/HN5giJn7fKh5lIg7fKBZV/ThIVKGxLyBMhMB/4VJbg6PDFhAVLgYsIBJKcDFg4VMBhAVMFgKRGg4VMEYKzFCposBPgsfCposBOAk/CpoPC8DPDCpwQCOIN//7FKAAkPCwIAC/gVOIYQACfZAAICofACqBaCKx4A/ACYA="));

// 300
Graphics.prototype.setFontRoboto16 = function(scale) {
  // Actual height 16 (15 - 0)
  this.setFontCustom(atob("AAAAAAAAAAAAAP+QcBAAAAAA8AAAAPAAAAAAAAiACPAfwPiACLAP4HyACIAAAA4YHwwxhHCHMIQYzAx4AAAAAHgAxADEYHjAEwAM4BnwIRABEAHwAAAAAAHgezDOEMcQyZBw8ABgAfAAAAAA8AAAAAAAD/g8HmADgAGAAGADPB4P+AAAEAASABwA+AAeABIAAAACAAIAAgACAD/gAgACAAIAAgAABAA8AAACAAMAAwADAAAAAAAAEAAQAAAACAB4A8AOAHgAwAAAAD/gYDDAEMAQwBBgcD/gAAAAACAAYABAAH/wf/AAAAAAAAAAAHAwQHDA0MGQwxB+EDgQAAAAADBgQDDCEMIQxhB/MDngAAAAgAGABoAMgDCAYID/8ACAAIAAAABA/HDEEMQQxBDGMMPgAAAAAB/gNjBkEEwQzBCGMAPgAAAAAMAAwBDAcMHAzgD4AOAAAAAAADngbzDGEMYQxhBvMDngAAAAAD4AYxDBEMEQwTBz4D+AAAAAABgQAAAABBg8AAAAAAMABwAFgAyACMAIQAAAAAAMgAyADIAMgAyADIAEgAAAAAAIQAjADIAFgAcAAwACAAAAYADAAMGQxgB8ADgAAAAH8BwMMAYh4kfzTBFIEUhjR/JgECAQGHAHwAAAABAA8AeAHoBwgHCAHoAHgADwABAAAH/w//DGEMYQxhBGEH8wOeAAAAAAH8BwYEAwwBDAEMAQQDBw4BAAAAB/8P/wwBDAEMAQQDBgID/ADwAAAH/w//DGEMYQxhDGEMIQABAAAH/w//DCAMIAwgDCAMIAAAAAAB/AcOBAMMAQwBDDEEMQc/AT4AAAAAB/8H/wBgAGAAYABgAGAAYA//AAAAAAf/B/8AAAAEAAcAAQABAAEAAQf+B/wAAAAAB/8H/wBgAOABsAMMBgYMAwABAAAH/wf/AAEAAQABAAEAAQAAB/8P/wOAAPAAHAAHAAcAPADgA4AP/wf/AAAAAAf/B/8DAAHAAGAAOAAMAAcP/wAAAAAB/AcGBAMMAQwBDAEEAwOOAfwAAAAAB/8P/wwwDDAMMAQgBmADwAAAAAAB/AcGBAMMAQwBDAEEA4OOwfxAAAAAB/8P/wwwDDAMMAQ4Bm4DwwAAAAADhgbDDEEMYQwhBDEGGwMeBAAMAAwADAAP/w//DAAMAAwAAAAAAA/8AA4AAQABAAEAAQADD/4H+AAADAAHgAHgADwABwAHADwB4AcABAAEAAfAAPgADwAPAPgHgA8AAeAAPgAHAH4H4A4AAAAMAwcGAZwA8ADwAZwHBgwDAAAMAAYAA4AA4AA/AHABwAMADgAAAAABDAMMDwwZDHEMwQ+BDgEEAQAAAAAP//gAOAA0AAcAAeAAOAAPAAGIAD/////wAAAAAMAHAA4AA8AAYAAAAACAAIAAgACAAIAAgACAAAgADAAAAAAAAAAAzwCZAZEBEQGTAP8APwAAAAAP/wDDAYEBAQGBAMMAfgAAAAAAfgCDAYEBAQGBAMMARgAAAH4AwwGBAQEBgQ//D/8AAAAQAH4AkwGRAREBkQDzAHAAAADAB/+EwATAAAAAfkDDIYExATGBIP/h/8AAAAAP/wDAAIABAAGAAP8AfwAAAAAN/wD/AAAAAD3/4AAAAAAAD/8AGAAwAGwAxgGDAAEAAA//D/8AAAAAAf8AwAGAAQABgAD/AP8AgAGAAYABgAD/AAAAAAH/AMABgAEAAYAA/wB/AAAAEAB+AMMBgQEBAYEAwwB+AAAAAAH/4MMBgQEBAYEAwwB+AAAAAAB+AMMBgQEBAYEA/+H/4AAAAAH/AMABgAGAAAAA5gGxAZEBkQGZAM8AAAGAA/wH/wGBAAEAAAH+AAMAAQABAAEA/wH/AAABgADgADwABwAPAHgB4AAAAAAA8AA+AAcAPADgAOAAPAAHAB4A8AAAAAEBgwBmADgAPADGAYMAAAGAAOAwPCAHwA8AeAHgAAAAAQGDAY8BmQGxAeEBgQABAAgAGAP/x8H8ABAAB//AAAAADAAWADP34BwACAAAABgAIAAgACAAMAAYAAgAGAAwAAAA=="), 32, atob("BAQFCQkMCgMFBQcJAwUEBgkJCQkJCQkJCQkDAwgJCAcPCgoKCgkJCwsECQoIDgsLCgsKCQoLCg4KCgoEBgQHBwUJCQgJCAUJCQQECAQOCQkJCQUIBQkIDAgICAUEBQsA"), 16+(scale<<8)+(1<<16));
  return this;
}

// 300
Graphics.prototype.setFontRoboto18 = function(scale) {
  // Actual height 18 (17 - 0)
  this.setFontCustom(atob("AAAAAAAAAAAAAAAf8Qf8QAAAAAA+AAAAA+AAAAAAAABGABGwB/wf2AZGABHwD/AfGABGAAAADhwHw4MYIYIM4MOMMIGGYDDwAAAAAAPAAQgAQggZjAPOAAYABjgDPwEIQAIQAHwADAAAAAHgPMwZwQQwQR8QfGQODwADgAPwAAQAAA+AAAAAAAAA/wD/8OAHYABAAAQAAYABOAOD/8AfgAAAGAAGQACwAfgAfgACwAGAAAAAAAAAYAAYAAYAH/gH/gAYAAYAAYAAAAAAAAA8AAQAIAAIAAIAAIAAIAAAAAAQAAQAAAAAIAB4AHAA8AHgAeAAQAAAAAH/AOBgYAQQAQQAQYAQODwH/AAAAAAAEAAMAAIAAYAAf/wAAAAAAAAAAAAAAAOAQMBwYDQQGQQMQYYQPwQHAQAAAAAAGDgMAwYQQQQQQQQY4QPtwHHgAAAACAAOAAeAByADCAOCAf/wf/wACAACAAAAABAfxgcgwQgQQgQQgQQwwQfgAAAAAAB/AH7gMgwZgQZgQQgQQxwAfgAAAQAAQAAQAQQBwQHgQcARwAfAAcAAAAAAAAHHgPswYwQQQQQQQY4QPswHHgAAAAAAHwAMYQYMQQEQQEwYIgPfAH+AAAAAAADAQBAQAAAAAADA8BAQAAAAAAAYAAcAA0AAmABiABDADDAAAAAAAAkAAmAAmAAmAAmAAmAAmAAkAAAAAAADDABDABiAAmAA0AAcAAYAAIAAAAMAAYAAQGQQcQYwAPgAGAAAAAAfwBwcGAGEACIPzI4RZgRZARZBhY/zIAQMAQGAwD/gAeAAAQADwAfAB+APGAcGAPGAD2AAeAAHwAAwAAAf/wf/wQQQQQQQQQYQQYwwP5wHPgAAAAAAD+APvgIAwYAQQAQQAQQAQYAwODgCDAAAAAAAf/wf/wQAQQAQQAQYAQYAwMBgH/AB8AAAAAAAf/wf/wQQQQQQQQQQQQQQQQQQQAQAAAf/wf/wQQAQQAQQAQQAQQAQQAQAAAAAD+AP/gIAwYAQQAQQIQQIQYIQOIwGPgAAAAAAf/wf/wAQAAQAAQAAQAAQAAQAAQAf/wAAAAAAAAAAAAf/wAAAAAAAAAADgAAwAAQAAQAAQAAwf/gf+AAAAAAAf/wf/wAYAAwAB4ADMAGHAMBgYAwAAQAAAf/wf/wAAQAAQAAQAAQAAQAAQAAAf/wf/wOAADwAA8AAHgABwADwAOAB4AHgAeAAf/wAAAAAAAAAf/wf/wOAAHAABwAA4AAOAAHAABwf/wAAAAAAAAAD+APHgIAwYAQQAQQAQQAQYAwODgD/AAAAAAAf/wf/wQIAQIAQIAQIAYYAIQAPwAAAAAAAD+APDgIAwYAQQAQQAQYAQYA4ODsD/EAAAAAAf/wf/wQIAQIAQIAQYAYeAMzgHgwAAQAAAHDgPgwYwQQwQQQQQYQYYQMNwGHgAAAQAAQAAQAAQAAYAAf/wQAAQAAQAAQAAAAAAAAf/Af/gAAwAAQAAQAAQAAQAAwf/gf+AAAAYAAeAAHwAA+AAHgAAwAHwAeADwAeAAYAAQAAfAAD8AAPwABwAPgD4AfAAeAAHwAAfAADwAHwD+AfgAYAAAAAYAwMBgHHAB8AA4AB8AHHAMBgYAwAAAQAAcAAHAADgAA4AAfwA4ADgAOAAYAAAAAAAAQAwQDwQGQQcQQwQRgQXAQcAQYAQAAAAAA//////wABQAAeAAHgAA8AAPAAB4AAIwABwAD///AAAAAABwAHAAcAAOAADgAAwAAAIAAIAAIAAIAAIAAIAAIAAIAAAwAAYAAIAAAAAAAAAngBmwDMQCMQDMQDMwB/wAAQAAAAAA//wf/wBAQDAQDAQDAQBxwA/AAAAAAAA/gBhwDAQCAQDAQDAQBxgARAAAAA/ABxwDAQDAQDAQBAQf/w//wAAAAAAA/gBtwDMQDMQDMQDMQB8wAYAAAADAAf/w7AAzAAwAAAAAA/ABxyDATDARDARBAzB/+D/8AAAAAA//wf/wBAADAADAADAAB/wA/wAAAAAAT/wT/wAAAAABT//T/8AAAAAA//wf/wAMAAeAAzABhgDAwAAQAAAf/w//wAAAAAAD/wB/wBAADAADAADAAB/wB/wBAADAADAADAAB/wA/wAAAAAAD/wB/wBAADAADAADAAB/wA/wAAAAAAA/gBhwDAQDAQDAQDAQBhwA/gAEAAAAD//B//BAQDAQDAQDAQBxwA/AAAAAAAA/ABxwDAQCAQDAQBAQB//D//AAAAAAD/wB/wBAADAADAAAAABxgB4wDMQCMQDEQBGwBjgAAADAADAAP/wDAQDAQAAAAAAD/gB/wAAQAAQAAQAAwD/wD/wAAADAADwAAeAADwABwAHgA8ADgAAAAAAAD4AAfAADwAHwA+ADwAB4AAPAABwAHwB8ADgAAAAAAADAwBxgAfAAOAA7ABhwDAwAAADAADwBAeDAH+AB8AHgA8ADgAAAAAAADAwDBwDHQDMQD4QDgQDAQAAAAIAAMAH/wfz+wACgADAAAf/8f/8AAAgADwAGfz8D/wAMAAAAAAAAMAAcAAQAAQAAYAAMAAEAAEAAEAAYAAA"), 32, atob("BAQFCgoNCwMGBggKAwUEBwoKCgoKCgoKCgoEBAkKCQgQCwsMDAoKDA0FCgsJEA0MCwwLCwsMCxALCwsEBwQHCAUKCgkKCQYKCgQECQQQCgoKCgYJBgoJDgkJCQYEBgwA"), 18+(scale<<8)+(1<<16));
  return this;
}

// https://www.1001fonts.com/rounded-fonts.html?page=3
Graphics.prototype.setFontBloggerSansLight46 = function(scale) {
  // Actual height 46 (45 - 0)
  this.setFontCustom(atob("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB4AAAAAAAA/AAAAAAAAPwAAAAAAAD4AAAAAAAAeAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAAAAAH/gAAAAAAP/wAAAAAAf/gAAAAAAf/AAAAAAA//AAAAAAB/+AAAAAAD/8AAAAAAH/4AAAAAAH/wAAAAAAP/gAAAAAAf/gAAAAAA//AAAAAAB/+AAAAAAA/8AAAAAAAP4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///8AAAAP////4AAAP/////AAAH/////4AAD+AAAB/AAA8AAAAHwAAeAAAAA+AAHgAAAAHgADwAAAAB4AA8AAAAAPAAPAAAAADwADwAAAAA8AA8AAAAAPAAPAAAAADwAB4AAAAB4AAeAAAAAeAAHwAAAAPgAA/AAAAPwAAH/////4AAA/////8AAAH////+AAAAf///+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYAAAAAAAAPAAAAAAAAHwAAAAAAAB4AAAAAAAA+AAAAAAAAfAAAAAAAAHgAAAAAAAD4AAAAAAAB8AAAAAAAAeAAAAAAAAPgAAAAAAADwAAAAAAAB//////4AAf//////AAH//////gAA//////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAD4AAHAAAAD+AAD4AAAB/gAA8AAAB/4AAfAAAA/+AAHgAAAf3gAB4AAAPx4AA8AAAH4eAAPAAAD4HgADwAAB8B4AA8AAA+AeAAPAAAfAHgADwAAPgB4AA8AAHwAeAAHgAD4AHgAB4AD8AB4AAfAB+AAeAAD8B/AAHgAAf//gAB4AAH//wAAeAAAf/wAAHgAAB/wAAA4AAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AADgAAAAPAAB4AAAADwAAeAAAAA+AAHgAAAAHgAB4ABgAB4AAeAA8AAeAAHgA/AADwAB4AfwAA8AAeAP8AAPAAHgH/AADwAB4H7wAA8AAeD48AAPAAHh8PAAHgAB5+BwAB4AAe/AeAA+AAH/AHwAfAAB/gA/AfgAAfwAH//wAAHwAA//4AAA4AAH/8AAAAAAAf4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAAAAAAAD+AAAAAAAD/gAAAAAAH/4AAAAAAH/+AAAAAAP/ngAAAAAP/h4AAAAAf/AeAAAAAf/AHgAAAA/+AB4AAAA/+AAeAAAB/8AAHgAAA/8AAB4AAAP4AAAeAAAB4AAAHgAAAAAAAB4AAAAAAAAeAAAAAAP///4AAAAH////AAAAA////gAAAAP///4AAAAAAB4AAAAAAAAeAAAAAAAAHgAAAAAAABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAD4AA8AAD///gAPAAB///4AD4AAf//+AAeAAH+APAAHgAB4AHgAA4AAeAB4AAOAAHgAcAADwAB4AHAAA8AAeADwAAPAAHgAcAADwAB4AHAAA8AAeAB4AAeAAHgAeAAHgAB4AHwAD4AAeAA+AB8AAHgAP4B+AAB4AB///gAAOAAP//gAABAAA//wAAAAAAD/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/gAAAAAB///4AAAAD////wAAAD////+AAAB/////4AAA/gPgB/AAAfgDwAHwAAPgA8AA+AADwAeAAHgAB4AHgAB4AAeAB4AAfAAHgAeAADwABwAHgAA8AAcAB4AAPAAHAAeAAHwAB4AHgAB4AAeAB8AAeAAHgAPAAPgAB4AD8APwAAOAAfwP4AADgAD//8AAAAAAf/+AAAAAAB/+AAAAAAAH8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAB4AAAAAAAAeAAAAAAAAHgAAAAAAAB4AAAAA4AAeAAAAB/AAHgAAAB/wAB4AAAB/4AAeAAAD/4AAHgAAD/wAAB4AAH/wAAAeAAH/gAAAHgAP/gAAAB4AP/AAAAAeAf/AAAAAHgf+AAAAAB4/+AAAAAAe/8AAAAAAH/8AAAAAAB/4AAAAAAAf4AAAAAAADwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/gAAAA/AB/+AAAA/8B//wAAA//gf/+AAAf/8PgPgAAH4fngB8AAD4B/wAPgAA8AP8AB4AAeAB+AAeAAHgAfgADwAB4ADwAA8AAcAA8AAPAAHAAPAADwAB4ADwAA8AAeAB+AAPAAHgAfgAHgAB8AP8AB4AAPgH/AA+AAD8H54AfAAAf/8fgPwAAD/+D//4AAAf/Af/8AAAB/AD/+AAAAAAAP+AAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHwAAAAAAAf/wAAAAAAf/+AAAAAAP//4AAwAAH//+AAeAAD+APwAHgAA+AA+AB4AAfAAHgAOAAHgAB4ADwAB4AAPAA8AAeAADwAPAAHgAA8ADwAB4AAPAA8AAeAADwAPAAHgAA8AHgAB8AAeAB4AAPgAHgA+AAD8ADwA/AAAfwA8A/gAAD/wef/wAAAf////4AAAB////4AAAAH///wAAAAAD/+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8AB4AAAAAfgA/AAAAAH4APwAAAAB+AD4AAAAAPAAeAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=="), 46, atob("DRAcHBwcHBwcHBwcDQ=="), 56+(scale<<8)+(1<<16));
  return this;
};

function setLargeFont() {
  g.setFontBloggerSansLight46(1);
}

function setSmallFont() {
  g.setFontRoboto18(1);
}

var img2p = {
  width : 176, height : 176, bpp : 2,
  transparent : -1,
  palette:new Uint16Array([g.theme.bg, g.toColor("#020"), g.toColor("#0f0"), g.toColor("#00f")]),
  //palette:new Uint16Array([g.theme.bg, g.toColor("#022"), g.toColor("#0ff"), g.toColor("#00f")]),
  //palette:new Uint16Array([g.theme.bg, g.toColor("#00f"), g.toColor("#0ff"), g.toColor("#00f")]),
  //palette:new Uint16Array([g.theme.bg, g.toColor("#fff"), g.toColor("#f00"), g.toColor("#00f")]),
  buffer : require("heatshrink").decompress(atob("AH4A/ADNUFE8FqtVq2q1AqkFIIrDAAOAFMEBFQYrE1WgKsYrGLL4qFFY2pqDWeFZdUVkAhCAQMKFYdVLDUVFQYMHlWq0oMJKyoOJlQrCLDBWDB5clB5xWOoARMCARYWKwT4OgpYXKwY+SLChECC6A/CNRycIS6jCNIQ5uSCqqCCeCqESTKxCCQiBsCTCRDEQiCCWQigSBYaRwGQU6ESQTCESQTCESQTIbQYCJzZVwKTODjSuaOiArBVzKwDBrKwRJJRlBVzSwDUJQMMWCZKKVzqiNFYIqcD5iudUYZ3IbTzPMbTxMMMRTcXFZDafEJdVFcR5HbT6lKXILaeERQrrMBAAaUw4rBFUDcBFYzkBFcQjGGY4AbPY6LHFbrTFcY4AbgIrFAwIrkEggyGADwrFRQ4reagjiHADsVFeEVFcolEGIoAfPoq1FFcNAFYdQFccBFf4rbGAoAhKQYr/Fa8FFc9UFYYqkgEVFf4r/FYwDDAEZTDFf4r/Ff4rbqorooArBqArlgIr/Ff4r/Ff4r/Ff4r/Ff4r/Ff4r/Ff4rbqgrlgorCioroAYIr/Ff4r/FbYDDAEZTDFf4r/FYtAFclVFYUBFc9QFf4rZAgoAgKQor/FbFUFccFFYkVFcwFDioFEAD4lFGIorgPogrtWoYAfqorEgIrlqArFAwgAdEg4rlPgqKFADrUHcQorfA4sVA4wAbEY4zHFbh7GRY4AbaY7jBqAqfERArrMBAAZUxNVbkEVFZAJBFcJhRAC6lJFYLcebQIrIBRTaXJhIrhUhLcfD5YLBbjtVFZTceZ5jceJRpkLVyaiLWDpJNFYKwaUIIrMSIKwaDhw6OVx50NFYKwZDZ6waOaCTBQjBGBZZw8CQi4ZBOR6EYeySEYQSCEaQSITDH6BvGIaKEWQSSEEbqQVVQgRYSKwLGUQgRCQKwTFUC4RYQKwSCTDAhEONQTwULAqcNCARWVLAhGMB55YPDhQqDKy4dFFhAMMLCzgFawZWbEI4AIGogAYFZtAFbgsMFTyyGVkBZOKr7gJazoA/AHI"))
};

function draw() {
  var date = new Date();
  var timeStr = require("locale").time(date,1);
  var da = date.toString().split(" ");
  var time = da[4].substr(0,5);
  var hh = da[4].substr(0,2);
  var mm = da[4].substr(3,2);
  
  g.reset();
  g.setColor(g.theme.bg);
  g.fillRect(Bangle.appRect);
  g.drawImage(img2p, 0, 0);
  setLargeFont();

  //g.setColor('#0ff');
  g.setColor('#0f0');
  g.setFontAlign(1,0);  // right aligned
  g.drawString(hh, (w/2) - 1, h/2);

  g.setColor(g.theme.fg);
  g.setFontAlign(-1,0); // left aligned
  g.drawString(mm, (w/2) + 1, h/2);

  setSmallFont();
  g.setFontAlign(0,0);
  g.drawString("35", w/2, h/4); 
  g.drawString("Sunset 17:24", w/2, (3*h/4) - 4); 
}

g.clear();
Bangle.setUI("clock");
draw();