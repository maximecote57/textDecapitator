module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);
    
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        uglify: {      
            mainJs: { 
                src :  'js/textTruncator.js',
                dest : 'js/textTruncator.min.js' 
            }
        }

    });
 

};