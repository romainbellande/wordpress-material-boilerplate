module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.initConfig({
    watch: {
      files: ['bower_components/*'],
      tasks: ['wiredep']
    },
    wiredep: {
      task: {
        src: [
          'functions.php'
        ],
        options: {
          fileTypes: {
            php: {
              block: /(([ \t]*)\/\/\s*bower:*(\S*))(\n|\r|.)*?(\/\/\s*endbower)/gi,
              detect: {
                css: /wp_enqueue_style.*get_template_directory_uri.*['"]\/(.*\.css)/gi,
                js: /wp_enqueue_script.*get_template_directory_uri.*['"]\/(.*\.js)/gi
              },
              replace: {
                js: function(filePath){
                  var fileName = filePath.substring(filePath.lastIndexOf('/')+1);
                  var wpHandle = fileName.replace(".","-");
                  return "wp_enqueue_script('"+wpHandle+"',get_stylesheet_directory_uri() . '/"+filePath+"');";
                },
                css: function(filePath){
                  var fileName = filePath.substring(filePath.lastIndexOf('/')+1);
                  var wpHandle = fileName.replace(".","-");
                  return "wp_enqueue_style('"+wpHandle+"',get_stylesheet_directory_uri() . '/"+filePath+"');";
                }
              }
            }
          }
        }
      }
    }
  });
  grunt.registerTask('default', ['wiredep']);

};
