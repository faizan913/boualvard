const dbConn = require('../../../config/db.config');


const Client = function(client){
    this.active          = client.active
    this.image           = client.image
    this.title           = client.title
    this.locale          = client.locale
    this.archived        = client.archived
    this.refrence_type   = client.refrence_type,
    this.created_at      = new Date()
    this.updated_at      = new Date()
}
Client.create = function (newClient, result) {  
    const clientData ={
        active :newClient.active,
        image: newClient.image,
        created_at:new Date(),
        updated_at: new Date()
    } 
    
    dbConn.query("INSERT INTO clients set ?", clientData, function (err, cleintRes) {
        if(err) {
            result(err, null);
        }
        else{
            const transData = [
                {   translation_type: 'title',
                    reference_type: 'clients',
                    locale: newClient.locale,
                    value: newClient.title,
                    reference_id: cleintRes.insertId,
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
                      let {  created_at,updated_at,locale, ...all} = newClient
                       result(null, { id: cleintRes.insertId, ...all });
                });
            }
        }
    })           
}
Client.findById =  (lang,id, result)=> {
    const query = 'SELECT c.id,(select t.value from translations t where t.reference_id = c.id AND t.reference_type = "clients" and t.translation_type = "title" and t.locale = '+lang+')as "title" ,c.image FROM clients c where c.id='+id
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


Client.findAll =  (lang,result)=> {
    const query = 'SELECT c.id,(select t.value from translations t where t.reference_id = c.id AND t.reference_type = "clients" and t.translation_type = "title" and t.locale = '+lang+')as "title" ,c.image FROM clients c';
    dbConn.query(query,  (err, res)=> {
        if(err) {
            result(null, err)
        }
        else{
            result(null, res)
        }
    })   
}

Client.update = (id, client, result) => {
  let imageJson = JSON.stringify(client.image)
  dbConn.query("UPDATE clients SET active=?,image=? WHERE id = ?", [client.active,imageJson, id],  (err, res) =>{
        if(err) {
            return result(null, err)
        }else{  
            const transData = [
                {   translation_type: 'title',
                    reference_type: 'clients',
                    locale: client.locale,
                    value: client.title,
                    reference_id: id,
                }
            ]
           for(let i = 0; i < transData.length; i++){
                let update  = transData[i]
                let updateQuery  = "update translations SET value='"+update.value+"' WHERE reference_id = "+id+ " AND  reference_type = 'clients' AND locale = '"+update.locale+"' AND translation_type='"+update.translation_type+"' " 
 
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
                      let {title,image} = client //destructure of obj object
                      result(null, { id: id, title,image });
                    
                });
            }
        }
    }); 
};
Client.deleteByID = (id, result)=>{
    const query = "DELETE FROM clients WHERE id ="+id
     dbConn.query(query,  (err, res)=> {
        if(err) {
            return result(null, err);
        }
        else{
            const trans = `DELETE FROM translations WHERE reference_id =${id} AND reference_type= "clients"`
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

module.exports= Client;