module.exports = function(db) {

  console.log(db);

  function *users() {
    return db.findAllEntities('users');
  }

  function *mockUsers() {
    return [{
      _id: '1',
      username: 'user1',
      email: 'user1@gmail.com'
    }, {
      _id: '2',
      username: 'user1',
      email: 'user2@gmail.com'
    }];
  }


  function *index() {
    return "<html><body><b>Hello Feature 1!</b></body></html>";
  }

  return {
    appNamespace: '/feature1',
    routes: ['/', '/mockusers', '/realusers'],
    handlers: [index, mockUsers, users]
  }
}
