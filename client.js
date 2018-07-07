/** External Dependencies **/
const net = require('net');
const utils = require('./utils');

//client connection
const client = net.connect({port: 8080}, function() {
   console.log('connected to server!');  
});

let dataToSave = '';

// event on recieving data
client.on('data', function(data) {
	
	// checking the for the end of string
	
		
		utils.recieveStrings.recievePing(data, function(err, result){
		    console.log(result);
	    })
    //console.log(data.toString());
   //client.end();
});

// event on closing of connection
client.on('end', function() { 
   console.log('disconnected from server');
});

let currentTime = new Date().toString();