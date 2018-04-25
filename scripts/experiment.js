// customize the experiment by specifying a view order and a trial structure
exp.customize = function() {

    // specify view order
    this.views = [intro,
//                  instructions,
//                  practice,
//                  beginMainExp,
                  main,
                  postTest,
                  thanks];

    // prepare information about trials (procedure)
    this.trial_info.main_trials = _.shuffle(main_trials)
	this.trial_info.practice_trials = _.shuffle(practice_trials)
	
};



