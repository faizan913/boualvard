const dbConn = require('../../../config/db.config');


const Project = function(project){
    this.active          = project.active
    this.image           = project.image
    this.title           = project.title
    this.description     = project.description
    this.locale          = project.locale
    this.archived        = project.archived
    this.refrence_type   = project.refrence_type,
    this.created_at      = new Date()
    this.updated_at      = new Date()
}
Project.create = function (newProject, result) {  
    const projectData ={
        active :newProject.active,
        image: newProject.image,
        created_at:new Date(),
        updated_at: new Date()
    } 
    
    dbConn.query("INSERT INTO projects set ?", projectData, function (err, projectRes) {
        if(err) {
            result(err, null);
        }
        else{
            const transData = [
                {   translation_type: 'title',
                    reference_type: 'projects',
                    locale: newProject.locale,
                    value: newProject.title,
                    reference_id: projectRes.insertId,
                    created_at: new Date(),
                    updated_at: new Date()
                },
                {   translation_type: 'description',
                    reference_type: 'projects',
                    locale: newProject.locale,
                    value: newProject.description,
                    reference_id: projectRes.insertId,
                    created_at: new Date(),
                    updated_at: new Date()
                }
            ]
            for(let i = 0; i < transData.length; i++){
                let post  = transData[i]
                dbConn.query('INSERT INTO translations SET ?', post, function(err, res) {
                    if (err) {
                        result(err, null);
                        return;
                      }
                      let {  created_at,updated_at,locale, ...all} = newProject
                       result(null, { id: projectRes.insertId, ...all });
                });
            }
        }
    })           
}
Project.findById =  (lang,id, result)=> {
    const query = 'SELECT p.id,(select t.value from translations t where t.reference_id = p.id AND t.reference_type = "projects" and t.translation_type = "title" and t.locale = '+lang+')as "title" , (select t.value from translations t where t.reference_id = p.id AND t.reference_type = "projects" and t.translation_type = "description" and t.locale = '+lang+') as "description" ,p.image FROM projects p where p.id='+id
    dbConn.query(query,  (err, res)=> {             
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    })   
} 

//Get all product belongs to specific category


Project.findAll =  (lang,result)=> {
    const query = 'SELECT p.id,(select t.value from translations t where t.reference_id = p.id AND t.reference_type = "projects" and t.translation_type = "title" and t.locale = '+lang+')as "title" , (select t.value from translations t where t.reference_id = p.id AND t.reference_type = "projects" and t.translation_type = "description" and t.locale = '+lang+') as "description", p.image FROM projects p';
    dbConn.query(query,  (err, res)=> {
        if(err) {
            result(null, err)
        }
        else{
            result(null, res)
        }
    })   
}

Project.update = (id, project, result) => {
  let imageJson = JSON.stringify(project.image)
  dbConn.query("UPDATE projects SET active=?,image=? WHERE id = ?", [project.active,imageJson, id],  (err, res) =>{
        if(err) {
            return result(null, err)
        }else{  
            const transData = [
                {   translation_type: 'title',
                    reference_type: 'projects',
                    locale: project.locale,
                    value: project.title,
                    reference_id: id,
                },
                {   translation_type: 'description',
                    reference_type: 'projects',
                    locale: project.locale,
                    value: project.description,
                    reference_id: id,
                }
            ]
           for(let i = 0; i < transData.length; i++){
                let update  = transData[i]
                let updateQuery  = "update translations SET value='"+update.value+"' WHERE reference_id = "+id+ " AND  reference_type = 'projects' AND locale = '"+update.locale+"' AND translation_type='"+update.translation_type+"' " 
 
                dbConn.query(updateQuery, function(err, res) {
                    if (err) {
                        result(null, err);
                        return;
                      }
                      if (res.affectedRows == 0) {
                        result({ message: "Not update" }, null);
                        return;
                      }
                      let {  created_at,updated_at,locale, ...all} = project
                      result(null, { id: id, ...all });
                });
            }
        }
    }); 
};
Project.deleteByID = (id, result)=>{
    const query = "DELETE FROM projects WHERE id ="+id
     dbConn.query(query,  (err, res)=> {
        if(err) {
            return result(null, err);
        }
        else{
            const trans = `DELETE FROM translations WHERE reference_id =${id} AND reference_type= "projects"`
            dbConn.query(trans,  (err, res)=> {
                if (err) {
                    result(null, err);
                    return;
                  }
                  if (res.affectedRows == 0) {
                    result({ kind: "not_found" }, null);
                    return;
                  }
                  result(null, res);
            })
        }
    })
} 

module.exports= Project;