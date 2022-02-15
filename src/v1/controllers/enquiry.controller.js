const Enquiry = require('../models/enquiry.model');


 
 exports.create = (req, res) =>{
    const newEnquiry = new Enquiry(req.body)
    locale = (JSON.stringify(req.headers['locale']))
    newEnquiry.locale= (locale === undefined) ? "en" :(JSON.stringify(req.headers['locale'])).replace(/^"|"$/g, '') 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Enquiry.create(newEnquiry, (err, enquiry) =>{
            if (err){ res.send(err)}
           else{
                res.status(200).send(enquiry)
           }
        });
    }
}


 