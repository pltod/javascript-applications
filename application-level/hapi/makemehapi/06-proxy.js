var Hapi = require("hapi");
var server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
});

server.route({
  path: '/proxy',
  method: 'GET',
  handler: {
    proxy: {
      host: 'localhost',
      port: 65535
    }
  }
});

server.start();