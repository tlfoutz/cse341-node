require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const router = express.Router();
const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});

app.set('port', (process.env.PORT || 5000));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", router);

// process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

app.get('/cardLibrary', getCards);
app.get('/organize', organizeLibrary);
app.get('/load', loadDeck);
router.post('/save', saveDeck);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

function getCards(request, response) {
  getCardsFromDb(request.query, function(error, result) {
		if (error || result == null) {
			response.status(500).json({success: false, data: error});
		} else {
      const cardArray = result;
      const params = {cards: cardArray};

      response.render('pages/cardLibrary', params);
		}
	});
}

function getCardsFromDb(queryData, callback) {
  let sql = "SELECT cards.info ->> 'id' AS cardId, " +
	  "CASE " +
	  "WHEN cards.info::json#>>'{multiClassIds,0}' IS NULL THEN (SELECT classes.type FROM classes WHERE CAST(classes.id AS varchar) = cards.info->> 'classId') " +
	  "WHEN cards.info::json#>>'{multiClassIds,2}' IS NULL THEN CONCAT ((SELECT classes.type FROM classes WHERE CAST(classes.id AS varchar) = cards.info::json#>>'{multiClassIds,0}'), ', ', (SELECT classes.type FROM classes WHERE CAST(classes.id AS varchar) = cards.info::json#>>'{multiClassIds,1}')) " +
	  "ELSE CONCAT ((SELECT classes.type FROM classes WHERE CAST(classes.id AS varchar) = cards.info::json#>>'{multiClassIds,0}'), ', ', (SELECT classes.type FROM classes WHERE CAST(classes.id AS varchar) = cards.info::json#>>'{multiClassIds,1}'),  ', ', (SELECT classes.type FROM classes WHERE CAST(classes.id AS varchar) = cards.info::json#>>'{multiClassIds,2}')) " +
    "END AS classId," +
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
    sql += `AND (cards.info ->> 'classId' = '${queryData.classFilter}' OR cards.info::json#>>'{multiClassIds,0}' = '${queryData.classFilter}' OR cards.info::json#>>'{multiClassIds,1}' = '${queryData.classFilter}' OR cards.info::json#>>'{multiClassIds,3}' = '${queryData.classFilter}') `
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
  let sql = "INSERT INTO decks(name,class_id,deck_cards) VALUES ($1, $2, $3)";

  const params = [name, class_id, deck_cards];
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

function loadDeck(request, response) {
  const name = request.query.name;

  let sql = "SELECT name, class_id, deck_cards FROM decks WHERE name = $1";
  const params = [name];
  pool.query(sql, params, function(err, result) {
    // If an error occurred...
    if (err) {
      console.log("Error in query: ")
      console.log(err);
      response.json({loaded: 0});
    } else {
      response.json({data: result});
    }
  });
}