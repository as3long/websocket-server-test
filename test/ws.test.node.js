var CONNECT_MAX = 4000;
var useTimesArray = [];
var report = require('./report');
var WebSocket = require('ws');

var i = 0;
while (i < CONNECT_MAX) {
    i++;

    var ws = new WebSocket('ws://10.104.128.29:22281');
    ws.on('message', function incoming(data) {
        var useTime = Date.now() - parseInt(data);
        useTimesArray.push(useTime);
        if (useTimesArray.length % CONNECT_MAX === 0) {
            report.calculate(useTimesArray);
        }
    });
}
