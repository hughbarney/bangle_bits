var h1=0,h2=0, l1=0,l2=0,
    cs1=0,cs2=0,cs3=0,cs4=0,
    protocolType="Unknown",
    casicPos=-1, payloadPos=0,
    inCasicMessage=false, casicIsCompleted=false;

var casicMsg={};

function parseCASIC(data){
  for(var i=0;i<data.length;i++){
    c=data.charCodeAt(i);
    //print("i:",i,"c:",c, "casicPos:",casicPos,"payloadPos:",payloadPos);
    if(c==0xBA && casicPos<0){
      h1=c;
      protocolType="CASIC";
      inCasicMessage=true;
      casicIsCompleted=false;
      casicPos=0; payloadPos=0;
      h2=0; l1=0; l2=0; cs1=0;cs2=0;cs3=0;cs4=0;
      casicMsg={};
    }
    else if(!inCasicMessage) return;
    // header byte 2
    else if(c==0xCE && casicPos==0){
      h2=c;
      casicPos++;
      casicMsg.hdr = (h1<<8) + h2;
    }
    // length byte1
    else if(inCasicMessage && casicPos==1){
      l1=c;
      casicPos++;
    }
    // length byte2
    else if(inCasicMessage && casicPos==2){
      l2=c;
      casicPos++;
      casicMsg.len = (l2<<8) + l1;
    }
    // class 
    else if(inCasicMessage && casicPos==3){
      casicMsg.class = c;
      casicPos++;
    }
    // msg id
    else if(inCasicMessage && casicPos==4){
      casicMsg.msgId = c;
      casicMsg.payload=[];
      payloadPos=0;
      casicPos++;
    }
    // accumulate payload
    else if(inCasicMessage && casicPos>4 && payloadPos<casicMsg.len){
      casicMsg.payload.push(c);
      payloadPos++;
      casicPos++;
    }
    // checksum bytes cs1, cs2, cs3, cs4
    else if(inCasicMessage && casicPos==casicMsg.len+5){
      cs1 = c;
      casicPos++;
    }
    else if(inCasicMessage && casicPos==casicMsg.len+6){
      cs2 = c;
      casicPos++;
    }
    else if(inCasicMessage && casicPos==casicMsg.len+7){
      cs3 = c;
      casicPos++;
    }
    else if(inCasicMessage && casicPos==casicMsg.len+8){
      cs4 = c;
      casicMsg.checkSum = (cs1<<24)+(cs2<<16)+(cs3<<8)+cs4;
      inCasicMessage = false;
      casicIsCompleted = true;
      casicPos = -1;
      protocolType="Unknown";
      print(casicMsg);
    }
  }//for
}

function setup() {
  D29.write(0);
  Serial2.removeAllListeners();
  Serial2.setup(9600,{rx:D30,tx:D31});
  Serial2.on('data', function(data){parseCASIC(data);});
}

function pon() {
  D29.write(1);
}


function pof() {
  D29.write(0);
}

function prt() {
  Serial2.write([0xBA,0xCE, 0x00,0x00, 0x06,0x00, 0x00,0x00,0x06,0x00]);
}

