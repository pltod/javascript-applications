import React from 'react';
import ReactDOM from 'react-dom';

var App = React.createClass({

  render() {
    return (
      <div>
        Hello World!<br/>I am client side app made with React and built with Browserify.<br/>I accept ES6 code thanks to Babel.
      </div>
    );
  }
});

export function boot() {
  ReactDOM.render(< App />, document.getElementById('body'));
}
