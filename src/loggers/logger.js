var logger = (function() {
  var log = async function(msg) {
    console.log(msg);
  };

  var debug = function(type, fileName, functionName, parameter) {
    console.debug(
      "type:" +
        type +
        ",fileName:" +
        fileName +
        ",functionName:" +
        functionName +
        ",parameter:" +
        parameter
    );
  };

  var info = function(data) {
    console.info("data:" + data);
  };

  var warn = function(data) {
    console.warn("data:" + data);
  };

  var error = function(data) {
    console.error("data:" + data);
  };
  return {
    log: log,
    debug: debug,
    info: info,
    warn: warn,
    error: error
  };
})();
module.exports = logger;
