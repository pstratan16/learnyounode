var net = require('net');
var portnumber = Number(process.argv[2]);

var server = net.createServer(function (socket){
    var date = new Date();
    year = date.getFullYear(),
    month = date.getMonth() +1,
    day = date.getDate(),
    hour = date.getHours(),
    minute = date.getMinutes();
    
    function padZero(num){
        num = num.toString();
        if(num <10){
            num = '0'+ num;
        }
        return num;
    }
    month = padZero(month);
    day = padZero(day);
    hour = padZero(hour);
    minute = padZero(minute);
    
    var time = year + "-" + month + "-" + day + " " + hour + ":" + minute+"\n";
    socket.write(time);
    socket.end();
    
});
server.listen(portnumber);