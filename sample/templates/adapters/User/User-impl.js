/*
 *  Licensed Materials - Property of IBM
 *  5725-G92 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

/**
 *  WL.Server.invokeHttp(parameters) accepts the following json object as an argument:
 *  
 *  {
 *  	// Mandatory 
 *  	method : 'get' , 'post', 'delete' , 'put' or 'head' 
 *  	path: value,
 *  	
 *  	// Optional 
 *  	returnedContentType: any known mime-type or one of "json", "css", "csv", "javascript", "plain", "xml", "html"  
 *  	returnedContentEncoding : 'encoding', 
 *  	parameters: {name1: value1, ... }, 
 *  	headers: {name1: value1, ... }, 
 *  	cookies: {name1: value1, ... }, 
 *  	body: { 
 *  		contentType: 'text/xml; charset=utf-8' or similar value, 
 *  		content: stringValue 
 *  	}, 
 *  	transformation: { 
 *  		type: 'default', or 'xslFile', 
 *  		xslFile: fileName 
 *  	} 
 *  } 
 */

/**
 * @param interest
 *            must be one of the following: world, africa, sport, technology, ...
 *            (The list can be found in http://edition.cnn.com/services/rss/)
 * @returns json list of items
 */

function get(id){
	WL.Logger.debug("Getting item with id" + id);
	return {"statusCode" : 200,item: {"id": "100","name": "Chris from server"}};
}

function query(query,options){
	WL.Logger.debug("Query" + JSON.stringify(query));
	WL.Logger.debug("options" + JSON.stringify(options));
	return {"statusCode" : 200, "items" : [{"name" : "Chris Felix","age": 30,"id" : "3"},{"name" : "John Doe", "age" : 31,"id" : "4"},{"name" : "Mary Jane","id" : "5"}]};
}

function put(object,options){
	WL.Logger.debug("Object" + JSON.stringify(object));
	WL.Logger.debug("options" + JSON.stringify(options));
	return {"isSuccessful" : true,statusCode : 200};
}

function add(object,options){
	WL.Logger.debug("Object" + JSON.stringify(object));
	WL.Logger.debug("options" + JSON.stringify(options));
	return {statusCode : 201, item: {"id": 100}};
}

function remove(id){
	WL.Logger.debug("Removing item with id" + id);
	return {"statusCode" : 200};
}