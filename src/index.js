const express = require('express')
var cors = require('cors')
const app = express() // create express app
const port = process.env.PORT || 4000
app.use(express.json())
app.use(cors())
headers= {
  "Access-Control-Allow-Headers" : "*",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE"
}
app.use(function(req, res, next) {
  res.header(headers);  
  next();
});


//Authentication for v1

require('./v1/routes/user.routes')(app)
require('./v1/routes/config.routes')(app)
require('./v1/routes/cms.routes')(app)

require('./v1/routes/client.routes')(app)
require('./v1/routes/gallery.routes')(app)
require('./v1/routes/service.routes')(app)
require('./v1/routes/project.routes')(app)
require('./v1/routes/enquiry.routes')(app)
// health check
app.get("/health", (req, res) => {
  res.json({ status: "up" })
})


// register other routes
//app.use('/api/v1', categoryRoutes)
/* app.use('/api/v1', videoRoutes)
app.use('/api/v1', cmsRoutes)
app.use('/api/v1', recipeRouter)
app.use('/api/v1', homeRouter) */

// listen for requests
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})