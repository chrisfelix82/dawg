define([
        "dojo/_base/declare",
        "dojo/_base/lang",
        "commonapp/BaseViewController",
        "module",
        "dojo/on",
        "dojo/dom-attr",
        "dojox/mvc/at",
        'dojox/mvc/getStateful',
        //template specific modules

        ],function(declare,lang,BaseViewController,module,on,domAttr,at,getStateful){
	
	 var MODULE = module.id; 
	 var c = declare([BaseViewController],{
		 
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
			}
			
			//Add more view method here.  Remember you can access loadedModels, loadedStores, nls etc. on the view through this.view
		 
	 });
	 var v = new c();
	 return v.controller();
	
});