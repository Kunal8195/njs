'use strict'

/** 3rd Party **/
const express = require('express');  
const bodyParser = require('body-parser');

/* External Dependency */
const Controller = require('./controller')
const utils = require('./utils');

let temp;

/*
   Setup DB connection
*/ 
require('./db');

/*
   * Express App
*/
const app = express();  

// server
const server = require('http').createServer(app);  
const io = require('socket.io')(server);

/*
  * listen for connection success
  *  with browser client
*/
io.on('connection', function(client) {  
    console.log('Client connected...');

    /*
     this sendPing function will get called every 10s
     in this way listener will recieve the ping of strings every 10s
   */
   setInterval(function(){
      utils.sendStrings.sendPing(function(dataToPing){

         client.emit('messageToServerClient',dataToPing);
         
      })

   },10000)

    /* 
      listen for user defined events
    */
    client.on('join', function(data) {

      /*
        * emit messaged on some events
      */
      client.emit('messages', temp);
        console.log(data);
    });

    client.on('messageToBrowser', function(data){
      console.log('-=-=-=-=-');
      temp = data;
      client.emit('sendToBrowser',data);
    })
});

/*
  * Middlewares
*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/node_modules'));  

/*
  root route
  this will display the home page of the app
*/
app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/client.html');
});

// SignUp Route
app.post('/signup', (req, res) => {
  console.log('came here');
  /*
      req.body = {
          name:'',
          email:'',
          password:'' 
      }
  */
  Controller.userController.signUp(req.body, function(err, result){
    if(!err){
      res.status(200).send(result)
    } else {
      res.status(401).send(err)
    }
  })
})

// Login Route
app.post('/login', (req, res) => {
  /*
      req.body = {
          email:'',
          password:''
      }
  */
  Controller.userController.logIn(req.body, function(err, result){
    if(!err){
      res.status(200).send(result)
    } else {
      res.status(401).send(err)
    }
  })

})

server.listen(4200, (err, data) => {
  if(!err){
    console.log('server listening on http://localhost:4200')
  }
});