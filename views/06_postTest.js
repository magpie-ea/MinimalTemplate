config_views.postTest = {
    "title": "Additional Info",
    "text": "Answering the following questions is optional, but will help us understand your answers.",
    "buttonText": "Continue"
};

// creates Post-Test Questionaire View
var initPostTestView = function() {
	var view = {};
	view.name = 'postTest';
	view.template = $('#post-test-view').html();
	$('#main').html(Mustache.render(view.template, {
		title: config_views.postTest.title,
		text: config_views.postTest.text,
		buttonText: config_views.postTest.buttonText
	}));

	$('#next').on('click', function(e) {
        // prevents the form from submitting
        e.preventDefault();

        // records the post test info
        exp.data.out.age = $('#age').val();
        exp.data.out.gender = $('#gender').val();
        exp.data.out.education = $('#education').val();
        exp.data.out.languages = $('#languages').val();
        exp.data.out.comments = $('#comments').val().trim();

        // moves to the next view
        exp.findNextView();
    })

	return view;
};
