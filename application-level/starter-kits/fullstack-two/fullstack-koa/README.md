**STATE**

> DONE with CAVEATS :)

This app skeleton is experiment with Full-stack JavaScript architecture. Among the technologies, tools, and concepts used are Koa, Component, MongoDB, browser-sync, nodemon, CommonJS, JavaScript Generators.

**Needs node 0.11.x**

# Purpose

The purpose of this skeleton is to show some important things to consider when building full stack apps:


* **Build every piece of reusable code as component.**

> Each component could have HTML, CSS, JavaScript, images etc.

> See discussion on inital post about component ideas: http://blog.izs.me/post/27987129912/tj-holowaychuk-components

> look inside app/client folder where the local components are. Each of them has descriptor component.json that explicitelly define the dependencies and resources part of the component

> so the css and js are reusable only the descriptor is required by the particular approach used. So the same css and js could be packaged with another technology. See next: 

* **Think about best approach of packaging your components.**

> This project is rather old and use https://github.com/componentjs/component for packaging the client app

> Component has its descendents - https://normalize.github.io/ - and - http://duojs.org/

> Alternative approaches exists like browserify, webpack, atomify, and npm itself

* **Static resources like images and fonts must go automatically into build folder during packaging**

> See how during the build images specified as part of component are copied in the build folder

* **Think how to deal best with async operations.**

> This project is using Koa which facilitate async flows with generators.

> Of course there are many different approaches that are not related with changing your application framework but rather using dedicated libraries for tamming async flows

* **Think about the best workflow** - watching for file changes and automatic rebuilds, automatic server and browser restarts, etc.

> For example nodemon is used to restart the server on each change in the server code

> Browser-sync is used to launch the browser showing the home page and reload it when changes in the client code happen

> In development mode all the components are rebuild on each server request and assets are served dynamically by koa. This is achieved with component building middleware for koa: https://github.com/component/koa.js

* **Develop with adapters along stable framework**

> This is future friendly architecture - having stable interfaces allows to replace technologies with providing appropriate adapters for these interfaces.

> Ideas explained here: http://www.slideshare.net/nzakas/scalable-javascript-application-architecture

* **Think about the possibility of weaving several applications in the same server**

We have kind of two apps although they are called features:

> http://localhost:9999/feature1

> http://localhost:9999/feature2

These are kind of namespaces for more nested routes like: http://localhost:9999/feature1/mockusers

It is done with this middleware: https://github.com/koajs/mount

Note: browser-sync is running the same routes on another ip and port automatically but these links are still working when app is running.

# How to run

> ```npm i``` - install dependencies - **don't change the versions since most of the libs has breaking changes in their newer versions. For example use component version 1.0.0.-rc5 for component build command**

We have a build phase!

So:

> ```component build``` - puts all artifacts inside build folder which is served statically by the server.

> ```npm start``` - start the application server to listen for client requests.

> the samle routes work without db but there is route that reads from db. In order for this route to work mongodb must be running with testdb db and users collections with a few documents.

# How to develop

* Start the server in watch mode:

> ```npm run dev``` or

> ```npm run dev-verbose``` - even more output by koa inside the terminal




# Scafolding

Folder descriptions:

* app - holds the application

* app/client - client side code in the form of components

* app/server - server side code comprised of framework, adapters to it and api holding the business logic.

* components - Third party components. Appear after component build command.

* node_modules - Third party components. Appear after npm i command

* build - Production Artifacts


Files in the root:

* application entry point - play.js

* config files for component, nodemon, node, application environment

