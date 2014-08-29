//P98
//对应server4.js

var http = require('http');
var qs = require('querystring');

function send(Name){
    http.request({
        host : '127.0.0.1',
        port : 3000,
        url : '/',
        method : 'POST'
    },function(res){
        res.setEncoding('utf8');
        res.on('end',function(){
            console.log('\n request complete!');
            process.stdout.write('\n ur name: ');
        });
    }).end(qs.stringify({ name : Name }));        //qs.stringify可以将一个对象转化为url编码过的数据
}

process.stdout.write('\n ur name: ');
process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data',function(name){
    send(name.replace('\n',''));
});
