'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var fs = require('fs');

var EnvGenerator = module.exports = function EnvGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  this.appName = this.name;
  this.appRoot = this.options.env.cwd + "/apps/" + this.appName + "/";
  this.devHtml = this.readFileAsString(this.options.env.cwd + "/apps/" + this.appName + "/common/" + this.appName + ".html");
  this.prodHtml =  this.readFileAsString(this.options.env.cwd + "/apps/" + this.appName + "/common/" + this.appName + "_prod.html");
};

util.inherits(EnvGenerator, yeoman.generators.NamedBase);

EnvGenerator.prototype.askFor = function askFor() {
	  var cb = this.async();

	  // have Yeoman greet the user.
	  console.log(this.yeoman);

	  var prompts = [
	   {
		   name: 'envName',
		   message: 'What is the name of the environment?',
		   default: 'ipad'
	   }
	  ];

	  this.prompt(prompts, function (props) {
		  this.envName = props.envName;
		  this.envCss = this.readFileAsString(this.options.env.cwd + "/apps/" + this.appName + "/" + this.envName + "/css/" + this.appName + ".css");
		  cb();
	  }.bind(this));
	};

EnvGenerator.prototype.files = function files() {
  var dir = "apps/" + this.appName + "/" + this.envName + "/" + this.envName + "app";
  this.mkdir(dir);
  this.template('_app.profile.js',dir + "/app.profile.js");
  this.template('_package.json',dir + "/package.json");
  this.copy("_app.css",dir + "/" + this.envName +"app.css");
  
  //Read in envName.html and envName_prod.html and add the package envNameapp
  
  if(this.devHtml.indexOf(this.envName) === -1){
	  var dojoConfig = this.devHtml.substring(this.devHtml.indexOf("{"),this.devHtml.indexOf("};"));
	  dojoConfig = JSON.parse(dojoConfig + "}");
	  dojoConfig.packages.push({"name": this.envName + "app", "location": "http://localhost:3434/" + this.envName + "app"});
	  this.dojoPackages = JSON.stringify(dojoConfig.packages);
	  this.template("_Main.html","apps/" + this.appName + "/common/" + this.appName + ".html");
	  
	  var packages = this.prodHtml.substring(this.prodHtml.indexOf("\"packages"));
	  packages = packages.substring(0,packages.indexOf("]"));
	  packages += ',{"name": "' + this.envName + 'app", "location": locationPath + "/' + this.envName + 'app"}]';
	  this.dojoPackages = packages;
	  this.template("_Main_prod.html","apps/" + this.appName + "/common/" + this.appName + "_prod.html");
  }//end if
  
  //TODO Add the envNameapp.css to envName.css
  if(!fs.existsSync(this.appRoot + this.envName + "/css/" + this.envName + ".css")){
	  //copy the envName.app.css contents to envName.css
	  this.write(this.appRoot + this.envName + "/css/" + this.envName + ".css",this.envCss);
	  this.write("apps/" + this.appName + "/" + this.envName + "/css/" + this.appName + ".css","@import url('./" + this.envName + 
			  ".css');\n@import url('../" + this.envName + "app/" + this.envName + "app.css');\n");
  }//end if
};

EnvGenerator.prototype.addToDevServer = function addToDevServer() {
	var appjs = this.readFileAsString(this.options.env.cwd + "/dev_server/app.js");
	var serverjs = this.readFileAsString(this.options.env.cwd + "/dev_server/backend/server.js");
	//Determine if this environment is already added to the dev_server
	if(appjs.indexOf(this.envName) === -1){
		//We have not added the environment, so add it now
		var startIndex = appjs.indexOf("{");
		var endIndex = appjs.indexOf("};");
		var jsonString = appjs.substring(startIndex,endIndex) + "}";
		//Now append to packages 
		var o = JSON.parse(jsonString);
		o.packages.push({"name": this.envName, "location": "../apps/" + this.appName + "/" + this.envName});
		var s = "//Configuration Object for Dojo Loader:\ndojoConfig = " + JSON.stringify(o) + ";\n//Now load the Dojo loader\nrequire('../dojo/dojo/dojo.js');";
		this.write(this.options.env.cwd + "/dev_server/app.js",s);
	}//end if
	
	if(serverjs.indexOf(this.envName) === -1){
		//Now we need to modify backend/server.js to add the env dir to static content root
		startIndex = serverjs.indexOf("});");
		var beforeInsert = serverjs.substring(0,startIndex);
		var insert = 'app.use(express.static(require.toUrl("' + this.envName + '")));\n});';
		var afterInsert = serverjs.substring(startIndex + 3);
		this.write(this.options.env.cwd + "/dev_server/backend/server.js",beforeInsert + insert + afterInsert);
	}//end if
};

