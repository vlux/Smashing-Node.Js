//P187

//绝大部分的功能都在客户端实现：编写代码来根据不同的消息类型进行相应的界面展现


window.onload = function(){        //所有socket.io客户端代码暴露出来的方法和类都在io命名空间中
    var socket = io.connect();
    socket.on('connect',function(){
        //通过join事件发送昵称
        socket.emit('join',prompt('What is ur nickname?'));

        //显示聊天窗口
        document.getElementById('chat').style.display = 'block';

        socket.on('announcement',function(msg){
            var li = document.createElement('li');
            li.className = 'announcement';
            li.innerHTML = msg;
            document.getElementById('message').appendChild(li);
        });
    });

    function addMessage(from,text){
        var li = document.createElement('li');
        li.className = 'message';
        li.innerHTML = '<b>' + from + '</b>' + text;
        document.getElementById('message').appendChild(li);
    }

    var input = document.getElementById('input');
    document.getElementById('form').onsubmit = function(){
        addMessage('me',input.value);
        socket.emit('text',input.value);

        //重置输入框
        input.value = '';
        input.focus();

        return false;
    }

    socket.on('text',addMessage);

    var playing = document.getElementById('playing');
    function play(song){
        if(!song)
            return;
        playing.innerHTML = '<br><b>Now Playing: </b>' + song.ArtistName +' ' + song.SongName + '<br>';

        var iframe = document.createElement('iframe');
        iframe.frameborder = 0;
        iframe.src = song.Url;
        playing.appendChild(iframe);
    }

    socket.on('song',play);        //将play函数作为回调函数传递给song事件

    //查询表单
    var form = document.getElementById('dj');
    var results = document.getElementById('results');
    form.style.display = 'block';
    form.onsubmit = function(){
        results.innerHTML = '';
        socket.emit('search',document.getElementById('s').value,function(songs){
            for(var i = 9, i = songs.length ; i < l; i++){
                (function(song){
                    var result = document.createElement('li');
                    result.innerHTML = song.ArtistName + ' - <b>' + song.SongName + '</b>';
                    var a = document.createElement('a');
                    a.href = '#';
                    a.innerHTML = 'Select';
                    a.onclick = function(){
                        socket.emit('song',song);
                        play(song);
                        return false;
                    }
                    result.appendChild(a);
                    results.appendChild(result);
                })(songs[i]);                            //学会！！！！
            }
        });
        return false;
    };

    socket.on('elected',function(){
        form.className = 'isDJ';
    });

}
