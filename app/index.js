'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var walk = require('walk');
var fs = require('fs');
var fsextra = require('fs-extra');


var DawgGenerator = module.exports = function DawgGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
    //fs.rmdir(this.options.env.cwd + "/bower_components");
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(DawgGenerator, yeoman.generators.Base);

DawgGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [
  {
	 name: 'appName',
	 message: 'What is the name of the Worklight app',
	 default: "main"
  },
  {
	  name: 'dojoVersion',
	  message: 'What version of dojo would you like to use?',
	  default: "1.9"
   }
  ];

  this.prompt(prompts, function (props) {
    this.appName = props.appName;
    this.dojoVersion = props.dojoVersion;
    this.appRoot = this.options.env.cwd + "/apps/" + this.appName + "/";
    this.envCss = this.readFileAsString(this.options.env.cwd + "/apps/" + this.appName + "/common/css/" + this.appName + ".css");
    cb();
  }.bind(this));
};



DawgGenerator.prototype.app = function app() {
  
  //copy grunt file for grunt tasks after scaffolding is complete
  this.copy("Gruntfile.js","Gruntfile.js");
  this.copy("_package.json","package.json");
 
  /*
  this.template("_test.html","common/commonapp/test.html");
  this.config = JSON.parse(this.readFileAsString(path.join(process.cwd(),"/common/commonapp/config.json")));
  this.config.views["view1"] = {"template" : "a", controller: "b"};
  this.write(path.join(process.cwd(),"/common/commonapp/config.json"),JSON.stringify(this.config));
  */
};

DawgGenerator.prototype.copyBuild = function copyBuild() {
	var cb = this.async();
	this.mkdir('build');
	fsextra.copy(this._sourceRoot + "/build", this.options.env.cwd + "/build",function(err){
		  if (err) {
			 console.error("Failed to copy build dir" + err);
			 cb(err);
		   }else{
			   cb();
		   }//end if
	});
};

DawgGenerator.prototype.copyDocs = function copyDocs() {
	var cb = this.async();
	this.mkdir('docs');
	fsextra.copy(this._sourceRoot + "/docs", this.options.env.cwd + "/docs",function(err){
		  if (err) {
			 console.error("Failed to copy docs dir" + err);
			 cb(err);
		   }else{
			   cb();
		   }//end if
	});
};

DawgGenerator.prototype.copyCommonapp = function copyCommonapp() {
	var cb = this.async();
    this.mkdir(this.options.env.cwd + "/apps/" + this.appName + "/common/commonapp");
	fsextra.copy(this._sourceRoot + "/common/commonapp", this.options.env.cwd + "/apps/" + this.appName + "/common/commonapp",function(err){
		   if (err) {
			   console.error("Failed to copy commonapp dir" + err);
			   cb(err);
		   }else{
			   cb();
		   }//end if
	});
};

DawgGenerator.prototype.copyDojo = function copyDojo() {
	var cb = this.async();
     this.mkdir("dojo");
	 //Now copy dojo over
	 this.remote("dojo","dojo",this.dojoVersion + "",function(err,remote){
		 if(err){
			 console.error("Failed to get dojo " + this.dojoVersion + ": " + err);
			 cb(err);
		 }else{
			var homeDir = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
			fsextra.copy(homeDir + '/.cache/yeoman/dojo/dojo/' + this.dojoVersion, this.options.env.cwd + "/dojo/dojo",function(err){
		    	  if (err) {
		    		  console.error("Failed to copy dojo " + this.dojoVersion + ": " + err);
		    		 cb(err);
		    	   }else{
		    		   cb();
		    	   }//end if
		    });
		 }//end if
	 }.bind(this));
};

DawgGenerator.prototype.copyDijit = function copyDijit() {
	var cb = this.async();
	 //Now copy dojo over
	 this.remote("dojo","dijit",this.dojoVersion + "",function(err,remote){
		 if(err){
			 console.error("Failed to get dojo/dijit" + this.dojoVersion + ": " + err);
			 cb(err);
		 }else{
			var homeDir = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
			fsextra.copy(homeDir + '/.cache/yeoman/dojo/dijit/' + this.dojoVersion, this.options.env.cwd + "/dojo/dijit",function(err){
		    	  if (err) {
		    		  console.error("Failed to copy dojo/dijit " + this.dojoVersion + ": " + err);
		    		 cb(err);
		    	   }else{
		    		   cb();
		    	   }//end if
		    });
		 }//end if
	 }.bind(this));
};

DawgGenerator.prototype.copyDojox = function copyDojox() {
	var cb = this.async();
	 //Now copy dojo over
	 this.remote("dojo","dojox",this.dojoVersion + "",function(err,remote){
		 if(err){
			 console.error("Failed to get dojox " + this.dojoVersion + ": " + err);
			 cb(err);
		 }else{
			var homeDir = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
			fsextra.copy(homeDir + '/.cache/yeoman/dojo/dojox/' + this.dojoVersion, this.options.env.cwd + "/dojo/dojox",function(err){
		    	  if (err) {
		    		  console.error("Failed to copy dojox " + this.dojoVersion + ": " + err);
		    		 cb(err);
		    	   }else{
		    		   cb();
		    	   }//end if
		    });
		 }//end if
	 }.bind(this));
};

DawgGenerator.prototype.copyDojoxApp = function copyDojoxApp() {
	var cb = this.async();
	 //Now copy dojo over
	 this.remote("dmachi","dojox_application","dojo" + this.dojoVersion.replace(".",""),function(err,remote){
		 if(err){
			 console.error("Failed to get dojox/app " + this.dojoVersion + ": " + err);
			 cb(err);
		 }else{
			var homeDir = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
			fsextra.copy(homeDir + '/.cache/yeoman/dmachi/dojox_application/' + "dojo" + this.dojoVersion.replace(".",""), this.options.env.cwd + "/dojo/dojox/app",function(err){
		    	  if (err) {
		    		  console.error("Failed to copy dojox/app " + this.dojoVersion + ": " + err);
		    		 cb(err);
		    	   }else{
		    		   cb();
		    	   }//end if
		    });
		 }//end if
	 }.bind(this));
};

DawgGenerator.prototype.copyDojoUtil = function copyDojoUtil() {
	var cb = this.async();
	 //Now copy dojo over
	 this.remote("dojo","util",this.dojoVersion + "",function(err,remote){
		 if(err){
			 console.error("Failed to get dojo/util" + this.dojoVersion + ": " + err);
			 cb(err);
		 }else{
			var homeDir = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
			fsextra.copy(homeDir + '/.cache/yeoman/dojo/util/' + this.dojoVersion, this.options.env.cwd + "/dojo/util",function(err){
		    	  if (err) {
		    		  console.error("Failed to copy dojo/util " + this.dojoVersion + ": " + err);
		    		 cb(err);
		    	   }else{
		    		   cb();
		    	   }//end if
		    });
		 }//end if
	 }.bind(this));
};

DawgGenerator.prototype.copyWorklightFiles = function copyWorklightFiles() {
	//Copy dev and prod versions of main.html
	var file = "apps/" + this.appName + "/common/" + this.appName;
	this.template("common/_Main.html", file + ".html");
	this.template("common/_Main_prod.html",file + "_prod.html");
	//copy bootstrap file
	this.copy("common/js/Main.js","apps/" + this.appName + "/common/js/" + this.appName + ".js");
	
	fsextra.copy(this.options.env.cwd + "/apps/" + this.appName + "/application-descriptor.xml",this.options.env.cwd + "/apps/" + this.appName + "/application-descriptor_prod.xml");
	fsextra.copy(this.options.env.cwd + "/apps/" + this.appName + "/application-descriptor.xml",this.options.env.cwd + "/apps/" + this.appName + "/application-descriptor_local.xml");
	fsextra.copy(this.options.env.cwd + "/server/conf/worklight.properties",this.options.env.cwd + "/server/conf/worklight_local.properties");
	fsextra.copy(this.options.env.cwd + "/server/conf/worklight.properties",this.options.env.cwd + "/server/conf/worklight_prod.properties");
	
	//Create top level css imports
	if(!fs.existsSync(this.appRoot + "/common/css/common.css")){
		this.write("apps/" + this.appName + "/common/css/common.css",this.envCss);
		this.write("apps/" + this.appName + "/common/css/" + this.appName + ".css","@import url('./common.css');\n@import url('../commonapp/commonapp.css');\n");
	}//end if

};

DawgGenerator.prototype.copyDevServer = function copyDevServer() {
	this.mkdir("dev_server");
	
	var cb = this.async();
	fsextra.copy(this._sourceRoot + "/dev_server", this.options.env.cwd + "/dev_server",function(err){
		  if (err) {
			 console.error("Failed to copy dev_server" + err);
			 cb(err);
		   }else{
			   this.copy("_app.js","dev_server/app.js");
			   cb();
		   }//end if
	}.bind(this));
};


