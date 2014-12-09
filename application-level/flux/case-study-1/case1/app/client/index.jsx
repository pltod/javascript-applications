/** @jsx React.DOM */
var React = require('react');
var Fluxxor = require('fluxxor');

var ApplicationComp = require('./components/Application.jsx');

var TodoStore = require('./stores/TodoStore.js');
var actions = require('./actions/Actions.js');
var stores = {
  TodoStore: new TodoStore()
}


var flux = new Fluxxor.Flux(stores, actions);

window.flux = flux;

React.renderComponent(
  <ApplicationComp flux={flux} />, document.getElementById("app")
);



