import {
    intro,
    instructions,
    forcedChoice,
    begin,
    postTest,
    thanks
} from "../node_modules/babe-project/babe-views.js";

let introView = intro({
    trials: 1,
    title: "Welcome!",
    text:
        'This is a minimal (non-sense) example of a _babe experiment. More information can be found <a href="https://babe-project.github.io/babe_site/">here</a>.',
    buttonText: "Begin Experiment"
});

let instructionsView = instructions({
    trials: 1,
    title: "Instructions",
    text:
        "On each trial, you will see a question and two response options. Please select the response option you like most. We start with two practice trials.",
    buttonText: "Go to practice trial"
});

let practiceView = forcedChoice({
    trials: 2,
    trial_type: "practice",
    data: practice_trials
});

let beginExpView = begin({
    trials: 1,
    text:
        "Now that you have acquainted yourself with the procedure of the task, the actual experiment will begin."
});

let mainView = forcedChoice({
    trials: 4,
    trial_type: "main",
    data: main_trials
});

let postTestView = postTest({
    trials: 1,
    title: "Additional Info",
    text:
        "Answering the following questions is optional, but will help us understand your answers."
});

let thanksView = thanks({
    trials: 1,
    title: "Thank you for taking part in this experiment!"
});

// customize the experiment by specifying a view order and a trial structure
// specify view order
const views_seq = [
    introView,
    instructionsView,
    practiceView,
    beginExpView,
    mainView,
    postTestView,
    thanksView
];

export { views_seq };
