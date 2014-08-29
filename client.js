//P98
//对应server4.js

var http = require('http');
var qs = require('querystring');

function send(Name){
    http.request({
        host : '127.0.0.1',
        port : 3000,
        url : '/',
        method : 'POST'        //注意是POST不是GET
    },function(res){
        res.setEncoding('utf8');
        res.on('end',function(){
            console.log('\n request complete!');
            process.stdout.write('\n ur name: ');
        });
    }).end(qs.stringify({ name : Name }));        //qs.stringify可以将一个对象转化为url编码过的数据
        //当end事件触发，就可以将完整的请求数据打印出来，然后接着要求用户再次输入数据即可
}

process.stdout.write('\n ur name: ');
process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data',function(name){
    send(name.replace('\n',''));
});
