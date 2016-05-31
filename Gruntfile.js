module.exports = function(grunt) {
  'use strict';
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    //globalpkg: grunt.file.readJSON('../global/package.json'),
    requirejs: {
      aphirmAdmin: {
        options: {
          baseUrl: './src',
          paths: {
            'requireLib': 'app/utilities/require-2.1.11',
          },
          include: ['requireLib'],
          name: 'app/main',
          // name : 'core/src/js/lib/almond',
          mainConfigFile: 'src/app/main.js',
          out: 'build/app/js/<%= pkg.name %>.edge.js',
          wrapShim: true,
          optimize: 'none',
          findNestedDependencies: true,
        }
      }
    },
    uglify: {
      main: {
        options: {
          preserveComments: /Copyright|license/i,
          report: 'min'
        },
        files: {
          'build/app/js/<%= pkg.name %>.edge.min.js': ['build/app/js/<%= pkg.name %>.edge.js']
        }
      }
    },
    compass: {
      development: {
        options: {
          sassDir: 'src/app/sass',
          cssDir: 'src/app/css'
        }
      },
      production: {
        options: {
          sassDir: 'prebuild/src/app/sass',
          cssDir: 'prebuild/src/css',
          debugInfo: false,
          environment: 'production',
          outputStyle: 'compressed',
          noLineComments: true
        }
      }
    },
    clean: {
      all: {
        options: {
          force: true
        },
        src: ['prebuild', 'build']
      },
      target: {
        options: {
          force: true
        },
        src: ['target']
      },
      docs: {
        options: {
          force: true
        },
        src: ['docs']
      },
      test: {
        options: {
          force: true
        },
        src: ['prebuild']
      }
    },
    copy: {
      prebuild: {
        files: [{
          expand: true,
          src: ['src/**'],
          dest: 'prebuild/'
        }]
      },
      postbuild: {
        files: [{
            src: ['prebuild/src/css/aphirm-admin.css'],
            dest: 'build/css/<%= pkg.name %>.<%= pkg.versions.css %>.css'
          }, {
            src: ['prebuild/src/css/aphirm-admin.css'],
            dest: 'css/<%= pkg.name %>.<%= pkg.versions.css %>.css'
          }, {
            expand: true,
            cwd: 'prebuild/src/images',
            src: ['**'],
            dest: 'build/images/'
          }, {
            src: ['build/app/js/<%= pkg.name %>.edge.js'],
            dest: 'build/app/js/<%= pkg.name %>.<%= pkg.versions.js%>.js'
          }, {
            src: ['build/app/js/<%= pkg.name %>.edge.min.js'],
            dest: 'build/app/js/<%= pkg.name %>.<%= pkg.versions.js%>.min.js'
          }

        ]
      },
    },
    processhtml: {
      options: {
        data: {
          distjs: 'app/js/<%= pkg.name %>.<%= pkg.versions.js%>.min.js',
          distcss: 'css/<%= pkg.name %>.<%= pkg.versions.css %>.css',
        }
      },
      build: {
        files: {
          'build/index.html': ['prebuild/src/_index.html']
        }
      }
    },
    jsdoc: {
      build: {
        src: ['README.md', 'src/app/**/*.*'],
        dest: 'docs'
      }
    },
    docco: {
      options: {
        output: 'docs/docco/'
      },
      build: {
        src: ['build/app/js/<%= pkg.name %>.edge.js']
      },
    },
    watch: {
      docco: {
        files: ['src/app/**'],
        tasks: ['do:docco'],
        options: {
          spawn: false
        }
      }
    },
    readme: {
      options: {
        docs: './md',
        templates: './md',
        readme: 'README.md.tmpl',
        metadata: {
          annotated: ['docco/<%= pkg.name %>.edge.html']
        }
      }
    },
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-docco');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-readme');

  grunt.registerTask('package', ['clean:all','clean:target', 'copy:prebuild', 'processhtml', 'compass:production', 'requirejs:aphirmAdmin','uglify:main', 'copy:postbuild', 'war:aphirmAdmin', 'copy:postwar', 'clean:all']);
  grunt.registerTask('test', ['clean:all', 'copy:prebuild', 'processhtml', 'compass:production', 'requirejs:aphirmAdmin', 'uglify:main', 'copy:postbuild', 'war', 'copy:postwar', 'clean:test']);
  grunt.registerTask('package:documents', ['clean:docs','clean:target', 'jsdoc:build', 'requirejs:aphirmAdmin', 'docco:build', 'clean:all', 'war:docs','copy:postwar']);
  grunt.registerTask('documents', ['clean:docs', 'readme','jsdoc:build','docco:build', 'war:docs']);
  grunt.registerTask('partial', ['clean:all', 'copy:prebuild', 'processhtml', 'compass:production', 'requirejs:aphirmAdmin', 'copy:postbuild']);
  grunt.registerTask('do:docco', ['clean:docs', 'readme', 'jsdoc:build', 'requirejs:aphirmAdmin', 'docco:build', 'clean:all']);
};
