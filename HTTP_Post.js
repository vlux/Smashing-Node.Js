//P39

http.Server(function(req,res){
    var buf = '';
    req.on('data',function(data){
        buf += data;
    });
    req.on('end',function(){
        console.log('数据接收完毕!');
    })
});
