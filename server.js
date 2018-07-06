'use strict'

/** External Dependency **/
const net = require('net');
const utils = require('./utils');

// Setup DB connection
require('./db');

// load express app
require('./app')

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
         
         let i,j = 2000;

         /*
            loop for sending the small chunks of data
            not all at once
            2000 characters at a time
         */         
         for( i =0;i<len; ){

            /*
               sending data string
               with slicing it upto
               2000 characters
            */
            connection.write(dataToPing.slice(i,j));

            // going 2000 characters forward
            i = i+2000;
            if( i>= len ){

               // message for the completion
               // of the string
               connection.write('done');
               
               // when we reach the end of string
               // then assign whole length to i
               // then for stopping the loop
               // assign it to the variable i
               i = len;
            }
            j = j+2000;
            if( j>= len ){
               
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


