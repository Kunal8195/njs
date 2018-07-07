const Service = require('./service');
require('./db');

var i =0;
var j = -1;
var dataToSave = []

dataToSave[0] = {
	name:'kunalpal',
	//"time":'12:24:23'
	email:'kpal@gmail.com',
	password:'12345@'

};
dataToSave[1] = {
	"fullName":'kun pal',
	"time":'12:24:23'
}
//for(i;;){
	//if(i>j){
		j = i;
		Service.mongoService.savePerson(dataToSave[1], function(err, data){
			if(!err){
				console.log(data)
				i++;
			} else {
				throw err;
			}
		})

	//}

//}


/*const recievePing = async (string, callback) => {
	let currentTime = new Date().toString();
	let currentMinute = new Date().toLocaleTimeString().slice(0,5);
	let array;
	let arrayToSend = [];
	let dataToSave;

	string = string.toString();
	array = string.split('|');
	let length = array.length;
	console.log(length);

await forEach(array, function(element, index){
	let dataToSend;

	await NJS.njs_listener.finalString(element).then((result) => {
		dataToSend = result;
	})

	await NJS.njs_listener.hashObject(dataToSend).then((result) => {
		dataToSend = result;
	})

	if(dataToSend){
					//console.log('in here');
					dataToSend.timestamp = new Date();

					if(currentMinute == new Date().toLocaleTimeString().slice(0, 5)){
						console.log('1----');
						dataToSave = {
						    name: dataToSend.name,
						    time: currentTime,
						    //streams:[]
					    };
					    cb();
					    //dataToSave.streams.push(dataToSend);
					    //console.log('now u here', dataToSave);
					} else {
						console.log('2----');
						currentTime = new Date().toString();
						currentMinute = new Date().toLocaleTimeString().slice(0,5);
						dataToSave = {
							name: dataToSend.name,
						    time: currentTime,
						    //streams:[]
						}
						cb();
						//dataToSave.streams.push(dataToSend);
						
					}
					
				}

	await Service.mongoService.savePerson(dataToSave).then((result) => {
		dataToSend = result;
	})

	if(dataToSend){
					    arrayToSend[index] = dataToSend;
					    if(index == length-1){	
					    console.log(arrayToSend);
						    callback(null, arrayToSend);
					    }
					} else {
						arrayToSend[index] = null;
	}

})

}

*/