// insert any functions that are useful throughout the experiment here
var shuffleComb = function(comb) {
    // while this one is trivial, this just to show that we CAN define a function here
    return _.shuffle(comb);
};

var updateProgressBar = function(CT, overall, view) {
    if (view.hasOwnProperty('updateProgress') && view.updateProgress === true) {
        console.log('updateProgress');
        var filledElem = $('#filled');
        var filled = (180 / overall) * CT;
        console.log(filled);
        console.log(CT);
        filledElem.css('width', filled);
    }
};