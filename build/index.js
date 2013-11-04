'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var BuildGenerator = module.exports = function BuildGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);
  
  console.log('You called the build subgenerator with the argument ' + this.name + '.');
};

util.inherits(BuildGenerator, yeoman.generators.NamedBase);


BuildGenerator.prototype.askFor = function askFor() {
	  var cb = this.async();

	  // have Yeoman greet the user.
	  console.log(this.yeoman);

	  var prompts = [	
	  {
		  name: 'wlProject',
	      message: 'What is the name of the Worklight project?',
	      default: "MobileProject"
	  },
	  {
		  name: 'wlApp',
	      message: 'What is the name of the Worklight app?',
	      default: "main"
	  },
	  {
		  name: 'appPackages',
	      message: 'What are the worklight environments the project supports? (comma delimited)',
	      default: "common"
	  },
	  {
		  name: 'supportedLocales',
	      message: 'What are the supported locales for the app? (comma delimited)',
	      default: "en"
	  },
	  {
		 name: 'dojoLibProject',
		 message: 'What is the name of the dojo lib project?',
		 default: "dojoLib"
	  },
	  {
			 name: 'buildProject',
			 message: 'What is the name of the build project?',
			 default: "Build"
	  },
	  {
		   type: "confirm",
		   name: 'createBuildDir',
		   message: 'Create build dir?',
		   default: false
	  }
	  ];

	  this.prompt(prompts, function (props) {
		  this.dojoLibProject = props.dojoLibProject;
		  this.buildProject = props.buildProject;
		  this.libraryRequestsFile = this.options.env.cwd + "/../" + this.dojoLibProject + "/toolkit/library-requests.txt";
		  this.wlProject = props.wlProject;
		  this.wlApp = props.wlApp;
		  this.supportedLocales = props.supportedLocales;
		  this.appPackages = props.appPackages;
		  this.appPackages = this.appPackages.split(",");
		  this.createBuildDir = props.createBuildDir;
		  if(!this.createBuildDir){
			  this.buildXML =  this.readFileAsString(this.options.env.cwd + "/../" + this.buildProject + "/build/scripts/build.xml");
			  this.buildXMLRTC = this.readFileAsString(this.options.env.cwd + "/../" + this.buildProject + "/build/scripts/build_RTC.xml");
		  }//end if
		  cb();
	  }.bind(this));
	};

BuildGenerator.prototype.copyBuild = function copyBuild() {
		if(this.createBuildDir){
			var cb = this.async();
			console.log("Creating the build directory");
			//this.copy("lib/ant-contrib-1.0b3.jar",this.options.env.cwd + "/../" + this.dojoLibProject + "/toolkit/build/lib/ant-contrib-1.0b3.jar");
			this.copy("library-requests.txt",this.options.env.cwd + "/../" + this.dojoLibProject + "/toolkit/library-requests.txt");
			this.copy("scripts/_build.xml",this.options.env.cwd + "/../" + this.buildProject + "/build/scripts/build.xml");
			this.copy("scripts/_build_RTC.xml",this.options.env.cwd + "/../" + this.buildProject + "/build/scripts/build_RTC.xml");
			this.copy("lib/README.md",this.options.env.cwd + "/../" + this.buildProject + "/build/lib/README.md");
			this.copy("output/dojo/blank.txt",this.options.env.cwd + "/../" + this.buildProject + "/build/output/dojo/blank.txt");
			this.copy("output/worklight/blank.txt",this.options.env.cwd + "/../" + this.buildProject + "/build/output/worklight/blank.txt");
			this.copy("output/worklight/classes/blank.txt",this.options.env.cwd + "/../" + this.buildProject + "/build/output/worklight/classes/blank.txt");
			cb();
		}//end if
};

BuildGenerator.prototype.moreCopy = function(){
	if(this.createBuildDir){
		var cb = this.async();
		this.buildXMLRTC = this.readFileAsString(this.options.env.cwd + "/../" + this.buildProject + "/build/scripts/build_RTC.xml");
		this.buildXML = this.readFileAsString(this.options.env.cwd + "/../" + this.buildProject + "/build/scripts/build.xml");
		this.buildXML = this.buildXML.replace(/<%= wlProject %>/g,this.wlProject);
		this.buildXML = this.buildXML.replace(/<%= wlApp %>/g,this.wlApp);
		this.buildXML = this.buildXML.replace(/<%= appPackages %>/g,this.appPackages);
		this.buildXML = this.buildXML.replace(/<%= dojoLibProject %>/g,this.dojoLibProject);
		this.buildXML = this.buildXML.replace(/<%= supportedLocales %>/g,this.supportedLocales);
		this.buildXMLRTC = this.buildXMLRTC.replace(/<%= wlProject %>/g,this.wlProject);
		this.buildXMLRTC = this.buildXMLRTC.replace(/<%= wlApp %>/g,this.wlApp);
		this.buildXMLRTC = this.buildXMLRTC.replace(/<%= appPackages %>/g,this.appPackages);
		this.buildXMLRTC = this.buildXMLRTC.replace(/<%= dojoLibProject %>/g,this.dojoLibProject);
		this.buildXMLRTC = this.buildXMLRTC.replace(/<%= supportedLocales %>/g,this.supportedLocales);
		this.write(this.options.env.cwd + "/../" + this.buildProject + "/build/scripts/build.xml",this.buildXML);
		this.write(this.options.env.cwd + "/../" + this.buildProject + "/build/scripts/build_RTC.xml",this.buildXMLRTC);
		cb();
	}//end if
};

BuildGenerator.prototype.processLibraryRequests = function processLibraryRequests() {
  //this.copy('somefile.js', 'somefile.js'); 
  
  var requestsString = this.readFileAsString(this.libraryRequestsFile);
  var startIndex = requestsString.indexOf("/dojo/");
  this.deps = [];
  this.filesToCopy = [];
  this.nlsFiles = [];
  this.otherFiles = [];
  while(startIndex >= 0){
	  startIndex = startIndex + 6;
	  var endIndex = requestsString.indexOf("\n",startIndex);  
	  if(startIndex === endIndex || endIndex === -1){console.log("Start index = end index or endIndex = -1. done.");break;}
	  var dep = requestsString.substring(startIndex,endIndex);
	  if(dep.indexOf("deviceTheme") === -1 && dep.indexOf("/nls") === -1 && dep.indexOf(".js", dep.length - 3) !== -1){
		  this.deps.push(dep.replace(".js",""));
	  }else if(dep.indexOf("/nls/") > -1){
		  this.nlsFiles.push(dep);
		  this.otherFiles.push(dep);//also want to copy nls files over from library
	  }else{
		  this.otherFiles.push(dep);
	  }//end if
	 
	  startIndex = requestsString.indexOf("/dojo/",endIndex);
  }//end while
 
  this.otherFiles.push("dojo/dojo.js");//Always copy dojo.js over
  
  this.deps = JSON.stringify(this.deps);
  this.otherFiles = JSON.stringify(this.otherFiles);
 // this.deps = this.deps.replace("[","");
  //this.deps = this.deps.replace("]","");
  //console.log("Modules required for profile.js:\n",this.deps);
  this.appPackagesString = "";
  for(var x = 0; x < this.appPackages.length;x++){
	  var o = new Object();
	  o.name = this.appPackages[x] + "app";
	  o.location = "../../../" + this.wlProject + "/apps/" + this.wlApp + "/" + this.appPackages[x] + "/" + this.appPackages[x] + "app";
	  this.appPackagesString += "," + JSON.stringify(o) + "\n";
  }//end for

  //console.log("app packages to add to mobile.profile:",this.appPackagesString);
  this.template("scripts/_mobile.profile.js",this.options.env.cwd + "/../" + this.buildProject + "/build/scripts/mobile.profile.js");
  //console.log("NLS files:\n",this.nlsFiles);
  
  this.otherFiles = this.otherFiles.replace("[","");
  this.otherFiles = this.otherFiles.replace("]","");
  this.otherFiles = this.otherFiles.toString().replace(/\"/g,"");
  //console.log("Other files to be copied:\n",this.otherFiles);
  
  var copyFilesStartIndex = this.buildXML.indexOf('name="copyFiles"') + 16;
  copyFilesStartIndex =  this.buildXML.indexOf('value="',copyFilesStartIndex) + 7;
  var valueToReplace = this.buildXML.substring(copyFilesStartIndex,this.buildXML.indexOf('"',copyFilesStartIndex));
  this.buildXML = this.buildXML.replace(valueToReplace,this.otherFiles);
  this.write(this.options.env.cwd + "/../" + this.buildProject + "/build/scripts/build.xml",this.buildXML);
  
  copyFilesStartIndex = this.buildXMLRTC.indexOf('name="copyFiles"') + 16;
  copyFilesStartIndex =  this.buildXMLRTC.indexOf('value="',copyFilesStartIndex) + 7;
  var valueToReplace = this.buildXMLRTC.substring(copyFilesStartIndex,this.buildXMLRTC.indexOf('"',copyFilesStartIndex));
  this.buildXMLRTC = this.buildXMLRTC.replace(valueToReplace,this.otherFiles);
  this.write(this.options.env.cwd + "/../" + this.buildProject + "/build/scripts/build_RTC.xml",this.buildXMLRTC);
  
};
