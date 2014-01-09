module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'css/build/styles.css': 'css/styles.scss'
        }
      }
    },

    concat: {
      dist: {
        src: [
          'js/libs/*.js',
          'js/global.js'
        ],
        dest: 'js/build/production.js'
      }
    },

    uglify: {
      build: {
        src: 'js/build/production.js',
        dest: 'js/build/production.min.js'
      }
    },

    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'images/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'images/'
        }]
      }
    },

    jekyll: {
      options: {                          
        src: '.'
      },
      dist: {
        options: {
          dest: './_site',
          config: '_config.yml'
        }
      }
    },

    grunticon: {
       myIcons: {
          options: {
            src: "css/icons/",
            dest: "css/prodicons/"
          }
        }
    },

    watch: {
      options: {
        livereload: true,
      },
      scripts: {
        files: ['js/*.js'],
        tasks: ['concat', 'uglify'],
        options: {
          spawn: false,
        }
      },
      css: {
        files: ['css/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false,
        }
      },
      html: {
        files: ['*.html', '_includes/*.html', '_layouts/*.html', 'css/build/styles.css'],
        tasks: ['jekyll'],
        options: {
          spawn: false,
        }
      },
      images: {
        files: ['images/**/*.{png,jpg,gif}', 'images/*.{png,jpg,gif}'],
        tasks: ['imagemin'],
        options: {
          spawn: false,
        }
      }
    },

    connect: {
      server: {
        options: {
          port: 8000,
          base: './_site'
        }
      }
    },

  });

  require('load-grunt-tasks')(grunt);


  grunt.registerTask('default', ['concat', 'uglify', 'sass', 'imagemin', 'grunticon', 'jekyll']);

  grunt.registerTask('server', ['connect', 'watch']);

  grunt.registerTask('grunticonz', ['grunticon']);

};
