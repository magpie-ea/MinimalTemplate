# Minimal example of an online experiment

## Cloning and running the experiment

```
# clone the repo, e.g.:
git clone https://github.com/babe-project/MinimalTemplate

# go to 'MinimalTemplate'

# open 'index.html' in the browser to see the experiment
```

## Documentation

Extensive documentation is provided on the [_babe site](http://babe-project.github.io/babe_site/index.html).

## File Organisation

+ `index.html` - starting point; to be loaded in the browser; general structure; user must edit this

+ `views`/     - file with a collection of views (= block / chunk of related content) of the experiment
	+ `view.js`            - definition of how individual trials look, which data to collect etc.; main work happens here

+ `scripts`/   - files for main functionality
	+ `experiment.js`       - initializes the experiment (trial structure, input data etc.); user must customize this
	+ `main.js`             - main functionality to run experiment; usually user will not edit this
    + `helpers.js`          - helper functions specific to each particular experiment; user might edit this
	+ `submit_to_server.js` - functions to process, send or store data; user will almost never edit this

+ `config`/    - file(s) with user-supplied information
	+ `config_deploy.js`    - information about how to deploy (=run, collect data for) the experiment

+ `images`       - images shown in this experiment; optional; user usually supplies these

+ `styles/styles.css`  - style files

+ `libraries`    - external libraries

+ README.md
+ LICENSE

## What the user will usually (not) edit

The main files which must (usually) be edited to program an experiment are: 

+ `index.html`    - provide view-templates

+ `views/view.js` - define how individual trials look, which data to collect etc.

+ `scripts/experiment.js`   - define structure of the experiment (order of blocks, number of trials etc.)

+ `config/config_deploy.js` - just choose one of several options regarding what to do with the collected data


## Views & trials

A usual experiment consists of a sequence of separable parts, such as instructions, practice trials, main trials etc. These parts are called **views** in _babe, because they correspond loosely to what is visible on the screen. The user can specify any order of views, including repetitions, (this is done in `experiment.js`; see below) and any number of times (=trials) each view should be repeated.

Views are defined in `views/views.js`. Formally a view is an object. It should minimally contain the following keys: 

+ `trials` - a number specifying the number of trials the view should be repeated

+ `render` - a function which updates a view-template, defines how to react to which events and possibly records data

For example, the `intro` view of the minimal template looks like this:

```javascript
var intro = {
    // introduction title
    "title": "Welcome!",
             // introduction text
             "text": "Thank you for participating in our study. In this study, you will ...",
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
```

## Experiment

The experiment itself is realized as a Javascript object. It contains four keys that are particularly important for customizing your experiment:

+ `views` - array of view-objects in the order in which they are to occur

+ `trial_info` - any information the user may wish to specify to realize particular trials (e.g., URLs to pictures, test sentences, ...)

+ `trial_data` - data gathered from each particular trial (this is the main experimental data you collect)

+ `global_data` - data that is collected only once, such as MTurk userID, starting time, total experiment time etc.

The sequence of views is defined in `scripts/experiment.js`, for example like so:

``` javascript
// specify view order
this.views = [intro,
              instructionsForcedChoice,
              practiceForcedChoice,
              beginForcedChoice,
              mainForcedChoice,
              instructionsSliderRating,
              mainSliderRating,
              postTest,
              thanks];
```


## Configuration of deployment

The deploy configuration file `config_deploy.js` contains **information about how to deploy** (i.e., run, recruit participants & store data) an experiment. Here, we simply use the `debug` mode in which the experiment runs locally in our own browser and outputs the data collected on the last slides as one huge and unstructured blob of text. Other modes of deployment are possible.
