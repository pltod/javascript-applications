/** @jsx React.DOM */

var React = require('react');
var Fluxy = require('fluxy');


// The author says that this is the controller view
// Controller View is defined as term in Flux as the mediator between Stores (the mutable state) and Components (immutable state)
var ApplicationComp = require('../shared/components/Application');


// Interesting way to bootstrap the whole architecture
Fluxy.bootstrap('__fluxy__');


// Common code to inject the root Component (which happens to be Controller View :) )
React.renderComponent(
  <ApplicationComp />,
  document.getElementById('todoapp')
);