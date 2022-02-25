//const db = require('../../../config/db');
//const helper = require('../helper');
//const config = require('../../../config/db.config');
const programmingLanguages = require('../models/test');

async function getMultiple(req, res, next){
    var locale = (JSON.stringify(req.headers['locale']))
    let lang = (locale === undefined) ? "\"en\"" :locale  
    try {
        res.json(await programmingLanguages.getMultiple(lang));
      } catch (err) {
        console.error(`Error while getting programming languages `, err.message);
        next(err);
      }
}

module.exports = {
  getMultiple
}