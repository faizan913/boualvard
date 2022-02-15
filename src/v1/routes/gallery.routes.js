
const { authJwt } = require("../middleware");
const galleryController = require('../controllers/gallery.controller');

//router.post('/cms',fileUpload.single('thumbnail') ,cmsController.create)

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header({
        "Access-Control-Allow-Headers":"x-access-token, Origin, Content-Type, Accept"
      });
      next();
    });
  
  
    app.get(
      "/api/v1/gallery",
      galleryController.findAll
    );
    app.get(
      "/api/v1/gallery/:id",
      galleryController.findById
    );
    app.post( "/api/v1/gallery",
    [authJwt.verifyToken,authJwt.isAdmin],
    galleryController.create
    )
    app.put( "/api/v1/gallery/:id",
    [authJwt.verifyToken,authJwt.isAdmin],
    galleryController.update)

    app.delete( "/api/v1/gallery/:id",
    [authJwt.verifyToken,authJwt.isAdmin],
    galleryController.deleteByID
    ) 
    
   
  }



