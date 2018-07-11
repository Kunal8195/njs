


/*
const http = require('http');
const crypto = require('crypto');
const bufferUtil = require('bufferutil');
const constants = require('./constants');

const buffer = crypto.randomBytes(10);
const mask = crypto.randomBytes(4);

console.log(buffer, mask);

//process.unmask([mask])

// Create an HTTP server
const srv = http.createServer((req, res) => {
  //res.writeHead(200, { 'Content-Type': 'text/plain'});
  console.log(req.headers)
  res.setHeader('Access-Control-Allow-Origin', null);
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT')
res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.end('okay');
});


/*srv.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});*/

/*srv.on('upgrade', (req, socket, head) => {

  
  //bufferUtil.unmask(10, 4)

  console.log(head.length)

  const key = crypto.createHash('sha1')
      .update(req.headers['sec-websocket-key'] + constants.GUID, 'binary')
      .digest('base64');

  const ab = req.headers['sec-websocket-protocol']
  console.log(ab);
  //const ba = 

  let head1 = 'HTTP/1.1 101 Web Socket Protocol Handshake\r\n' +
               'Upgrade: WebSocket\r\n' +
               'Connection: Upgrade\r\n' +
               `Sec-WebSocket-Accept: ${key}\r\n` +
               'Sec-WebSocket-Protocol: http\r\n' +
               '\r\n';

  
  //bufferUtil.unmask(head1, head1.length)

  socket.write(head1);

  socket.pipe(socket); // echo back



  socket.on('error',function(data){
    
    console.log('-=-=-=-', data.toString());
  })
});

// now that server is running
srv.listen(1337, '127.0.0.1', () => {

  // make a request
  const options = {
    port: 1337,
    hostname: '127.0.0.1',
    headers: {
      'Connection': 'Upgrade',
      'Upgrade': 'websocket'
    }
  };

  const req = http.request(options);
  req.end();

  req.on('upgrade', (res, socket, upgradeHead) => {
    console.log('got upgraded!');
    //socket.end();
    //process.exit(0);
  });
});*/

