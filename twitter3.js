//P103
//调用superagent
//放到res.body中去


var request = require('superagent');
request.get('http://twitter.com/search.json')
	.send({q:'justin bieber'})
	.set(Data,new Data)
	.end(function(res){
		console.log(res.body);
	});

//send和set方法均可被调用多次，并且均为渐进式API，可以进行链式调用，并最后通过end方法来结束

//superagent也提供put，post，head以及del方法