
const { authJwt } = require("../middleware");
const projectController = require('../controllers/project.controller');

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header({
        "Access-Control-Allow-Headers":"x-access-token, Origin, Content-Type, Accept"
      });
      next();
    });
  
  
    app.get(
      "/api/v1/projects",
      projectController.findAll
    );
    app.get(
      "/api/v1/projects/:id",
      projectController.findById
    );
     app.post( "/api/v1/projects",
    [authJwt.verifyToken,authJwt.isAdmin],
    projectController.create
    )
    app.put( "/api/v1/projects/:id",
    [authJwt.verifyToken,authJwt.isAdmin],
    projectController.update)

    app.delete( "/api/v1/projects/:id",
    [authJwt.verifyToken,authJwt.isAdmin],
    projectController.deleteByID
    ) 
    
   
  }



