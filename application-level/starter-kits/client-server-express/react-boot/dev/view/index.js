var React = require('react');
var style = require('./index.css');

module.exports = function (api) {

  var App = React.createClass({
    loadTransactions: function(sortBy) {
      api.loadSteps(function(res) {
        // Setting the table content via state change
        // Reset the filter
        this.setState({
          allTransactions: res.body,
          filter: ""
        });
      }.bind(this)) // bind current context because the callback is invoked by superagent which has another context
    },
    componentDidMount: function() {
      // Initially we have default filter applied
      this.loadTransactions(null);
    },
    getInitialState: function() {
      return {
        allTransactions: []
      }
    },
    render: function() {
      return (
        <div> 
          {this.state.allTransactions}
        </div>
      );
    }
  });  
  
  return {
    render: function () {
      React.render(<App/>, document.getElementById('body'));
    }
  }
}