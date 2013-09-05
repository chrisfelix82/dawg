require(["dojo/node!express","dojo/node!http","dojo/node!socket.io","backend/global"],function(express,http,socketio,global){
	
	 var app = express();
	 var server = http.createServer(app);
	 var io = socketio.listen(server);
	  
	  app.configure(function(){
		 app.use(express.bodyParser());
		 app.use(express.static(require.toUrl("shared")));
		 app.use(express.static(require.toUrl("frontend")));
		 app.use(express.static(require.toUrl("common")));
	  });

	server.listen(3434);
	
	global.app = app;
	global.server = server;
	global.io = io;
	
	require(["backend/rest/Resources"],function(){
		console.log("Loaded RESTful resources from backend/rest/resources");
	});
	
});