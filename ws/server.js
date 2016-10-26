var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ port: 22281 });
var CONNECT_MAX = 4000;

wss.on('connection', function connection(ws) {
  // ws.on('message', function incoming(message) {
  //   console.log('received: %s', message);
  // });

  // ws.send('hello world');
});

function broadcast() {
  if (wss.clients.length >= CONNECT_MAX) {
    for (var i = 0, l = wss.clients.length; i < l; ++i) {
      wss.clients[i].send(Date.now() + '');
    }
     console.log(Date.now() + ": sent msg to current connections:" + wss.clients.length);
  } else {
    console.log(Date.now() +": current connections:" + wss.clients.length);
  }
}

function send() {
	setInterval(broadcast, 40 * 1000)
}

send();

console.log("started")
