module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'css/preprefix/styles.css': 'css/styles.scss'
        }
      }
    },

    autoprefixer: {

      single_file: {
        options: {
          // Target-specific options go here.
        },
        src: 'css/preprefix/styles.css',
        dest: 'css/build/styles.css'
      },
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
          cwd: 'img/',
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
            dest: "css/build/icons/"
          }
        }
    },

    responsive_images: {
      myTask: {
        options: {
          sizes: [{
            width: 220,
            height: 220,
            aspectRatio: false,
          },
          {
            width: 470,
            height: 470,
            aspectRatio: false,
          },
          {
            width: 470,
            height: 220,
            aspectRatio: false,
          },
          {
            width: 220,
            height: 470,
            aspectRatio: false,
          },
          {
            width: 970,
            height: 470,
            aspectRatio: false,
          },
          {
            width: 610,
            height: 610,
            aspectRatio: false,
          }
          ]
        },
        files: [{
          expand: true,
          src: ['**.{jpg,gif,png}'],
          cwd: 'screens/',
          dest: 'img/'
        }]
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
        tasks: ['sass', 'autoprefixer', 'jekyll'],
        options: {
          spawn: false,
        }
      },
      html: {
        files: ['*.html', '_includes/*.html', '_layouts/*.html'],
        tasks: ['jekyll'],
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

  grunt.registerTask('js', ['concat', 'uglify']);

  grunt.registerTask('server', ['connect', 'watch']);

  grunt.registerTask('image', ['responsive_images', 'imagemin']);

};
