var createProgressBar = function(numberOfChunks) {
    var view = $('.view');
    var clearfix = jQuery('<div/>', {
        class: 'clearfix'
    });
    var container = jQuery('<div/>', {
        class: 'progress-bar-container'
    });

    for (var i=0; i<numberOfChunks; i++) {
        var bar = jQuery('<div/>', {
            class: 'progress-bar'
        });
        var filled = jQuery('<span/>', {
            class: 'filled'
        });
        container.append(bar);
        bar.append(filled);
    };

    view.prepend(clearfix);
    view.prepend(container);
};

var updateProgressBar = function(numberOfChunks) {
    createProgressBar(numberOfChunks);

    var progressBars = $('.progress-bar');
    var div = $('.progress-bar').width() / exp.views_seq[exp.currentViewCounter].trials;
    var filledPart = (exp.currentTrialInViewCounter) * div;
    var filledElem = jQuery('<span/>', {
        id: 'filled'
    }).appendTo(progressBars[exp.currentProgressChunk]);
    $('#filled').css('width', filledPart);

    if (filledElem.width() === $('.progress-bar').width()) {
        exp.currentProgressChunk++;
    }

    for(var i=0; i<exp.currentProgressChunk; i++) {
        progressBars[i].style.backgroundColor = '#5187BA';
    }
};

exp.addProgressBars = function() {
    this.progressChunks = 0;
    this.currentProgressChunk = 0;

    for (var i=0; i<this.views_seq.length; i++) {
        for (var j=0; j<this.progress_bar_in.length; j++) {
            if (this.views_seq[i].name === this.progress_bar_in[j]) {
                this.progressChunks++;
                this.views_seq[i].progressBar = true;
            }
        }
    }
};