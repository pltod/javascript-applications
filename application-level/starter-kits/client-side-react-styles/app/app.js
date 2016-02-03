require ('./app.css');

import React from 'react';
import ReactDOM from 'react-dom';

var App = React.createClass({

  render() {
    return (
      <div>
        <div id="main">
          Hello World!<br/>I am client side app made with React and built with Browserify.<br/>I accept ES6 code thanks to Babel.
        </div>
      </div>
    );
  }
});

export function boot() {
  ReactDOM.render(< App />, document.getElementById('body'));
}
