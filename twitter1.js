//P100

var qs = require('querystring');
var http = require('http');

var search = process.argv.silce(2).join(' ').trim();

if(!search.length)
	return console.log('\n  Usage: node tweets\n');
console.log('\n  searching for: '+ search +'\n');
http.request({
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
}).end()
