const express = require('express');
const app = express();
const calculateRate = require('../cse341-node/lib/calculateRate')

app.set('port', (process.env.PORT || 5000));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.render('pages/rateForm');
});

app.get('/results', calculateRate)

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});