// import the dojox/app extension to the build system
require([ "dojox/app/build/buildControlApp" ], function(bc) {
});

var profile = (function() {

	return {
		action : "release",
		stripConsole : "normal",
		basePath : "../dojo",
		releaseDir: "../build/release",
		cssOptimize: "comments",
		multipleAppConfigLayers : true,
		copyTests: false,
		localeList: 'en',
		
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
			name : "gridx",
			location : "gridx"
		},
		{
			name : "idx",
			location : "idx"
		},
		{
			name : "layers",
			location : "layers"
		}
		<%= appPackagesString %>
		],

		layers : {
			"layers/mobile-ui-layer" : {
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
