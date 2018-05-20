var createProgressBar = function() {
    var bar;
    var i;
    var view = $('.view');
    var barWidth = exp.progress_bar_width;
    var clearfix = jQuery('<div/>', {
        class: 'clearfix'
    });
    var container = jQuery('<div/>', {
        class: 'progress-bar-container'
    });
    view.css('padding-top', 30);
    view.prepend(clearfix);
    view.prepend(container);

    if (exp.progress_bar_style === 'chunks') {
        for (i=0; i<exp.progressChunks; i++) {
            bar = jQuery('<div/>', {
                class: 'progress-bar'
            });
            bar.css('width', barWidth);
            container.append(bar);
        }
    } else if (exp.progress_bar_style === 'separate') {
        bar = jQuery('<div/>', {
            class: 'progress-bar'
        });
        bar.css('width', barWidth);
        container.append(bar);
    } else if (exp.progress_bar_style === 'default') {
        bar = jQuery('<div/>', {
            class: 'progress-bar'
        });
        bar.css('width', barWidth);
        container.append(bar);
    } else {
        console.debug('exp.progress_bar_style can be set to "default", "separate" or "chunks"');
    }
};

var updateProgressBar = function() {
    createProgressBar();

    var progressBars = $('.progress-bar');
    var div, filledElem, filledPart;
    if (exp.progress_bar_style === 'default') {
        div = $('.progress-bar').width() / exp.totalProgressParts;
        filledPart = exp.progressTrials * div;
    } else {
        div = $('.progress-bar').width() / exp.views_seq[exp.currentViewCounter].trials;
        filledPart = exp.currentTrialInViewCounter * div;
    }

    filledElem = jQuery('<span/>', {
        id: 'filled'
    }).appendTo(progressBars[exp.currentProgressChunk]);
    $('#filled').css('width', filledPart);
    exp.progressTrials++;

    if (exp.progress_bar_style === 'chunks') {
        if (filledElem.width() === $('.progress-bar').width()) {
            exp.currentProgressChunk++;
        }

        for(var i=0; i<exp.currentProgressChunk; i++) {
            progressBars[i].style.backgroundColor = '#5187BA';
        }
    }
};

exp.addProgressBars = function() {
    if (exp.progress_bar_style === 'chunks' || 'separate') {
        this.progressChunks = 0;
        this.currentProgressChunk = 0;        
    }

    this.totalProgressParts = 0;
    this.progressTrials = 1;

    for (var i=0; i<this.views_seq.length; i++) {
        for (var j=0; j<this.progress_bar_in.length; j++) {
            if (this.views_seq[i].name === this.progress_bar_in[j]) {
                this.progressChunks++;
                this.totalProgressParts += this.views_seq[i].trials;
                this.views_seq[i].hasProgressBar = true;
            }
        }
    }
};