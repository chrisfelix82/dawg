'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    startserver: {
    	options: {
    		configJson: grunt.file.readJSON('apps/main/common/commonapp/config.json')
    	}
    }
  });

  grunt.registerTask('devserver', 'Start dev server for speedy refresh of web resources', function () {
  	  	grunt.util.spawn({
      	cmd: 'node',
      	args: ['./dev_server/app.js']
   		 },grunt.task.current.async());  
  });
  
  grunt.registerTask('appium', 'Start the Appium server', function () {
	  	grunt.util.spawn({
    	cmd: 'node',
    	args: ['./node_modules/appium/server.js']
 		 },grunt.task.current.async());  
});
  
  grunt.registerTask('chrome','Start Chrome with web security disabled',function(){
  	 grunt.util.spawn({
  	  	cmd : 'bash',
  	  	args: ['./build/start-chrome.sh']
  	  },grunt.task.current.async());
  });
  
  grunt.registerTask('build-app', ['copyFiles','buildwlapp']);
  grunt.registerTask('deploy-app', ['deploywlapp']);
  grunt.registerTask('build-adapters', ['buildAdapters']);
  grunt.registerTask('deploy-adapters', ['deployAdapters']);
  grunt.registerTask('build-war', ['buildWAR']);
  grunt.registerTask('make-docs', ['makeDocs']);
  grunt.registerTask('default', ['make-docs','build-app',"build-adapters",'deploy-adapters','deploy-app']);
  grunt.registerTask('all', ['make-docs','build-app',"build-adapters",'deploy-adapters','deploy-app','build-war','buildipa','deployipa']);
 
  grunt.registerTask('stage', 'git add files before running the release task', function () {
    var files = this.options().files;
    grunt.util.spawn({
      cmd: process.platform === 'win32' ? 'git.cmd' : 'git',
      args: ['add'].concat(files)
    }, grunt.task.current.async());
  });
  
  
  //Private tasks below
  grunt.registerTask('copyFiles','Build optimized Dojo and copy those files to Worklight app',function(){
  	 grunt.util.spawn({
  	  	cmd : 'ant',
  	  	args: ['copyFiles','-f','./build/build.xml']
  	  },grunt.task.current.async());
  });
  
  grunt.registerTask('buildwlapp','Build Worklight app .wlapp file',function(){
  	 grunt.util.spawn({
  	  	cmd : 'ant',
  	  	args: ['buildwlapp','-f','./build/build.xml']
  	  },grunt.task.current.async());
  });
  
  grunt.registerTask('deploywlapp','Deploy Worklight app .wlapp file',function(){
	  	 grunt.util.spawn({
	  	  	cmd : 'ant',
	  	  	args: ['deploywlapp','-f','./build/build.xml']
	  	  },grunt.task.current.async());
	  });
  
  grunt.registerTask('buildAdapters','Build Worklight adapters',function(){
	  	 grunt.util.spawn({
	  	  	cmd : 'ant',
	  	  	args: ['buildAdapters','-f','./build/build.xml']
	  	  },grunt.task.current.async());
	  });
  
  grunt.registerTask('deployAdapters','Deploy Worklight adapters',function(){
	  	 grunt.util.spawn({
	  	  	cmd : 'ant',
	  	  	args: ['deployAdapters','-f','./build/build.xml']
	  	  },grunt.task.current.async());
	  });
  
  grunt.registerTask('buildWAR','Build Worklight WAR',function(){
	  	 grunt.util.spawn({
	  	  	cmd : 'ant',
	  	  	args: ['buildWAR','-f','./build/build.xml']
	  	  },grunt.task.current.async());
	  });
  
  grunt.registerTask('makeDocs','Create API docs',function(){
	  	 grunt.util.spawn({
	  	  	cmd : 'ant',
	  	  	args: ['generateAPIDocs','-f','./build/build.xml']
	  	  },grunt.task.current.async());
	  });
  
  grunt.registerTask('buildipa','Build iOS app',function(){
	  	 grunt.util.spawn({
	  	  	cmd : 'ant',
	  	  	args: ['buildipa','-f','./build/build.xml']
	  	  },grunt.task.current.async());
	  });
  
  grunt.registerTask('deployipa','Deploy iOS app to Application Center',function(){
	  	 grunt.util.spawn({
	  	  	cmd : 'ant',
	  	  	args: ['deployipa','-f','./build/build.xml']
	  	  },grunt.task.current.async());
	  });

};