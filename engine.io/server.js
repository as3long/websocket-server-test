var engine = require('engine.io');
var server = engine.listen(22280);
var CONNECT_MAX = 1000;

server.on('connection', function(socket) {
  // socket.send('hello world');
  socket.on('message', function(data) {});
  socket.on('close', function(){ });
});

function broadcast() {
  if (server.clientsCount >= CONNECT_MAX) {
    for (var id in server.clients) {
      server.clients[id].send(Date.now() + '');
    }
    console.log(Date.now() + ": sent msg to current connections:" + server.clientsCount);
  } else {
    console.log(Date.now() +": current connections:" + server.clientsCount);
  }
}

function send() {
	setInterval(broadcast, 6 * 1000)
}

send();

console.log("started")