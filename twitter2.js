//P102
//调用twitter API的代码
//和上一个的唯一本质的不同是这种方式无须调用end方法，并且从语义上更显然能够看出是要获取数据


http.get({
	host:'search.twitter.com',
	path:'/search.json?' + qs.stringfy({q:search})
},function(res){
	var body = '';
	res.setEncoding('utf8');
	res.on('data',function(chunk){
		body += chunk;
	});
	res.on('end',function(){
		var obj = JSON.parse(body);
		obj.results.forEach(function(tweet){
			console.log(tweet.text);
			console.log(tweet.from_user);
			console.log('---');
		});
	});
})
