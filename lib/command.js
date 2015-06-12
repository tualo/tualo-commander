(function() {
  var Command;

  module.exports = Command = (function() {
    function Command() {}

    Command.commandArgs = [];

    Command.options = [];

    Command.help = function() {
      return "    ";
    };

    Command.prototype.action = function(program, options) {
      return console.log(options);
    };

    return Command;

  })();

}).call(this);
