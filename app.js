const express = require('express');

const app = express();

app.get('/', (req, res) => {
	res.send(req.query);
})

//app.get()

app.listen(3000,'localhost', function(err, data){
	if(!err){
		console.log('server is running');
	}
})