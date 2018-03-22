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

	showNextView();

	return view;
};
