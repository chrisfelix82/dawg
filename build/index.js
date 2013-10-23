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
		 name: 'dojoLibProject',
		 message: 'What is the name of the dojo lib project?',
		 default: "dojoLib"
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
		  this.libraryRequestsFile = this.options.env.cwd + "/../" + this.dojoLibProject + "/toolkit/build/library-requests.txt";
		  this.wlProject = props.wlProject;
		  this.wlApp = props.wlApp;
		  this.createBuildDir = props.createBuildDir;
		  this.buildDojoXML =  this.readFileAsString(this.options.env.cwd + "/apps/" + this.wlApp + "/build-dojo.xml");
		  cb();
	  }.bind(this));
	};

BuildGenerator.prototype.copyBuild = function copyBuild() {
		if(this.createBuildDir){
			console.log("Creating the build directory");
			this.copy("build/ant-contrib-1.0b3.jar",this.options.env.cwd + "/../" + this.dojoLibProject + "/toolkit/build/ant-contrib-1.0b3.jar");
			this.copy("build/library-requests.txt",this.options.env.cwd + "/../" + this.dojoLibProject + "/toolkit/build/library-requests.txt");
			this.template("_build-dojo.properties",this.options.env.cwd + "/apps/" + this.wlApp + "/build-dojo.properties");
			this.template("_build-dojo_test.properties",this.options.env.cwd + "/apps/" + this.wlApp + "/build-dojo_test.properties");
			this.copy("build-dojo.xml",this.options.env.cwd + "/apps/" + this.wlApp + "/build-dojo.xml");
			this.buildDojoXML = this.readFileAsString(this.options.env.cwd + "/apps/" + this.wlApp + "/build-dojo.xml");
			console.log(this.buildDojoXML);
			this.buildDojoXML = this.buildDojoXML.replace("dojoLibProject",this.dojoLibProject);
			this.write(this.options.env.cwd + "/apps/" + this.wlApp + "/build-dojo.xml",this.buildDojoXML);
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
	  if(startIndex === endIndex){console.log("Start index = end index");break;}
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
  this.template("build/_mobile.profile.js",this.options.env.cwd + "/../" + this.dojoLibProject + "/toolkit/build/mobile.profile.js");
  //console.log("NLS files:\n",this.nlsFiles);
  
  this.otherFiles = this.otherFiles.replace("[","");
  this.otherFiles = this.otherFiles.replace("]","");
  this.otherFiles = this.otherFiles.toString().replace(/\"/g,"");
  //console.log("Other files to be copied:\n",this.otherFiles);
  
  var copyFilesStartIndex = this.buildDojoXML.indexOf('name="copyFiles"') + 16;
  copyFilesStartIndex =  this.buildDojoXML.indexOf('value="',copyFilesStartIndex) + 7;
  var valueToReplace = this.buildDojoXML.substring(copyFilesStartIndex,this.buildDojoXML.indexOf('"',copyFilesStartIndex));
  this.buildDojoXML = this.buildDojoXML.replace(valueToReplace,this.otherFiles);
  
  this.write(this.options.env.cwd + "/apps/" + this.wlApp + "/build-dojo.xml",this.buildDojoXML);
};
