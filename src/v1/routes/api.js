var express = require('express');
var router = express.Router();
const { authJwt ,verifySignUp} = require("../middleware");

/* CMS API */
const cmsController = require('../controllers/cms.controller');
  router.get("/v1/cms", cmsController.findAll);
  router.post( "/v1/cms",[authJwt.verifyToken,authJwt.isAdmin],cmsController.create)
  router
    .route("/v1/cms/:id")
    .get(cmsController.findById)
    .put( [authJwt.verifyToken,authJwt.isAdmin],cmsController.update)
    .delete([authJwt.verifyToken,authJwt.isAdmin],cmsController.deleteByID)
   
/* Config API */
const configController = require('../controllers/config.controller');
  router.get("/v1/config", configController.findAll);
  router.post( "/v1/config",[authJwt.verifyToken,authJwt.isAdmin],configController.create)
  router
    .route("/v1/config/:id")
    .get(configController.findById)
    .put( [authJwt.verifyToken,authJwt.isAdmin],configController.update)
    .delete([authJwt.verifyToken,authJwt.isAdmin],configController.deleteByID)

/* Client Api */
const clientController = require('../controllers/client.controller');
  //router.get("/v1/clients", clientController.findAll);
  router.post( "/v1/clients",[authJwt.verifyToken,authJwt.isAdmin],clientController.create)
  router
    .route("/v1/clients/:id")
    .get(clientController.findById)
    .put( [authJwt.verifyToken,authJwt.isAdmin],clientController.update)
    .delete([authJwt.verifyToken,authJwt.isAdmin],clientController.deleteByID)

  /* Enquiry Api */
  const enquiryController = require('../controllers/enquiry.controller');
    router.post( "/v1/enquiry",[authJwt.verifyToken,authJwt.isAdmin],enquiryController.create)
 
/* Gallery Api */
const galleryController = require('../controllers/gallery.controller');
  router.get("/v1/gallery", galleryController.findAll);
  router.post( "/v1/gallery",[authJwt.verifyToken,authJwt.isAdmin],galleryController.create)
  router
    .route("/v1/gallery/:id")
    .get(galleryController.findById)
    .put( [authJwt.verifyToken,authJwt.isAdmin],galleryController.update)
    .delete([authJwt.verifyToken,authJwt.isAdmin],galleryController.deleteByID)

/* Project Api */
const projectController = require('../controllers/project.controller');
  router.get("/v1/projects", projectController.findAll);
  router.post( "/v1/projects",[authJwt.verifyToken,authJwt.isAdmin],projectController.create)
  router
    .route("/v1/projects/:id")
    .get(projectController.findById)
    .put( [authJwt.verifyToken,authJwt.isAdmin],projectController.update)
    .delete([authJwt.verifyToken,authJwt.isAdmin],projectController.deleteByID)

/* Services Api */
const serviceController = require('../controllers/service.controller');
  router.get("/v1/services", serviceController.findAll);
  router.post( "/v1/services",[authJwt.verifyToken,authJwt.isAdmin],serviceController.create)
  router
    .route("/v1/services/:id")
    .get(serviceController.findById)
    .put( [authJwt.verifyToken,authJwt.isAdmin],serviceController.update)
    .delete([authJwt.verifyToken,authJwt.isAdmin],serviceController.deleteByID)

/* User Auth Api */
const userController = require("../controllers/user.controller");
router.post("/v1/signup",[verifySignUp.checkDuplicateUsernameOrEmail],userController.signup );
router.post("/v1/signin", userController.signin);

  module.exports = router;   

/* module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header({
        "Access-Control-Allow-Headers":"x-access-token, Origin, Content-Type, Accept"
      }
      );
      next();
    });
  } */


