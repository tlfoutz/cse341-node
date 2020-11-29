function applyOrganizers() {
    const order = $("#order").val();
    const classFilter = $("#classFilter").val();
    const manaCostFilter = $("#manaCostFilter").val();
    const attackFilter = $("#attackFilter").val();
    const healthFilter = $("#healthFilter").val();
    const cardTypeFilter = $("#cardTypeFilter").val();
    const rarityFilter = $("#rarityFilter").val();
    const minionTypeFilter = $("#minionTypeFilter").val();

    const params = {
        order:order,
        classFilter:classFilter,
        manaCostFilter:manaCostFilter,
        attackFilter:attackFilter,
        healthFilter:healthFilter,
        cardTypeFilter:cardTypeFilter,
        rarityFilter:rarityFilter,
        minionTypeFilter:minionTypeFilter
    }

	$.get("/organize", params, function(data) {
        $("#libraryTable").html("<tr><th>Name</th><th>Class</th><th>Mana</th>" + 
        "<th>Attack</th><th>Health</th><th>Card Type</th><th>Rarity</th>" +
        "<th>Minion Type</th><th>Card Text</th><th>Image</th></tr>");
		for (var i = 0; i < data.length; i++) {
            const card = data[i];
            $("#libraryTable").append("<tr id=\"cardId" + 
                card.cardid + "\" name=\"" +
                card.name + "\" onclick=\"addCard(this)\"><td>" +
                card.name + "</td><td>" +
                card.classid + "</td><td>" +
                card.manacost + "</td><td>" +
                card.attack + "</td><td>" +
                card.health + "</td><td>" +
                card.cardtypeid + "</td><td>" +
                card.rarityid + "</td><td>" +
                card.miniontypeid + "</td><td>" +
                card.text + "</td><td>" +
                "<img src=\"" + card.image + 
                "\" alt=\"" + card.name + 
                "\" width=\"25%\" height=\"25%\"></td><td></tr>");
		}
	})
}

function loadDeck() {
    // TODO:
}

function saveDeck() {
    const deckName = $("#saver").val();
    const classId = $("#deckClass").val();                  // Deck's assigned class
    const deckCards = {                                     // 30 cards per deck
        card1: $("#deckTable").children().eq(0).attr('id'),
        card2: $("#deckTable").children().eq(1).attr('id'),
        card3: $("#deckTable").children().eq(2).attr('id'),
        card4: $("#deckTable").children().eq(3).attr('id'),
        card5: $("#deckTable").children().eq(4).attr('id'),
        card6: $("#deckTable").children().eq(5).attr('id'),
        card7: $("#deckTable").children().eq(6).attr('id'),
        card8: $("#deckTable").children().eq(7).attr('id'),
        card9: $("#deckTable").children().eq(8).attr('id'),
        card10: $("#deckTable").children().eq(9).attr('id'),
        card11: $("#deckTable").children().eq(10).attr('id'),
        card12: $("#deckTable").children().eq(11).attr('id'),
        card13: $("#deckTable").children().eq(12).attr('id'),
        card14: $("#deckTable").children().eq(13).attr('id'),
        card15: $("#deckTable").children().eq(14).attr('id'),
        card16: $("#deckTable").children().eq(15).attr('id'),
        card17: $("#deckTable").children().eq(16).attr('id'),
        card18: $("#deckTable").children().eq(17).attr('id'),
        card19: $("#deckTable").children().eq(18).attr('id'),
        card20: $("#deckTable").children().eq(19).attr('id'),
        card21: $("#deckTable").children().eq(20).attr('id'),
        card22: $("#deckTable").children().eq(21).attr('id'),
        card23: $("#deckTable").children().eq(22).attr('id'),
        card24: $("#deckTable").children().eq(23).attr('id'),
        card25: $("#deckTable").children().eq(24).attr('id'),
        card26: $("#deckTable").children().eq(25).attr('id'),
        card27: $("#deckTable").children().eq(26).attr('id'),
        card28: $("#deckTable").children().eq(27).attr('id'),
        card29: $("#deckTable").children().eq(28).attr('id'),
        card30: $("#deckTable").children().eq(29).attr('id'),
    };

    const params = {name: deckName, class_id: classId, deck_cards: JSON.stringify(deckCards)};

    $.post("/save", params, function(data){
        if(!data.saved) {
            $("#saveMsg").text("That deck name is already claimed. Please try another.");
        } else {
            $("#saveMsg").text("Deck saved!");
        }
    });
}

function clearDeck() {
    // TODO:
}

function addCard(e) {
    const id = Number(e.id.slice(6));
    const name = document.getElementById(e.id).getAttribute("name");

    const table = document.getElementById("deckTable");
    const row = document.createElement("tr");
    row.id = "deckCardId" + id;
    row.innerHTML = "<td>" + name + "</td><td><button id=\"delete" + id + "\" onclick=\"removeCard(this)\">Remove</button>";
    table.appendChild(row);
}

function removeCard(e) {
    const id = Number(e.id.slice(6));
    const toRemove = document.getElementById("deckCardId" + id);

    const table = document.getElementById("deckTable");
    table.removeChild(toRemove);
}