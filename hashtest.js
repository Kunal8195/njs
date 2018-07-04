/*var hash = require('node-object-hash');
var hasher = hash().hash;

var obj = {
	'name': 'kunal pal',
	'email': 'kpal9518@gmail.com'
}





var value = async function(){
	var val = await hasher(obj);
	return val;
}



console.log(value().then(data => {
	console.log(data);
}));*/


var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
password = 'd6F3Efeq';

var obj = {
	'name': 'kunal pal',
	'email': 'kpal9518@gmail.com',
	'lastname':'pal pal pal'
}

function encrypt(text){
  var cipher = crypto.createCipher(algorithm,password)
  console.log('1')
  var crypted = cipher.update(text,'utf8','hex')
  console.log('2')
  crypted += cipher.final('hex');
  console.log('3')
  return crypted;
  console.log('4')
}
 
function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}
 
var hw = encrypt(JSON.stringify(obj))
// outputs hello world
console.log(hw,JSON.parse(decrypt(hw)));