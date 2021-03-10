(function(){
  var index = 0;
  const maxColors = 9;

  const colors = {
    0: { value: 0x000F, name: "Navy" },
    1: { value: 0x03E0, name: "DarkGreen" },
    2: { value: 0x03EF, name: "DarkCyan" },
    3: { value: 0x7800, name: "Maroon" },
    4: { value: 0x780F, name: "Purple" },
    5: { value: 0x7BE0, name: "Olive" },
    6: { value: 0x001F, name: "Blue" },
    7: { value: 0xF800, name: "Red" },
    8: { value: 0xF81F, name: "Magenta" },
    9: { value: 0xFD20, name: "Orange" },
  };

  function draw() { }

  function show(msg) {
    g.clear();
    g.setColor(colors[index % maxColors].value);
    g.fillRect(0, 24, g.getWidth(), g.getHeight());
    index++;
    g.setFont("Vector",40);
    g.setFontAlign(0,0);
    g.setColor(1,1,1);
    g.drawString(msg, 120, 120);
    g.flip();
    Bangle.buzz();
  }
  
  function tea(msg) {
    var i;
    show(msg);
    
    for  (i=1; i<9; i++) {
      setTimeout(function() { show(msg); }, i*10000);
    }

    i++;
    setTimeout(function() { g.clear(); }, i*10000);
  }

  WIDGETS.tea={area:"tr",width:0,draw:draw,tea:tea};
})();
