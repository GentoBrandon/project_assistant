const { body, validationResult } = require('express-validator');
const knex = require('../models/db');

const insertData = async(body)=>{
    try {
        console.log("Ingresando");
        await knex('employed').insert({
          name: body.name,
          last_name: body.last_name,
          dpi: body.dpi,
          number_IGGS: body.number_IGGS,
          phone_number: body.phone_number,
          number_NIT: body.number_NIT
        });
        console.log("Ingresado");
      } catch (e) {
        throw new Error('Database Insertion Failed'); 
      }    
}
  module.exports = {
    insertData
  };
  