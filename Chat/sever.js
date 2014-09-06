//P186

var express = require('express');
var sio = require('socket.io'),
    request = require('superagent');        //内部使用superagent来进行对查询API的调用并返回其结果


app = express.createServer(
    express.bodyParser(),
    express.static('public')        //使用static中间件，将public目录设置为要托管的目录
);

app.listen(3000);

var io = sio.listen(app)
    ,apiKey = '{}'        //tinysong.com申请
    ,currentSong
    ,dj;

function elect(socket){
    dj = socket;
    io.sockets.emit('announcement',socket.name + 'is the new dj');
    socket.emit('elected');
    socket.dj = true;
    socket.on('disconnect',function(){
        dj = null;
        io.sockets.emit('announcement','the dj left - next one to join becomes dj');
    });
}

io.sockets.on('connection',function(socket){
    socket.on('join',function(name){
        socket.nickname = name;
        socket.broadcast.emit('announcement',name + ' joined the chat.');
        //如果用socket.emit，那么仅仅将消息返回给客户端，我们真正需要的是将信息广播给所有其他的用户，所以这里需要broadcast标志

        if(!dj)
            elect(socket);
        else
            socket.emit('song',currentSong);
});

socket.on('song'.function(song){
    if(socket.dj){
        currentSong = song;
        socket.broadcast.emit('song',song);
    }
});

socket.on('search',function(q,fn){
    request('http://tinysong.com/s/' + encodeURIComponent(q) + '?key=' + apiKey + '&format=json',function(res){
        if(res.status == 200)
            fn(JSON.parse(res.text));
            //需要手动解析JSON返回结果，是因为TinySong目前没有发送正确的Content-Type响应信息，导致superagent无法自动启动JSON解析功能
    });
});

socket.on('text',function(msg){
        socket.broadcast.emit('text',socket.nickname,msg);
    });
});
