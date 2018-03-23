// create and return an object ('data') where the experiment's info is stored
// includint a placeholder exp.out in which to store participants' responses
var initExp = function() {

    // this should ideally be read in from a separate file
    var trials_raw = [
        {question: "How are you today?", option1: "fine", option2: "great", picture: "images/question_mark_01.png"},
	{question: "What is the weather like?", option1: "shiny", option2: "rainbow", picture: "images/question_mark_02.png"},
    ];

    // this should ideally be read in from a separate file
    var practice_trials = [
        {question: "Where is your head?", option1: "here", option2: "there", picture: "images/question_mark_03.jpg"},
	{question: "What's on the bread?", option1: "jam", option2: "ham", picture: "images/question_mark_04.png"},
    ];

    var data = {
	'trials': shuffleComb(trials_raw),  // items in data.trials are shuffled randomly upon initialization 
	'practice_trials': practice_trials, // practice trials occur in the same order for all participants	
	'out': [] // mandatory field to store results in during experimental trials
    };
	
    return data;
};

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

var exp = {startDate: Date(),
	   startTime: Date.now(),
	   currentViewCounter: 0,
	   currentViewStepCounter: 0};
var config_views = {};


// navigation through the views and steps in each view;
// shows each view (in the order defined in 'config_general') for
// the given number of steps (as defined in 'config_general')
exp.findNextView = function() {
    if (this.currentViewStepCounter < config_general.viewSteps[this.currentViewCounter]) {
	this.view = window[config_general.viewFunctions[this.currentViewCounter]](this.currentViewStepCounter);
	this.currentViewStepCounter ++; 
    } else {
	this.currentViewCounter ++; 
	this.currentViewStepCounter = 0;
	this.view = window[config_general.viewFunctions[this.currentViewCounter]](this.currentViewStepCounter);
	this.currentViewStepCounter ++;
    }
};

// attaches exp.findNextView() function to all the buttons that bring
// the next view when clicked. Which view should be shown is determined by 
// the conditionals in exp.findNextView() which is located in main.js
// if the button has id='send-data' (the button in subj info template has it),
// the data is collected sent before exp.findNextView(); is called
var showNextView = function() {
    var nexts = $('.next-view');
    for (var i=0; i<nexts.length; i++){
	if (nexts[i].id === 'sends-data') {
	    nexts[i].addEventListener('click', function() {
		for (var i=0; i<exp.data.out.length; i++) {
		    exp.data.out[i].age = $('#age').val(),
		    exp.data.out[i].gender = $('#gender').val(),
		    exp.data.out[i].education = $('#education').val(),
		    exp.data.out[i].languages = $('#languages').val(),
		    exp.data.out[i].comments = $('#comments').val().trim()
		}
		exp.findNextView();
	    });
	} else {
	    nexts[i].addEventListener('click', function() {
		exp.findNextView();
	    });
	}
    }
};

// initialize the experiment
exp.init = function() {

    // initiate experiment;
    this.data = initExp();
    
    // generated the first view
    this.view = this.findNextView();

};
