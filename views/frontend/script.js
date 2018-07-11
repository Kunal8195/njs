var modal = document.getElementById('id01');

var modal = document.getElementById('id02');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


var login = function(){

    $.ajax({
        type: "POST",
        url: "http://localhost:3000/login",
        ContentType: 'application/json',
        dataType: 'json',
        crossDomain: true,
        data: {            
            email: $('#login_email').val(),
            password: $('#login_password').val()
        },
        success: function (data) {
            alert("User created Successfully");
            //window.location.href = 'chatpage.html'
            console.log('succes: ' + data);
        }
    })

	
}

var signup = function() {
    //event.preventDefault();
    console.log("I am Here");
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/signup",
        ContentType: 'application/json',
        dataType: 'json',
        crossDomain: true,
        data: {
            name: $('#signup_name').val(), 
            email: $('#signup_email').val(),
            password: $('#signup_password').val()
        },
        success: function (data) {
            alert("User created Successfully");
            //window.location.href = 'chatpage.html'
            console.log('succes: ' + data);
        }
    })
}

var websocket = function(){
    var connection = new WebSocket("ws://127.0.0.1:1337",['http','xmpp'])

    connection.onopen = function (event) {
        connection.send("Here's some text that the server is urgently awaiting!"); 
    };

    connection.onerror = function (error) {
        console.log('WebSocket Error ', error);
    };


    //exampleSocket.send('hpow u ding');

    connection.onmessage = function (event) {
        console.log(event.data);
    }
}

//websocket();
/*
const socket = io('http://localhost:3000');

//console.log(socket);

socket.on('error', function(data){
    console.log(err);
})

socket.on('connect', function(){
    socket.emit('join', 'Hello World from client');
    console.log('connected');    

})

socket.on('disconnect', function(){
   console.log('user disconnected');
});

*/

