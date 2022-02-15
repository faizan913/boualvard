const Gallary = require('../models/gallery.model');

exports.findAll = (req, res) => {
    var locale = (JSON.stringify(req.headers['locale']))
    let lang = (locale === undefined) ? "\"en\"" :locale  
    Gallary.findAll(lang, (err, galleries) => {
        if (err) { res.send(err) }
        else {
            if (galleries.length > 0) {
                res.status(200).send(galleries)
            } else {
                res.send({ error: false, message: 'No records found' })
            }
        }
    })
}

exports.create = (req, res) => {
    const galleryData = new Gallary(req.body)
    locale = (JSON.stringify(req.headers['locale']))
    galleryData.locale= (locale === undefined) ? "en" :(JSON.stringify(req.headers['locale'])).replace(/^"|"$/g, '')
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        Gallary.create(galleryData, (err, gallery) => {
            if (err) {return  res.send(err) }
            else {
                res.status(201).json(gallery)
            }
        });
    }
}


exports.findById = (req, res) => {
    var locale = (JSON.stringify(req.headers['locale']))
    let lang = (locale === undefined) ? "\"en\"" :locale  
    Gallary.findById(lang, req.params.id, (err, gallery) => {
        if (err) { res.send(err) }
        else {
            if (gallery.length > 0) {
                res.send(gallery[0])
            } else {
                res.status(404).send({ error: false, message: 'No records found ' })
            }
        }
    })
}


exports.update = (req, res) =>{
    const galleryData = new Gallary(req.body)
    locale = (JSON.stringify(req.headers['locale']))
    galleryData.locale= (locale === undefined) ? "en" :(JSON.stringify(req.headers['locale'])).replace(/^"|"$/g, '')
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Gallary.update(req.params.id, galleryData, (err, gallery) =>{
            if (err){
                return res.send(err)
             } else{
                 res.status(200).json(gallery) 
            }
        })
    }
  
}


exports.deleteByID = (req, res) =>{
    Gallary.deleteByID( req.params.id, (err, gallery) =>{
    if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not record found with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete gallery with id " + req.params.id
          });
        }
      } else res.status(200).send({ message: `gallery deleted with id ${req.params.id}` });
  })
}