//P50

var fs = require('fs');
fs.readdir(process.cwd(),function(err,files){
    console.log('');
    if(!files.length)
        return console.log('No files to show!\n');
    console.log('Select which file u wanna see : \n');

    var stats = [];
    function file(i){
        var filename = files[i];
        fs.stat(__dirname + '/' + filename,function(err,stat){                //fs.stat会给出文件或者目录的元数据
            stats[i] = stat;            //为了避免再次执行fs.stat

            if(stat.isDirectory())
                console.log('    '+ i +'   \033[36m '+filename + '/\033[39m');
            else
                console.log('    '+ i +'   \033[90m '+filename + '\033[39m');

            if(++i == files.length)
                read();
            else
                file(i);
        });
    }

    function read(){
        console.log('');
        process.stdout.write('    Enter ur choice:  ');
        process.stdin.resume();
        process.stdin.setEncoding('utf8');
        process.stdin.on('data',option);
    }

    function option(data){
        var filename = files[Number(data)];
        if(!filename)
            process.stdout.write('    Enter ur choice:  ');
        else{
            if(stats[Number(data)].isDirectory()){
                process.stdin.pause();
                fs.readdir(__dirname + '/' +filename,function(err,files){
                    console.log('');
                    console.log('(    ' + files.length + 'files    )');
                    files.forEach(function (file){
                        console.log('    -    '+ file);
                    })
                    console.log('');
                });
            }
            else{
                process.stdin.pause();
                fs.readFile(__dirname + '/' + filename,'utf8',function(err,data){
                    console.log('');
                    console.log(data.replace(/(.*)/g, '    $1'));                //正则表达式添加一些辅助缩进
                });
            }

        }
    }

    file(0);
});
