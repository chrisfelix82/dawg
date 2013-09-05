require(["backend/global"],function(global){
	
	var path = "/rest/user" ;
	var app = global.app;
			
	app.get(path,function(req,resp){
		resp.json({name : "chris",last: "Felix"});
	});
	
	
});
