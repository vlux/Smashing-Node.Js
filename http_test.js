//P85

require('http').createServer(function(req,res){
    res.writeHead(200);
    res.write('Hello');
    setTimeout(function(){
        res.end('World');
    },500)
}).listen(3000);
