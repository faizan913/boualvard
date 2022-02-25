const dbConn = require('../../../config/db.config');


const Service = function(client){
    this.active          = client.active
    this.image           = client.image
    this.title           = client.title
    this.description     = client.description
    this.cta_title       = client.cta_title
    this.cta_action      = client.cta_action
    this.locale          = client.locale
    this.archived        = client.archived
    this.refrence_type   = client.refrence_type,
    this.created_at      = new Date()
    this.updated_at      = new Date()
}
Service.create = function (newService, result) {  
    const serviceData ={
        active :newService.active,
        image: newService.image,
        created_at:new Date(),
        updated_at: new Date()
    } 
    
    dbConn.query("INSERT INTO services set ?", serviceData, function (err, serviceRes) {
        if(err) {
            result(err, null);
        }
        else{
            const transData = [
                {   translation_type: 'title',
                    reference_type: 'services',
                    locale: newService.locale,
                    value: newService.title,
                    reference_id: serviceRes.insertId,
                    created_at: new Date(),
                    updated_at: new Date()
                },
                {   translation_type: 'description',
                    reference_type: 'services',
                    locale: newService.locale,
                    value: newService.description,
                    reference_id: serviceRes.insertId,
                    created_at: new Date(),
                    updated_at: new Date()
                },
                {   translation_type: 'cta_title',
                    reference_type: 'services',
                    locale: newService.locale,
                    value: newService.cta_title,
                    reference_id: serviceRes.insertId,
                    created_at: new Date(),
                    updated_at: new Date()
                },
                {   translation_type: 'cta_action',
                    reference_type: 'services',
                    locale: newService.locale,
                    value: newService.cta_action,
                    reference_id: serviceRes.insertId,
                    created_at: new Date(),
                    updated_at: new Date()
                }
            ]
            for(let i = 0; i < transData.length; i++){
                let post  = transData[i]
                return   dbConn.query('INSERT INTO translations SET ?', post, function(err, res) {
                    if (err) {
                        result(err, null);
                        return;
                      }
                      let {  created_at,updated_at,locale, ...all} = newService
                       result(null, { id: serviceRes.insertId, ...all });
                });
            }
        }
    })           
}
Service.findById =  (lang,id, result)=> {
    const query = 'SELECT c.id,(select t.value from translations t where t.reference_id = c.id AND t.reference_type = "services" and t.translation_type = "title" and t.locale = '+lang+')as "title" , (select t.value from translations t where t.reference_id = c.id AND t.reference_type = "services" and t.translation_type = "description" and t.locale = '+lang+') as "description" ,(select t.value from translations t where t.reference_id = c.id AND t.reference_type = "services" and t.translation_type = "cta_title" and t.locale = '+lang+') as "cta_title" , (select t.value from translations t where t.reference_id = c.id AND t.reference_type = "services" and t.translation_type = "cta_action" and t.locale = '+lang+') as "cta_action", c.image FROM services c where c.id='+id
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


Service.findAll =  (lang,result)=> {
    const query = 'SELECT c.id,(select t.value from translations t where t.reference_id = c.id AND t.reference_type = "services" and t.translation_type = "title" and t.locale = '+lang+')as "title" , (select t.value from translations t where t.reference_id = c.id AND t.reference_type = "services" and t.translation_type = "description" and t.locale = '+lang+') as "description" ,(select t.value from translations t where t.reference_id = c.id AND t.reference_type = "services" and t.translation_type = "cta_title" and t.locale = '+lang+') as "cta_title" , (select t.value from translations t where t.reference_id = c.id AND t.reference_type = "services" and t.translation_type = "cta_action" and t.locale = '+lang+') as "cta_action", c.image FROM services c';
    dbConn.query(query,  (err, res)=> {
        if(err) {
            result(null, err)
        }
        else{
            result(null, res)
        }
    })   
}

Service.update = (id, service, result) => {
  let imageJson = JSON.stringify(service.image)
  dbConn.query("UPDATE services SET active=?,image=? WHERE id = ?", [service.active,imageJson, id],  (err, res) =>{
        if(err) {
            return result(null, err)
        }else{  
            const transData = [
                {   translation_type: 'title',
                    reference_type: 'services',
                    locale: service.locale,
                    value: service.title,
                    reference_id: id,
                },
                {   translation_type: 'description',
                    reference_type: 'services',
                    locale: service.locale,
                    value: service.description,
                    reference_id: id,
                },
                {   translation_type: 'cta_title',
                    reference_type: 'services',
                    locale: service.locale,
                    value: service.cta_title,
                    reference_id: id,
                },
                {   translation_type: 'cta_action',
                    reference_type: 'services',
                    locale: service.locale,
                    value: service.cta_action,
                    reference_id: id,
                }
            ]
           for(let i = 0; i < transData.length; i++){
                let update  = transData[i]
                let updateQuery  = "update translations SET value='"+update.value+"' WHERE reference_id = "+id+ " AND  reference_type = 'services' AND locale = '"+update.locale+"' AND translation_type='"+update.translation_type+"' " 
 
                return dbConn.query(updateQuery, function(err, res) {
                    if (err) {
                        result(null, err);
                        return;
                      }
                      if (res.affectedRows == 0) {
                        result({ message: "Not update" }, null);
                        return;
                      }
                      let {  created_at,updated_at,locale, ...all} = service
                      result(null, { id: id, ...all });
                });
            }
        }
    }); 
};
Service.deleteByID = (id, result)=>{
    const query = "DELETE FROM services WHERE id ="+id
     dbConn.query(query,  (err, res)=> {
        if(err) {
            return result(null, err);
        }
        else{
            const trans = `DELETE FROM translations WHERE reference_id =${id} AND reference_type= "services"`
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

module.exports= Service;