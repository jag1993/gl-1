const jquery = require('jquery');
const cheerio = require('cheerio');
const request = require('request');
const Nightmare = require('nightmare');
const async = require('async');
	nightmare = Nightmare({show:true});




let goToScrapedLinks = (data)=>{	
 	let goToUrl = (url)=>{
 	  nightmare
		.goto(url)
  		.wait(2000)
  		.evaluate((err) =>{
   			 if (err) {
      			console.log(err);
    		}
    		 console.log('Done with ' + url);
   }).then(()=>{
   	console.log('working');
   }) 
 }
  async.eachSeries(data,goToUrl,(err,res)=>{
  	if(err) throw (err);
  })
}

let scrapeAllEventLinks = (cb)=>{

nightmare
	.goto('https://www.draisbeachclub.com/calendar/')
	.evaluate(()=>{
		let results = [];
		 $('.uvc-overevent').each(function() {
        		var dataId = $(this).attr('data-id');
        		var dataDate = $(this).attr('data-date');
        		results.push('http://www.draisbeachclub.com/uvtix/index.html?id='+dataId+'&date='+dataDate);
         });
         	return results
	})
	.end()
	.then((data)=>{
		cb(data);
		})
}

	


scrapeAllEventLinks(goToScrapedLinks);









