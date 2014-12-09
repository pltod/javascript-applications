var actions = {
  ADD_TODO: 'ADD_TODO',
  TOGGLE_TODO: 'TOGGLE_TODO',
  CLEAR_TODOS: 'CLEAR_TODOS'
}

module.exports = {
  ADD_TODO: actions.ADD_TODO,
  TOGGLE_TODO: actions.TOGGLE_TODO,
  CLEAR_TODOS: actions.CLEAR_TODOS,

  addTodo: function(text) {
    this.dispatch(actions.ADD_TODO, {
      text: text
    })
  },

  toggleTodo: function(todo) {
    this.dispatch(actions.TOGGLE_TODO, {
      todo: todo
    });
  },


  clearTodos: function() {
    this.dispatch(actions.CLEAR_TODOS);
  }
};
