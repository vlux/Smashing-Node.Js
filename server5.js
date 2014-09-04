//P110

var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req,res){
    if('GET' == req.method && '/image' == req.url.substr(0,7) && '.jpg' == req.url.substr(-4))
    {
        fs.stat(__dirname + req.url,function(err,stat){        //不使用fs.statSync，否则当处理磁盘文件时，会阻塞其他请求的处理，这是处理高并发的服务器的大忌。
            if(err || !stat.isFile())
            {
                res.writeHead(404);
                res.end('Not Found');
                return;
            }
            server(__dirname + req.url,'application/jpg');
        });
    }
    else if('GET' == req.method && '/' == req.url)
        server(__dirname + '/index.html','text/html');
    else{
        res.writeHead(404);
        res.end('Not Found');
    }

    function server(path,type){
        res.writeHead(200,{'Content-Type' : type});
        res.createReadStream(path).pipe(rews);
    }
}).listen(3000);
