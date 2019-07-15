// OGÓLNA FUNKCJA
//nie jest potrzebna gdy korzytsamy z api - informację o id otrzymujemy z serwera i nie musimy go tworzyć losowo
// function randomString() {
// 	var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ'.split();
// 	var str = '', i;
// 	for (i = 0; i < 10; i++) {
// 	  str += chars[Math.floor(Math.random() * chars.length)];
// 	}
// 	return str;
// }

function generateTemplate(name, data, basicElement) {
  	var template = document.getElementById(name).innerHTML;
  	var element = document.createElement(basicElement || 'div');
  
  	Mustache.parse(template);
  	element.innerHTML = Mustache.render(template, data);
  
  	return element;
}

//FUNKCJONALNOŚCI DLA API
//zmienne do komunikacji z serwerem - url oraz nagłówki
var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
  'X-Client-Id': '4028',
  'X-Auth-Token': '35aeda076ef954a8a84426508fefd03d'
};

//zapytanie wysyłane do serwera
fetch(baseUrl + '/board', { headers: myHeaders })
  .then(function(resp) {
    return resp.json();
  })
  .then(function(resp) {
    setupColumns(resp.columns);
});

//funkcja generująca kolumny (tyle ile otrzymujemy w odpowiedzi serwera)
function setupColumns(columns) {
    columns.forEach(function(column) {
          var col = new Column(column.id, column.name);
        board.addColumn(col);
        setupCards(col, column.cards);
    });
}
//funkcja generująca karty
function setupCards(col, cards) {
	cards.forEach(function (card) {
    var cardObj = new Card(card.id, card.name);
  	col.addCard(cardObj);
	});
}
