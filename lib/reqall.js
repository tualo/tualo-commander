(function() {
  var fs, path;

  fs = require('fs');

  path = require('path');

  module.exports = function(pathName, extension) {
    var entry, files, i, len, result;
    result = [];
    files = fs.readdirSync(pathName);
    for (i = 0, len = files.length; i < len; i++) {
      entry = files[i];
      if (path.extname(entry) === extension) {
        result.push(entry);
      }
    }
    return result;
  };

}).call(this);
