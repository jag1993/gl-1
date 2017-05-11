const jquery = require('jquery');
const request = require('request');
const Nightmare = require('nightmare');
const async = require('async');
let webDriver;


function initWebDriver(callback) {
  webDriver = Nightmare({
    show: true,
    openDevTools: false
  });

  callback(null);
}

function scrapeTicketUrlData(callback){
  webDriver
    .viewport(1000,1000)
    .goto('http://www.taolasvegas.com/nightclub/')
    .evaluate(function(){
      //var arrayOfLinks = document.querySelectorAll('a.tickets');
      var arrayOfLinks = document.querySelectorAll('.ticket-price .primary-link .tickets');
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
  var arrayOfPricingData = [];
  //console.log(arrayOfLinksHREF);
  //document.querySelector('.product-0 .quantity p .plus') <---SELECT PLUS  
    function pageToPage(url,callback){
      //console.log(`${url} PAGE TO PAGE FUNC`);
      webDriver
        .viewport(1000,1000)
        .goto(url)
        .click('.product-0 .quantity p .plus')
        .wait(1000)
        .click('#bestSeats')
        .wait(1000)
        .click('.continue')
        .wait(1000)
        .evaluate(function(){
              var price = document.querySelector('.orderTotal');
      })
        .click('.cart')
        .wait(1000)
        .click('.emptyCartButtonClass')
        .then(function(){ 
          callback(null);

        })
    }

    async.eachSeries(arrayOfLinksHREF,pageToPage,function(){
      console.log('Here Now');
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
