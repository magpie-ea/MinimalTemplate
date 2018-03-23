// function that shuffles the items in a list
var shuffleComb = function(comb) {
    var counter = comb.length;

    while (counter > 0) {
	let index = Math.floor(Math.random() * counter);
	counter--;

	let temp = comb[counter];
	comb[counter] = comb[index];
	comb[index] = temp;
    }

    return comb;
};
