const Service = require('../models/service.model');

exports.findAll = (req, res)=> {
    var locale = (JSON.stringify(req.headers['locale']))
    let lang = (locale === undefined) ? "\"en\"" :locale  
    Service.findAll(lang,(err, services)=> {
        if (err){res.send(err)}
        else{
            if(services.length>0){
                res.send(services)
            } 
            else{
                res.status(404).send({ error:false, message: 'No record found'})
        }}
    })
}
 
exports.create = (req, res) =>{
    const newService = new Service(req.body)
    locale = (JSON.stringify(req.headers['locale']))
    newService.locale= (locale === undefined) ? "en" :(JSON.stringify(req.headers['locale'])).replace(/^"|"$/g, '') 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Service.create(newService, (err, service) =>{
            if (err){ return res.send(err);}
           else{
           return res.status(201).send(service);
           }
        });
    }
}


exports.findById = (req, res)=> {
    var locale = (JSON.stringify(req.headers['locale']))
    let lang = (locale === undefined) ? "\"en\"" :locale  
    Service.findById(lang,req.params.id, (err, service)=> {
        if (err){res.send(err)}
        else{
            if(service.length>0){
                res.status(200).json(service[0])
            } 
            else{
                res.status(404).send({ error:false, message: 'No record found'})
        }}
    })
}


exports.update = (req, res) =>{
    const newService = new Service(req.body)
    locale = (JSON.stringify(req.headers['locale']))
    newService.locale= (locale === undefined) ? "en" :(JSON.stringify(req.headers['locale'])).replace(/^"|"$/g, '') 
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Service.update(req.params.id, newService, (err, service) =>{
            if (err){
                return res.send(err)
            }else{
                 return res.status(200).send(service);
            }
        })
    }
}

exports.deleteByID = (req, res) =>{
    Service.deleteByID( req.params.id, (err, service) =>{
    if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not record found with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete service with id " + req.params.id
          });
        }
      } else res.status(200).send({ message: `Service deleted with id ${req.params.id}` });
  })
}