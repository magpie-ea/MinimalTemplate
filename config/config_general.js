var config_general = {

    // obligatory settings for any experiment
    'viewFunctions': ['initIntroView',
		      'initInstructionsView',
		      'initPracticeView',
		      'initBeginExpView',
		      'initTrialView',
		      'initPostTestView',
		      'initThanksView' ], // the order in which views are shown during the experiment
    'viewSteps': [1,1,2,1,2,1,1], // how many steps (slides/trials/...) belong to each view

    // optional settings specific to this experiment
    "expSettings": {
	'maxim': "have fun" // this is not used anywhere in this template
	},
}
