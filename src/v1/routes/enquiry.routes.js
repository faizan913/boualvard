const { authJwt } = require("../middleware");
const enquiryController = require('../controllers/enquiry.controller');

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header({
        "Access-Control-Allow-Headers":"x-access-token, Origin, Content-Type, Accept"
      });
      next();
    });
     app.post( "/api/v1/enquiry",
    [authJwt.verifyToken,authJwt.isAdmin],
    enquiryController.create
    )
       
  }



