'use strict';

// when the DOM is created and JavaScript code can run safely,
// the experiment initialisation is called
$("document").ready(function() {
    // prevent scrolling when space is pressed
    window.onkeydown = function(e) {
        if (e.keyCode == 32 && e.target == document.body) {
            e.preventDefault();
        }
    };
});

var exp = {};
// initialize procedure
exp.currentViewCounter = 0;
exp.currentTrialCounter = 0;
exp.currentTrialInViewCounter = 0;

// to be separated in a module
var loop = function(arr, count, shuffleFlag) {
    return _.flatMapDeep(_.range(count), function(i) {
        return arr;
    });
};

var loopShuffled = function(arr, count) {
    return _.flatMapDeep(_.range(count), function(i) {
        return _.shuffle(arr);
    });
};
