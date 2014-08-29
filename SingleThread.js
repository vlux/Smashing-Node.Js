//P27

var start = new Date();

setTimeout(function(){
    console.log(Date.now() - start);
    for(var  i = 0;i < 10000000000;++i)
        {}
},100);

setTimeout(function(){
    console.log(Date.now() - start);
},200)
