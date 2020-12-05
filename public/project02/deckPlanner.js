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
            let attack = "-";
            let health = "-";
            let miniontypeid = "-";

            if (card.attack) attack = card.attack;
            if (card.health) health = card.health;
            if (card.miniontypeid) miniontypeid = card.miniontypeid;

            $("#libraryTable").append("<tr id=\"cardId" + 
                card.cardid + "\" name=\"" +
                card.name + "\" onclick=\"addCard(this)\"><td>" +
                card.name + "</td><td>" +
                card.classid + "</td><td>" +
                card.manacost + "</td><td>" +
                attack + "</td><td>" +
                health + "</td><td>" +
                card.cardtypeid + "</td><td>" +
                card.rarityid + "</td><td>" +
                miniontypeid + "</td><td>" +
                card.text + "</td><td>" +
                "<img src=\"" + card.image + 
                "\" alt=\"" + card.name + 
                "\" width=\"250\" height=\"345\"></td><td></tr>");
		}
	})
}

function loadDeck() {
    const deckName = $("#loader").val();
    const params = {name: deckName};

    $.get("/load", params, function(data) {
        console.log(data.data)
        if(!data.data.rowCount) {
            $("#loadMsg").text("That deck name doesn't exist. Please try another.");
        }
        else {
            $("#loadMsg").text("Deck loaded!");
            clearDeck();
            const table = document.getElementById("deckTable");
            const deck = data.data.rows[0];

            const classId = deck.class_id;
            const deckClass = document.getElementById("deckClass");
            const opts = deckClass.options;
            for (let opt, i = 0; opt = opts[i]; i++) {
            if (opt.value == classId) {
                deckClass.selectedIndex = i;
                break;
            }
        }

            Object.entries(deck.deck_cards).forEach(([key, value]) => {
                const row = document.createElement("tr");
                const name = value.cardName;
                row.id = value.deckCardId;
                row.className = name;
                row.innerHTML = "<td>" + name + "</td><td><button id=\"delete" + value.deckCardId.slice(10) + "\" onclick=\"removeCard(this)\">Remove</button>";
                table.appendChild(row);
            });

        }
    })
}

function saveDeck() {
    const deckName = $("#saver").val();
    const classId = $("#deckClass").val();
    const deckList = $("#deckTable").children();
    const deckCards = {
        card1: {cardName: deckList.eq(0).children().eq(0).text(), deckCardId: deckList.eq(0).attr('id')},
        card2: {cardName: deckList.eq(1).children().eq(0).text(), deckCardId: deckList.eq(1).attr('id')},
        card3: {cardName: deckList.eq(2).children().eq(0).text(), deckCardId: deckList.eq(2).attr('id')},
        card4: {cardName: deckList.eq(3).children().eq(0).text(), deckCardId: deckList.eq(3).attr('id')},
        card5: {cardName: deckList.eq(4).children().eq(0).text(), deckCardId: deckList.eq(4).attr('id')},
        card6: {cardName: deckList.eq(5).children().eq(0).text(), deckCardId: deckList.eq(5).attr('id')},
        card7: {cardName: deckList.eq(6).children().eq(0).text(), deckCardId: deckList.eq(6).attr('id')},
        card8: {cardName: deckList.eq(7).children().eq(0).text(), deckCardId: deckList.eq(7).attr('id')},
        card9: {cardName: deckList.eq(8).children().eq(0).text(), deckCardId: deckList.eq(8).attr('id')},
        card10: {cardName: deckList.eq(9).children().eq(0).text(), deckCardId: deckList.eq(9).attr('id')},
        card11: {cardName: deckList.eq(10).children().eq(0).text(), deckCardId: deckList.eq(10).attr('id')},
        card12: {cardName: deckList.eq(11).children().eq(0).text(), deckCardId: deckList.eq(11).attr('id')},
        card13: {cardName: deckList.eq(12).children().eq(0).text(), deckCardId: deckList.eq(12).attr('id')},
        card14: {cardName: deckList.eq(13).children().eq(0).text(), deckCardId: deckList.eq(13).attr('id')},
        card15: {cardName: deckList.eq(14).children().eq(0).text(), deckCardId: deckList.eq(14).attr('id')},
        card16: {cardName: deckList.eq(15).children().eq(0).text(), deckCardId: deckList.eq(15).attr('id')},
        card17: {cardName: deckList.eq(16).children().eq(0).text(), deckCardId: deckList.eq(16).attr('id')},
        card18: {cardName: deckList.eq(17).children().eq(0).text(), deckCardId: deckList.eq(17).attr('id')},
        card19: {cardName: deckList.eq(18).children().eq(0).text(), deckCardId: deckList.eq(18).attr('id')},
        card20: {cardName: deckList.eq(19).children().eq(0).text(), deckCardId: deckList.eq(19).attr('id')},
        card21: {cardName: deckList.eq(20).children().eq(0).text(), deckCardId: deckList.eq(20).attr('id')},
        card22: {cardName: deckList.eq(21).children().eq(0).text(), deckCardId: deckList.eq(21).attr('id')},
        card23: {cardName: deckList.eq(22).children().eq(0).text(), deckCardId: deckList.eq(22).attr('id')},
        card24: {cardName: deckList.eq(23).children().eq(0).text(), deckCardId: deckList.eq(23).attr('id')},
        card25: {cardName: deckList.eq(24).children().eq(0).text(), deckCardId: deckList.eq(24).attr('id')},
        card26: {cardName: deckList.eq(25).children().eq(0).text(), deckCardId: deckList.eq(25).attr('id')},
        card27: {cardName: deckList.eq(26).children().eq(0).text(), deckCardId: deckList.eq(26).attr('id')},
        card28: {cardName: deckList.eq(27).children().eq(0).text(), deckCardId: deckList.eq(27).attr('id')},
        card29: {cardName: deckList.eq(28).children().eq(0).text(), deckCardId: deckList.eq(28).attr('id')},
        card30: {cardName: deckList.eq(29).children().eq(0).text(), deckCardId: deckList.eq(29).attr('id')},
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
    $("#deckTable").empty();
}

function addCard(e) {
    const id = Number(e.id.slice(6));
    const name = document.getElementById(e.id).getAttribute("name");
    const cardClass = e.children[1].innerText;
    const cardRarity = e.children[6].innerText;
    const selectedClass = document.getElementById("deckClass");
    const deckClass= selectedClass.options[selectedClass.selectedIndex].innerText;
    const nameClass = document.getElementsByClassName(name);

    if ($("#deckTable").children().length < 30) {
        if (cardClass.includes(deckClass) || cardClass == "Neutral") {
            if ((nameClass.length < 2 && cardRarity != "Legendary") || (cardRarity == "Legendary" && nameClass.length < 1)) {
                const table = document.getElementById("deckTable");
                const row = document.createElement("tr");
                row.className = name;
                row.id = "deckCardId" + id;
                row.innerHTML = "<td>" + name + "</td><td><button id=\"delete" + id + "\" onclick=\"removeCard(this)\">Remove</button>";
                table.appendChild(row);
                $("#deckMsg").text("Card added!");
            }
            else {
                $("#deckMsg").text("Cannot add anymore of that card.");
            }
        }
        else {
            $("#deckMsg").text("That card can't be added to a deck of this class.");
        }
    }
    else {
        $("#deckMsg").text("Deck capacity of 30 cards reached.");
    }
}

function removeCard(e) {
    const id = Number(e.id.slice(6));
    const toRemove = document.getElementById("deckCardId" + id);

    const table = document.getElementById("deckTable");
    table.removeChild(toRemove);
}