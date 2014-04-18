'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('jquery.backtotop.jquery.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    clean: {
      files: ['dist']
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['src/<%= pkg.name %>.js'],
        dest: 'dist/js/<%= pkg.name %>.js'
      },
        bootstrap: {
            src: [
                'bootstrap/js/transition.js',
                'bootstrap/js/alert.js',
                'bootstrap/js/button.js',
                'bootstrap/js/carousel.js',
                'bootstrap/js/collapse.js',
                'bootstrap/js/dropdown.js',
                'bootstrap/js/modal.js',
                'bootstrap/js/tooltip.js',
                'bootstrap/js/popover.js',
                'bootstrap/js/scrollspy.js',
                'bootstrap/js/tab.js',
                'bootstrap/js/affix.js'
            ],
            dest: 'dist/js/bootstrap.js'
        }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
        bootstrap: {
            options: {
                banner: '<%= banner %>'
            },
            src: '<%= concat.bootstrap.dest %>',
            dest: 'dist/js/bootstrap.min.js'
        },
        dist: {
            files: {
                'dist/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
            }
        }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    jshint: {
      gruntfile: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: 'Gruntfile.js'
      },
      src: {
        options: {
          jshintrc: 'src/.jshintrc'
        },
        src: ['src/**/*.js']
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/**/*.js']
      },
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      src: {
        files: '<%= jshint.src.src %>',
        tasks: ['jshint:src', 'qunit']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'qunit']
      },
    },
    //custom less from bootstrap   cssmin: {
          compress: {
              options: {
                  keepSpecialComments: '*',
                  noAdvanced: true, // turn advanced optimizations off until the issue is fixed in clean-css
                  report: 'min',
                  selectorsMergeMode: 'ie8'
              }
      },
      copy: {
          fonts: {
              expand: true,
              src: 'bootstrap/fonts/*',
              dest: 'dist/fonts'
          }
      },
      less: {
          compileCore: {
              options: {
                  strictMath: true,
                  sourceMap: true,
                  outputSourceFiles: true,
                  sourceMapURL: 'bootstrap.css.map',
                  sourceMapFilename: 'dist/css/<%= pkg.name %>.css.map'
              },
              files: {
                  'dist/css/bootstrap.css': 'bootstrap/less/bootstrap.less',
                  'dist/css/<%= pkg.name %>.css': 'less/main-keepit.less'
              }
          },
          compileTheme: {
              options: {
                  strictMath: true,
                  sourceMap: true,
                  outputSourceFiles: true,
                  sourceMapURL: 'bootstrap-theme.css.map',
                  sourceMapFilename: 'dist/css/bootstrap-theme.css.map'
              },
              files: {
                  'dist/css/bootstrap-theme.css': 'bootstrap/less/theme.less'
              }
          },
          minify: {
              options: {
                  cleancss: true,
                  report: 'min'
              },
              files: {
                  'dist/css/bootstrap.min.css': 'dist/css/bootstrap.css',
                  'dist/css/bootstrap-theme.min.css': 'dist/css/bootstrap-theme.css',
                  'dist/css/<%= pkg.name %>.min.css' : 'dist/css/<%= pkg.name %>.css'
              }
          }
      },

      csscomb: {
          options: {
              config: 'less/.csscomb.json'
          },
          dist: {
              files: {
                  'dist/css/<%= pkg.name %>.css': 'dist/css/<%= pkg.name %>.css',
                  'dist/css/<%= pkg.name %>-theme.css': 'dist/css/<%= pkg.name %>-theme.css'
              }
          }
      }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-csscomb');
  // CSS distribution task.
  grunt.registerTask('dist-css', ['less', 'csscomb']);
  // Full distribution task.
  grunt.registerTask('dist', [ 'dist-css', 'copy:fonts']);
  // Default task.
  grunt.registerTask('default', ['jshint', 'qunit', 'clean', 'concat', 'dist' , 'uglify']);

  grunt.registerTask('test', ['qunit']);

};
