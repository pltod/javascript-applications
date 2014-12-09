var api = require('./api.js');

//api.getLatestPostId(print);

//api.getPost(8510464, print);

api.getParentStory(8510464, print);

function print(err, data) {
  console.log(data);
}