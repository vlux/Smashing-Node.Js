//P92


require('http').createServer(function(req,res){
    if('/' == req.url){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end([
            '<form method ="POST" action ="/url">',
            '<h1>My Form</h1>',
            '<fieldset>',
            '<label> Personal Information</label>',
            '<p>What is ur name?</p>',
            '<input type ="text" name = "name">',
            '<p><button>Submit</button></p>',
            '</form>'
        ].join(''));                    //用join将其转为字符串
    }else if('/url' == req.url && 'POST' == req.method){
        var body ='';
        req.on('data',function(chunk){
            body += chunk;
        });
        req.on('end',function(){
            res.writeHead(200,{'Content-Type':'text/html'});
            res.end('<p>Content-Type: ' + req.headers['content-type'] + '</p>'
            +'<p>Data:</p><pre>' + body + '</pre>');
        });
    }
}).listen(3000);
