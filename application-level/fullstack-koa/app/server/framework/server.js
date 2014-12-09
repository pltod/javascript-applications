module.exports = function(adapter) {

  return {

    start: function() {
      adapter.start();
    },

    addNewApp: function(appData) {
      adapter.addNewApp(appData);
    }

  }
}
