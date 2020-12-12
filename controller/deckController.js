const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});

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
      } else response.json({saved: 1});
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
      } else response.json({data: result});
    });
}

module.exports = {
    saveDeck: saveDeck,
    loadDeck: loadDeck
}