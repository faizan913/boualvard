
const { authJwt } = require("../middleware");
const serviceController = require('../controllers/service.controller');

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header({
        "Access-Control-Allow-Headers":"x-access-token, Origin, Content-Type, Accept"
      });
      next();
    });
  
  
    app.get(
      "/api/v1/services",
      serviceController.findAll
    );
    app.get(
      "/api/v1/services/:id",
      serviceController.findById
    );
     app.post( "/api/v1/services",
    [authJwt.verifyToken,authJwt.isAdmin],
    serviceController.create
    )
    app.put( "/api/v1/services/:id",
    [authJwt.verifyToken,authJwt.isAdmin],
    serviceController.update)

    app.delete( "/api/v1/services/:id",
    [authJwt.verifyToken,authJwt.isAdmin],
    serviceController.deleteByID
    ) 
    
   
  }



