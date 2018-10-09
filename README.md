# Minimal example of an online experiment

## The experiment

This is a sample binary-choice experiment that consists of 2 practice trials views and 4 main trials views. The experiment runs in debug mode, the data collected is displayed at the end of the experiment in a table.


## Installing the experiment

### by downloading the .zip

1. Download the .zip

2. Unzip and open `index.html` in the browser

### with git

```
# clone the repo, e.g.:
git clone https://github.com/babe-project/MinimalTemplate

# go to 'MinimalTemplate'
cd MinimalTemplate

# create a local branch and move to it
git checkout -b modularized

# pull from the remove 'modularized' branch
git pull origin modularized

#open `index.html` in the browser to see the experiment
```

## File Organisation

This MinimalTemplate has the following files:

+ `index.html` - starting point; to be loaded in the browser; general structure;
+ `main.js` - the main js file where the \_babe-project is initialised. See the [docs](https://github.com/babe-project/babe-base#_babe-initialisation) on \_babe initialisation.
+ `config_deploy.js` - information about how to deploy (=run, collect data for) the experiment
+ `views.js` - information about trials and texts

+ `libraries`/ - contains the \_babe files
    + `_babe.full.min.js`
    + `_bbae,.min.js`
    _ `_babe-styles.css`

+ `images` - images shown in this experiment; optional; user usually supplies these

+ README.md
+ LICENSE

## What the user will usually (not) edit

The main files which must (usually) be edited to program an experiment are: 

+ `libraries/`

## Views

The views in this experiment come from the predefined views that \_babe provide. For more information check the [docs](https://github.com/babe-project/babe-base#views-in-_babe)

The views in this experiment are declared in `views.js`.


## Configuration of deployment

The deploy configuration file `config_deploy.js` contains **information about how to deploy** (i.e., run, recruit participants & store data) an experiment. Here, we simply use the `debug` mode in which the experiment runs locally in our own browser and outputs the data collected on the last slides as one huge and unstructured blob of text. Other modes of deployment are possible.
