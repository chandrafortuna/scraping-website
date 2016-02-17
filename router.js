var HomeController = require('./controllers/HomeController');
var FlightController = require('./controllers/FlightController');
var OlxController = require('./controllers/OlxController');

module.exports = function(app){
    // Home Router
	app.get('/', HomeController.Index);
	app.get('/other', HomeController.Other);
	
    app.get('/olx.json', OlxController.Index);

    // Flight Router
	app.get('/flight', FlightController.Index);
	app.post('/flight/search', FlightController.Search);
};

// app.get('/books', function(request, response){
// 	console.log('List of all books');
// });
// 
// app.post('/books/:id', function(request, response){
// 	console.log('Post route to handle the addition of a new book');
// });
// 
// app.get('books/:id', function(request, response){
// 	console.log('Book details from book id ' + request.params.id);)
// });