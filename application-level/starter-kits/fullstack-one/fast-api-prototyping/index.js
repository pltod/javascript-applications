require('./server')(function (err, app) {
  err ? console.log('Unable to start application') : app.listen(8000)
})