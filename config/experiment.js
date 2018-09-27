// imports the type of views that are to be used in this experiment
import {
    intro,
    instructionsForcedChoice,
    practiceForcedChoice,
    mainForcedChoice,
    postTest,
    thanks
} from '../node_modules/babe-project/babe-views.js';

// customize the experiment by specifying a view order and a trial structure
// specify view order
const views_seq = [
    intro,
    instructionsForcedChoice,
    practiceForcedChoice,
    mainForcedChoice,
    postTest,
    thanks
];

// adds progress bars to the views listed
// view's name is the same as object's name
const progress_bar = {
    // adds progres bar to the following views
    in: [
        "practiceForcedChoice",
        "mainForcedChoice",
    ],

    // set to "chunks", "separate" or "default"
    style: "separate",

    // the width of the progress bar or a single chunk
    width: 100
};

export { views_seq, progress_bar };