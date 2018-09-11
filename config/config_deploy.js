var config_deploy = {

    // obligatory fields

    // the experimentID is needed to recover data from the _babe server app
    // you receive the experimentID when you create the experiment using the _babe server app
    "experimentID": "8",
    // if you use the _babe server app, specify its URL here
    "serverAppURL": "https://babe-backend.herokuapp.com/api/submit_experiment/",

    // set deployment method; use one of:
    //'debug', 'localServer', 'MTurk', 
    // 'MTurkSandbox', 'Prolific', 'directLink'
    "deployMethod": "debug",

    // optional fields
    // set the prolific code if the deploy method is "Prolific"
    // more information at https://github.com/babe-project/ProlificDeployTemplate
    "prolificCode": "Z47M3IVO",

    // who to contact in case of trouble
    "contact_email": "YOUREMAIL@wherelifeisgreat.you"
};
