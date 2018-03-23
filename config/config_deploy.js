// user enters information about deployment method here
var config_deploy = {
    
    // obligatory fields
    "author": "Random Jane",  // needed to recover data from server app
    "experiment_id": "MinimalTemplate", // needed to recover data from server app
    "description": "A minimal template for a browser-based experiment which can be deployed in several ways",
    "deployMethod" : 'debug', // set deployment method; use one of 'debug', 'localServer', 'MTurk', 'MTurkSandbox', 'Prolific',
    
    // optional fields
    "contact_email": "someRandomJanesEmail@randomJoesAndJanes.love", // who to contact in case of trouble

}

// user does not (should not) change the following information

config_deploy.MTurk_server = config_deploy.deployMethod == 'MTurkSandbox' ?
    "https://workersandbox.mturk.com/mturk/externalSubmit" : // URL for MTurk sandbox
    config_deploy.deployMethod == 'MTurk' ?
    "https://www.mturk.com/mturk/externalSubmit" : // URL for live HITs on MTurk
    ""; // blank if deployment is not via MTurk
config_deploy.liveExperiment = config_deploy.deployMethod != "debug";
config_deploy.is_MTurk = config_deploy.MTurk_server == "";
