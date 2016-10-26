var eio = require('engine.io-client');

var socket = new eio.Socket('ws://localhost:22280/');
socket.on('open', function(){
    socket.on('message', function(data){
        console.log(data);
    });
    socket.on('close', function(){});
});