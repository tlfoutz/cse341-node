CREATE TABLE cards (
	id serial NOT NULL PRIMARY KEY,
	info json NOT NULL
);
 
CREATE TABLE minion_types (
	id INT PRIMARY KEY NOT NULL,
	type VARCHAR(255) NOT NULL
);

INSERT INTO minion_types(id,type) VALUES (14, 'Murloc');
INSERT INTO minion_types(id,type) VALUES (15, 'Demon');
INSERT INTO minion_types(id,type) VALUES (17, 'Mech');
INSERT INTO minion_types(id,type) VALUES (18, 'Elemental');
INSERT INTO minion_types(id,type) VALUES (20, 'Beast');
INSERT INTO minion_types(id,type) VALUES (21, 'Totem');
INSERT INTO minion_types(id,type) VALUES (23, 'Pirate');
INSERT INTO minion_types(id,type) VALUES (24, 'Dragon');
INSERT INTO minion_types(id,type) VALUES (26, 'All');

CREATE TABLE classes (
	id INT PRIMARY KEY NOT NULL,
	type VARCHAR(255) NOT NULL
);

INSERT INTO classes(id,type) VALUES (2, 'Druid');
INSERT INTO classes(id,type) VALUES (3, 'Hunter');
INSERT INTO classes(id,type) VALUES (4, 'Mage');
INSERT INTO classes(id,type) VALUES (5, 'Paladin');
INSERT INTO classes(id,type) VALUES (6, 'Priest');
INSERT INTO classes(id,type) VALUES (7, 'Rogue');
INSERT INTO classes(id,type) VALUES (8, 'Shaman');
INSERT INTO classes(id,type) VALUES (9, 'Warlock');
INSERT INTO classes(id,type) VALUES (10, 'Warrior');
INSERT INTO classes(id,type) VALUES (12, 'Neutral');
INSERT INTO classes(id,type) VALUES (14, 'Demon Hunter');

CREATE TABLE card_types (
	id INT PRIMARY KEY NOT NULL,
	type VARCHAR(255) NOT NULL
);

INSERT INTO card_types(id,type) VALUES (3, 'Hero');
INSERT INTO card_types(id,type) VALUES (4, 'Minion');
INSERT INTO card_types(id,type) VALUES (5, 'Spell');
INSERT INTO card_types(id,type) VALUES (7, 'Weapon');

CREATE TABLE sets (
	id INT PRIMARY KEY NOT NULL,
	type VARCHAR(255) NOT NULL
);

INSERT INTO sets(id,type) VALUES (2, 'Basic');
INSERT INTO sets(id,type) VALUES (3, 'Classic');
INSERT INTO sets(id,type) VALUES (4, 'Hall of Fame');
INSERT INTO sets(id,type) VALUES (5, 'Curse of Naxxramas');
INSERT INTO sets(id,type) VALUES (13, 'Goblins vs Gnomes');
INSERT INTO sets(id,type) VALUES (14, 'Blackrock Mountain');
INSERT INTO sets(id,type) VALUES (15, 'The Grand Tournament');
INSERT INTO sets(id,type) VALUES (20, 'League of Explorers');
INSERT INTO sets(id,type) VALUES (21, 'Whispers of the Old Gods');
INSERT INTO sets(id,type) VALUES (23, 'One Night in Karazhan');
INSERT INTO sets(id,type) VALUES (25, 'Mean Streets of Gadgetzan');
INSERT INTO sets(id,type) VALUES (27, 'Journey to UnGoro');
INSERT INTO sets(id,type) VALUES (1001, 'Knights of the Frozen Throne');
INSERT INTO sets(id,type) VALUES (1004, 'Kobolds and Catacombs');
INSERT INTO sets(id,type) VALUES (1125, 'The WitchWood');
INSERT INTO sets(id,type) VALUES (1127, 'The Boomsday Project');
INSERT INTO sets(id,type) VALUES (1129, 'Rastakhans Rumble');
INSERT INTO sets(id,type) VALUES (1130, 'Rise of Shadows');
INSERT INTO sets(id,type) VALUES (1158, 'Saviors of Uldum');
INSERT INTO sets(id,type) VALUES (1347, 'Descent of Dragons');
INSERT INTO sets(id,type) VALUES (1403, 'Galakronds Awakening');
INSERT INTO sets(id,type) VALUES (1414, 'Ashes of Outland');
INSERT INTO sets(id,type) VALUES (1463, 'Demon Hunter Initiate');
INSERT INTO sets(id,type) VALUES (1443, 'Scholomance Academy');
INSERT INTO sets(id,type) VALUES (1446, 'Madness at the Darkmoon Faire');

CREATE TABLE rarity (
	id INT PRIMARY KEY NOT NULL,
	type VARCHAR(255) NOT NULL
);

INSERT INTO rarity(id,type) VALUES (1, 'Common');
INSERT INTO rarity(id,type) VALUES (2, 'Neutral');
INSERT INTO rarity(id,type) VALUES (3, 'Rare');
INSERT INTO rarity(id,type) VALUES (4, 'Epic');
INSERT INTO rarity(id,type) VALUES (5, 'Legendary');

-- Keywords not used
-- CREATE TABLE keywords (
-- 	id INT PRIMARY KEY NOT NULL,
-- 	type VARCHAR(255) NOT NULL
-- );

-- INSERT INTO keywords(id,type) VALUES (1, 'Taunt');
-- INSERT INTO keywords(id,type) VALUES (2, 'Spell Damage');
-- INSERT INTO keywords(id,type) VALUES (3, 'Divine Shield');
-- INSERT INTO keywords(id,type) VALUES (4, 'Charge');
-- INSERT INTO keywords(id,type) VALUES (5, 'Secret');
-- INSERT INTO keywords(id,type) VALUES (6, 'Stealth');
-- INSERT INTO keywords(id,type) VALUES (8, 'Battlecry');
-- INSERT INTO keywords(id,type) VALUES (10, 'Freeze');
-- INSERT INTO keywords(id,type) VALUES (11, 'Windfury');
-- INSERT INTO keywords(id,type) VALUES (12, 'Deathrattle');
-- INSERT INTO keywords(id,type) VALUES (13, 'Combo');
-- INSERT INTO keywords(id,type) VALUES (14, 'Overload');
-- INSERT INTO keywords(id,type) VALUES (15, 'Silence');
-- INSERT INTO keywords(id,type) VALUES (16, 'Counter');
-- INSERT INTO keywords(id,type) VALUES (17, 'Immune');
-- INSERT INTO keywords(id,type) VALUES (19, 'Spare Parts');
-- INSERT INTO keywords(id,type) VALUES (20, 'Inspire');
-- INSERT INTO keywords(id,type) VALUES (21, 'Discover');
-- INSERT INTO keywords(id,type) VALUES (31, 'Quest');
-- INSERT INTO keywords(id,type) VALUES (32, 'Poisonous');
-- INSERT INTO keywords(id,type) VALUES (34, 'Adapt');
-- INSERT INTO keywords(id,type) VALUES (38, 'Lifesteal');
-- INSERT INTO keywords(id,type) VALUES (39, 'Recruit');
-- INSERT INTO keywords(id,type) VALUES (52, 'Echo');
-- INSERT INTO keywords(id,type) VALUES (53, 'Rush');
-- INSERT INTO keywords(id,type) VALUES (61, 'Overkill');
-- INSERT INTO keywords(id,type) VALUES (66, 'Magnetic');
-- INSERT INTO keywords(id,type) VALUES (71, 'Lackey');
-- INSERT INTO keywords(id,type) VALUES (76, 'Twinspell');
-- INSERT INTO keywords(id,type) VALUES (77, 'Mega-Windfury');
-- INSERT INTO keywords(id,type) VALUES (78, 'Reborn');
-- INSERT INTO keywords(id,type) VALUES (79, 'Invoke');
-- INSERT INTO keywords(id,type) VALUES (86, 'Outcast');
-- INSERT INTO keywords(id,type) VALUES (88, 'Spellburst');
-- INSERT INTO keywords(id,type) VALUES (89, 'Sidequest');
-- INSERT INTO keywords(id,type) VALUES (91, 'Corrupt');

-- Select ALL cards
-- SELECT
-- 	cards.info ->> 'id' AS cardId,
-- 	CASE
-- 		WHEN cards.info::json#>>'{multiClassIds,0}' IS NULL THEN (SELECT classes.type from classes where CAST(classes.id AS varchar) = cards.info->> 'classId')
-- 		WHEN cards.info::json#>>'{multiClassIds,2}' IS NULL THEN CONCAT ((SELECT classes.type from classes where CAST(classes.id AS varchar) = cards.info::json#>>'{multiClassIds,0}'), ', ', (SELECT classes.type from classes where CAST(classes.id AS varchar) = cards.info::json#>>'{multiClassIds,1}'))
-- 		ELSE CONCAT ((SELECT classes.type from classes where CAST(classes.id AS varchar) = cards.info::json#>>'{multiClassIds,0}'), ', ', (SELECT classes.type from classes where CAST(classes.id AS varchar) = cards.info::json#>>'{multiClassIds,1}'),  ', ', (SELECT classes.type from classes where CAST(classes.id AS varchar) = cards.info::json#>>'{multiClassIds,2}'))
-- 		END AS classId,
-- 	cards.info ->> 'name' AS name,
-- 	cards.info ->> 'manaCost' AS manaCost,
-- 	cards.info ->> 'attack' AS attack,
-- 	cards.info ->> 'health' AS health,
-- 	(SELECT card_types.type from card_types where CAST(card_types.id AS varchar) = cards.info->> 'cardTypeId') AS cardTypeId,
-- 	(SELECT minion_types.type from minion_types where CAST(minion_types.id AS varchar) = cards.info->> 'minionTypeId') AS minionTypeId,
-- 	(SELECT rarity.type from rarity where CAST(rarity.id AS varchar) = cards.info->> 'rarityID') AS rarityID,
-- 	cards.info ->> 'text' AS text,
-- 	cards.info ->> 'image' AS image
-- FROM cards
-- WHERE (cards.info ->> 'manaCost' != '0' OR cards.info ->> 'cardTypeId' != '3')
-- -- Where cards.info ->> 'name' = 'High Abbess Alura' -- Specific card test
-- ORDER BY cards.info ->> 'name';

CREATE TABLE decks
(
	id SERIAL PRIMARY KEY NOT NULL,
	name VARCHAR(255) NOT NULL,
	class_id INT REFERENCES classes(id) NOT NULL,
	deck_cards JSON NOT NULL,
  	UNIQUE(name)
);