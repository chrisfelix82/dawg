'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var fs = require('fs');
var fsextra = require('fs-extra');

var SampleGenerator = module.exports = function SampleGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
	 yeoman.generators.NamedBase.apply(this, arguments);
	  this.appName = args[0];
	  this.appRoot = this.options.env.cwd + "/apps/" + this.appName + "/";
	  this.configJson = JSON.parse(this.readFileAsString(this.options.env.cwd + "/apps/" + this.appName + "/common/commonapp/config.json"));
};

util.inherits(SampleGenerator, yeoman.generators.NamedBase);

SampleGenerator.prototype.askFor = function askFor() {
	  var cb = this.async();

	  // have Yeoman greet the user.
	  console.log(this.yeoman);

	  var prompts = [
	  ];

	  this.prompt(prompts, function (props) {
		  this.viewName = "Sample";
		  this.packageName = "commonapp/sample";
		  this.isTemplate = false;
		  this.component = this.packageName.substring(this.packageName.lastIndexOf("/") + 1);
		  if(this.isTemplate){
			  this.viewSuffix = "Template";
		  }else{
			  this.viewSuffix = "View";
		  }//end if
	    cb();
	  }.bind(this));
	};

SampleGenerator.prototype.files = function files() {
	var envDir = this.packageName.substring(0,this.packageName.indexOf("/") - 3);
	var pkg = this.appRoot + envDir + "/" + this.packageName;
	var fileName = this.viewName + this.viewSuffix;
	
	if(!fs.existsSync(pkg)){
		//Make component directories if they do not exist
		this.mkdir(pkg);
		this.mkdir(pkg + "/images");
		this.mkdir(pkg + "/nls");
		this.mkdir(pkg + "/css");
	}//end if
	
	
	this.copy("someView.js",pkg + "/" + fileName + ".js");
	if(this.isTemplate){
		this.template("_someTemplate.html",pkg + "/" + fileName + ".html");
	}else{
		this.template("_someView.html",pkg + "/" + fileName + ".html");
	}//end if
	
	this.template("css/_someView.css",pkg + "/css/" + fileName + ".css");
	this.template("nls/_someView.js",pkg + "/nls/" + fileName + ".js");
	
	console.log("Checking if " + pkg + "/" + this.component + ".css exists...");
	if(fs.existsSync(pkg + "/" + this.component + ".css")){
		console.log("It exists, so I will append to it");
		var componentCSS = this.readFileAsString(pkg + "/" + this.component + ".css");
		if(componentCSS.indexOf("./css/" + fileName + ".css") === -1){
			//Only append css import if it does not exist
			componentCSS += "\n@import url('./css/" + fileName + ".css');";
			this.write(pkg + "/" + this.component + ".css",componentCSS);
		}//end if
	}else{
		console.log("It does not exist, so I will create it");
		this.template("_someComponent.css",pkg + "/" + this.component + ".css");
		var path = pkg.split("/");
		var parentDir = path[path.length - 2];
		console.log("Adding component css file to " + parentDir +".css");
		var appCSS = this.readFileAsString(pkg + "/../" + parentDir + ".css");
		if(appCSS.indexOf(this.component + "/" + this.component + ".css") === -1){
			//only append if import does not exist
			appCSS += "\n@import url('" + this.component + "/" + this.component + ".css');";
			this.write(pkg + "/../" + parentDir + ".css",appCSS);
		}//end if
	}//end if 
	
	//now we need to write the new view to the config.json file
	if(!this.configJson.views){this.configJson.views = new Object();}
	if(!this.parentView){
		this.configJson.views[fileName] = new Object();
		this.configJson.views[fileName].template = this.packageName + "/" + fileName + ".html";
		this.configJson.views[fileName].controller = this.packageName + "/" + fileName + ".js";
		this.configJson.views[fileName].nls = this.packageName + "/nls/" + fileName + ".js";
	}else{
		var parent = this.configJson;
		var path = this.parentView.split(".");
		for(var x = 0; x < path.length; x++){
			if(!parent.views){
				parent.views = new Object();
			}//end if
			parent = parent.views[path[x]];
			if(!parent.views){
				parent.views = new Object();
			}//end if
			parent = parent.views;
		}//end for
		
		parent[fileName] = new Object();
		parent[fileName].template = this.packageName + "/" + fileName + ".html";
		parent[fileName].controller = this.packageName + "/" + fileName + ".js";
		parent[fileName].nls = this.packageName + "/nls/" + fileName + ".js";
	}//end if
	this.write(this.appRoot + "common/commonapp/config.json",JSON.stringify(this.configJson));
	
	//copy sample adapter over
	var cb = this.async();
	fsextra.copy(this._sourceRoot + "/adapters/User",this.options.env.cwd + "/adapters/User",function(err){
		if(err){
			console.error("Failed to copy User sample adapter");
			cb(err);
		}else{
			cb();
		}//end if
	}.bind(this));
};