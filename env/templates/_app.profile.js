//--------------------------------------------------------------------------------
//  DO NOT EDIT OR REMOVE THIS FILE. Used in Dojo builds 
//--------------------------------------------------------------------------------
var profile = (function(){
	//var testResourceRe = /^app\/tests\//,

		copyOnly = function(filename, mid){
			var list = {
				"<%= envName %>app/app.profile":1,
				"<%= envName %>app/package.json":1
				// these are test modules that are not intended to ever be built
			};
			return (mid in list) || /^app\/libs\//.test(mid) || /(png|jpg|jpeg|gif|tiff)$/.test(filename);
		};

	return {
		resourceTags:{
			
			copyOnly: function(filename, mid){
				return copyOnly(filename, mid);
			},

			//The file is considered AMD if it is not a "copy only" file and it ends in .js
			amd: function(filename, mid){
				return !copyOnly(filename, mid) && /\.js$/.test(filename);
			}
		},

		trees:[
			[".", ".", /(\/\.)|(~$)/]
		]
	};
})();