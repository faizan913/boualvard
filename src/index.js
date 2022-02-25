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
var apiRouter = require('./v1/routes/api');
app.use('/api', apiRouter); 


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