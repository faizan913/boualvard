const dbConn = require('../../../config/db.config');


const Enquiry = function (enquiry) {
    this.active = enquiry.active
    this.archived = enquiry.archived
    this.facility = enquiry.facility
    this.community = enquiry.community
    this.first_name = enquiry.first_name
    this.last_name = enquiry.last_name
    this.email = enquiry.email
    this.phone = enquiry.phone
    this.message = enquiry.message
    this.locale = enquiry.locale
    this.created_at = new Date()
    this.updated_at = new Date()
}
 Enquiry.create = function (enquiry, result) {
    //console.log(product)
    const videoData = {
        facility:enquiry.facility,
        community :enquiry.community,
        first_name: enquiry.first_name,
        last_name : enquiry.last_name,
        email: enquiry.email,
        phone : enquiry.phone,
        message : enquiry.message,
        active : enquiry.active,
        created_at: new Date(),
        updated_at: new Date()
    }

    dbConn.query("INSERT INTO enquiries set ?", videoData, function (err, res) {
        if (err) {
           return result(err, null);
        }else{
            let {  created_at,updated_at,locale,archived, ...all} = enquiry
            result(null, { id: res.insertId, ...all });
        }
        
    })
}


  

module.exports = Enquiry