// initialize the experiment
exp.init = function() {

    // allocate storage room for global and trial data
    this.global_data = {};
    this.trial_data = [];

    // record current date and time
    this.global_data.startDate = Date();
    this.global_data.userAgent;
    this.global_data.startTime = Date.now();

    // specify view order
    this.views = [intro,
                  instructionsForcedChoice,
                  practiceForcedChoice,
                  beginForcedChoice,
                  mainForcedChoice,
                  instructionsSliderRating,
                  mainSliderRating,
                  postTest,
                  thanks];
    // initialize counter structure (normally you do not change this)
    this.initializeProcedure();

    // prepare information about trials (procedure)
     this.trial_info = prepareData();

    // This method uses external files instead.
//    this.trial_info = prepareDataFromCSV("files/practiceTrials.csv", "files/trials.csv");
	
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

var processTrialsData = function(rows) {
    var toReturn = [];
    var headers = rows[0];
    for (var indexTrial = 1; indexTrial < rows.length; indexTrial++) {
        var thisTrial = {};
        for (var indexKey = 0; indexKey < headers.length; indexKey++) {
            thisTrial[headers[indexKey]] = rows[indexTrial][indexKey];
        }
        toReturn.push(thisTrial);
    }
    return toReturn;
};

var prepareDataFromCSV = function(practiceTrialsFile, trialsFile) {
    var data = {
        'out': [] // mandatory field to store results in during experimental trials
    };

    // Need to use such a callback since AJAX is async.
    var addToContainer = function(container, name, results) {
        container[name] = results;
    };


    $.ajax({
        url: practiceTrialsFile,
        dataType: "text",
        success: function(file, textStatus, jqXHR) {
            addToContainer(data, "practice_trials", processTrialsData(CSV.parse(file)));
        }
    });

    $.ajax({
        url: trialsFile,
        dataType: "text",
        success: function(file, textStatus, jqXHR) {
            addToContainer(data, "trials", _.shuffle(processTrialsData(CSV.parse(file))));
        }
    });


    return data;
};

