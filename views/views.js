var intro = {
    // introduction title
    "title": "Welcome!",
    // introduction text
    "text": "Thank you for participating in our study. In this study, you will ...",
    // introduction's slide proceeding button text
    "buttonText": "Begin experiment",
    // render function renders the view
    render: function() {
        var view = {};
        view.name = 'intro';
        view.template = $('#intro-view').html();
        $('#main').html(Mustache.render(view.template, {
            title: this.title,
            text: this.text,
            button: this.buttonText
        }));

        // moves to the next view
        $('#next').on('click', function(e) {
            exp.findNextView();
        });

        return view;
    },
    // for how many trials should this view be repeated?
    trials: 1
}

var instructions = {
     // instruction's title
    "title": "Instructions",
    // instruction's text
    "text": "On each trial, you will see a question and two response options. Please select the response option you like most. We start with two practice trials.",
    // instuction's slide proceeding button text
    "buttonText": "Go to practice trial",
    render: function() {
        var view = {};
        view.name = 'instructions';
        view.template = $("#instructions-view").html();
        $('#main').html(Mustache.render(view.template, {
            title: this.title,
            text: this.text,
            button: this.buttonText
        }));

        // moves to the next view
        $('#next').on('click', function(e) {
            exp.findNextView();
        }); 

        return view;
    },
    trials: 1
}

var practice = {
    "title": "Practice trial",
    render: function (CT) {
        var view = {};
        view.name = 'practice',
        view.template = $('#practice-view').html();
        $('#main').html(Mustache.render(view.template, {
        title: this.title,
        question: exp.trial_info.practice_trials[CT].question,
        option1: exp.trial_info.practice_trials[CT].option1,
        option2: exp.trial_info.practice_trials[CT].option2,
        picture: exp.trial_info.practice_trials[CT].picture
        }));
        startingTime = Date.now();
        // attaches an event listener to the yes / no radio inputs
        // when an input is selected a response property with a value equal to the answer is added to the trial object
        // as well as a readingTimes property with value - a list containing the reading times of each word
        $('input[name=answer]').on('change', function() {
            RT = Date.now() - startingTime; // measure RT before anything else
            trial_data = {
                trial_type: "practice",
                trial_number: CT+1,
                question: exp.trial_info.practice_trials[CT].question,
                option1: exp.trial_info.practice_trials[CT].option1,
                option2: exp.trial_info.practice_trials[CT].option2,
                option_chosen: $('input[name=answer]:checked').val(),
                RT: RT
            };
            exp.trial_data.push(trial_data)
            exp.findNextView();
        });

        return view;
    },
    trials: 2
}

var beginMainExp = {
    "text": "Now that you have acquainted yourself with the procedure of the task, the actual experiment will begin.",
    render: function() {
        var view = {};
        view.name = 'beginExp';
        view.template = $('#begin-exp-view').html();
        $('#main').html(Mustache.render(view.template, {
            text: this.text
        }));

        // moves to the next view
        $('#next').on('click', function(e) {
            exp.findNextView();
        });

        return view;
    },
    trials: 1
}

var main = {
    render : function(CT) {
        var view = {};
        // what part of the progress bar is filled
        var filled = CT * (180 / exp.views[exp.currentViewCounter].trials);
        view.name = 'trial',
        view.template = $('#trial-view-buttons-response').html();
        view.response = $('#response').html();
        $('#main').html(Mustache.render(view.template, {
            question: exp.trial_info.trials.forcedChoice[CT].question,
            option1: exp.trial_info.trials.forcedChoice[CT].option1,
            option2: exp.trial_info.trials.forcedChoice[CT].option2,
            picture: exp.trial_info.trials.forcedChoice[CT].picture
        }));
        startingTime = Date.now();
        // updates the progress bar
        $('#filled').css('width', filled);

        // attaches an event listener to the yes / no radio inputs
        // when an input is selected a response property with a value equal
        // to the answer is added to the trial object
        // as well as a readingTimes property with value 
        $('input[name=answer]').on('change', function() {
            RT = Date.now() - startingTime; // measure RT before anything else
            trial_data = {
                trial_type: "mainForcedChoice",
                trial_number: CT+1,
                question: exp.trial_info.trials.forcedChoice[CT].question,
                option1: exp.trial_info.trials.forcedChoice[CT].option1,
                option2: exp.trial_info.trials.forcedChoice[CT].option2,
                option_chosen: $('input[name=answer]:checked').val(),
                RT: RT
            };
            exp.trial_data.push(trial_data);
            exp.findNextView();
        });

        return view;
    },
    trials: 2
};

var postTest = {
    "title": "Additional Info",
    "text": "Answering the following questions is optional, but will help us understand your answers.",
    "buttonText": "Continue",
    render : function() {
        var view = {};
        view.name = 'postTest';
        view.template = $('#post-test-view').html();
        $('#main').html(Mustache.render(view.template, {
            title: this.title,
            text: this.text,
            buttonText: this.buttonText
        }));

        $('#next').on('click', function(e) {
            // prevents the form from submitting
            e.preventDefault();

            // records the post test info
            exp.global_data.age = $('#age').val();
            exp.global_data.gender = $('#gender').val();
            exp.global_data.education = $('#education').val();
            exp.global_data.languages = $('#languages').val();
            exp.global_data.comments = $('#comments').val().trim();
            exp.global_data.endTime = Date.now();
            exp.global_data.timeSpent = (exp.global_data.endTime - exp.global_data.startTime) / 60000;

            // moves to the next view
            exp.findNextView();
        })

        return view;
    },
    trials: 1
};

var thanks = {
    "message": "Thank you for taking part in this experiment!",
    render: function() {
        var view = {};
        view.name = 'thanks';
        view.template = $('#thanks-view').html();

//        // construct data object for output
//        var data = {
//        'author': config_deploy.author,
//        'experiment_id': config_deploy.experiment_id,
//        'description': config_deploy.description,
//        'startDateTime': exp.startDate,
//        'total_exp_time_minutes': (Date.now() - exp.global_data.startTime) / 60000,
//        'trials': exp.trial_data
//        // 'worker_id': HITData['workerId'],
//        // 'assignmentId': HITData['assignmentId'],
//        // 'HIT_id': HITData['hitId']
//        };
//
//        // merge in global data accummulated so far
//        // this could be unsafe if 'exp.global_data' contains keys used in 'data'!!
//        data = _.merge(exp.global_data, data)

        // what is seen on the screen depends on the used deploy method
		//    normally, you do not need to modify this
        if ((config_deploy.is_MTurk) || (config_deploy.deployMethod === 'directLink')) {
            // updates the fields in the hidden form with info for the MTurk's server
            $('#main').html(Mustache.render(view.template, {
                thanksMessage: this.message,
            }));
        } else if (config_deploy.deployMethod === 'Prolific') {
            var prolificURL = 'https://prolific.ac/submissions/complete?cc=' + config_deploy.prolificCode;

            $('main').html(Mustache.render(view.template, {
                thanksMessage: this.message,
                extraMessage: "Please press the button below<br />" + '<a href=' + prolificURL +  ' class="prolific-url">Finished!</a>'
            }));
        } else if (config_deploy.deployMethod === 'debug') {
            $('main').html(Mustache.render(view.template, {}));
        } else {
            console.log('no such config_deploy.deployMethod');
        }

        exp.submit();

        return view;
    },
    trials: 1
}