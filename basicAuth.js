//P132

process.stdin.resume();
process.stdin.setEncoding('ascii');

connect.basicAuth(function(user,pass,fn){
    process.stdout.write('Allow user ' + user + 'with pass ' + pass +' ? [y/n]: ');
    process.stdin.once('data',function(data){        //once：只需要获取一次
        if(data[0] == 'y')
            fn(null,{username : user});
        else
            fn(new Error('Unauthorized'));
    });
}),
function(req,res){
    res.writeHead(200);
    res.end('Welcome '+req.remoteUser.username);        //供后续中间件使用
}
