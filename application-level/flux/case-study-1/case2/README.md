#### How to Run It

* npm i to install everything

* npm run build to build the app

* npm run server to start the app

* open http://localhost:3333/todo in your browser to try the app


#### Notes

* build with browserify so jsx files are simply js files

> since it is using transformations for reactifying we can use js extension and still apply the build process

* TodoService is interesting class because it integrates into Flux architecture the communication with the server

* It supports server side rendering: https://github.com/jmreidy/fluxy/issues/1
