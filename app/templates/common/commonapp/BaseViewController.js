define([
        "dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/date/stamp",
        "dojo/date/locale",
        "dojo/topic",
        "dojo/dom-class"
        ],function(declare,lang,stamp,locale,topic,domClass){
	
	
	var busyInd = null;
	
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
		
		afterActivate : function(previousView, data){
			// summary:
			//		Called after this view transitions off
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
        
        afterDeactivate : function(nextView, data){
			// summary:
			//		Called after this view transitions off
			// nextView: dojox/app/View
			//		The next view
			// data: Object
			//		The transition data.  The data received is the data passed in the data attribute of the transition options of the transition that led to that view.
        },
        
        destroy : function(){
        	// summary:
        	//		Called when the view is being destroyed
        },
        
        showLoading : function(){
        	
        	if(!busyInd){
        		busyInd = new WL.BusyIndicator('content', {text : 'Loading...'}); 
        	}//end if
        	busyInd.show();
        },
        
        hideLoading : function(){
        	if(!busyInd){
        		busyInd = new WL.BusyIndicator('content', {text : 'Loading...'}); 
        	}//end if
        	busyInd.hide();
        },
        
        formatDate : function(isoString,includeTime){
        	// summary:
        	//		This function is used to provide a standard date format function for the application.
        	// isoString: String
        	//		The ISO date string to format
        	// includeTime: boolean
        	//		Whether to include the time in the result string
        	// returns: 
        	//		Formatted date string
        	
        	var d = stamp.fromISOString(isoString);
        	
        	if(!includeTime){
        		return locale.format(d,{selector: "date",datePattern: this.getDatePattern()});
        	}else{
        		return locale.format(d,{datePattern: this.getDatePattern(),timePattern: this.getTimePattern()});
        	}//end if
        },
        
        formatTime : function(isoString){
        	// summary:
        	//		This function is used to provide a standard date format function for the application.
        	// isoString: String
        	//		The ISO date string to format
        	// returns: 
        	//		Formatted date string
        	
        	var d = stamp.fromISOString(isoString);
        	return locale.format(d,{selector: "time",timePattern: this.getTimePattern()});
        	
        },
        
        getDate : function(isoString){
        	// summary:
        	//		This method returns the date given the iso string
        	// isoString: String
        	//		The iso string
        	
        	return stamp.fromISOString(isoString);
        },
        
        getDatePattern : function(){
        	return "yyyy-MM-dd";
        },
        
        getTimePattern : function(){
        	return "hh:mm a";
        },
        
		setHeadingLabel : function(label){
	        this.view.parent.dapHeading.set("label",label);
	    },
	     
	    showBack : function(show){
	    	 if(!show){
	    		 domClass.add(this.view.parent.dapBackButton.domNode,"hide"); 
	    	 }else{
	    		 domClass.remove(this.view.parent.dapBackButton.domNode,"hide"); 
	    	 }//end if
	    },
	     
	    setBackLabel : function(label){
	    	this.view.parent.dapBackButton.set("label",label); 
	    },
	    
	    setBackTarget : function(target){
	    	if(target){
	    		this.view.parent.dapBackButton.set("back",false);
		    	this.view.parent.dapBackButton.set("transitionOptions",{target : target, url: "#" + target});
	    	}else{
	    		this.view.parent.dapBackButton.set("back",true);
	    	}//end if
	    },
        
        
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
 			//		This action handler is called when this is the active view, and the app enters the foreground. iOS only
 			// tags:
 			//		protected
 		},
 		
 		_onEnterBackground : function(){
 			// summary:
 			//		This action handler is called when this is the active view, and the app enters the background. iOS only
 			// tags:
 			//		protected
 		},
        
		controller : function(){
			var _this = this;
			var onForegroundHandle = null;
			var onBackgroundHandle = null;
			return {
				 init: function(){
					 	_this.view = this;
					 	_this.init();
					 	_this._createWidgets();
					 	_this._connectActionHandlers();
				 },

		         beforeActivate: function(previousView, data){
		        	 onForegroundHandle = topic.subscribe("app/enterforeground",_this._onEnterForeground);
		        	 onBackgroundHandle = topic.subscribe("app/enterbackground",_this._onEnterBackground);
		    
		        	 _this.beforeActivate(previousView, data);
		         },
		         
		         afterActivate: lang.hitch(this,this.afterActivate),

		         beforeDeactivate: function(nextView, data){
		        	 if(onForegroundHandle){onForegroundHandle.remove();}
		        	 if(onBackgroundHandle){onBackgroundHandle.remove();}
		        	
		        	 _this.beforeDeactivate(nextView, data);
		         },
		         
		         afterDeactivate: lang.hitch(this,this.afterDeactivate),

		         destroy: function(){
		                 // _WidgetBase.on listener is automatically destroyed when the Widget itself is.
		                 this.inherited(arguments);
		                 _this.destroy();
		         }
			 };
		}
		
	});
});