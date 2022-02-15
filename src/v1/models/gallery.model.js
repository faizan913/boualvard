const dbConn = require('../../../config/db.config');


const Gallary = function(gallary){
    this.active          = gallary.active
    this.image_url       = gallary.image_url
    this.image_link       = gallary.image_link
    this.title           = gallary.title
    this.locale          = gallary.locale
    this.archived        = gallary.archived
    this.refrence_type   = gallary.refrence_type,
    this.created_at      = new Date()
    this.updated_at      = new Date()
}
Gallary.create = function (newGallary, result) {  
    const gallaryData ={
        active :newGallary.active,
        image_url: newGallary.image_url,
        image_link: newGallary.image_link,
        created_at:new Date(),
        updated_at: new Date()
    } 
    
    dbConn.query("INSERT INTO galleries set ?", gallaryData, function (err, gallariesRes) {
        if(err) {
            result(err, null);
        }
        else{
            const transData = [
                {   translation_type: 'title',
                    reference_type: 'galleries',
                    locale: newGallary.locale,
                    value: newGallary.title,
                    reference_id: gallariesRes.insertId,
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
                      let {  created_at,updated_at,locale, ...all} = newGallary
                       result(null, { id: gallariesRes.insertId, ...all });
                });
            }
        }
    })           
}
Gallary.findById =  (lang,id, result)=> {
    const query = 'SELECT c.id,(select t.value from translations t where t.reference_id = c.id AND t.reference_type = "galleries" and t.translation_type = "title" and t.locale = '+lang+')as "title" ,c.image_url,c.image_link FROM galleries c where c.id='+id
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


Gallary.findAll =  (lang,result)=> {
    const query = 'SELECT c.id,(select t.value from translations t where t.reference_id = c.id AND t.reference_type = "galleries" and t.translation_type = "title" and t.locale = '+lang+')as "title" ,c.image_url,c.image_link FROM galleries c';
    dbConn.query(query,  (err, res)=> {
        if(err) {
            result(null, err)
        }
        else{
            result(null, res)
        }
    })   
}

Gallary.update = (id, gallery, result) => {
  let imageLink = JSON.stringify(gallery.image_link)
  let imageURL = JSON.stringify(gallery.image_url)
  dbConn.query("UPDATE galleries SET active=?,image_link=?,image_url=? WHERE id = ?", [gallery.active,imageLink,imageURL, id],  (err, res) =>{
        if(err) {
            return result(null, err)
        }else{  
            const transData = [
                {   translation_type: 'title',
                    reference_type: 'galleries',
                    locale: gallery.locale,
                    value: gallery.title,
                    reference_id: id,
                }
            ]
           for(let i = 0; i < transData.length; i++){
                let update  = transData[i]
                let updateQuery  = "update translations SET value='"+update.value+"' WHERE reference_id = "+id+ " AND  reference_type = 'galleries' AND locale = '"+update.locale+"' AND translation_type='"+update.translation_type+"' " 
 
                dbConn.query(updateQuery, function(err, res) {
                    if (err) {
                        result(null, err);
                        return;
                      }
                      if (res.affectedRows == 0) {
                        // not found Tutorial with the id
                        result({ message: "Not update" }, null);
                        return;
                      }
                      let {title,image_link,image_url} = gallery //destructure of obj object
                      result(null, { id: id, title,image_link,image_url });
                    
                });
            }
        }
    }); 
};
Gallary.deleteByID = (id, result)=>{
    const query = "DELETE FROM galleries WHERE id ="+id
     dbConn.query(query,  (err, res)=> {
        if(err) {
            return result(null, err);
        }
        else{
            const trans = `DELETE FROM translations WHERE reference_id =${id} AND reference_type= "galleries"`
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

module.exports= Gallary;