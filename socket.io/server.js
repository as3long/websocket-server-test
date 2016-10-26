var io = require('socket.io')();
io.on('connection', function(client){
    // client.emit('group', 'hello world');
    // client.on('group', function(data) {
    //     console.log(data);
    // });
});
io.listen(22282);
var CONNECT_MAX = 2000;

function broadcast() {
  io.clients(function(error, clients) {
    if (error) throw error;

    if (clients.length >= CONNECT_MAX) {
        io.emit('message', Date.now() + '');
        console.log(Date.now() + ": sent msg to current connections:" + clients.length);
    } else {
        console.log(Date.now() +": current connections:" + clients.length);
    }
  });
}

function send() {
	setInterval(broadcast, 20 * 1000)
}

send();

console.log("started")