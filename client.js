/** External Dependencies **/
const net = require('net');

//client connection
const client = net.connect({port: 8080}, function() {
   console.log('connected to server!');  
});

// event on recieving data
client.on('data', function(data) {
   console.log(data.toString());
   //client.end();
});

// event on closing of connection
client.on('end', function() { 
   console.log('disconnected from server');
});