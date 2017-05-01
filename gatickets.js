const jquery = require('jquery');
const cheerio = require('cheerio');
const request = require('request');
const Nightmare = require('nightmare');
const async = require('async');
	nightmare = Nightmare({show:true});

nightmare
	.goto('https://www.draisbeachclub.com/calendar/')
	.wait(5000)
	.evaluate(()=>{
		var results = [];
		 $('.uvc-overevent').each(function() {
        		var dataId = $(this).attr('data-id');
        		var dataDate = $(this).attr('data-date');
        		results.push('http://www.draisbeachclub.com/uvtix/index.html?id='+dataId+'&date='+dataDate);

         });
        return results;
	})
	.end()
	.then((data)=>{
	    async.forEachLimit(data,1,function(data){
				nightmare
				.goto(data)
				.wait(5000)
				.end()
			})
	})




