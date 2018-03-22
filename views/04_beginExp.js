config_views.beginExp = {
    "text": "Now that you have acquainted yourself with the procedure of the task, the actual experiment will begin."
};

// creates Begin experiment view
var initBeginExpView = function() {
	var view = {};
	view.name = 'beginExp';
	view.template = $('#begin-exp-view').html();
	$('#main').html(Mustache.render(view.template, {
		text: config_views.beginExp.text
	}));

	showNextView();

	return view;
};
