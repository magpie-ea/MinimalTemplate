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

exp.init = function(){

	// allocate storage room for global data, trial data, and trial info
    this.global_data = {};
    this.trial_data = [];
	this.trial_info = {};

    // record current date and time
    this.global_data.startDate = Date();
    this.global_data.startTime = Date.now();

	// call user-defined costumization function
	exp.customize()

	// initialize procedure
	this.currentViewCounter = 0;
    this.currentTrialCounter = 0;
    this.currentView = this.findNextView();
}



// navigation through the views and steps in each view;
// shows each view (in the order defined in 'config_general') for
// the given number of steps (as defined in 'config_general')
exp.findNextView = function() {
    var currentView = this.views[this.currentViewCounter];
    if (this.currentTrialCounter < currentView.trials) {
        this.currentView = currentView.render(this.currentTrialCounter);
		this.currentTrialCounter ++;
    } else {
		this.currentViewCounter ++;
        var currentView = this.views[this.currentViewCounter];
        this.currentTrialCounter = 0;
        this.currentView = currentView.render(this.currentTrialCounter);
        this.currentTrialCounter ++;
    }
};

// submits the data
exp.submit = function() {
    // adds columns with NA values
    var addEmptyColumns = function(trialData) {
        var columns = [];

        for (var i=0; i<trialData.length; i++) {
            for (prop in trialData[i]) {
                if ((trialData[i].hasOwnProperty(prop)) && (columns.indexOf(prop) === -1)) {
                    columns.push(prop);
                }
            }
        }

        for (var j=0; j<trialData.length; j++) {
            for (var k=0; k<columns.length; k++) {
                if (!trialData[j].hasOwnProperty(columns[k])) {
                    trialData[j][columns[k]] = 'NA';
                }
            }
        }

        return trialData;
    };

    var formatDebugData = function(data) {
        var output = "<table>";

        var trials = data.trials;
        delete data.trials;

        var t = trials[0];

        output += "<thead><tr>";

        for (var kt in t) {
            if (t.hasOwnProperty(kt)) {
                output += "<th>" + kt + "</th>";
            }
        }

        for (var kd in data) {
            if (data.hasOwnProperty(kd)) {
                output += "<th>" + kd + "</th>";
            }
        }

        output += "</tr></thead>";

        output += "<tbody><tr>";

        for (var i = 0; i < trials.length; i++) {
            var currentTrial = trials[i];
            for (var trialKey in currentTrial) {
                if (t.hasOwnProperty(trialKey)) {
                    output += "<td>" + currentTrial[trialKey] + "</td>";
                }
            }

            for (var dataKey in data) {
                if (data.hasOwnProperty(dataKey)) {
                    output += "<td>" + data[dataKey] + "</td>";
                }
            }

            output += "</tr>";
        }

        output += "</tbody></table>";

        return output;
    };


    // construct data object for output
    var data = {
        'author': config_deploy.author,
        'experiment_id': config_deploy.experiment_id,
        'description': config_deploy.description,
        'trials': addEmptyColumns(exp.trial_data)
    };

    // add more fields depending on the deploy method
    if (config_deploy.is_MTurk) {
        var HITData = getHITData();
        // MTurk expects a key 'assignmentId' for the submission to work,
		// that is why is it not consistent with the snake case that the other keys have
        data['assignmentId'] = HITData['assignmentId'];
        data['workerId'] = HITData['workerId'];
        data['HITId'] = HITData['HITId'];
    } else if (config_deploy.deployMethod === 'Prolific') {
        console.log();
    } else if (config_deploy.deployMethod === 'directLink'){
        console.log();
    } else if (config_deploy.deployMethod === 'debug') {
        console.log();
    } else {
        console.log('no such config_deploy.deployMethod');
    }

    // merge in global data accummulated so far
    // this could be unsafe if 'exp.global_data' contains keys used in 'data'!!
    data = _.merge(exp.global_data, data);

    // parses the url to get thr assignmentId and workerId
    var getHITData = function() {
        var url = window.location.href;
        var qArray = url.split('?');
        qArray = qArray[1].split('&');
        var HITData = {};

        for (var i=0; i<qArray.length; i++) {
            HITData[qArray[i].split('=')[0]] = qArray[i].split('=')[1];
        }

        return HITData;
    };

    // if the experiment is set to live (see config.js liveExperiment)
    // the results are sent to the server
    // if it is set to false
    // the results are displayed on the thanks slide
    if (config_deploy.liveExperiment) {
        console.log('submits');
        submitResults(config_deploy.contact_email, data);
    } else {
        // hides the 'Please do not close the tab.. ' message in debug mode
		console.log(data)
        $('.warning-message').addClass('nodisplay');
        jQuery('<h3/>', {
            text: 'Debug Mode'
        }).appendTo($('.view'));
        jQuery('<div/>', {
            class: 'debug-results',
            html: formatDebugData(data)
        }).appendTo($('.view'));
    }
};
