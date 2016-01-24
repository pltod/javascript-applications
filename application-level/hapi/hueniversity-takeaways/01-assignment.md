# Assignment 1. Create a basic HTTP server

Let's get started!

First, we need some basic structure: a lib folder, a package.json file, and an initial index.js. Since we will be using hapi, we need to include that in the project dependencies.

Second, create a basic hapi server on port 8000 which responds to /version requests and replies with a simple { "version": "0.0.1" } JSON payload. The version in the response should come from the package.json file.

Assignment due: 3/17

Got questions or need help? Post a comment.


# Takeaways


* What should be in gitignore

> https://github.com/hapijs/hapi/blob/master/.gitignore

* Simple node.js code style tips to improve code quality

> https://gist.github.com/hueniverse/a06f6315ea736ed1b46d

* The project structure should follow the same style of every other hapi module.

* This means package.json should include a main property that points to either index.js or lib/index.js.

* If the project includes a root index.js, it must not include any code other than require('./lib/index.js').

* Pay attention to the empty lines requirement after function declaration as well as not declaring any local variable other than UpperCamelCase required modules and internals.

* While not a worthwhile optimization in this example, there is no reason to have an endpoint that returns a static object response in which that object is constructed every request. The version payload could have been prepared in advance internals.response = { version: internals.package.version }.

* If a callback includes an error, check for it! Some of you forgot to check for the error in server.start(err).

* If there is no way to recover from an error and the process should abort, instead of writing custom code to console log it and then exit, just call Hoek.assert(!err, err).

* No need to make up your own .gitignore. Just copy it from hapijs/hapi. Also, you only need a root ignore file, not one in every directory.

* When calling a callback interface, better to add return before to make it stand out and avoid bugs where the callback is executed and then some more code at an undefined time. In this case, in the handler make sure you call return reply({ version: internals.package.version });.


* You pull request is for this repo, not yours. This means that your package.json file should reference this URI, not your fork.

* The package.json file can be assigned to either an UpperCamelCase variable (var Package = require('./package.json');) or to an internals variable but not just a module global per the style guide.

* Bonus points for people who included a route description.

* If you did, better to move handler inside config when present.

* Pay attention to the assignment specifics. Some of you had the wrong port, version, or specified localhost for no reason.

* hapi.js uses BSD for all licenses.

* As you can see, those submitting early get a more detailed personal code review. I go over the pull request in order and once I make a comment, I reflect it here for everyone else because repeating it over and over again isn't practical. It is important to read the full assignment notes and review your code even if I didn't comment on it. Pretty much every submission had issues.


* Quick note about internals.

> The idea is not to declare any variable on the module global (e.g. the individual file you are working on). This includes the server variable most of you declared. While some were getting close to how it should be done with internals.server, that's not ideal. I'll modify the master branch to show how I would prefer to do it.
