define(["dojo/_base/declare",
        "dojo/_base/lang",
        "dojox/app/main",
        "dojo/text!./config.json",
        "dojox/json/ref",
        "dojo/has",
        "module",
        "dojo/domReady!"],function(declare,lang,Application,config,jsonRef,has,module){
	// description:
	//		This class bootstraps the application.  js/Main.js calls the init() method on the singleton instance of the class.
	
	var MODULE = module.id;
	var instance = declare([],{
		
		// app : Object
		//		The dojox/app instance
		app : null,
		
		constructor : function(args){
			// summary:
			//		The constructor
			// args: Object
			//		The arguments to override default app controller values
			lang.mixin(this,args);
		},
		
		init : function(){
			// summary:
			//		Initializes the application
			// description:
			//		Define the loader config paths.  For prod the files will be local.  In dev, we load them from a remote server to improve deploy times and
			//		developer productivity. Change the server paths to your modules accordingly.  Also, make sure that you test in Chrome with web security
			//		disabled, or you will run into cross domain errors when loading resources.  e.g. on Mac launch Chrome with open -a Google\ Chrome --args --disable-web-security
 
			var F = MODULE + ":init:";
			console.debug(F,"Initializing the app");
			//load app's config.json file
			var c = jsonRef.fromJson(config);
			
			var paths = new Object();
			for(p in dojoConfig.packages){
				paths[p.name] = p.location;
			}//end for
			c.loaderConfig =  {"paths": paths};
	
			this._defineHas();
			document.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);
			//Initialize the dojox/app
			this.app = Application(c);
			console.debug(F,"APP STARTED!",this.app);
		},
		
		_defineHas : function(){
			// summary:
			//		This method defines the application's 'has' clauses
			
			var F = MODULE + ":_defineHas:";
			console.debug(F,"Create 'has' config based on Environment",WL.Client.getEnvironment());
			has.add("ie9orLess", function(){return (has("ie") && has("ie") <= 9);});

			has.add("WL.Environment.IPAD",function(){
				return WL.Client.getEnvironment() === WL.Environment.IPAD;
				});
			
		}
		
		
	});
	
	return new instance();
});