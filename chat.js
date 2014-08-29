//P68

var net = require('net');

var server = net.createServer(function(conn){
    var count = 0;
    var users = {};
    conn.write('welcome! Here are ' + count +' Clients. write ur name and press enter:');

    count ++;
    conn.setEncoding('utf8');            //must

    function broadcast(msy,exceptMe){
        for(var i in users)
            if(!exceptMe || i != nickname)
                users[i].write(msg);
    }

    var nickname;
    conn.on('data',function(data){
        data = data.replace('\r\n','');
        if(!nickname){
            if(users[data]){
                conn.write('nickname already in use.try again:');
                return ;
            }
            else{
                nickname = data;
                users[nickname] = conn;
                for(var i in users)
                    users[i].write(nickname + 'joined the room\n');
            }
        }
        else{        //视为聊天信息
            for(var i in users)
                if(i != nickname)            //确保发送消息给除了自己意外的其他客户端
                    users[i].write(nickname + ': '+ data +'\n');
        }
    });

    conn.on('close',function(data){
        count--;
        delete users[nickname];
        broadcast(nickname + 'left the room\n');
    });
});

server.listen(3000,function(){
    console.log('I\'m hearing u');
});
