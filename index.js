require('dotenv').config();
const express = require('express');
const app = express();

app.set('port', (process.env.PORT || 5000));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

// Start Prove 09
const calculateRate = require('./lib/w09/CalculateRate');

app.get('/prove09', function(request, response) {
  response.render('../public/w09/form');
});

app.get('/w09/results', calculateRate)
// End Prove09

// Start Prove10
const { Pool } = require("pg");
const { query } = require('express');
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
require('dotenv').config({path: 'variables.env'});

app.get('/cardLibrary', getCards);

function getCards(request, response) {

  getCardsFromDb(request.query, function(error, result) {
		if (error || result == null) {
			response.status(500).json({success: false, data: error});
		} else {
      const cardArray = result;
      const params = {cards: cardArray};

      response.render('pages/project02/cardLibrary', params);
		}
	});
}

function getCardsFromDb(queryData, callback) {
  let sql = "SELECT cards.info ->> 'id' AS cardId, " +
    "(SELECT classes.type from classes where CAST(classes.id AS varchar) = cards.info->> 'classId') AS classId, " +
    "cards.info ->> 'name' AS name, " +
    "cards.info ->> 'manaCost' AS manaCost, " +
    "cards.info ->> 'attack' AS attack, " +
    "cards.info ->> 'health' AS health, " +
    "(SELECT card_types.type from card_types where CAST(card_types.id AS varchar) = cards.info->> 'cardTypeId') AS cardTypeId, " +
    "(SELECT minion_types.type from minion_types where CAST(minion_types.id AS varchar) = cards.info->> 'minionTypeId') AS minionTypeId, " +
    "(SELECT rarity.type from rarity where CAST(rarity.id AS varchar) = cards.info->> 'rarityId') AS rarityId, " +
    "cards.info ->> 'text' AS text, " +
    "cards.info ->> 'image' AS image " +
    "FROM cards " +
    "WHERE (cards.info ->> 'manaCost' != '0' OR cards.info ->> 'health' != '30') " +
    "ORDER BY cards.info ->> 'name'";
	const params = [];
	pool.query(sql, params, function(err, result) {
		// If an error occurred...
		if (err) {
			console.log("Error in query: ")
			console.log(err);
			callback(err, null);
		}
		callback(null, result.rows);
	});
}
// End Prove10

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});