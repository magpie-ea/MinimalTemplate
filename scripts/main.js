// when the DOM is created and JavaScript code can run safely,
// the experiment initialisation is called
$('document').ready(function() {	
    exp.init();
    // prevent scrolling when space is pressed (firefox does it)
    window.onkeydown = function(e) {
	if (e.keyCode == 32 && e.target == document.body) {
	    e.preventDefault();
	}
    };
});

// empty shells for 'exp' and 'config_views' objects;
// to be filled with life later
var exp = {};
var config_views = {};

exp.initializeProcedure = function(){
	// initialize counters and generate first view
    this.currentViewCounter = 0;
    this.currentTrialCounter = 0;
    this.currentView = this.findNextView();
}


// navigation through the views and steps in each view;
// shows each view (in the order defined in 'config_general') for
// the given number of steps (as defined in 'config_general')
exp.findNextView = function() {
	var currentView = this.views[this.currentViewCounter];
    if (this.currentTrialCounter < currentView.trials) {
		this.currentView = currentView.render(this.currentTrialCounter);
		this.currentTrialCounter ++; 
    } else {
		this.currentViewCounter ++; 
		var currentView = this.views[this.currentViewCounter];
		this.currentTrialCounter = 0;
		this.currentView = currentView.render(this.currentTrialCounter);
		this.currentTrialCounter ++;
    }
};
exp.findNextViewOLD = function() {
    if (this.currentTrialCounter < config_general.viewSteps[this.currentViewCounter]) {
	this.currentView = window[config_general.viewFunctions[this.currentViewCounter]](this.currentTrialCounter);
	this.currentTrialCounter ++; 
    } else {
	this.currentViewCounter ++; 
	this.currentTrialCounter = 0;
	this.currentView = window[config_general.viewFunctions[this.currentViewCounter]](this.currentTrialCounter);
	this.currentTrialCounter ++;
    }
};


