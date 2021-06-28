


function STEP_STATE() {
  this.S_STILL = 0;       // just created state m/c no steps yet
  this.S_STEP_1 = 1;      // first step recorded
  this.S_STEP_225 = 2;    // counting 2-5 steps
  this.S_STEPPING = 3;    // we've had 5 steps in 5 seconds
  
  this.state = S_INIT;
  this.hold_steps = 0;
  this.t_prev = getTime();
}

STEP_STATE.prototype.step_state = function() {
  var st = this.state;

  switch (st) {
  case this.S_STILL:
    this.state = S_STEP_1;
    this.t_prev = getTime();
    this.hold_steps = 1;
    return 0;
    
  case this.S_STEP_1:
    var t = Math.round((getTime() - this.t_prev)*1000);
    this.t_prev = getTime();
    
    // we got a step within 1 second
    if (t <= 1000) {
      this.state = this.S_STEP_225;
      this.hold_steps = 2;
    } else {
      // we stay in STEP_1 state
    }
    return 0;

  case this.S_STEP_225:
    var t = Math.round((getTime() - this.t_prev)*1000);
    this.t_prev = getTime();
    
    // we got a step within 1 second
    if (t <= 1000) {
      this.hold_steps++;

      if (this.hold_steps >= 5) {
        this.state = this.S_STEPPING;
        return 5;
      }
    } else {
      // we did not get the step in time, back to STEP_1
      this.state = this.S_STEP1;
      this.hold_steps = 1;
    }
    return 0;

  case this.S_STEPPING;
    var t = Math.round((getTime() - this.t_prev)*1000);
    this.t_prev = getTime();
    
    // we got a step within 2 seconds, otherwise we stopped stepping
    if (t <= 2000) {
      this.state = this.S_STEPPING;
      return 1;
    } else {
      // we did not get the step in time, back to STEP_1
      this.state = this.S_STEP1;
      this.hold_steps = 1;
    }
    return 0;
  }

  // should never get here
  return 0;
}

let step_machine = new STEP_STATE();

total_steps += step_machine.step_state();


