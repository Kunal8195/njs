/** external dependency **/
const net = require('net');
const utils = require('./utils');

// creating server
const server = net.createServer(function(connection) { 
   console.log('client connected');
   
   connection.on('end', function() {
      console.log('client disconnected');
   });
   connection.write('Hello World!\r\n');
   connection.pipe(connection);
   connection.on('data', function(data){
   	console.log('data',data.toString());
   });
   connection.on('error', function(data){
   	console.log('error', data);
   })
});

// server listen
server.listen(8080, function() { 
   console.log('server is listening');
});



console.log(name.getName.getRandomLine('./data/name.csv', function(err, data){
   if(!err){
      console.log(data,'-=-=-=');
      console.log(err);
   }
}));



