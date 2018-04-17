// initialize the experiment
exp.init = function() {
	
	// allocate storage room for global and trial data
	this.global_data = {};
	this.trial_data = [];
	
    // record current date and time
    this.global_data.startDate = Date();
    this.global_data.startTime = Date.now();
	
	// specify view order
	this.views = [introView, 
				  instructionsView,
				  practiceView,
				  beginExpView,
				  mainTrialView,
				  postTestView,
				  thanksView]
	// initialize counter structure (normally you do not change this)
    this.initializeProcedure();
    
    // prepare information about trials (procedure)
    this.trial_info = prepareData();
	
	

};

// create and return an object ('data') where the experiment's info is stored
// include a placeholder exp.out in which to store participants' responses
var prepareData = function() {

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
	'trials': _.shuffle(trials_raw),  // items in data.trials are shuffled randomly upon initialization 
	'practice_trials': practice_trials, // practice trials occur in the same order for all participants	
	'out': [] // mandatory field to store results in during experimental trials
    };
	
    return data;
};


