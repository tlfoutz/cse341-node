// const express = require('express')
// const path = require('path')
// const PORT = process.env.PORT || 5000

// express()
//   .use(express.static(path.join(__dirname, 'public')))
//   .set('views', path.join(__dirname, 'views'))
//   .set('view engine', 'ejs')
//   .get('/', (req, res) => res.render('pages/index'))
//   .listen(PORT, () => console.log(`Listening on ${ PORT }`))

const express = require('express');
const app = express();
const calculateRate = require('./lib/calculateRate')

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