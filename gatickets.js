var jquery = require('jquery');
var cheerio = require('cheerio');
var request = require('request');
var Nightmare = require('nightmare');
	nightmare = Nightmare({show:true});
var result = [];
var isScraped = false;
//USELESS CODE WITH CHEERIO, WHO KNEW NIGHTMARE HAD SCRAPING CAPABILITIES... D:

// request('https://www.draisbeachclub.com/calendar/', function(error, response, html) {
//         var $ = cheerio.load(html);
//         $('.uvc-overevent').each(function(i, element) {;
//        		var dataId = this.attribs['data-id'];
//        		var dataDate = this.attribs['data-date'];
//        		var eventData = {
//        			dataId: dataId,
//        			dataDate: dataDate
//        		}
//        		// result[dataId] = {
//        		// 	dataId: dataId,
//        		// 	dataDate: dataDate
//        		// }
//        		result.push(eventData);
//         });
//         //console.log(Object.keys(result).length);
//         isScraped = true;
//         console.log('Scrape Done!!')
//         if(isScraped){
//          for(var i = 0; i<10;i++){
//         	nightmare
// 					.goto('http://www.draisbeachclub.com/uvtix/index.html?id='+result[0].dataId+'&date='+result[0].dataDate)
// 					.end()
// 					.then((result)=>{
// 						console.log(result)
// 					});			
        
// 		}
// 	}
//     });
 



//CODE WITHOUT CHEERIO

nightmare
	.goto('https://www.draisbeachclub.com/calendar/')
	.wait(5000)
	.evaluate(()=>{
		var result = {};
		 $('.uvc-overevent').each(function() {
        		var dataId = $(this).attr('data-id');
        		var dataDate = $(this).attr('data-date');
        		var eventData = {
        			dataId: dataId,
        			dataDate: dataDate
        		}
        		 result[dataId] = {
        		 	dataId: dataId,
        		 	dataDate: dataDate
        		 }
         });
         return result;
	})
	.end()
	.then((data)=>{
		console.log(data);
		// for(var key in data){
		// 	nightmare
		// 		.goto('http://www.draisbeachclub.com/uvtix/index.html?id='+data[key].dataId+'&date='+data[key].dataDate)
		// 		.wait(5000)
		// 		.end()
		// }
	})




