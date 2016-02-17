var scraplib = require('../lib/scraper-engine');
var S = require('string');

exports.Index = function(request, response){
scr = {
    name: 'OLX',
    url: function () {
        return "http://olx.co.id/all-results/q-batu-bacan/"
    },
    rows: function ($) {
        return $('.offer');
    },
    fields: {
        title: function ($) {
            return S($.find('.link.linkWithHash').text()).trim().s;
        },
        price: function ($) {
            return S($.find('.price').text()).trim().s;
        },
        image: function ($) {
            return $.find('.linkWithHash img').attr('src');
        }
 
 
    }
 
    }
// 	if (scr.setup)
// 		scr.setup(request);
	
	scraplib.doRun(scr, [], function(result, response) {
// 	    response.send (result);
        console.log("------->" + result);
	    response.render('home/Index', {
			content: result
		});
	}, response);
	
//	response.send(JSON.stringify(response));
	
};
