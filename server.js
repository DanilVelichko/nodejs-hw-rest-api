const app = require('./app')

app.listen(3000, (err) => {
  if (err) {
    console.log('Error at server launch: ', err);
  }
  console.log("Server running successfull. Use our API on port: 3000")
})
