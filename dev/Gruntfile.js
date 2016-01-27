// http://mattwatson.codes/compile-scss-javascript-grunt/
(function () {
  'use strict';
}());
module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    config: {
      app: '../prod',
      temp: '.tmp',
      cssSrc: 'scss',
      cssDest: 'css',
      jsSrc: 'js',
      jsDest: 'js',
      imgSrc: 'img',
      imgDest: 'img',
      bower: 'lib'
    },

    concat: {
      scripts: {
        files: {
          '<%= config.app %>/<%= config.jsDest %>/global.js': [
            '<%= config.jsSrc %>/app.js',
            '<%= config.jsSrc %>/directives.js',
            '<%= config.jsSrc %>/controllers.js',
            '<%= config.jsSrc %>/services.js'
          ]
        }
      },
      lib: {
        files: {
          '<%= config.app %>/<%= config.jsDest %>/lib.js': [
            '<%= config.bower %>/angular/angular.js',
            '<%= config.bower %>/angular-ui-router/release/angular-ui-router.js',
            '<%= config.bower %>/backand/backand.js'
          ]
        }
      }
    },

    uglify: {
      options: {
        mangle: false,
        compress: {
          drop_console: true
        }
      },
      my_target: {
        files: {
          '<%= config.app %>/<%= config.jsDest %>/lib.js': ['<%= config.app %>/<%= config.jsDest %>/lib.js'],
          '<%= config.app %>/<%= config.jsDest %>/global.js': ['<%= config.app %>/<%= config.jsDest %>/global.js']
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        '<%= config.jsSrc %>/{,*/}*.js',
        '!<%= config.jsSrc %>/lib.js',
        '!<%= config.app %>/<%= config.jsSrc %>/global.js'
      ]
    },

    // enable SASS
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.cssSrc %>',
          src: ['*.scss'],
          dest: '<%= config.app %>/<%= config.cssDest %>/',
          ext: '.css'
        }]
      }
    },

    watch: {
      options: {
        debounceDelay: 500,
        livereload: true
      },
      gruntfile: {
        files: 'Gruntfile.js'
      },
      styles: {
        files: '<%= config.cssSrc %>/**/*.scss',
        tasks: ['sass']
      },
      scripts: {
        files: '<%= config.jsSrc %>/**/*.js',
        tasks: ['jshint', 'concat']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['concat', 'uglify', 'jshint', 'sass', 'watch']);
};
