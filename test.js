const Nightmare = require('nightmare');
	nightmare = Nightmare({show:true});

function test(){
	nightmare
      .goto('http://google.com')
      .wait(1000)
      .type('form[action*="/search"] [name=q]', 'github nightmare')
      .click('form[action*="/search"] [type=submit]')
      .wait(1000)//.wait('#rcnt')
      .evaluate(function () {
        return document.querySelector('div.rc h3.r a').href
      })
      .then(function(link) {
        console.log("TESTING 1");
        expect(link).to.equal('https://github.com/segmentio/nightmare');

        nightmare.evaluate(function () {
          return document.querySelector('div.rc h3.r a').href
        })
        .end()
        .then(function(link) {
          console.log("TESTING 2");
          expect(link).to.equal('https://github.com/segmentio/nightmare');
          done();
        })

      }).catch(function(error) {
        done(new Error(error))
      })

}

test();