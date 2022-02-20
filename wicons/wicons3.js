const h = g.getHeight();
const w = g.getWidth();

// sun 48, 1 bit, max contrast, brightness set to 85

// trans 2 to colour
var trans_2_col = require("heatshrink").decompress(atob("mEwgIcZgOAArUgAoMEAoNwAoMOAoM4AoMcAoICCnACBBwVwAQMHgfA8AFBgUf/FAFQU//g1DuEeAofgg5AD4EDIQQ0BAoYDBBoIFGh/zAoPP+AFFC5YvHAohBFgF4JohZEMosHg/gOIR9FRIqVFUIqtFaLoAWA=="));
var transparency = require("heatshrink").decompress(atob("mEwwMB/4AY/1/AsHPAoPzAoPHAQPjAQgIC+ICBx4CB/IXBz4eC+EPFIfD4YFDx4ZCAAMf/AFDn/8IAhCDAowCBAoPwjgFBnEPAooRFEZg1FIIxNFLIplEOIp9FRIqVFx4XBCgXfAoP7aMAAV"));
var t2col_inverted = require("heatshrink").decompress(atob("mEwgP/ADH+v4Fg74FB/YFB94CB+4CB+YCB84CBBwXfAQP9AQO/DwXwh4pD84WCAAOf/IFD34ZCAAN//xAEIQYJCAo/wjwFBvEPAooXLFIw1F/8/IIhNF45ZEMohxFPoqJFSoqhFZcYAW"));
var trans_inverted = require("heatshrink").decompress(atob("mEwwhC/AFcP+AX/C/4AH/4XLBgoKFFJUPC5QLLEZYMKERZaGAhJ8NAASlSCgYYSK4p0MPJR1NZpQXPQw6OPC7AIHC5K2CBgJXIBAJ7BVwoXXI66P0a64QBFAhzBC54RFDoowNDASgKDBYWRQwgEJOpx5QBhZ6LBZYjKBQxaGEhQJFC40PSigASC/4XfAH4AU"));

function draw() {
  var x = 0;
  var y = 24;

  console.log("START...");
  g.reset();

  // top half bg
  g.setColor(g.theme.bg);
  g.fillRect(0, 24, w, h/2);

  // bottom half green
  g.setColor('#0f0');
  g.fillRect(0, h/2, w, h);

  // top half
  g.setColor(g.theme.fg);
  g.drawImage(trans_2_col, x, y);
  x += 48;
  g.drawImage(trans_inverted, x, y);
  x += 48;
  g.drawImage(t2col_inverted, x, y);

  
  // bottom half, green background
  y = h/2 + 20;  x = 0;
  g.setColor(g.theme.fg);
  g.drawImage(trans_2_col, x, y);
  x += 48;
  g.drawImage(trans_inverted, x, y);
  x += 48;
  g.drawImage(t2col_inverted, x, y);
}

g.clear();
Bangle.loadWidgets();
Bangle.drawWidgets();
draw();
Bangle.setUI("clock");
