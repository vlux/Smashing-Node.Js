//P87

require('http').createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'image/png'});
    var stream = require('fs').createReadStream('image.png');
    stream.on('data',function(data){
        res.write(data);
    });
    stream.on('end',function(data){
        res.end();
    });
}).listen(3000);

//好处：高效的内存分配，要是对每个请求在写入前都完全把图片信息读取完(fs.readFile)在处理大量请求时会消耗大量内存
//     数据一旦就绪就可以立刻写入了




//简洁写法:

require('http').createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'image/png'});
    require('fs').createReadStream('image.png').pipe(res);
}).listen(3000);


//    require('fs').createReadStream('image.png').pipe(res);
//相当于

    // fs.createReadStream(path)
    //     .on('data',function(data){
    //         res.write(data);
    //     });
    //     .on('end',function(){
    //         res.end();
    //     });
