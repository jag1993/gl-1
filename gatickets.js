const jquery = require('jquery');
const cheerio = require('cheerio');
const request = require('request');
const Nightmare = require('nightmare');
const async = require('async');
	nightmare = Nightmare({show:true});
let webDriver;


function initWebDriver(callback) {
  webDriver = Nightmare({
    show: true,
    openDevTools: true
  });

  callback(null);
}

function scrapeTicketUrlData(callback){
  webDriver
    .viewport(1000,1000)
    .goto('http://www.taolasvegas.com/nightclub/')
    .evaluate(function(){
      //var arrayOfLinks = document.querySelectorAll('a.tickets');
      var arrayOfLinks = document.querySelectorAll('.owl-stage .owl-item .list-view-item a');
      var arrayOfLinksHREF = [];
      
      arrayOfLinks.forEach(function(data){
        arrayOfLinksHREF.push(data.href);
      })

      return arrayOfLinksHREF;
    })
    .then(function(arrayOfLinksHREF){
      if (arrayOfLinksHREF != null && arrayOfLinksHREF.length > 0) {
        console.log('----SCRAPED LINKS----');
        callback(null, arrayOfLinksHREF);
      } else {
        callback('FAILED at scrapeTicketUrlData');
      }
    })
}


function scrapeTicketPricingData(arrayOfLinksHREF,callback){
  //console.log(arrayOfLinksHREF);
  //document.querySelector('.product-0 .quantity p .plus') <---SELECT PLUS  
    function pageToPage(url,callback){
      console.log(`${url} PAGE TO PAGE FUNC`);
      callback(null);
    }

    async.eachSeries(arrayOfLinksHREF,pageToPage,function(){
      console.log('done');
    })
}

function run(){
async.waterfall([initWebDriver,scrapeTicketUrlData,scrapeTicketPricingData],
  function (err, arrayOfLinksHREF) {
  webDriver.end(() => arrayOfLinksHREF).then(function (arrayOfLinksHREF) {
    if(err){
        console.log(err)
    }else{
        console.log("FINISHED~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        console.log(arrayOfLinksHREF);
      }
      })
  })
}

run();
