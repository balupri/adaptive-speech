module.exports = function (grunt) {
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Default task.
  grunt.registerTask('default', ['karma', 'jshint']);
  grunt.registerTask('build', ['karma', 'jshint', 'concat', 'uglify']);

  var karmaConfig = function(configFile, customOptions) {
    var options = { configFile: configFile, keepalive: true };
    var travisOptions = process.env.TRAVIS && { browsers: ['Firefox'], reporters: 'dots' };
    return grunt.util._.extend(options, customOptions, travisOptions);
  };

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('bower.json'),
    uglify: {
      options: {
        preserveComments: 'some'
      },
      dist: {
        src: '<%= pkg.name %>.js',
        dest: '<%= pkg.name %>.min.js'
      }
    },
    concat: {
      options: {
        process: true
      },
      dist: {
        src: 'src/<%= pkg.name %>.js',
        dest: '<%= pkg.name %>.js'
      }
    },
    karma: {
        unit: {
        options: karmaConfig('test/test.conf.js')
      }
    },
    jshint:{
      files:['src/**/*.js', 'test/**/*.js'],
      options: {
        curly:true,
        eqeqeq:true,
        immed:true,
        latedef:true,
        newcap:true,
        noarg:true,
        sub:true,
        boss:true,
        eqnull:true,
        devel:true,
        globals:{}
      }
    },
    changelog: {
      options: {
        dest: 'CHANGELOG.md'
      }
    },
  });
};
