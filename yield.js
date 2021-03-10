


function func() {
  func_1();
  wait(delay_1);

  func_2();
  wait(delay_2);
  
  func_3();
  wait(delay_3);
  
  func_4();
  wait(delay_4);
}


const delay_1 = 1000;
const delay_2 = 3000;
const delay_3 = 5000;
const delay_4 = 7000;

function func_1() {console.log("func_1 " + new Date().toString().split(" ")[4]);}
function func_2() {console.log("func_2 " + new Date().toString().split(" ")[4]);}
function func_3() {console.log("func_3 " + new Date().toString().split(" ")[4]);}
function func_4() {console.log("func_4 " + new Date().toString().split(" ")[4]);}

function func() {
  console.log("START: " + new Date().toString().split(" ")[4]);
  func_1();

  setTimeout(function() {
    func_2();
    setTimeout(function() {
      func_3();
      setTimeout(function() {
        func_4();
        setTimeout(function() {
          // no op
          console.log("END: " + new Date().toString().split(" ")[4]);
        }, delay_4);
      }, delay_3);
    }, delay_2);
  }, delay_1);
}

func();



