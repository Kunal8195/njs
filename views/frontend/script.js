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