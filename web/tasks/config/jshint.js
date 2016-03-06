module.exports = function(grunt) {

  grunt.config.set('jshint', {

    lib: {
      options: {
        jshintrc: true
      },
      files: {
        src: [
          'Gruntfile.js',
          'src/js/services/*.js',
          'src/js/views/*.js'
        ]
      }
    },
    test: {
      options: {
        jshintrc: true
      },
      files: {
        src: [
          'test/unit/**/*.js'
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
};
