const Project = require('../models/project.model');

exports.findAll = (req, res)=> {
    var locale = (JSON.stringify(req.headers['locale']))
    let lang = (locale === undefined) ? "\"en\"" :locale  
    Project.findAll(lang,(err, projects)=> {
        if (err){res.send(err)}
        else{
            if(projects.length>0){
                res.send(projects)
            } 
            else{
                res.status(404).send({ error:false, message: 'No record found'})
        }}
    })
}
 
exports.create = (req, res) =>{
    const newProject = new Project(req.body)
    locale = (JSON.stringify(req.headers['locale']))
    newProject.locale= (locale === undefined) ? "en" :(JSON.stringify(req.headers['locale'])).replace(/^"|"$/g, '') 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Project.create(newProject, (err, project) =>{
            if (err){ return res.send(err);}
           else{
           return res.status(201).send(project);
           }
        });
    }
}


exports.findById = (req, res)=> {
    var locale = (JSON.stringify(req.headers['locale']))
    let lang = (locale === undefined) ? "\"en\"" :locale  
    Project.findById(lang,req.params.id, (err, project)=> {
        if (err){res.send(err)}
        else{
            if(project.length>0){
                res.status(200).json(project[0])
            } 
            else{
                res.status(404).send({ error:false, message: 'No record found'})
        }}
    })
}


exports.update = (req, res) =>{
    const newProject = new Project(req.body)
    locale = (JSON.stringify(req.headers['locale']))
    newProject.locale= (locale === undefined) ? "en" :(JSON.stringify(req.headers['locale'])).replace(/^"|"$/g, '') 
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Project.update(req.params.id, newProject, (err, project) =>{
            if (err){
                return res.send(err)
            }else{
                 return res.status(200).send(project);
            }
        })
    }
}

exports.deleteByID = (req, res) =>{
    Project.deleteByID( req.params.id, (err, service) =>{
    if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not record found with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete projects with id " + req.params.id
          });
        }
      } else res.status(200).send({ message: `Projects deleted with id ${req.params.id}` });
  })
}