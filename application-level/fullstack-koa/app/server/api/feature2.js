module.exports = function() {

  function *index() {
    return 'Hello Feature 2!';
  }

  return {
    appNamespace: '/feature2',
    routes: ['/'],
    handlers: [index]
  }
}
