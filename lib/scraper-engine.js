// tools.js
// ========
var request = require('request');
var cheerio = require('cheerio');

var fs = require('fs');

module.exports = {
  doRun: function (scr, allJson, callback, res) {
	var index = scr.index ? scr.index : 1;

	doScrape(scr, index, function(error, json, s) {
		if (json.length > 0)
			allJson = allJson.concat(json);
		if (scr.next && scr.next(s, index)) {
			index += 1;
			scr.index = index;
			doRun(scr, allJson, callback, res);
		} else {

			callback && callback(allJson, res);
		}
	});
  },
  bar: function () {
    // whatever
  }
};

function doScrape(scr, i, callback) {
	var json = [];
	console.log("------->" + scr.url(i));
	request(scr.url(i), function(initialerror, firstresponse, firsthtml) {
		if (initialerror) {
		    console.log("ERROR: ------->" + initialerror);
			var content = initialerror;
			res.status(404);
			res.send('eroor ' + content);
		}

		var s = cheerio.load(firsthtml);
				    console.log("S cherio load: ------->" + s);

		
		if (scr.rows) {
						    		    console.log("scr rows: ------->" + scr.rows);
			var rows = scr.rows(s);

			var tot = rows.length;
			                console.log("total: --->" + tot);
			rows.each(function() {
				var output = {};
				for (var key in scr.fields) {
					if (typeof scr.fields[key] == 'function')
						
						output[key] = scr.fields[key](s(this),s);
				}
				json.push(output);
				if (json.length >= tot) {
					if (scr.finish)
						scr.finish();
					console.log("--->" + json.length + " records");
					callback && callback(false, json, s);
				}
			});
		} else {
			var list = scr.list(s);
//					console.log('list',list)
			var tot = 0;

			for (var i in list) 
//			var i=0;
			{
				//Detail
				console.log("--->" + list[i]);
				request(list[i], function(error, response, dom) {
					var ss = cheerio.load(dom);
					var sublist = scr.sublist(ss);
//					console.log('sublist',sublist)
					tot = tot+sublist.length;

					for (var ii in sublist) 
//					var ii=0;
					{
						
						//Detail
						console.log("--->" + sublist[ii]);
						request(sublist[ii], function(error, response, dom) {
							if (!error) {

								var jqq = cheerio.load(dom);

								var output = {};
								for (var key in scr.fields) {
									if (typeof scr.fields[key] == 'function')
										output[key] = scr.fields[key](jqq, dom);
								}
								json.push(output);
								console.log(json.length,tot);
								if (json.length >= tot) {
									if (scr.finish)
										scr.finish();
									callback && callback(false, json, s);
								}
							} else {
								if (error) {


								}

							}
						})
					}
				})
			}
		}
	})
}