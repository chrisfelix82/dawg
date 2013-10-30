// import the dojox/app extension to the build system
require([ "dojox/app/build/buildControlApp" ], function(bc) {
});

var profile = (function(){
	
	return{
		action : "release",
		stripConsole : "normal",
		basePath : "../../../<%= dojoLibProject %>/toolkit/dojo",
		releaseDir: "../../../<%= buildProject %>/build/output/dojo/release",
		cssOptimize: "comments",
		multipleAppConfigLayers : true,
		copyTests: false,
		localeList: '<%= supportedLocales %>',
		selectorEngine: "acme",
		
		packages : [ 
		{
			name : "dojo",
			location : "dojo"
		}, {
			name : "dijit",
			location : "dijit"
		}, {
			name : "dojox",
			location : "dojox"
		}, 
		{
			name : "dworklight",
			location : "dworklight"
		},
		{
			name : "dcordova",
			location : "dcordova"
		},
		{
			name : "gridx",
			location : "gridx"
		},
		{
			name : "cometd",
			location : "cometd"
		},
		{
			name : "idx",
			location : "idx"
		}<%= appPackagesString %>

		],

		layers : {
			"commonapp/app" : {
				include: ["commonapp/app"],
				exclude: ["dojo/dojo"]
			},
			"dojo/dojo" : {
				boot : true,
				customBase: true,
				include : <%= deps %>
			}
		},

		plugins : { // workaround to exclude acme.js from the build (until
					// #13198 is
			// fixed)
			"dojo/text" : "build/plugins/text",
			"dojo/i18n" : "build/plugins/i18n",
			"dojo/has" : "build/plugins/has"
		}
	};
})();
