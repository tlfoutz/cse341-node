const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});
const libraryModel = require("../model/libraryModel");

function getCards(request, response) {
    libraryModel.getCardsFromDb(pool, request.query, function(error, result) {
        if (error || result == null) {
            response.status(500).json({success: false, data: error});
        } else {
            const cardArray = result;
            const params = {cards: cardArray};
    
            response.render('pages/cardLibrary', params);
        }
    });
}

function organizeLibrary(request, response) {
    libraryModel.getCardsFromDb(pool, request.query, function(error, result) {
        if (error || result == null) response.status(500).json({success: false, data: error});
        else response.json(result);
    });
}

module.exports = {
    getCards: getCards,
    organizeLibrary: organizeLibrary
}