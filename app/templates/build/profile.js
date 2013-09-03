// import the dojox/app extension to the build system
require([ "dojox/app/build/buildControlApp" ], function(bc) {
});

var profile = {
	basePath : "../dojo",
	releaseDir : "../build/release",
	action : "release",
	stripConsole : "normal",
	copyTests : false,
	cssOptimize : "comments",
	multipleAppConfigLayers : true,
	
	packages : [ {
		name : "dojo",
		location : "./dojo"
	}, {
		name : "dijit",
		location : "./dijit"
	}, {
		name : "dojox",
		location : "./dojox"
	}, {
		name : "commonapp",
		location : "../apps/Main/common/commonapp"
	}, {
		name : "ipadapp",
		location : "../apps/Main/ipad/ipadapp"
	}, {
		name : "gridx",
		location : "./gridx"
	}, {
		name : "idx",
		location : "./idx"
	}, {
		name : "build",
		location : "./util/build"
	}],
	layers : {
		
		"commonapp/app" : {
			include: ["commonapp/app",
			          "dojox/mvc/Group",
			          "dojox/mvc/Repeat",
			          "dojox/mvc/Output",
			          "dojox/mvc/at",
			          "dojox/mvc/WidgetList",
			          "dojox/mvc/StatefulModel"],
    		exclude: ["dojo/dojo"]
		},
		
		"dojo/dojo" : {
    		include: [
    		          	"dojo/when",
    		          	"dojo/on",
    		          	"dojo/dom",
    		          	"dojo/_base/lang",
    		          	"dojo/_base/declare",
    		          	"dojo/selector/acme",
    		          	"dojox/app/controllers/Layout",
    		          	"dojox/app/controllers/Transition",
    		          	"dojox/app/controllers/Load",
    		          	"dojox/app/module/lifecycle",
    		          	"dojox/app/controllers/HistoryHash",
    		          	"dojox/app/controllers/History",
    		          	"dojox/mobile/TransitionEvent",
    		          	"dojox/mobile/_base"
    		         ],
            customBase: true,
            boot: true
    	}

	}
};