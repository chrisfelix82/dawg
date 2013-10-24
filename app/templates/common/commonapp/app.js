define(["dojo/_base/declare",
        "dojo/_base/lang",
        "dojox/app/main",
        "dojo/text!./config.json",
        "dojox/json/ref",
        "dojo/has",
        "module",
        "dojo/dom-class",
        "dojo/Deferred",
        "dojo/topic",
        "dojo/domReady!"],function(declare,lang,Application,config,jsonRef,has,module,domClass,Deferred,topic){
	// description:
	//		This class bootstraps the application.  js/Main.js calls the init() method on the singleton instance of the class.
	
	var MODULE = module.id;
	var instance = declare([],{
		
		
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
			
			//This is a fix for the full screen UIViewController in iOS 7.  i.e. we push the body down by 20px, which is the height of the 
			//status bar
			if (window.device && (WL.Client.getEnvironment() == WL.Environment.IPAD || WL.Client.getEnvironment() == WL.Environment.IPHONE)
					&& parseFloat(window.device.version) >= 7.0) {
		        //Make sure that the body tag contains the wl_ios7 class
				domClass.add(window.document.body,"wl_ios7");
		       console.warn("Added wl_ios7 class to body element");
			}//end if
			
			//load app's config.json file
			var c = jsonRef.fromJson(config);
			
			var paths = new Object();
			for(p in dojoConfig.packages){
				paths[p.name] = p.location;
			}//end for
			c.loaderConfig =  {"paths": paths};
	
			this._defineHas();
			document.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);
			
			
			if(WL.Client.getEnvironment == WL.Environment.IPAD || WL.Client.getEnvironment == WL.Environment.IPHONE){
				WL.App.BackgroundHandler.setOnAppEnteringForeground(lang.hitch(this,this._onForeground));
				WL.App.BackgroundHandler.setOnAppEnteringBackground(lang.hitch(this,this._onBackground));
			}//end if
			
			
			//Initialize the dojox/app
			Application(c);
			WL.Client.connect({
					onSuccess: function(){console.debug("Success connecting to Worklight server!");},
					onFailure: function(){alert("Failed to connect to Worklight server.  Make sure that you are connected to the IBM intranet.");}
				});
				
			//TODO: do this better
			//fix for one ui styles not working with this class added
			setTimeout(function(){domClass.remove(document.getElementsByTagName("html")[0],"dj_ios6");},500);
				
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
			
		},
		
		_onForeground : function(){
			topic.publish("app/enterforeground", null);
		},
		
		_onBackground : function(){
			topic.publish("app/enterbackground", null);
		}
		
		
	});
	
	return new instance();
});
