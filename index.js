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

var _babe = {
    // initialize procedure
    currentViewCounter: 0,
    currentTrialCounter: 0,
    currentTrialInViewCounter: 0,
    global_data: {
        startDate: Date(),
        startTime: Date.now()
    },
    trial_data: []
};