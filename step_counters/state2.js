
function STEP_STATE() {
  this.S_STILL = 0;       // just created state m/c no steps yet
  this.S_STEP_1 = 1;      // first step recorded
  this.S_STEP_22N = 2;    // counting 2-X steps
  this.S_STEPPING = 3;    // we've had X steps in X seconds
  this.reset();
};

STEP_STATE.prototype.reset = function() {
  this.state = this.S_STILL;
  this.hold_steps = 0;
  this.t_prev = getTime();
};

STEP_STATE.prototype.get_hold_steps = function() {
  return this.hold_steps;
};

STEP_STATE.prototype.step_state = function(raw) {
  var st = this.state;
  var t;
  
  switch (st) {
  case this.S_STILL:
    if (raw > 50) {
      this.state = this.S_THRESH_1;
      this.t_prev = getTime();
      this.hold_count = 1;
    }
    return false;
    
  case this.S_STEP_1:
    t = Math.round((getTime() - this.t_prev)*1000);
    //console.log(t + " S_STEP_1");
    this.t_prev = getTime();
    
    // we got a step within 0.167s (6 min/mile) and 1 second
    if (t <= T_MAX_STEP && t >= T_MIN_STEP) {
      this.state = this.S_STEP_22N;
      this.hold_steps = 2;
    } else {
      // we stay in STEP_1 state
      reject_count++;
    }
    return 0;

  case this.S_STEP_22N:
    t = Math.round((getTime() - this.t_prev)*1000);
    //console.log(t + " S_STEP_22N");
    this.t_prev = getTime();
    
    // we got a step within 0.167s (6min/mile) and 1 second
    if (t <= T_MAX_STEP && t >= T_MIN_STEP) {
      this.hold_steps++;

      if (this.hold_steps >= X_STEPS) {
        this.state = this.S_STEPPING;
        this.hold_steps = 1;
        pass_count++;  // we are going to STEPPING STATE
        return X_STEPS;
      }
    } else {
      // we did not get the step in time, back to STEP_1
      this.state = this.S_STEP_1;
      this.hold_steps = 1;
      reject_count++;
    }
    return 0;

  case this.S_STEPPING:
    this.hold_steps = 1;
    t = Math.round((getTime() - this.t_prev)*1000);
    //console.log(t + " S_STEPPING");
    this.t_prev = getTime();
    
    // we got a step within T_MAX_STEP
    if (t <= T_MAX_STEP) {
      this.state = this.S_STEPPING;
      return 1;
    } else {
      // we did not get the step in time, back to STEP_1
      this.state = this.S_STEP_1;
      reject_count++;
    }
    return 0;
  }

  // should never get here
  return 0;
};


STEP_STATE.prototype.get_state = function() {
  switch(this.state) {
  case this.S_STILL: return "S_STILL";
  case this.S_STEP_1: return "S_STEP_1";
  case this.S_STEP_22N: return "S_STEP_22N";
  case this.S_STEPPING: return "S_STEPPING";
  default: return "ERROR";
  }
};


Let step_machine = new STEP_STATE();

/**
 * standard UI code for the App, not part of the algorithm
 */




if (sample > 50) {
  high_samples = Math.max(high_samples + 1, 3);
  if (high_samples == 3)
    low_samples = 0; // reset
} else {
  low_samples = Math.max(low_samples + 1, 10);
  if (low_samples == 10)
    high_samples = 0; // reset
}

if (high_samples == 3)

  


