'use strict'

/* 3rd Party */
const express = require('express');
const bodyParser = require('body-parser');

/* External Dependency */
const Controller = require('./controller')

// Express App
const app = express();

/** some Wierd work */
const server = require('http').createServer(app);  
const io = require('socket.io')(server);

io.on('connection', function(client) {  
    console.log('Client connected...');

    client.on('join', function(data) {
        console.log(data);
    });

});


// body-Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*
app.use(express.static(__dirname + '/node_modules'));  
app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/index.html');
});
*/

//app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/views/node_modules'));
app.engine('html', require('ejs').renderFile);

app.set('view engine', 'ejs');
//Root Route
app.get('/', (req, res) => {
	res.render('./frontend/client.html');
	//res.send('Welcome! The app is working fine');
})

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

app.listen(3000,'localhost', function(err, data){
	if(!err){
		console.log('server is running at http://localhost:3000');
	}
});