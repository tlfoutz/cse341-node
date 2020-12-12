function getCardsFromDb(pool, queryData, callback) {
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
    if (typeof queryData.classFilter !== 'undefined' && queryData.classFilter != "all") 
        sql += `AND (cards.info ->> 'classId' = '${queryData.classFilter}' OR cards.info::json#>>'{multiClassIds,0}' = '${queryData.classFilter}' OR cards.info::json#>>'{multiClassIds,1}' = '${queryData.classFilter}' OR cards.info::json#>>'{multiClassIds,3}' = '${queryData.classFilter}') `
    if (typeof queryData.manaCostFilter !== 'undefined' && queryData.manaCostFilter != "all") 
        sql += `AND (cards.info ->> 'manaCost' = '${queryData.manaCostFilter}') `;
    if (typeof queryData.attackFilter !== 'undefined' && queryData.attackFilter != "all") 
        sql += `AND (cards.info ->> 'attack' = '${queryData.attackFilter}') `;
    if (typeof queryData.healthFilter !== 'undefined' && queryData.healthFilter != "all") 
        sql += `AND (cards.info ->> 'health' = '${queryData.healthFilter}') `;
    if (typeof queryData.cardTypeFilter !== 'undefined' && queryData.cardTypeFilter != "all") 
        sql += `AND (cards.info ->> 'cardTypeId' = '${queryData.cardTypeFilter}') `;
    if (typeof queryData.rarityFilter !== 'undefined' && queryData.rarityFilter != "all") 
        sql += `AND (cards.info ->> 'rarityId' = '${queryData.rarityFilter}') `;
    if (typeof queryData.minionTypeFilter !== 'undefined' && queryData.minionTypeFilter != "all") 
        sql += `AND (cards.info ->> 'minionTypeId' = '${queryData.minionTypeFilter}') `;
        
    if (queryData.search !== 'undefined')
        sql += `AND (LOWER(cards.info->> 'name') LIKE LOWER('%${queryData.search}%') OR LOWER(cards.info->> 'text') LIKE LOWER('%${queryData.search}%')) `;

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

module.exports = {
    getCardsFromDb: getCardsFromDb
}