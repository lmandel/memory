var numCards = 12;
var pairs = {};
var selected = -1;
var pairsFound = 0;
var moves = 0;

function setup(){
	createGameboard();
	assignCardPairs();
	
}

function createGameboard(){
	gameboardDiv = document.getElementById("gameboard");
	menu = document.createElement("div");
	gameboardDiv.appendChild(menu);
	status = document.createElement("div");
	gameboardDiv.appendChild(status);
	
	for(var i = 0; i < numCards; i++){
		card = document.createElement("div");
		card.id = "card" + i;
		card.setAttribute("class", "card");
		gameboardDiv.appendChild(card);
		card.addEventListener("click", flipCard, false);
		
		cardback = document.createElement("div");
		cardback.setAttribute("class", "back");
		card.appendChild(cardback);
		
		cardfront = document.createElement("div");
		cardfront.setAttribute("class", "front");
		card.appendChild(cardfront);
	}
}

function flipCard(){
	card = this;
	card.setAttribute("class", "card active pair" + pairs[this.id]);
	if(selected == -1){
		selected = this;
	}
	else{
		if(pairs[this.id] == pairs[selected.id]){
			// match made
			pairsFound++;
			selected = -1;
		}
		else{
			setTimeout(function() {
				card.setAttribute("class", "card");
				selected.setAttribute("class", "card");
				selected = -1;
			},1000);
			
		}
		moves++;
	}
}

function assignCardPairs(){
	var numPairs = numCards / 2;
	var taken = new Array();
	for(var i = 0; i < numPairs; i++){
		var card1, card2;
		do{
			card1=Math.floor(Math.random()*numCards);
		}while(taken[card1] == true);
		taken[card1] = true;
		do{
			card2=Math.floor(Math.random()*numCards);
		}while(taken[card2] == true);
		taken[card2] = true;
		pairs["card"+card1] = i;
		pairs["card"+card2] = i;
	}
}

