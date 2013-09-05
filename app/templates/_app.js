//Configuration Object for Dojo Loader:
dojoConfig = {
    "baseUrl": "./dev_server", 
    "async": 1, 
    "hasCache": {
        "host-node": 1, 
        "dom": 0 
    },
    
    "packages": [
	{
		"name": "shared",
		"location": "shared"
	},
	{
		"name": "frontend",
		"location": "frontend"
	},
    {
        "name": "backend",
        "location": "backend"
    },
    {
        "name": "dojo",
        "location": "../dojo/dojo"
    },
    {
        "name": "common",
        "location": "../apps/<%= appName %>/common"
    }
    ],
    "deps": ["backend/server"]
};
 
// Now load the Dojo loader
require("../dojo/dojo/dojo.js");