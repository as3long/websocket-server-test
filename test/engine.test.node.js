var eioClient = require('engine.io-client');
var CONNECT_MAX = 3000;
var useTimesArray = [];
var report = require('./report');

var i = 0;
while (i < CONNECT_MAX) {
    i++;

    var socket = eioClient('ws://10.104.128.29:22280/');
    socket.on('open', function() {
        socket.on('message', function(data){
            var useTime = Date.now() - parseInt(data);
            useTimesArray.push(useTime);
            if (useTimesArray.length % CONNECT_MAX === 0) {
                report.calculate(useTimesArray);
            }
        });
        socket.on('close', function(){});
    });
}
