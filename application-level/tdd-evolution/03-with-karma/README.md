**STATE**

> DEPRECATED


**PURPOSE**

> Different tech stack for the same purpose expressed inside both projects https://github.com/pltod/javascript-test-suite and https://github.com/pltod/javascript-playbook

> Twitter Bower is used to experiment with client-side dependencies manager in addition to npm


**HOW TO RUN IT**

* node.js and twitter bower must be installed first

From the root folder inside the terminal run:

* 'npm install' 

* 'bower install'

* 'karma start'

> karma opens Chrome browser executes the specs from test folder.
> Note that the settings (browser, port) could be changed inside karma.conf.js. However for other browsers you may need to install additional karma browser launcher plugins.


**FOLLOW UP**

All of the TDD experiments so far are based on AMD modules.
The next endevour is creating test infrastructure with CommonJS modules.

https://github.com/pltod/playbook-code



