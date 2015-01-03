**STATE**

> DEPRECATED


**PURPOSE**

> Trying out how to write Mocha test suite, served by Express static server, and played by the browser.

> Experimenting with weaving AMD modules with Cloud9's Architect utility - https://github.com/c9/architect

> Experimenting with sample structure for node.js application

> Experimenting with some aspects of JavaScript language with a test suite of 165 tests



**HOW TO RUN IT**

* Clone the repository

* Run 'npm install' from the root folder inside the terminal 

> This installs needed dependencies that will go in node_modules in your root project folder  

* Run 'node startApplication.js' in the root folder of the project

> This will run the application

* Open your browser at http://localhost:8080/testsMocha to run the test suite



**FOLLOW UP**


After this project I have tried something new inside https://github.com/pltod/javascript-playbook-2

It is still a way of TDD experiments but based on karma, requirejs and mocha....


****

Next is detailed description of javascript-playbook project...


#JavaScript Playbook
This project is kind of project infrastructure for experimenting with JavaScript language, frameworks and libraries.
You can use it for:
	- writing client side and server side (TODO) tests. You can test JavaScript as well as different JavaScript framworks and libraries.
	- creating simple web applications (TODO - Backbone, DB support will be added for this purpose)

##How to use it?

1. Run 'npm install' 
	- to install needed dependencies that will go in node_modules in your root project folder  

2. Run 'node startApplication.js' in the root folder of the project
	- for running the application
	
3. Open your browser at http://localhost:8080/testsMocha to run the test suite.


##Building the project
Currently there is no need to build something. In the future some Grunt plugins will be added for executing 
server side tests, minification, jshint stuff etc. The build related tasks could be started with:

	'node buildApplication.js' in the root folder of the project
	
## Used Technologies
	
### Platform
	
- [Node.js](http://nodejs.org/)
- [express - web application framework for Node](http://expressjs.com/) 
	
### Build Tools
	
- [Grunt](http://gruntjs.com/)

### Utilities

- [Lo-Dash](http://lodash.com/)
	
### Module Loading
	
- [RequireJS](http://requirejs.org/)
- [Cloud9's Architect Plugin System](https://github.com/c9/architect)
			
### Test Frameworks and Libraries
	
- [Mocha](http://visionmedia.github.com/mocha/)
- [Chai](http://chaijs.com/)


## Project Infrastructure

The infrastructure is inspired by:
- [Tim Branyen's Backbone Boilerplate](https://github.com/tbranyen/backbone-boilerplate)
- [Cloud9's Architect Demos](https://github.com/c9/architect/tree/master/demos)
- [Rebecca Murphey's test-driven assessment](https://github.com/rmurphey/js-assessment)
	
### Server-side
- Starting with 'node startApplication.js'
- Then the application is started via Architect
- The only configured plugin is http server based on express web application framework, which is started on port 8888

### Client-side
- On client side a mixture of requireJS and Architect loading is done
- When http://localhost:8888/testsMocha is requested requireJS start loading dependencies
- There are two Architect plugins on client side - testRunner interface and mochaPlugin which is the test runner implementation
- The idea is that we could plugin another test runner implementation declaratively if necessary

## JS Literature

Here are the sources I have read that these tests are inspired from:

- Angus Croll: [Truth, Equality and JavaScript](http://javascriptweblog.wordpress.com/2011/02/07/truth-equality-and-javascript/)
- David Herman: [Effective JavaScript](http://effectivejs.com/)
