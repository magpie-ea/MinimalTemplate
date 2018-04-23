// initialize the experiment
exp.init = function() {

    // allocate storage room for global and trial data
    this.global_data = {};
    this.trial_data = [];

    // record current date and time
    this.global_data.startDate = Date();
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

    // variables `trials_raw` and `practice_trials` are defined in separate files
	// in folder `trial_info`
    
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

