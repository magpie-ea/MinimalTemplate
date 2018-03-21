// initExp() creates and returns an object ('data') where the experiment's info is stored.
// data.trials - a list of objects containing the trial info that is needed for each slide
// of the experiment.
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

    // each time initExp() is called, items in data.trials are shuffled
    data.trials = shuffleComb(trials_raw);
    // practice trials occur in the same order for all participants
    data.practice_trials = practice_trials;
    data.out = [];
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

var exp = {};

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
