define(["dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/Deferred"],function(declare,lang,Deferred){
	
	var c = declare([],{
		
		// summary:
		//		This class is a stub that you can use for the "collectionInitClass" property of dworklight/store/JSON if you so choose
		
		constructor : function(args){
			lang.mixin(args);
			//TODO: In here you can set up the backend method handlers for any dworklight/store/JSON stores you have defined in config.json
		},
		
		someCollectionInitMethod: function(){
			
		   var def = new Deferred();
		   //TODO: You can use this method to init a JSONStore for a dqorklight/store/JSON instance.  Below is an example of a collection
		   //that is protected.  The deferred that is returned, should be resolved with the collection.
		   /*
		   WL.Client.login("YourAppRealm",{
			   onSuccess : function(){
				   def.resolve(WL.JSONStore.get("someCollection"));
			   },
			   onFailure : function(error){
				   def.reject(error);
			   }
		   });
		   */
		   return def.promise;
		},
		
		openProtectedCollections : function(username,password){
			// summary:
			//		This method is called should be called by YourAppRealm's  submitAdapterAuthentication onSuccess method.  From there you
			//		should have access to the username and password used to login.
			 
			//TODO: init all collections that require auth
			/*
			 var def = new Deferred();
			 var collections = new Object();
			 collections.someCollection = new Object();
			 collections.someCollection.someCollection = "Note";
			 collections.someCollection.searchFields = {"id" : "string","someField" : "string"};
			 var options = new Object();
			 options.username = username.replace("@","at").replace(/[.\s]+/g,"dot");//username does not accept special characters.
			 options.password = password;
			 
			 WL.JSONStore.init(collections,options).then(
			 function(){
		            console.debug("Success opening collections",collections);
		            def.resolve();
		     },
		     function(error){
		    	 	console.error("Error opening collections",error);
		    	 	def.reject();
		     });
			 */
			 return def.promise;
		}
		
		
	});

	var inst = new c();
	return inst;
	
});