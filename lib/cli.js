(function() {
  var Cli, path, program;

  path = require('path');

  program = require('commander');

  module.exports = Cli = (function() {
    function Cli() {
      this.cmdPath = path.resolve('.', 'lib', 'commands');
      this.pck = {
        version: 'none'
      };
      try {
        this.pck = require(path.join('.', 'package.json'));
      } catch (_error) {
        this.pck = {
          version: 'none'
        };
      }
      this.cmdFileExtension = '.js';
    }

    Cli.prototype.commands = function(pathName) {
      return this.cmdPath = pathName;
    };

    Cli.prototype.extension = function(ext) {
      return this.cmdFileExtension = ext;
    };

    Cli.prototype["package"] = function(pck) {
      return this.pck = pck;
    };

    Cli.prototype.main = function(cmdName) {
      var c, cmd, cmdL, command, commandList, commands, i, j, k, l, len, len1, len2, len3, len4, len5, m, n, name, op, opts, ref, ref1, ref2;
      commandList = require('./reqall')(this.cmdPath, this.cmdFileExtension);
      commands = [];
      for (i = 0, len = commandList.length; i < len; i++) {
        name = commandList[i];
        if (name !== 'command.js') {
          commands.push(require(path.join(this.cmdPath, path.basename(name))));
        }
      }
      program.version(this.pck.version);
      if (cmdName != null) {
        cmd = null;
        for (j = 0, len1 = commands.length; j < len1; j++) {
          command = commands[j];
          if (command.commandName === cmdName) {
            cmd = command;
          }
        }
        if (cmd != null) {
          ref = cmd.options;
          for (k = 0, len2 = ref.length; k < len2; k++) {
            op = ref[k];
            program.option(op.parameter, op.description);
          }
          opts = [];
          ref1 = cmd.commandArgs;
          for (l = 0, len3 = ref1.length; l < len3; l++) {
            op = ref1[l];
            opts.push('<' + op + '>');
          }
          if (opts.length === 0) {
            c = new cmd();
            c.action(program);
          } else {
            program["arguments"](opts.join(' ')).action(function(a0, a1, a2, a3, a4, a5) {
              var arg, index, len4, m, ref2;
              arg = {};
              index = 0;
              ref2 = cmd.commandArgs;
              for (m = 0, len4 = ref2.length; m < len4; m++) {
                name = ref2[m];
                if (index === 0) {
                  arg[name] = a0;
                }
                if (index === 1) {
                  arg[name] = a1;
                }
                if (index === 2) {
                  arg[name] = a2;
                }
                if (index === 3) {
                  arg[name] = a3;
                }
                if (index === 4) {
                  arg[name] = a4;
                }
                if (index === 5) {
                  arg[name] = a5;
                }
                index++;
              }
              c = new cmd();
              return c.action(program, arg);
            });
            program.on('--help', function() {
              console.log(cmd.help());
              return console.log("");
            });
          }
        }
      } else {
        for (m = 0, len4 = commands.length; m < len4; m++) {
          command = commands[m];
          opts = [];
          ref2 = command.commandArgs;
          for (n = 0, len5 = ref2.length; n < len5; n++) {
            op = ref2[n];
            opts.push('<' + op + '>');
          }
          cmdL = [command.commandName].concat(opts);
          program.command(cmdL.join(' '), command.commandShortDescription);
        }
      }
      return program.parse(process.argv);
    };

    return Cli;

  })();

}).call(this);
