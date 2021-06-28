
var five_steps = 0;
var t_prev_step = undefined;
var total_steps = 0;


function count_step() {
  // we have been still for a while, start checking for 5 steps
  if (t_prev_steps === undefined) {
    t_prev_steps = now();
    five_steps = 1;
    return 0;
  }

  // counting up to 5 steps and within timing window
  if (Tnow - t_prev_steps < 2 && five_steps < 5) {
    five_steps++;
    t_prev_steps = Tnow;
    // we have reached 5
    if (five_steps >= 5) return 5;
    return 0;
  }

  // have counted 5, continuing
  if (Tnow -t_prev_steps < 2 && five_steps >= 5) {
    five_steps++;
    t_prev_steps = Tnow;
    return 1;
  }

  // we must have timedout
  t_prev_steps = undefined;
  five_steps = 0;
  return 0;
}

