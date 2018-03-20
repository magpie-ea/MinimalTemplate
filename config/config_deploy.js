var config_deploy = {
	// mandatory fields - author, experiment_id, description
	"author": "Random Jane",
	"experiment_id": "MinimalTemplate",
	"description": "A minimal template for a browser-based experiment which can be deployed in several ways",
	"liveExperiment": false,
	"contact_email": "someRandomJanesEmail@randomJoesAndJanes.love",
	// submission settings
	// set "is_MTurk" to true if the experiment is run in MTurk
	"is_MTurk": false,
	// mturk's HIT submission url
	// specify the submission url if "is_MTurk" is set to true otherwise leave blank
	// the url for the sandbox and the live experiments are different (https://docs.aws.amazon.com/AWSMechTurk/latest/AWSMturkAPI/ApiReference_ExternalQuestionArticle.html)
	/*"MTurk_server": "https://workersandbox.mturk.com/mturk/externalSubmit",*/
       "MTurk_server": "https://www.mturk.com/mturk/externalSubmit"
}

