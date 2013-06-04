
/**
 * Hogan Grunt Task
 *
 * @author Matt Andrews <matt@mattandre.ws>
 * @copyright The Financial Times
 */

var hogan = require('hogan.js');
var glob = require('glob');
var fs = require('fs');
var path = require('path');

function compileTemplate(filepath) {
  filepath = path.resolve(filepath);
  var string = fs.readFileSync(filepath, 'utf8');
  var fn = 'module.exports = new Hogan(' + hogan.compile(string, { asString: true }) + ');';
  var jspath = path.dirname(filepath) + '/template.js';
  fs.writeFileSync(jspath, fn);
}

module.exports = function (grunt) {
  grunt.registerTask('hogan', function hogan() {
    var done = this.async();

    glob('**/*.hjs', function(err, files) {
      files.forEach(compileTemplate);
      done();
    });
  });
};
