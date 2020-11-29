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

// Added in Prove10
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
    "WHERE (cards.info ->> 'manaCost' != '0' OR cards.info ->> 'cardTypeId' != '3') ";
  
  // Add filters
  if (typeof queryData.classFilter !== 'undefined' && queryData.classFilter != "all") {
    sql += `AND (cards.info ->> 'classId' = '${queryData.classFilter}') `;
  }
  if (typeof queryData.manaCostFilter !== 'undefined' && queryData.manaCostFilter != "all") {
    sql += `AND (cards.info ->> 'manaCost' = '${queryData.manaCostFilter}') `;
  }
  if (typeof queryData.attackFilter !== 'undefined' && queryData.attackFilter != "all") {
    sql += `AND (cards.info ->> 'attack' = '${queryData.attackFilter}') `;
  }
  if (typeof queryData.healthFilter !== 'undefined' && queryData.healthFilter != "all") {
    sql += `AND (cards.info ->> 'health' = '${queryData.healthFilter}') `;
  }
  if (typeof queryData.cardTypeFilter !== 'undefined' && queryData.cardTypeFilter != "all") {
    sql += `AND (cards.info ->> 'cardTypeId' = '${queryData.cardTypeFilter}') `;
  }
  if (typeof queryData.rarityFilter !== 'undefined' && queryData.rarityFilter != "all") {
    sql += `AND (cards.info ->> 'rarityId' = '${queryData.rarityFilter}') `;
  }
  if (typeof queryData.minionTypeFilter !== 'undefined' && queryData.minionTypeFilter != "all") {
    sql += `AND (cards.info ->> 'minionTypeId' = '${queryData.minionTypeFilter}') `;
  }
  // Select ORDER
  if (typeof queryData.order !== 'undefined') sql += `ORDER BY cards.info ->> '${queryData.order}', cards.info ->> 'name'`;
  else sql += "ORDER BY cards.info ->> 'name'";
  const params = [];
  console.log(sql)
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

// Added with Prove11
const bodyParser = require("body-parser");
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", router);

app.get('/organize', organizeLibrary);
router.post('/save', saveDeck);

function organizeLibrary(request, response) {

  getCardsFromDb(request.query, function(error, result) {
		if (error || result == null) {
			response.status(500).json({success: false, data: error});
		} else {
      response.json(result);		
    }
	});
}

function saveDeck(request, response) {
  const name = request.body.name;
  const class_id = request.body.class_id;
  const deck_cards = request.body.deck_cards;

  // console.log("Name: " + name)
  // console.log("ClassId: " + class_id)
  // console.log("Cards: " + deck_cards)

  let sql = "INSERT INTO decks(name,class_id,deck_cards) VALUES ($1, $2, $3)";

  const params = [name, class_id, deck_cards];
  console.log(sql)
  pool.query(sql, params, function(err, result) {
    // If an error occurred...
    if (err) {
      console.log("Error in query: ")
      console.log(err);
      response.json({saved: 0});
    } else {
      response.json({saved: 1});
    }
  });
}
// End Prove11

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});