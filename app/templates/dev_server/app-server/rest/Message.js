require(["dojo/_base/declare","app-server/global"],function(declare,global){
	
	var path = "/rest/message";
	var app = global.app;
			
	app.get(path,function(req,resp){
		resp.json({name : "chris",last: "Felix"});
	});
	
	app.get(path + "/:id",function(req,resp){
		
		resp.json({name : "chris",last: "Felix",id: req.params.id});
	});
});
