const Client = require('../models/client.model');

exports.findAll = (req, res)=> {
    var locale = (JSON.stringify(req.headers['locale']))
    let lang = (locale === undefined) ? "\"en\"" :locale  
    Client.findAll(lang,(err, clients)=> {
        if (err){res.send(err)}
        else{
            if(clients.length>0){
                res.send(clients)
            } 
            else{
                res.status(404).send({ error:false, message: 'No record found'})
        }}
    })
}
 
exports.create = (req, res) =>{
    const newClient = new Client(req.body)
    locale = (JSON.stringify(req.headers['locale']))
    newClient.locale= (locale === undefined) ? "en" :(JSON.stringify(req.headers['locale'])).replace(/^"|"$/g, '') 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Client.create(newClient, (err, client) =>{
            if (err){ return res.send(err);}
           else{
           return res.status(201).send(client);
           }
        });
    }
}


exports.findById = (req, res)=> {
    var locale = (JSON.stringify(req.headers['locale']))
    let lang = (locale === undefined) ? "\"en\"" :locale  
    Client.findById(lang,req.params.id, (err, client)=> {
        if (err){res.send(err)}
        else{
            if(client.length>0){
                
                res.status(200).json(client[0])
            } 
            else{
                res.status(404).send({ error:false, message: 'No record found'})
        }}
    })
}


exports.update = (req, res) =>{
    const newClient = new Client(req.body)
    locale = (JSON.stringify(req.headers['locale']))
    newClient.locale= (locale === undefined) ? "en" :(JSON.stringify(req.headers['locale'])).replace(/^"|"$/g, '') 
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Client.update(req.params.id, newClient, (err, client) =>{
            if (err){
                return res.send(err)
            }else{
                 return res.status(200).send(client);
            }
        })
    }
}

exports.deleteByID = (req, res) =>{
    Client.deleteByID( req.params.id, (err, client) =>{
    if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not record found with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete client with id " + req.params.id
          });
        }
      } else res.status(200).send({ message: `Client deleted with id ${req.params.id}` });
  })
}