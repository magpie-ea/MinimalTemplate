# Minimal example of an online experiment

## Cloning and running the experiment

```
# cloning
git clone https://github.com/ProComPrag/MinimalTemplate

# running
cd MinimalTemplate

# open index.html in the browser to see the experiment
```

## File Organisation

+ `index.html` - starting point; to be loaded in the browser

+ `scripts`/   - files for main functionality
	+ `main.js`      - initializes the experiment; loads information about procedure and material
	+ `helpers.js`   - helper functions specific to each particular experiment

+ `config`/    - files with user-supplied information
	+ `config_deploy.js`    - information about how to deploy (=run, collect data) the experiment
	+ `config_general.js`   - information about this particular experiment (procedure, ...)
	
+ `views`/     - files for each view (= block / chunk of related content) of the experiment
	+ `01_intro.js`           - introduction slide
	+ `02_instructions.js`    - instructions slide
    + `03_practice.js`        - practice trials	
    + `04_beginExp.js`        - prepare for main experiment slide
    + `05_trials.js`          - main experiment part
	+ `06_postTest.js`        - post-test questionaire
	+ `07_thanks.js`          - 'thank you' message & submit data functionality

+ `images`       - images shown in the experiment

+ `styles/styles.css`  - style files

+ `libraries`    - external libraries

+ README.md
+ LISENCE


## Views

Views are the different blocks that comprise the experiment. The sequence of views and how many slides/clicks/transitions each block is supposed to have are defined in `config_general.js`.

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
