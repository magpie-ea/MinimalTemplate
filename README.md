# Minimal example of an online experiment

## Cloning and running the experiment

```
# cloning
git clone https://github.com/babe-project/MinimalTemplate

# running
cd MinimalTemplate

# open index.html in the browser to see the experiment
```

## File Organisation

+ `index.html` - starting point; to be loaded in the browser; general structure; user must edit this

+ `views`/     - file with a collection of views (= block / chunk of related content) of the experiment
	+ `view.js`            - definition of how individual trials look, which data to collect etc.; main work happens here

+ `scripts`/   - files for main functionality
	+ `experiment.js`       - initializes the experiment (trial structure, input data etc.); user must customize this
	+ `main.js`             - main functionality to run experiment; usually user will not edit this
    + `helpers.js`          - helper functions specific to each particular experiment; user might edit this
	+ `submit_to_server.js` - helper functions specific to each particular experiment; user will almost never edit this

+ `config`/    - file(s) with user-supplied information
	+ `config_deploy.js`    - information about how to deploy (=run, collect data for) the experiment
   
+ `images`       - images shown in this experiment; optional; user usually supplies these

+ `styles/styles.css`  - style files

+ `libraries`    - external libraries

+ README.md
+ LISENCE

## What the user will usually (not) edit

The main files which **must** (usually) be edited to program an experiment are: 

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


Views are the different blocks that comprise the experiment. The user will usually want specify a sequence of views as separate parts of the experiment (instructions, then practice trials, then main trials etc.). This is done in `scripts/experiment.js`

The sequence of views and how many slides/clicks/transitions each block is supposed to have are defined in `config_general.js`.

In this experiment, the view sequence is:

introduction -> instructions -> practice (2 trials) -> begin experiment announcement -> main (2 trials) -> post-test questions -> thanks


1. **Introduction view:**

	+ role: contains general information about the experiment
	+ elements: *title*, *text* and *next button*
	+ code: 
	+ displayed: once
	+ *next button* brings Instructions view


2. **Instruction view:**

	+ role: gives instructions about the experiment
	+ elements: *title*, *text* and *next button*.
	+ code:
	+ displayed: once
	+ *next button* brings Practice Trial view


3. **Practice Trial view:**

	+ role: shows an example/s of trial/s, does not record the reading times and response
	+ elements: *image*, *sentence*, *response buttons*
	+ code: 
	+ displayed: as many times as the number of trials
	+ next: *response buttons* (choosing a response) bring either Practice Trial again or Begin Experiment view


4. **Begin Experiment view:**

	+ role: informs the partipant the real experiment is about to begin
	+ elements: *text* and *next button*
	+ code:
	+ displayed: once
	+ next: *next button* brings Trial view


5. **Trial view:**
	
	+ role: shows a single trial, collects the reading times and response
	+ elements: *progress bar*, *image*, *sentence*, *response buttons*
	+ code: index.html lines ..; js/views.js lines ..
	+ displayed: as many times as the number of trials
	+ next: *response buttons* (choosing a respone) bring either Trial view or Subject Info view


6. **Post-test questionare view:**

	+ role: contains a questionnaire for collecting extra information about the participant
	+ elements: *question fields*, *next button*
	+ code:
	+ displayed: once
	+ next: *next button* brings Thanks view


7. **Thanks view:**

	+ role: displays a thank you message and makes an ajax request with the results
	+ elements: *text*
	+ code:
	+ displayed: once



## Configuration

### The `config_XXX.js` files

There are two configuration files. `config_deploy.js` contains **information about how to deploy** (i.e., run, recruit participants & store data) an experiment. Here, we simply use the `debug` mode in which the experiment runs locally in our own browser and outputs the data collected on the last slides as one huge and unstructured blob of text. Other modes of deployment are possible. (Documentation pending.)

The file `config_general.js` contains necessary **information about the experiment's structure**. It defines the sequence in which different views (blocks, units, ...) are to be displayed and how many times (e.g., trials) each view consists of.

Each configuration file contains mandatory and optional fields. The fields are explained as comments in the code of each file.

### Configuration of individual views

To supply data necessary for particular views, the experiment maintains a global object `config_views`, which is extended with whatever properties a particular view would like to add. For example, the file `views/01_intro.js`, which defines the first view of the introductory slide, extends `config_views` by an object in `config_views.intro` which contains a title, a text and a button label, each of which is displayed on the slide. This information is picked up and rendered correctly in `index.html`, where the basic structure of each view is defined.
