var Fluxxor = require('fluxxor');

var actions = require('../actions/Actions.js');

var TodoStore = Fluxxor.createStore({
  
  //Init data
  initialize: function () {
    
    //Stores the state
    this.todos = [];
    
    //We bind each action to handler in the Store
    this.bindActions(
      actions.ADD_TODO, this.onAddTodo,
      actions.TOGGLE_TODO, this.onToggleTodo,
      actions.CLEAR_TODOS, this.onClearTodos
    )
    
  },
  
  //Process data input and emit events
  onAddTodo: function (payload) {
    
    //payload is basically the user input that comes together with the action
    
    this.todos.push({text: payload.text, complete: false});
    this.emit("change"); //should we emit something more than change?
  },
  
  
  onToggleTodo: function (payload) {
    payload.todo.complete = !payload.todo.complete;
    this.emit('change');
  },
  
  onClearTodos: function (payload) {
    this.todos = this.todos.filter(function (todo) {
      return !todo.complete;
    });
    this.emit("change");  
  },
  
  //gets the store state!
  getState: function () {
    return {
      todos: this.todos
    }
  }
  
});

module.exports = TodoStore;


