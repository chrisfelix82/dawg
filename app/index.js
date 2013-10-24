'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var fs = require('fs');
var fsextra = require('fs-extra');


var DawgGenerator = module.exports = function DawgGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
   // this.installDependencies({ skipInstall: options['skip-install'] });
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
   }
  ];

  this.prompt(prompts, function (props) {
    this.appName = props.appName;
    this.appRoot = this.options.env.cwd + "/apps/" + this.appName + "/";
    this.envCss = this.readFileAsString(this.options.env.cwd + "/apps/" + this.appName + "/common/css/" + this.appName + ".css");
    cb();
  }.bind(this));
};



DawgGenerator.prototype.app = function app() {
  
  //copy grunt file for grunt tasks after scaffolding is complete
 // this.copy("Gruntfile.js","Gruntfile.js");
 // this.copy("_package.json","package.json");
 
  /*
  this.template("_test.html","common/commonapp/test.html");
  this.config = JSON.parse(this.readFileAsString(path.join(process.cwd(),"/common/commonapp/config.json")));
  this.config.views["view1"] = {"template" : "a", controller: "b"};
  this.write(path.join(process.cwd(),"/common/commonapp/config.json"),JSON.stringify(this.config));
  */
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


DawgGenerator.prototype.copyWorklightFiles = function copyWorklightFiles() {
	//Copy dev and prod versions of main.html
	var file = "apps/" + this.appName + "/common/" + this.appName;
	this.template("common/_Main.html", file + ".html");
	this.template("common/_Main_prod.html",file + "_prod.html");
	//copy bootstrap file
	this.copy("common/js/Main.js","apps/" + this.appName + "/common/js/" + this.appName + ".js");
	
	fsextra.copy(this.options.env.cwd + "/apps/" + this.appName + "/application-descriptor.xml",this.options.env.cwd + "/apps/" + this.appName + "/application-descriptor_prod.xml");
	fsextra.copy(this.options.env.cwd + "/server/conf/worklight.properties",this.options.env.cwd + "/server/conf/worklight_prod.properties");
	
	//Create top level css imports
	if(!fs.existsSync(this.appRoot + "/common/css/common.css")){
		this.write("apps/" + this.appName + "/common/css/common.css",this.envCss);
		this.write("apps/" + this.appName + "/common/css/" + this.appName + ".css","@import url('./common.css');\n@import url('../commonapp/commonapp.css');\n");
	}//end if

};


