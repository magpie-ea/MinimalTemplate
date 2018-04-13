// when the DOM is created and JavaScript code can run safely,
// the experiment initialisation is called
$('document').ready(function() {	
    exp.init();
    // prevent scrolling when space is pressed (firefox does it)
    window.onkeydown = function(e) {
	if (e.keyCode == 32 && e.target == document.body) {
	    e.preventDefault();
	}
    };
});

// empty shells for 'exp' and 'config_views' objects;
// to be filled with life later
var exp = {};
var config_views = {};


// navigation through the views and steps in each view;
// shows each view (in the order defined in 'config_general') for
// the given number of steps (as defined in 'config_general')
exp.findNextView = function() {
    if (this.currentTrialCounter < config_general.viewSteps[this.currentViewCounter]) {
	this.view = window[config_general.viewFunctions[this.currentViewCounter]](this.currentTrialCounter);
	this.currentTrialCounter ++; 
    } else {
	this.currentViewCounter ++; 
	this.currentTrialCounter = 0;
	this.view = window[config_general.viewFunctions[this.currentViewCounter]](this.currentTrialCounter);
	this.currentTrialCounter ++;
    }
};

// attaches exp.findNextView() function to all the buttons that bring
// the next view when clicked. Which view should be shown is determined by 
// the conditionals in exp.findNextView() which is located in main.js
// if the button has id='send-data' (the button in subj info template has it),
// the data is collected sent before exp.findNextView(); is called
//var showNextView = function() {
//    var nexts = $('.next-view');
//    for (var i=0; i<nexts.length; i++){
//	if (nexts[i].id === 'sends-data') {
//	    nexts[i].addEventListener('click', function() {
//		for (var i=0; i<exp.data.out.length; i++) {
//		    exp.data.out[i].age = $('#age').val(),
//		    exp.data.out[i].gender = $('#gender').val(),
//		    exp.data.out[i].education = $('#education').val(),
//		    exp.data.out[i].languages = $('#languages').val(),
//		    exp.data.out[i].comments = $('#comments').val().trim()
//		}
//		exp.findNextView();
//	    });
//	} else {
//	    nexts[i].addEventListener('click', function() {
//		exp.findNextView();
//	    });
//	}
//    }
//};
