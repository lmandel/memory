var numCards = 12;
var pairs = {};
var selected = -1;
var pairsFound = 0;
var moves = 0;
var status;

function setup(){
	createMenu();
	createStatus();
	createGameboard();
	assignCardPairs();
	
}

function createMenu(){
	menuDiv = document.getElementById("menu");
	dMenu = createDifficultyMenu();
	menuDiv.appendChild(dMenu);
	
	resetMenu = document.createElement("div");
	resetMenu.id = "resetmenu";
	resetMenu.setAttribute("class", "menu");
	menuDiv.appendChild(resetMenu);
}

function createDifficultyMenu(){
	dMenu = document.createElement("div");
	dMenu.id = "dmenu";
	dMenu.setAttribute("class", "menu");
	easy = document.createElement("div");
	easy.id = "easy";
	dMenu.appendChild(easy);
	medium = document.createElement("div");
	medium.id = "medium";
	dMenu.appendChild(medium);
	hard = document.createElement("div");
	hard.id = "hard";
	dMenu.appendChild(hard);
	return dMenu;
}

function createStatus(){
	statusDiv = document.getElementById("status");
	movesLabel = document.createElement("div");
	movesLabel.id = "moveslabel";
	movesLabel.innerHTML = "Moves:";
	statusDiv.appendChild(movesLabel);
	
	movesValue = document.createElement("div");
	movesValue.id = "movesvalue";
	movesValue.innerHTML = "0";
	statusDiv.appendChild(movesValue);
	
	status = movesValue;
}

function createGameboard(){
	gameboardDiv = document.getElementById("gameboard");
	
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
	else if (selected == this){
		// Selected the same card. Do nothing.
		return;
	}
	else{
		if(pairs[this.id] == pairs[selected.id]){
			// match made
			selected = -1;
			pairsFound++;
		}
		else{
			card1 = card;
			card2 = selected;
			selected = -1;
			setTimeout(function() {
				card1.setAttribute("class", "card pair" + pairs[card1.id]);
				card2.setAttribute("class", "card pair" + pairs[card2.id]);
			},1000);
			
		}
		moves++;
		status.innerHTML = moves;
		if(pairsFound == (numCards/2)){
			alert("You Won in " + moves + " moves!");
		}
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

