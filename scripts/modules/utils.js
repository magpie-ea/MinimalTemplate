import { customize } from './experiment.js';

let views_seq = _.flatten(customize.views_seq);
let progressBar = {};
let totalProgressParts = 0;
let progressTrials = 0;
// customize.progress_bar_style is "chunks" or "separate" {
let totalProgressChunks = 0;
let filledChunks = 0;
let fillChunk = false;

// adds progress bar(s) to the specified experiment.js
(function() {    
    views_seq.map(view => {
        for (let j = 0; j < customize.progress_bar_in.length; j++) {
            if (view.name === customize.progress_bar_in[j]) {
                totalProgressChunks++;
                totalProgressParts += view.trials;
                view.hasProgressBar = true;
            }
        }
    })
})();

// creates progress bar element(s) and add(s) it(them) to the view
let addToDOM = function() {
    var bar;
    var i;
    var view = $(".view");
    var barWidth = customize.progress_bar_width;
    var clearfix = jQuery("<div/>", {
        class: "clearfix"
    });
    var container = jQuery("<div/>", {
        class: "progress-bar-container"
    });
    view.css("padding-top", 30);
    view.prepend(clearfix);
    view.prepend(container);

    if (customize.progress_bar_style === "chunks") {
        for (i = 0; i < totalProgressChunks; i++) {
            bar = jQuery("<div/>", {
                class: "progress-bar"
            });
            bar.css("width", barWidth);
            container.append(bar);
        }
    } else if (customize.progress_bar_style === "separate") {
        bar = jQuery("<div/>", {
            class: "progress-bar"
        });
        bar.css("width", barWidth);
        container.append(bar);
    } else if (customize.progress_bar_style === "default") {
        bar = jQuery("<div/>", {
            class: "progress-bar"
        });
        bar.css("width", barWidth);
        container.append(bar);
    } else {
        console.debug(
            'customize.progress_bar_style can be set to "default", "separate" or "chunks"'
        );
    }
};

// updates the progress of the progress bar
// creates a new progress bar(s) for each view that has it and updates it
let updateProgress = function() {
    addToDOM();

    var progressBars = $(".progress-bar");
    var div, filledElem, filledPart;

    if (customize.progress_bar_style === "default") {
        div = $(".progress-bar").width() / totalProgressParts;
        filledPart = progressTrials * div;
    } else {
        div = $(".progress-bar").width() / customize.views_seq[customize.currentViewCounter].trials;
        filledPart = (customize.currentTrialInViewCounter - 1) * div;
    }

    filledElem = jQuery("<span/>", {
        id: "filled"
    }).appendTo(progressBars[filledChunks]);

    $("#filled").css("width", filledPart);
    progressTrials++;

    if (customize.progress_bar_style === "chunks") {
        if (fillChunk === true) {
            filledChunks++;
            fillChunk = false;
        }

        if (filledElem.width() === $(".progress-bar").width() - div) {
            fillChunk = true;
        }

        for (var i = 0; i < filledChunks; i++) {
            progressBars[i].style.backgroundColor = "#5187BA";
        }
    }
};

// only updateProgress and views_seq are supposed to be used in the other files
export { updateProgress, views_seq };
