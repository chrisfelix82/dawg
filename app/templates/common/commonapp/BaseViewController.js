define([
        "dojo/_base/declare",
        "dojo/_base/lang"
        ],function(declare,lang){
	
	return declare([],{
		
		// view: dojox/app/View
		//		Pointer to view.  You can use this.view.loadedModels etc.
		view : null,
		
		constructor : function(args){
			lang.mixin(this,args);
		},
		
		init : function(){
			// summary:
			//		Called when the view is first initialized
		},
		
		beforeActivate : function(previousView, data){
			// summary:
			//		Called before this view transitions off
			// previousView: dojox/app/View
			//		The previous view
			// data: Object
			//		The transition data.  The data received is the data passed in the data attribute of the transition options of the transition that led to that view.
		},
		
		beforeDeactivate : function(nextView, data){
			// summary:
			//		Called before this view transitions off
			// nextView: dojox/app/View
			//		The next view
			// data: Object
			//		The transition data.  The data received is the data passed in the data attribute of the transition options of the transition that led to that view.
        },
        
        destroy : function(){
        	// summary:
        	//		Called when the view is being destroyed
        },
		
		controller : function(){
			var _this = this;
			return {
				 init: function(){
					 	_this.view = this;
					 	_this.init();
				 },

		         beforeActivate: lang.hitch(this,this.beforeActivate),

		         beforeDeactivate: lang.hitch(this,this.beforeDeactivate),

		         destroy: function(){
		                 // _WidgetBase.on listener is automatically destroyed when the Widget itself is.
		                 this.inherited(arguments);
		                 _this.destroy();
		         }
			 };
		}
		
	});
});