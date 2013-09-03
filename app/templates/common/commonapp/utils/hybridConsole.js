define(["dojo/aspect","dojo/_base/array","dojo/_base/json","dojo/_base/lang"],function(aspect,array,json,lang){
	
	var _logger = function(){
		if(typeof (WL) === 'undefined' || WL == null || WL.Client.getEnvironment() == WL.Environment.MOBILE_WEB){
			return arguments;
		}else{
				var out = "";
				array.forEach(arguments, function(item) {
					if ( lang.isString(item) || !isNaN(item) ) {
						out += item;
					}else if ( item === null ) {
						out += "<null>";
					}else if ( typeof(item) === "undefined" ) {
						out += "<undefined>";
					}else {
						try {
							out += json.toJson(item);
						} catch(e) {
							out += item;
						}//end try
					}//end if
					out += " ";
				});
				return [out];
		}//end if
	};
	
	aspect.before(console,"debug",_logger);
	aspect.before(console,"error",_logger);
	
	return {};
});