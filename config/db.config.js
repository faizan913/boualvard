const mysql = require('mysql');

/*  const dbConn = mysql.createPool({
  connectionLimit: 100, //important
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'boualvard_admin',
  debug: false
});   */ 
 
//Create db connection for heroku
const dbConn = mysql.createPool({
  connectionLimit: 100, //important
  host     : 'us-cdbr-east-05.cleardb.net',
  user     : 'bcb3b5578311fc',
  password : '7d908924',
  database : 'heroku_23aed3ae45ecfd0',
  debug: false
}); 

/* const dbConn = mysql.createPool({
  connectionLimit: 100, //important
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  debug: false
});    */  
/* const dbConn = mysql.createPool({
  connectionLimit: 100, //important
  host: 'mazola-prod.cycabjdejgwp.me-south-1.rds.amazonaws.com',
  user: 'mazola_admin',
  password: 'AdaGW9jyssp63p8t',
  database: 'mazola-prod',
  debug: false
});  */
dbConn.getConnection(function (err, connection) {
  if (err) throw err;
  console.log("Database successfully Connected!");
})
module.exports = dbConn

/* mysql://
bcb3b5578311fc
7d908924
us-cdbr-east-05.cleardb.net */