// create and return an object ('data') where the experiment's info is stored
// includint a placeholder exp.out in which to store participants' responses
var initExp = function() {
    var data = {};

    var trials_raw = [
        {question: "How are you today?", option1: "fine", option2: "great", picture: "images/question_mark_01.png"},
	{question: "What is the weather like?", option1: "shiny", option2: "rainbow", picture: "images/question_mark_02.png"},
    ];

    var practice_trials = [
        {question: "Where is your head?", option1: "here", option2: "there", picture: "images/question_mark_03.jpg"},
	{question: "What's on the bread?", option1: "jam", option2: "ham", picture: "images/question_mark_04.png"},
    ];

    data.trials = shuffleComb(trials_raw);  // items in data.trials are shuffled randomly upon initialization 
    data.practice_trials = practice_trials; // practice trials occur in the same order for all participants
    
    data.out = []; // mandatory field to store results in during experimental trials
    
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
	   startTime: Date.now()};

// exp.findNextView() handles the views
exp.findNextView = function() {
    if (this.view.name === 'intro') {
	this.view = initInstructionsView();
    } else if (this.view.name === 'instructions') {
	this.view = initPracticeView(this.data.practice_trials[this.CPT], this.CPT);
	this.CPT++;
    } else if (this.view.name === 'practice' && (this.CPT < this.TPT)) {
	this.view = initPracticeView(this.data.practice_trials[this.CPT], this.CPT);
	this.CPT++;
    } else if (this.view.name === 'practice' && this.CPT === this.TPT) {
	this.view = initBeginExpView();
    } else if (this.view.name === 'beginExp') {
	this.view = initTrialView(this.data.trials[this.CT], this.CT);
	this.CT++;
    } else if (this.view.name === 'trial' && this.CT < this.TT) {
	this.view = initTrialView(this.data.trials[this.CT], this.CT);
	this.CT++;
    } else if (this.view.name === 'trial' && this.CT === this.TT) {
	this.view = initPostTestView();
    } else if (this.view.name === 'postTest') {
	this.view = initThanksView();
    } else {
	console.log("something went wrong")
    }
};

exp.init = function() {

        // CPT - current practice trial
	this.CPT = 0;

	// CT - current trial
	this.CT = 0;

	// generates the experiment and assigns it to this.data
	this.data = initExp();
	console.log(this.data);

	// generated the view
	this.view = initIntroView();
	
	// to be done: get TT and TPT from the model, this now is a temp solution
	// TPT - total practice trials
	this.TPT = this.data.practice_trials.length;

	// TT - total trials
	this.TT = this.data.trials.length;
};

var config_views = {};


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
