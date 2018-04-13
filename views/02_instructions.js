config_views.instructions = {
    // instruction's title
    "title": "Instructions",
    // instruction's text
    "text": "On each trial, you will see a question and two response options. Please select the response option you like most. We start with two practice trials.",
    // instuction's slide proceeding button text
    "buttonText": "Go to practice trial"
};

// creates Instruction view
var initInstructionsView = function() {
	var view = {};
	view.name = 'instructions';
	view.template = $("#instructions-view").html();
	$('#main').html(Mustache.render(view.template, {
		title: config_views.instructions.title,
		text: config_views.instructions.text,
		button: config_views.instructions.buttonText
	}));

    // moves to the next view
    $('#next').on('click', function(e) {
        exp.findNextView();
    });	

	return view;
};
