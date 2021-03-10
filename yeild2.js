
function log_debug(o) {
  let timestamp = new Date().getTime();
  console.log(timestamp + " : " + o);
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function testDelay() {
  log_debug("START");
  Promise.resolve().then(function() {
    log_debug("FUNC1");
    return delay(100);
  }).then(function() {
    log_debug("FUNC2");
    return delay(20);
  }).then(function() {
    log_debug("FUNC3");
    return delay(20);
  }).then(function() {
    log_debug("FUNC4");
    return delay(20);
  }).then(function() {
    log_debug("DONE");
  });
}

testDelay();
