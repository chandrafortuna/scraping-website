var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use('/static', express.static('public'))
app.set('port', (process.env.PORT || 1192));

app.listen(app.get('port'), function(){
	console.log('Server started on port ' +app.get('port'));
});

require('./router')(app);