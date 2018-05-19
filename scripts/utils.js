var createProgressBarChunks = function(numberOfChunks) {
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

var updateProgressBar = function() {
    var progressBars = $('.progress-bar');
    var filledPart = exp.currentTrialInViewCounter * ($('.progress-bar').width() / exp.views_seq[exp.currentViewCounter].trials);
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