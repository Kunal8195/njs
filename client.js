'use strict'

/* 3rd Party */
const client = require("socket.io-client");

/** External Dependencies **/
const utils = require('./utils');

/*
   connection establishment with socket server
*/
const socket = client.connect("http://localhost:4200");

/*
  listening for event from the server
*/
socket.on('messageToServerClient', (data)=>{
	//socket.emit('messageToBrowser','hello from client buddy')

utils.recieveStrings.recievePing(data, function(err, result){
        socket.emit('messageToBrowser', 'hello from client')
        console.log(result);
})

	socket.on('connect', function(data) {
       socket.emit('messageToBrowser', 'Hello World from client -=-=-=-');

});

  
  
})