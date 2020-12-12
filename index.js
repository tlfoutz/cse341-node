require('dotenv').config();
const libraryController = require("./controller/libraryController");
const deckController = require("./controller/deckController")
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const router = express.Router();

app.set('port', (process.env.PORT || 5000));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", router);

app.get('/cardLibrary', libraryController.getCards);
app.get('/organize', libraryController.organizeLibrary);
app.get('/load', deckController.loadDeck);
router.post('/save', deckController.saveDeck);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});