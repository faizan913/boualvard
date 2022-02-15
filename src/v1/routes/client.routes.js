
const { authJwt } = require("../middleware");
const clientController = require('../controllers/client.controller');

//router.post('/cms',fileUpload.single('thumbnail') ,cmsController.create)

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header({
        "Access-Control-Allow-Headers":"x-access-token, Origin, Content-Type, Accept",
       "Access-Control-Expose-Headers": "Content-Range",
        "Content-Range": "posts 0-5/2"
      });
      next();
    });
    app.get('/api/v1/', function (req, res) {
      console.log(req.get('Range'));    
      console.log(req.range());
      res.end();
  });
  
    app.get(
      "/api/v1/clients",
      clientController.findAll
    );
    app.get(
      "/api/v1/clients/:id",
      clientController.findById
    );
     app.post( "/api/v1/clients",
    [authJwt.verifyToken,authJwt.isAdmin],
    clientController.create
    )
    app.put( "/api/v1/clients/:id",
    [authJwt.verifyToken,authJwt.isAdmin],
    clientController.update)

    app.delete( "/api/v1/clients/:id",
    [authJwt.verifyToken,authJwt.isAdmin],
    clientController.deleteByID
    ) 
    
   
  }



