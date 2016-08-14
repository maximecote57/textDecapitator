module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);
    
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        uglify: {      
            mainJs: { 
                src :  'js/textDecapitator.js',
                dest : 'js/textDecapitator.min.js' 
            }
        }

    });
 

};