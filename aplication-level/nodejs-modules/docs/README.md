<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](http://doctoc.herokuapp.com/)*

- [General Notes](#general-notes)
  - [resources](#resources)
- [Development Workflow](#development-workflow)
  - [module creation](#module-creation)
  - [module publishing](#module-publishing)
  - [module consumption](#module-consumption)
  - [module dependencies](#module-dependencies)
  - [other aspects](#other-aspects)
    - [develop and consume in the same time](#develop-and-consume-in-the-same-time)
    - [useful npm commands](#useful-npm-commands)
  - [resources](#resources-1)
    - [npm](#npm)
    - [workflow](#workflow)
- [Modules as Command Line Utilities](#modules-as-command-line-utilities)
  - [articles](#articles)
  - [libraries](#libraries)
  - [spawn vs. exec](#spawn-vs-exec)
- [Other Resources](#other-resources)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# General Notes

* node modules follow CommonJS standard

* node module development workflow is achieved with npm

* node modules are singletons by default

* export things from modules via module.exports

* exports vs. module.exports 

> the first is alias to the second one

> if we overrwite module.exports we loose assignments made via exports

> in fact of this best practice would be to do something like exports = module.exports = SOMETHING


## resources

* Modules are singletons

> http://fredkschott.com/post/2013/12/node-js-cookbook---designing-singletons/

* exports vs. module.exports

> http://www.hacksparrow.com/node-js-exports-vs-module-exports.html

* global vs. local variables

> http://www.hacksparrow.com/global-variables-in-node-js.html


# Development Workflow



## module creation

* minimum requirements are having **index.js, package.json, and readme.md**

* **npm pack** creates .tgz file

* local installation in node_modules could be done from the archive ```npm install module_dir/xxx.tgz```

* ```npm link``` is very useful if we want to develop and use the module in the same time

> moreover it is useful for modules that are shell utilities so we could use them in terminal with writing the module name


## module publishing

* Publishing a Node module involves working with two networks

> a remote repository (Github)

> the NPM registry (http://registry.npmjs.org/ and https://www.npmjs.org) 


* npm adduser

> registering with NPM in order to add modules

* npm publish

> publishing the module to npm repo


## module consumption

* Installing module in a project

> ```npm i 'module-name' --save``` - app dependency

> ```npm i 'module-name' --save-dev``` - app development dependency

* Requiring it via:

> require('module-name')


## module dependencies

* node modules use server for versioning

> http://semver.org/

* how to do proper versioning:

> https://nodesource.com/blog/semver-tilde-and-caret

> https://nodesource.com/blog/semver-a-primer

* good article in historical aspect about versioning

> http://blog.nodejitsu.com/package-dependencies-done-right



## other aspects 

### develop and consume in the same time

How to develop and use modules in the same time? It is viable in both cases:

* for public modules that will not be published on each change

* for private modules that will not be published at all


The process:

* ```npm link``` in the module under development

* ```npm link 'the-module-under-development' ``` in the project that consumes it

* after each change of module under development the module that consumes it will have the latest version out of the box



More info at:

> https://www.npmjs.org/doc/cli/npm-link.html

> http://justjs.com/posts/npm-link-developing-your-own-npm-modules-without-tears
 

### useful npm commands

* npm outdated

> check for installed and available versions

* npm config list

> show current configuration

* npm config ls -l

> show default options

> changing default configuration is useful because it is used when create package.json with ```npm init```

* npm search 

> could search npm modules for example 'npm search request'

* npm behind Firewall

> npm config set registry http://registry.npmjs.org/

> npm config set proxy http://<my proxy>:port



## resources

### npm

* Main documentation

> https://www.npmjs.org/doc/

* Introduction to npm

> http://howtonode.org/introduction-to-npm


* Descriptor file for the npm repo

> https://www.npmjs.org/doc/json.html


* How npm works

> http://blog.npmjs.org/post/75707294465/new-npm-registry-architecture

* npm for developers

> https://www.npmjs.org/doc/developers.html


### workflow


* package.json

> https://www.npmjs.org/doc/json.html


* Create node module and install it locally

> http://www.hacksparrow.com/how-to-write-node-js-modules.html


* Create module and publish it in npm repository

> http://www.hacksparrow.com/create-npm-package-node-js-module.html

> http://quickleft.com/blog/creating-and-publishing-a-node-js-module



# Modules as Command Line Utilities

This is one of the common use cases. Related topics are operations like reading/writing files, user input, and low level process management.

* bin property in package.json play major role in pointing out which file must be executable and available in PATH

* chmod 755 also must be done on the file so it can be executed


## articles

* write cross-platform code

> http://shapeshed.com/writing-cross-platform-node/


* http://cruft.io/posts/node-command-line-utilities/

* http://www.hacksparrow.com/commandline-node-js-scripts-utilities-modules.html

* http://www.2ality.com/2011/12/nodejs-shell-scripting.html

* http://www.hacksparrow.com/commandline-node-js-scripts-utilities-modules.html


## libraries

* Commander by visionmedia

> https://github.com/visionmedia/commander.js/

## spawn vs. exec

* http://blog.liftsecurity.io/2014/08/19/Avoid-Command-Injection-Node.js

* http://www.hacksparrow.com/difference-between-spawn-and-exec-of-node-js-child_process.html


# Other Resources

* http://www.jongleberry.com/why-i-hate-npm.html

* http://substack.net/how_I_write_modules


* The future of npm

> http://blog.npmjs.org/post/98131109725/npm-2-0-0

> http://blog.npmjs.org/post/98233700815/multi-stage-installs-and-a-better-npm

> https://github.com/npm/npm/issues/5919



* Scoped Modules

> http://blog.nodejitsu.com/a-summary-of-scoped-modules-in-npm/

> https://github.com/npm/npm/issues/5239



