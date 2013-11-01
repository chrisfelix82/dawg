define([
        "dojo/_base/declare",
        "dojo/_base/lang",
        "commonapp/BaseViewController",
        "module",
        "dojo/on",
        "dojo/dom-attr",
        "dojox/mvc/at",
        'dojox/mvc/getStateful'
        ],function(declare,lang,BaseViewController,module,on,domAttr,at,getStateful){
	
	 var MODULE = module.id; 
	 var c = declare([BaseViewController],{
		 
		 	/**
			 * @memberOf SampleView
		 	 */
		 
		 	// summary:
		    //		This is a sample dojox/app view.  You can create your own views through yo dawg:view <%= appName %>
		 	
		 	init : function(){
				// summary:
				//		Called when the view is first initialized
		 		
		 		var F = MODULE + ":init:";
		 		console.debug(F,"Enter");
		 		
		 		console.debug(F,"Exit");
			},
			
			beforeActivate : function(previousView, data){
				// summary:
				//		Called before this view transitions off
				// previousView: dojox/app/View
				//		The previous view
				// data: Object
				//		The transition data.  The data received is the data passed in the data attribute of the transition options of the transition that led to that view.
				
				var F = MODULE + ":beforeActivate:";
		 		console.debug(F,"Enter");
		 		//Set the header on the parent template.  This method is defined in BaseViewController.
		 		this.setHeadingLabel(this.view.nls.title);
		 		//TODO: See other common methods available on commonapp/BaseViewController 
		 		console.debug(F,"Exit");
			},
			
			beforeDeactivate : function(nextView, data){
				// summary:
				//		Called before this view transitions off
				// nextView: dojox/app/View
				//		The next view
				// data: Object
				//		The transition data.  The data received is the data passed in the data attribute of the transition options of the transition that led to that view.
				
				var F = MODULE + ":beforeDeactivate:";
		 		console.debug(F,"Enter");
		 		
		 		console.debug(F,"Exit");
			},
			
			/**
			 * commonapp/BaseViewController calls these methods on your class automatically. Take advantage of these lifecylce methods
			 * in all of your classes to keep the code base consistent.
			 _createWidgets : function(){
		        	// summary:
		        	//		This is a private method that should be implemented by the child class if there are programatic widgets
		        	//		to be created
		        	// tags:
		        	//		protected
		      },
		        
		 	_connectActionHandlers : function(){
		 			// summary:
		 			//		This is a private method that should be implemented by the child class if there are action handlers
		 			//		to connect to inputs in the view
		 			// tags:
		 			//		protected
		 	},
		 		
		 	_onEnterForeground : function(){
		 			// summary:
		 			//		This action handler is called when this is the active view, and the app enters the foreground
		 			// tags:
		 			//		protected
		 	},
		 		
		 	_onEnterBackground : function(){
		 			// summary:
		 			//		This action handler is called when this is the active view, and the app enters the background
		 			// tags:
		 			//		protected
		 	},
			*/
			
			
			//Add more view method here.  Remember you can access loadedModels, loadedStores, nls etc. on the view through this.view
		 
	 });
	 var v = new c();
	 return v.controller();
	
});