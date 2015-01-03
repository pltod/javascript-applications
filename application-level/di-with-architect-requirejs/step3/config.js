/**
 * objectMapper and objectMapperWithoutMongoose are the same facade to two different implementations.
 * imagine it like interfaces to Mongoose and another object mapper solution.
 * 
 * So if we want to use one of these in our application it is just a matter of configuration change.
 */
module.exports = [
  "./server/plugins/objectMapper",
  //If we want to use another service just change the dependies here
  /*"./server/plugins/objectMapperWithoutMongoose",*/
  "./server/plugins/server"
];
