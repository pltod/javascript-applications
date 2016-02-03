module.exports = function(adapter) {
  return {
    openClient: function() {
      return adapter.openClient();
    },

    openDb: function() {
      return adapter.openDb();
    },

    findAllEntities: function(entity) {
      return adapter.findAllEntities(entity);
    }
  }
}
