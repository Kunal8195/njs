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
	if(data == 'done'){
		
		utils.recieveStrings.recievePing(dataToSave, function(err, result){
		    console.log(result);
	    })
	    
	} else {

		// concatinating chunks of string
		dataToSave+=data.toString();
	}
    //console.log(data.toString());
   //client.end();
});

// event on closing of connection
client.on('end', function() { 
   console.log('disconnected from server');
});