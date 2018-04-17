//config_views.postTest = {
//    "title": "Additional Info",
//    "text": "Answering the following questions is optional, but will help us understand your answers.",
//    "buttonText": "Continue"
//};
//
//// creates Post-Test Questionaire View
//var initPostTestView = function() {
//	var view = {};
//	view.name = 'postTest';
//	view.template = $('#post-test-view').html();
//	$('#main').html(Mustache.render(view.template, {
//		title: config_views.postTest.title,
//		text: config_views.postTest.text,
//		buttonText: config_views.postTest.buttonText
//	}));
//
//	$('#next').on('click', function(e) {
//        // prevents the form from submitting
//        e.preventDefault();
//
//        // records the post test info
//        exp.global_data.age = $('#age').val();
//        exp.global_data.gender = $('#gender').val();
//        exp.global_data.education = $('#education').val();
//        exp.global_data.languages = $('#languages').val();
//        exp.global_data.comments = $('#comments').val().trim();
//
//        // moves to the next view
//        exp.findNextView();
//    })
//
//	return view;
//};

var postTestView = {
	"title": "Additional Info",
    "text": "Answering the following questions is optional, but will help us understand your answers.",
    "buttonText": "Continue",
	render : function() {
		var view = {};
		view.name = 'postTest';
		view.template = $('#post-test-view').html();
		$('#main').html(Mustache.render(view.template, {
			title: this.title,
			text: this.text,
			buttonText: this.buttonText
		}));

		$('#next').on('click', function(e) {
			// prevents the form from submitting
			e.preventDefault();

			// records the post test info
			exp.global_data.age = $('#age').val();
			exp.global_data.gender = $('#gender').val();
			exp.global_data.education = $('#education').val();
			exp.global_data.languages = $('#languages').val();
			exp.global_data.comments = $('#comments').val().trim();

			// moves to the next view
			exp.findNextView();
		})

		return view;
	},
	trials: 1
}