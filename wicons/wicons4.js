const h = g.getHeight();
const w = g.getWidth();

// sun 48, 2 bit optimal, max contrast, brightness set to 85

// trans 2 to colour
var trans_2_col = require("heatshrink").decompress(atob("mEw4X/AoP//8Qwg+0gNABe0EBYsQBYcVBYtUBYcFBAILCgNQFggFECIQADDogpCAwsFDQIQEJAUBqtVoBGEFYYLBGYgkEwEBEQw8EHQxUEKQwLBsALJA4ZwFBZZPBBYoHBBZovXL5wLKQZYIBoCbJWZTLLFYMVEQIkGfZRmFKgoFCgICCCIgdCBYQpFggLFJAwLEAA4LvAFQ"));
var transparency = require("heatshrink").decompress(atob("mEw4UA///Hm0BoAL/AAUFBYtQBYgUEgILEAooRFgFUAgcVGAsUF4YEBAA1VqpSIgtQAIILHFYQzEHgw6GMwhwCQJCFHBZgEDBYlVqgrEqEVMYQLLEZZHZNZaDMTZazLZZTjLfZUBFYkFMAgFFCIodCOoYpEggLFiDlKAA4LvAFQ=")); 
var t2col_inverted = require("heatshrink").decompress(atob("mEw4X/AAIHBiGEH2kBoAL/AAUEBYsQCggSFDQtQExQdEFIQGICAgADqtVKRRgJigCEAAorCHQxaEMgxaEGA4TEBaFVqgLFipjCBZYvXKZprLZgaDITZcJWZTLKcZb7LIwRgHLQwLEDoQUDGAyBJBfwAq"));


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
  g.drawImage(transparency, x, y);
  x += 48;
  g.drawImage(t2col_inverted, x, y);

  
  // bottom half, green background
  y = h/2 + 20;  x = 0;
  g.setColor(g.theme.fg);
  g.drawImage(trans_2_col, x, y);
  x += 48;
  g.drawImage(transparency, x, y);
  x += 48;
  g.drawImage(t2col_inverted, x, y);
}

g.clear();
Bangle.loadWidgets();
Bangle.drawWidgets();
draw();
Bangle.setUI("clock");
