const { authJwt } = require("../middleware");
const configController = require('../controllers/config.controller');

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header({
        "Access-Control-Allow-Headers":"x-access-token, Origin, Content-Type, Accept",
        "Access-Control-Expose-Headers": "Content-Range",
        "Content-Range": "posts 0-5/4"
      }
        
      );
      next();
    });
  
  
    app.get(
      "/api/v1/config",
      configController.findAll
    );
    app.get(
      "/api/v1/config/:id",
      configController.findById
    );
    app.post( "/api/v1/config",
    [authJwt.verifyToken,authJwt.isAdmin],
    configController.create
    )
    app.put( "/api/v1/config/:id",
    [authJwt.verifyToken,authJwt.isAdmin],
    configController.update)

    app.delete( "/api/v1/config/:id",
    [authJwt.verifyToken,authJwt.isAdmin],
    configController.deleteByID
    )
  }
