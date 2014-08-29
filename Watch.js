//P61

var stream = fs.createReadStream('a.txt');
var fs = require('fs');

var files = fs.readdirSync(process.cwd());

files.forEach(function(file){
    if(/\.css/.test(file)){            //监听".css"后缀的文件
        fs.watchFile(process.cwd() + '/' + file,function(){        //除了用fs.watchFile之外，还可以用fs.watch来监视整个目录
            console.log(' - ' + file + 'changed!');
        });
    }
});
