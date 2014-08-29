//P97

require('http').createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end('Hello World!');
}).listen(3000);

require('http').request({        //request方法用来初始化一个新的http.ClientRequest对象
    host : '127.0.0.1',
    port : 3000,
    url : '/',
    method : 'GET'
},function(res){
    var body = '';
    res.setEncoding('utf8');
    res.on('data',function(chunk){
        body += chunk;
    });
    res.on('end',function(){
        console. log('\n We got: \033[96m' + body + '\033[39m\n');
    });
}).end();        //调用完request之后还需要调用end
                //原因：创建完一个请求以后，在发送给服务器前还可以给request对象进行交互
