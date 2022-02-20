let ScreenWidth  = g.getWidth(),  PatchWidth  = ScreenWidth/6;
let ScreenHeight = g.getHeight(), PatchHeight = ScreenHeight/6;

g.clear();
for (let i = 0; i < 27; i++) {
    let x = (i % 6)         * PatchWidth;
    let y = Math.floor(i/6) * PatchHeight;
    let R = i % 3;
    let G = Math.floor(i/3) % 3;
    let B = Math.floor(i/9);
    g.setColor(R/2,G/2,B/2);
    g.fillRect(x,y, x+PatchWidth-1,y+PatchHeight-1);
}

  
Bangle.on('touch', function (Button,Position) {
    let x = Math.floor(Position.x / PatchWidth);
    let y = Math.floor(Position.y / PatchHeight);
    
    let i = y*6 + x;
    if (i >= 27) { return; }
    let R = i % 3;
    let G = Math.floor(i/3) % 3;
    let B = Math.floor(i/9);
    let HexValues = ['0','8','F'];  //changed
    Bangle.buzz();   // new
    
    g.setColor(R/2,G/2,B/2);  // changed
    g.fillRect(3*PatchWidth,4*PatchHeight, ScreenWidth,ScreenHeight);
    
    g.setFont('Vector', 28);
    g.setColor('#000');  // black
    g.setFontAlign(0,-1);  // new
    g.drawString(
      '#' + HexValues[R] + HexValues[G] + HexValues[B],
      (ScreenWidth - 1.5*PatchWidth),  ScreenHeight - 2*PatchHeight);
    
    g.setColor('#fff');  // white
    g.drawString(
      '#' + HexValues[R] + HexValues[G] + HexValues[B],
      (ScreenWidth - 1.5*PatchWidth),  ScreenHeight - PatchHeight);
  
  
  });
