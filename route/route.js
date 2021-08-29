

�coordScale=0.5749631419077157;
�coords=�Int32Array([-185325,7343053,-185334,7342953,-185313,7342862,-185388,7342723,-185293,7342592,-185237,7342474,-185202,7342439,-185216,7342352,-185160,7342187,-185122,7342008,-185036,7341799,-184950,7341599,-184821,7341433,-184709,7341345,-184601,7341262,-184549,7341197,-184523,7341079,-184428,7340966,-184385,7340918,-184237,7341026,-184093,7341129,-183876,7341206,-183953,7341446,-184031,7341525,-184020,7341899,-184137,7341960,-184272,7341939,-184412,7341718,-184478,7341549,-184556,7341445,-184936,7341942,-184974,7342160,-184956,7342321,-184829,7342446,-184963,7342651,-184992,7342847,-185118,7342913,-185247,7343035]);
�min={"x":-185388,"y":7340918};
�max={"x":-183876,"y":7343053};
�gcoords=�Uint8Array(coords.length);
�coordDistance=�Uint16Array(coords.length/2);
�PT_DISTANCE=30;
�toScr(p){�{x:10+(p.x-min.x)*100/(max.x-min.x),y:230-(p.y-min.y)*100/(max.y-min.y)};}
�last;
�totalDistance=0;
�(�i=0;i<coords.length;i�2){�c={x:coords[i],y:coords[i+1]};�s=toScr(c);gcoords[i]=s.x;gcoords[i+1]=s.y;�(last){�dx=c.x-last.x;�dy=c.y-last.y;totalDistance�Math.sqrt(dx*dx+dy*dy)*coordScale;coordDistance[i/2]=totalDistance;}last=c;}
�fix,lastFix;
�nextPtIdx=0;
�nextPt={x:coords[nextPtIdx],y:coords[nextPtIdx+1]};
�nextAngle=0;
�nextDist=0;
�currentDist=0;
�drawMap(){g.clearRect(0,0,239,120);g.setFontAlign(0,0);g.setColor(1,0,0);g.setFontVector(40);g.drawString((currentDist��)?"?":(Math.round(currentDist)+"m"),160,30);g.setColor(1,1,1);g.setFont("6x8",2);g.drawString(Math.round(totalDistance)+"m",160,70);g.drawString((nextPtIdx/2)+"/"+coordDistance.length,50,20);�(!fix.fix){g.setColor(1,0,0);g.drawString("No GPS",50,50);g.setFont("6x8",1);g.drawString(fix.satellites+" Sats",50,70);}�(lastFix�lastFix.fix){g.setColor(0,0,0);g.drawCircle(lastFix.s.x,lastFix.s.y,10);}�(�i=0;i<gcoords.length;i�2){g.setColor((i�nextPtIdx)?63488:46486);g.fillRect(gcoords[i]-2,gcoords[i+1]-2,gcoords[i]+2,gcoords[i+1]+2);}g.setColor(1,0,0);g.drawPoly(�Uint8Array(gcoords.buffer,0,nextPtIdx+2));g.setColor(1,1,1);g.drawPoly(�Uint8Array(gcoords.buffer,nextPtIdx));�(fix�fix.fix){g.setColor(1,0,0);g.drawCircle(fix.s.x,fix.s.y,10);}lastFix=fix;}
�getNextPtInfo(){�dx=nextPt.x-fix.p.x;�dy=nextPt.y-fix.p.y;nextAngle=Math.atan2(dx,dy)*180/Math.PI;nextDist=Math.sqrt(dx*dx+dy*dy)*coordScale;}
�onGPS(f){fix=f;fix.p=Bangle.project(fix);fix.s=toScr(fix.p);getNextPtInfo();�((nextDist<PT_DISTANCE)�(nextPtIdx<coords.length)){nextPtIdx�2;nextPt={x:coords[nextPtIdx],y:coords[nextPtIdx+1]};getNextPtInfo();}�(!fix.fix){currentDist=�}��(nextPtIdx+2<coordDistance.length){currentDist=coordDistance[1+(nextPtIdx/2)]-nextDist;}��(nextPtIdx+2�coordDistance.length){currentDist=totalDistance-nextDist;}�{currentDist=totalDistance;}�(!Bangle.isLCDOn())�;drawMap();}
�arrow(r,c){r=r*Math.PI/180;�p=Math.PI*3/4;g.setColor(c);g.fillPoly([180+40*Math.sin(r),180-40*Math.cos(r),180+20*Math.sin(r+p),180-20*Math.cos(r+p),180-10*Math.sin(r),180+10*Math.cos(r),180+20*Math.sin(r+-p),180-20*Math.cos(r-p),]);}
�onCompass(m){�(!Bangle.isLCDOn())�;arrow(oldHeading,0);�heading=m.heading+nextAngle;arrow(heading,0xF800);oldHeading=heading;}
�oldHeading=0;
Bangle.on('GPS',onGPS);
Bangle.on('mag',onCompass);
Bangle.setGPSPower(1);
Bangle.setCompassPower(1);
g.clear();
