
var heading_buf = [3,358,0,359,5,357,0];
var compass_count = 0;


// get rolling average heading
function average_heading() {
  var i;
  var tot = 0;
  
  for (i=0; i<7; i++) {
    tot = tot +  ((heading_buf[i] + 30) % 359);
  }  
  return Math.floor((tot / 7) - 30);
}


// heading_buf[compass_count % 7] = heading;


function test() {
  var i = 0;
  var toggle = false;
  var val;
  
  for (i=0; i<100; i++) {
    toggle = !toggle;
    val = toggle ? 2 : 358;
    
    heading_buf[i % 7] = val;
    console.log("Avg=" + calc_avg());
  }
}


