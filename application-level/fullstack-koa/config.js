// http://12factor.net/

var resolve = require('path').resolve;

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.PORT = process.env.PORT || 9999;
process.env.MONGO_HOST = process.env.MONGO_HOST || 'localhost';
process.env.MONGO_PORT = process.env.MONGO_PORT || 27017;
process.env.DB = process.env.DB || 'testdb';

process.env.ROOT_DIR = __dirname;
process.env.COMPONENTS_DIR = resolve(__dirname, 'components');
process.env.STATIC_DIR = resolve(__dirname, 'build');
