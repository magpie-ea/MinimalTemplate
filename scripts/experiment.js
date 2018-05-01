// customize the experiment by specifying a view order and a trial structure
exp.customize = function() {

	// record current date and time in global_data
    this.global_data.startDate = Date();
    this.global_data.startTime = Date.now();
	
    // specify view order
    this.views_seq = [intro, 
					 instructions,
                     practice,
                     beginMainExp,
					 main,
                     postTest,
                     thanks];
	
    // prepare information about trials (procedure)
	// randomize main trial order, but keep practice trial order fixed
    this.trial_info.main_trials = _.shuffle(main_trials.concat(practice_trials))
	this.trial_info.practice_trials = practice_trials
	
};



