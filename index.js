const express = require('express');
const app = express();

app.set('port', (process.env.PORT || 5000));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

//Start Prove 09
const calculateRate = require('./lib/prove09CalculateRate')

app.get('/prove09', function(request, response) {
  response.render('../public/prove09Form');
});

app.get('/prove09Results', calculateRate)
// End Prove09

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});