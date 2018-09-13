var intro = {
    name: 'intro',
    // introduction title
    title: "Welcome!",
    // introduction text
    text: "This is a minimal (non-sense) example of a _babe experiment. More information can be found <a href='https://babe-project.github.io/babe_site/'>here</a>.",
    // introduction's slide proceeding button text
    buttonText: "Begin experiment",
    // render function renders the view
    render: function () {
        var viewTemplate = $('#intro-view').html();

        $('#main').html(Mustache.render(viewTemplate, {
            title: this.title,
            text: this.text,
            button: this.buttonText
        }));

        var prolificId = $('#prolific-id');
        var IDform = $('#prolific-id-form');
        var next = $('#next');

        var showNextBtn = function () {
            if (prolificId.val().trim() !== "") {
                next.removeClass('nodisplay');
            } else {
                next.addClass('nodisplay');
            }
        };

        if (config_deploy.deployMethod !== "Prolific") {
            IDform.addClass('nodisplay');
            next.removeClass('nodisplay');
        }

        prolificId.on('keyup', function () {
            showNextBtn();
        });

        prolificId.on('focus', function () {
            showNextBtn();
        });


        // moves to the next view
        next.on('click', function (e) {
            if (config_deploy.deployMethod === "Prolific") {
                exp.global_data.prolific_id = prolificId.val().trim();
            }

            exp.findNextView();
        });

    },
    // for how many trials should this view be repeated?
    trials: 1
};

var instructions = {
    name: 'instructions',
    title: "Instructions",
    text: "On each trial, you will see a question and two response options. Please select the response option you like most. We start with two practice trials.",
    buttonText: "Go to practice trial",

    render: function () {

        var viewTemplate = $("#instructions-view").html();
        $('#main').html(Mustache.render(viewTemplate, {
            title: this.title,
            text: this.text,
            button: this.buttonText
        }));

        // moves to the next view
        $('#next').on('click', function (e) {
            exp.findNextView();
        });

    },
    trials: 1
};

var practice = {
    name: 'practice',
    title: "Practice trial",
    render: function (CT) {

        var viewTemplate = $("#practice-view").html();
        $('#main').html(Mustache.render(viewTemplate, {
            title: this.title,
            question: exp.trial_info.practice_trials[CT].question,
            option1: exp.trial_info.practice_trials[CT].option1,
            option2: exp.trial_info.practice_trials[CT].option2,
            picture: exp.trial_info.practice_trials[CT].picture
        }));
        var startingTime = Date.now();
        // attaches an event listener to the yes / no radio inputs
        // when an input is selected a response property with a value equal to the answer is added to the trial object
        // as well as a readingTimes property with value - a list containing the reading times of each word
        $('input[name=answer]').on('change', function () {
            var RT = Date.now() - startingTime; // measure RT before anything else
            var trial_data = {
                trial_type: "practice",
                trial_number: CT + 1,
                question: exp.trial_info.practice_trials[CT].question,
                option1: exp.trial_info.practice_trials[CT].option1,
                option2: exp.trial_info.practice_trials[CT].option2,
                option_chosen: $('input[name=answer]:checked').val(),
                RT: RT
            };
            exp.trial_data.push(trial_data)
            exp.findNextView();
        });

    },
    trials: 2
};

var beginMainExp = {
    name: 'beginMainExp',
    text: "Now that you have acquainted yourself with the procedure of the task, the actual experiment will begin.",
    render: function () {

        var viewTemplate = $('#begin-exp-view').html();
        $('#main').html(Mustache.render(viewTemplate, {
            text: this.text
        }));

        // moves to the next view
        $('#next').on('click', function (e) {
            exp.findNextView();
        });

    },
    trials: 1
};

var main = {
    name: 'main',
    render: function (CT) {

        // fill variables in view-template
        var viewTemplate = $('#main-view').html();
        $('#main').html(Mustache.render(viewTemplate, {
            question: exp.trial_info.main_trials[CT].question,
            option1: exp.trial_info.main_trials[CT].option1,
            option2: exp.trial_info.main_trials[CT].option2,
            picture: exp.trial_info.main_trials[CT].picture
        }));

        //        // update the progress bar based on how many trials there are in this round
        //        var filled = exp.currentTrialInViewCounter * (180 / exp.views_seq[exp.currentViewCounter].trials);
        //        $('#filled').css('width', filled);

        // event listener for buttons; when an input is selected, the response
        // and additional information are stored in exp.trial_info
        $('input[name=answer]').on('change', function () {
            var RT = Date.now() - startingTime; // measure RT before anything else
            var trial_data = {
                trial_type: "mainForcedChoice",
                trial_number: CT + 1,
                question: exp.trial_info.main_trials[CT].question,
                option1: exp.trial_info.main_trials[CT].option1,
                option2: exp.trial_info.main_trials[CT].option2,
                option_chosen: $('input[name=answer]:checked').val(),
                RT: RT
            };
            exp.trial_data.push(trial_data);
            exp.findNextView();
        });

        // record trial starting time
        var startingTime = Date.now();

    },
    trials: 4
};

var postTest = {
    name: 'postTest',
    title: "Additional Info",
    text: "Answering the following questions is optional, but will help us understand your answers.",
    buttonText: "Continue",
    render: function () {

        var viewTemplate = $('#post-test-view').html();
        $('#main').html(Mustache.render(viewTemplate, {
            title: this.title,
            text: this.text,
            buttonText: this.buttonText
        }));

        $('#next').on('click', function (e) {
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

    },
    trials: 1
};

var thanks = {
    name: 'thanks',
    message: "Thank you for taking part in this experiment!",
    render: function () {

        var viewTemplate = $('#thanks-view').html();

        // what is seen on the screen depends on the used deploy method
        //    normally, you do not need to modify this
        if ((config_deploy.is_MTurk) || (config_deploy.deployMethod === 'directLink')) {
            // updates the fields in the hidden form with info for the MTurk's server
            $('#main').html(Mustache.render(viewTemplate, {
                thanksMessage: this.message
            }));
        } else if (config_deploy.deployMethod === 'Prolific') {

            $('main').html(Mustache.render(viewTemplate, {
                thanksMessage: this.message,
                extraMessage: "Please press the button below to confirm that you completed the experiment with Prolific<br />" + '<a href=' + config_deploy.prolificURL + ' class="prolific-url">Confirm</a>'
            }));
        } else if (config_deploy.deployMethod === 'debug') {
            $('main').html(Mustache.render(viewTemplate, {}));
        } else {
            console.log('no such config_deploy.deployMethod');
        }

        exp.submit();

    },
    trials: 1
};