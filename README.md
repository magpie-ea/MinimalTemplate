# Minimal example of an online experiment

## The experiment

This is a sample binary-choice experiment that consists of 2 practice trials views and 4 main trials views. The experiment runs in debug mode, the data collected is displayed at the end of the experiment in a table.


## Installing the experiment

###  (Recommended) Cloning the project with git and installing the dependencies with npm

**Do I have npm installed?** [Here](https://www.npmjs.com/get-npm) is more information about npm and how to install it.

```
# clone the repo, e.g.:
git clone https://github.com/babe-project/MinimalTemplate

# go to 'MinimalTemplate'
cd MinimalTemplate

# create a local branch and move to it
git checkout -b modularized

# pull from the remove 'modularized' branch
git pull origin modularized

# install the js dependencies
npm install
```


### Downloading the project and the dependencies

coming soon..


## Starting the experiment

To see the experiment you have to install a local server.

### using npm's [http-server](https://www.npmjs.com/package/http-server)

```
# install http-server with npm
npm install -g http-server

# start the local server
# call http-server from the MinimalTemplate folder
http-server

# open 'http://localhost:8080' in the browser to see the experiment
```

### using Python's SimpleHTTPServer

follow the steps [here](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server#Running_a_simple_local_HTTP_server)


## Documentation

[\_babe package docs](https://github.com/babe-project/babe-base).


## File Organisation

This MinimalTemplate has the following files:

+ `index.html` - starting point; to be loaded in the browser; general structure;

+ `index.js` - the main js file where the \_babe project is initialised. See the [docs](https://github.com/babe-project/babe-base#_babe-initialisation) on \_babe initialisation.

+ `config`/ - file(s) with user-supplied information
    + `config_deploy.js` - information about how to deploy (=run, collect data for) the experiment
    + `views.js`

+ `images` - images shown in this experiment; optional; user usually supplies these

+ README.md
+ LICENSE


## What the user will usually (not) edit

The main files which must (usually) be edited to program an experiment are: 

+ `node_modules/`


## Views

The views in this experiment come from the predefined views that \_babe provide. For more information check the [docs](https://github.com/babe-project/babe-base#views-in-_babe)

The views in this experiment are declared in `config/views.js`.


## Configuration of deployment

The deploy configuration file `config_deploy.js` contains **information about how to deploy** (i.e., run, recruit participants & store data) an experiment. Here, we simply use the `debug` mode in which the experiment runs locally in our own browser and outputs the data collected on the last slides as one huge and unstructured blob of text. Other modes of deployment are possible.
