//// data for view
//config_views.intro = {
//    // introduction title
//    "title": "Welcome!",
//    // introduction text
//    "text": "Thank you for participating in our study. In this study, you will answer questions about 24 sentences that describe images. To participate in the experiment, please first accept the HIT. By answering the following questions, you are participating in a study being performed by scientists from the Eberhard Karls University of Tübingen. You must be at least 18 years old to participate. Your participation in this research is voluntary. You may decline to answer any or all of the following questions. You may decline further participation, at any time, without adverse consequences. Your anonymity is assured; the researchers who have requested your participation will not receive any personal information about you.",
//    // introduction's slide proceeding button text
//    "buttonText": "Begin experiment"
//};
//
//
//// creates the Introduction view
//var initIntroView = function() {
//	var view = {};
//	view.name = 'intro';
//	view.template = $('#intro-view').html();
//	$('#main').html(Mustache.render(view.template, {
//	    title: config_views.intro.title,
//	    text: config_views.intro.text,
//	    button: config_views.intro.buttonText
//	}));
//
//	// moves to the next view
//    $('#next').on('click', function(e) {
//        exp.findNextView();
//    });
//
//	return view;
//};


var introView = {
	// introduction title
    "title": "Welcome!",
    // introduction text
    "text": "Thank you for participating in our study. In this study, you will answer questions about 24 sentences that describe images. To participate in the experiment, please first accept the HIT. By answering the following questions, you are participating in a study being performed by scientists from the Eberhard Karls University of Tübingen. You must be at least 18 years old to participate. Your participation in this research is voluntary. You may decline to answer any or all of the following questions. You may decline further participation, at any time, without adverse consequences. Your anonymity is assured; the researchers who have requested your participation will not receive any personal information about you.",
    // introduction's slide proceeding button text
    "buttonText": "Begin experiment",
	// render function renders the view
	render: function() {
		var view = {};
		view.name = 'intro';
		view.template = $('#intro-view').html();
		$('#main').html(Mustache.render(view.template, {
			title: this.title,
			text: this.text,
			button: this.buttonText
		}));

		// moves to the next view
		$('#next').on('click', function(e) {
			exp.findNextView();
		});

		return view;
	},
	// for how many trials should this view be repeated?
	trials: 1
}