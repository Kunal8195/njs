'use strict'

/** External Dependency **/
const net = require('net');
const utils = require('./utils');

// Setup DB connection
//require('./db');

// creating server
const server = net.createServer(function(connection) { 
   console.log('client connected');
   
   connection.on('end', function() {
      console.log('client disconnected');
   });

   /*
     this sendPing function will get called every 10s
     in this way listener will recieve the ping of strings every 10s
   */
   setInterval(function(){
      utils.sendStrings.sendPing(function(dataToPing){
         
         let len = dataToPing.length;
         console.log('length',len)
         let i,j = 2000;         
         for( i =0;i<len; ){
            connection.write(dataToPing.slice(i,j));
            console.log('in for loop');
            i = i+2000;
            if( i>= len ){
               connection.write('done');
               console.log('done')
               i = len;
            }
            j = j+200;
            if( j>= len ){
               console.log('greater then length');
               j=len;
            }
         }
      })

   },10000)

   //connection.write('Hello World!\r\n');
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


module.exports = utils;

