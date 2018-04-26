var config_deploy = {
    
    // obligatory fields
	
    // needed to recover data from server app
    "author": "RandomJane",
    // needed to recover data from server app
    "experiment_id": "MinimalTemplateDEMO", 
    "description": "A minimal template for a browser-based experiment",

    // set deployment method; use one of:
    //'debug', 'localServer', 'MTurk', 
    // 'MTurkSandbox', 'Prolific', 'directLink'
    "deployMethod" : "debug", 
    
    // optional fields
    
    // who to contact in case of trouble
    "contact_email": "YOUREMAIL@wherelifeisgreat.you", 
};

// user does not (should not) change the following information

// checks the config _deploy.deployMethod is MTurk or MTurkSandbox,
// sets the submission url to MTukr's servers
config_deploy.MTurk_server = config_deploy.deployMethod == "MTurkSandbox" ?
    "https://workersandbox.mturk.com/mturk/externalSubmit" : // URL for MTurk sandbox
    config_deploy.deployMethod == 'MTurk' ?
    "https://www.mturk.com/mturk/externalSubmit" : // URL for live HITs on MTurk
    ""; // blank if deployment is not via MTurk
// if the config_deploy.deployMethod is not debug, then liveExperiment is true
config_deploy.liveExperiment = config_deploy.deployMethod !== "debug";
config_deploy.prolificCode = '9BTAOPQD';
config_deploy.is_MTurk = config_deploy.MTurk_server !== "";
console.log("deployMethod: " + config_deploy.deployMethod);
console.log("live experiment: " + config_deploy.liveExperiment);
console.log("runs on MTurk: " + config_deploy.is_MTurk);
console.log("MTurk server: " + config_deploy.MTurk_server);



   