import { updateProgress, views_seq } from './modules/utils.js';
import { customize } from './modules/experiment.js';
import { config_deploy } from '../config/config_deploy.js';

const config = {};
// user does not (should not) change the following information
// checks the config _deploy.deployMethod is MTurk or MTurkSandbox,
// sets the submission url to MTukr's servers
config.MTurk_server =
    config_deploy.deployMethod == "MTurkSandbox"
        ? "https://workersandbox.mturk.com/mturk/externalSubmit" // URL for MTurk sandbox
        : config_deploy.deployMethod == "MTurk"
            ? "https://www.mturk.com/mturk/externalSubmit" // URL for live HITs on MTurk
            : ""; // blank if deployment is not via MTurk
// if the config_deploy.deployMethod is not debug, then liveExperiment is true
config.liveExperiment = config_deploy.deployMethod !== "debug";
config.is_MTurk = config_deploy.MTurk_server !== "";
config.submissionURL =
    config_deploy.deployMethod == "localServer"
        ? "http://localhost:4000/api/submit_experiment/" +
          config_deploy.experimentID
        : config_deploy.serverAppURL + config_deploy.experimentID;
console.log("deployMethod: " + config_deploy.deployMethod);
console.log("live experiment: " + config.liveExperiment);
console.log("runs on MTurk: " + config.is_MTurk);
console.log("MTurk server: " + config.MTurk_server);

// insert a Current Trial (CT) counter for each view
_.map(views_seq, function(view) {
         view.CT = 0;
});

// create global data where ... is stored
exp.global_data = {
    startDate: Date(),
    startTime: Date.now()
};
// prepare information about trials (procedure)
// randomize main trial order, but keep practice trial order fixed
exp.trial_info = {
    main_trials: _.shuffle(
        main_trials.concat(practice_trials)
    ),
    practice_trials: practice_trials    
}
// the data from the participants is collected here
exp.trial_data = [];

// navigation through the views and steps in each view;
// shows each view (in the order defined in 'modules/experiment.js') for
// the given number of steps (as defined in the view's 'trial' property)
exp.findNextView = function() {
    let currentView = views_seq[exp.currentViewCounter];
    if (exp.currentTrialInViewCounter < currentView.trials) {
        currentView.render(currentView.CT, exp.currentTrialInViewCounter);
    } else {
        exp.currentViewCounter++;
        currentView = views_seq[exp.currentViewCounter];
        exp.currentTrialInViewCounter = 0;
        currentView.render(currentView.CT);
    }
    // increment counter for how many trials we have seen of THIS view during THIS occurrence of it
    exp.currentTrialInViewCounter++;
    // increment counter for how many trials we have seen in the whole experiment
    exp.currentTrialCounter++;
    // increment counter for how many trials we have seen of THIS view during the whole experiment
    currentView.CT++;
    // updates the progress bar if the view has one
    if (currentView.hasProgressBar) {
        updateProgress();
    }

    return currentView;
};

exp.currentView = exp.findNextView();

// exports

// submits the data
exp.submit = function() {
    // adds columns with NA values
    var addEmptyColumns = function(trialData) {
        var columns = [];

        for (var i = 0; i < trialData.length; i++) {
            for (var prop in trialData[i]) {
                if (
                    trialData[i].hasOwnProperty(prop) &&
                    columns.indexOf(prop) === -1
                ) {
                    columns.push(prop);
                }
            }
        }

        for (var j = 0; j < trialData.length; j++) {
            for (var k = 0; k < columns.length; k++) {
                if (!trialData[j].hasOwnProperty(columns[k])) {
                    trialData[j][columns[k]] = "NA";
                }
            }
        }

        return trialData;
    };

    var formatDebugData = function(flattenedData) {
        var output = "<table id = 'debugresults'>";

        var t = flattenedData[0];

        output += "<thead><tr>";

        for (var key in t) {
            if (t.hasOwnProperty(key)) {
                output += "<th>" + key + "</th>";
            }
        }

        output += "</tr></thead>";

        output += "<tbody><tr>";

        var entry = "";

        for (var i = 0; i < flattenedData.length; i++) {
            var currentTrial = flattenedData[i];
            for (var k in t) {
                if (currentTrial.hasOwnProperty(k)) {
                    entry = String(currentTrial[k]);
                    output += "<td>" + entry.replace(/ /g, "&nbsp;") + "</td>";
                }
            }

            output += "</tr>";
        }

        output += "</tbody></table>";

        return output;
    };

    var flattenData = function(data) {
        var trials = data.trials;
        delete data.trials;

        // The easiest way to avoid name clash is just to check the keys one by one and rename them if necessary.
        // Though I think it's also the user's responsibility to avoid such scenarios...
        var sample_trial = trials[0];
        for (var trial_key in sample_trial) {
            if (sample_trial.hasOwnProperty(trial_key)) {
                if (data.hasOwnProperty(trial_key)) {
                    // Much easier to just operate it once on the data, since if we also want to operate on the trials we'd need to loop through each one of them.
                    var new_data_key = "glb_" + trial_key;
                    data[new_data_key] = data[trial_key];
                    delete data[trial_key];
                }
            }
        }

        var out = _.map(trials, function(t) {
            // Here the data is the general informatoin besides the trials.
            return _.merge(t, data);
        });
        return out;
    };

    // construct data object for output
    var data = {
        experiment_id: config_deploy.experimentID,
        trials: addEmptyColumns(exp.trial_data)
    };

    // parses the url to get the assignmentId and workerId
    var getHITData = function() {
        var url = window.location.href;
        var qArray = url.split("?");
        qArray = qArray[1].split("&");
        var HITData = {};

        for (var i = 0; i < qArray.length; i++) {
            HITData[qArray[i].split("=")[0]] = qArray[i].split("=")[1];
        }

        console.log(HITData);
        return HITData;
    };

    // add more fields depending on the deploy method
    if (config_deploy.is_MTurk) {
        var HITData = getHITData();
        data["assignment_id"] = HITData["assignmentId"];
        data["worker_id"] = HITData["workerId"];
        data["hit_id"] = HITData["hitId"];

        // creates a form with assignmentId input for the submission ot MTurk
        var form = jQuery("<form/>", {
            id: "mturk-submission-form",
            action: config_deploy.MTurk_server
        }).appendTo(".thanks-templ");
        var dataForMTurk = jQuery("<input/>", {
            type: "hidden",
            name: "data",
            value: JSON.stringify(data)
        }).appendTo(form);
        // MTurk expects a key 'assignmentId' for the submission to work,
        // that is why is it not consistent with the snake case that the other keys have
        var assignmentId = jQuery("<input/>", {
            type: "hidden",
            name: "assignmentId",
            value: HITData["assignmentId"]
        }).appendTo(form);
    } else if (config_deploy.deployMethod === "Prolific") {
        console.log();
    } else if (config_deploy.deployMethod === "directLink") {
        console.log();
    } else if (config_deploy.deployMethod === "debug") {
        console.log();
    } else {
        console.log("no such config_deploy.deployMethod");
    }

    // merge in global data accummulated so far
    // this could be unsafe if 'exp.global_data' contains keys used in 'data'!!
    data = _.merge(exp.global_data, data);

    // if the experiment is set to live (see config.js liveExperiment)
    // the results are sent to the server
    // if it is set to false
    // the results are displayed on the thanks slide
    if (config_deploy.liveExperiment) {
        console.log("submits");
        //submitResults(config_deploy.contact_email, config_deploy.submissionURL, data);
        submitResults(
            config_deploy.contact_email,
            config_deploy.submissionURL,
            flattenData(data)
        );
    } else {
        // hides the 'Please do not close the tab.. ' message in debug mode
        console.log(data);
        var flattenedData = flattenData(data);
        $(".warning-message").addClass("nodisplay");
        jQuery("<h3/>", {
            text: "Debug Mode"
        }).appendTo($(".view"));
        jQuery("<div/>", {
            class: "debug-results",
            html: formatDebugData(flattenedData)
        }).appendTo($(".view"));
        createCSVForDownload(flattenedData);
    }
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
