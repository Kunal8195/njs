var modal = document.getElementById('id01');

var modal = document.getElementById('id02');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


var login = function(){

	
}

var signup = function() {
    //event.preventDefault();
    console.log("I am Here");
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/signup",
        ContentType: 'application/json',
        dataType: 'jsonp',
        data: {
            name: $('#signup_name').value,
            email: $('#signup_email').value,
            password: $('#signup_password').value
        },
        success: function (data) {
            alert("User created Successfully");
            //window.location.href = 'chatpage.html'
            console.log('succes: ' + data);
        }
    })
}