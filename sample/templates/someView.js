define([
        "dojo/_base/declare",
        "commonapp/BaseViewController",
        "module",
        "dojo/on",
        "dojo/dom-attr",
        "dojox/mvc/at",
        "dojo/_base/lang",
        'dojox/mvc/getStateful',
        //template specific modules
        "dojox/mobile/Heading",
        "dojox/mobile/Button",
        "dojox/mvc/Group",
        "dojox/mobile/TextBox",
        "dojox/mobile/ListItem",
        "dojox/mvc/Repeat",
        "dojox/mobile/RoundRectList"
        ],function(declare,BaseViewController,module,on,domAttr,at,lang,getStateful){
	
	 var MODULE = module.id; 
	 var c = declare([BaseViewController],{
		 
		 	init : function(){
				// summary:
				//		Called when the view is first initialized
		 		
		 		var F = MODULE + ":init:";
		 		console.debug(F,"Enter");
		 		
		 		//Sample using MVC to set view's model
		 		
		 		on(this.view.dapCommitMVC,"click",lang.hitch(this,this._commit));
		 		on(this.view.dapResetMVC,"click",lang.hitch(this,this._reset));
		 		on(this.view.dapAddUserMVC,"click",lang.hitch(this,this._addUser));
		 		this.view.loadedModels.userModelMVC.queryStore();
		 		this.view.dapRepeatMVC.set("children",at(this.view.loadedModels.userModelMVC,"model"));
		 		
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
		 		//domAttr.set(this.view.helloLabel,"innerHTML","Add view html.  Use dojox/mvc");
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
			
			_addUser : function(){
				this.view.loadedModels.userModelMVC.model.push(getStateful({"name": this.view.dapNameMVC.get("value")}));
				console.warn(this.view.loadedModels.userModelMVC.model);
				this.view.loadedModels.userModelMVC.set("cursorIndex",this.view.loadedModels.userModelMVC.model.length - 1);
				console.warn(this.view.loadedModels.userModelMVC);
				this.view.dapGroupMVC.set("target",at(this.view.loadedModels.userModelMVC,"cursor"));
			},
			
			_commit : function(){
				this.view.loadedModels.userModelMVC.commit();
			},
			
			_reset : function(){
				this.view.loadedModels.userModelMVC.reset();
				this.view.loadedModels.userModelMVC.set("cursorIndex",0);
				this.view.dapGroupMVC.set("target",at(this.view.loadedModels.userModelMVC,"cursor"));
			}
			
			//Add more view method here.  Remember you can access loadedModels, loadedStores, nls etc. on the view through this.view
		 
	 });
	 var v = new c();
	 return v.controller();
	
});