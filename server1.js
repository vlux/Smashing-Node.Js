//P90

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
        ].join(''));                                    //用join将其转为字符串 
    }else if('/url' == req.url){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end('U send a <em>' +req.method +'</em> request');
    }
}).listen(3000);


//直接输入localhost:3000/url 和输入name后的跳转是不一样的request
