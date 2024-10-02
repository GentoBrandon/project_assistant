const knex = require('../models/db');

const insertData = async(body)=> {
    try{
        await knex('employed').insert({
            name: body.name,
            last_name: body.last_name,
            dpi: body.dpi,
            number_IGGS: body.number_IGGS,
            phone_number: body.phone_number,
            number_NIT: body.number_NIT
          });
          return {success:true};
    }catch(err){
        console.error(err);
        return {success: false};
    }    
}

const getData = async() =>{
    try {
        const data = await knex('employed').select('*');
        return {success:true, data };
    } catch (error) {
        console.log(error);
        return {success:false, error: error.message}
    }
}

const deleteEmployed = async (id) => {
    try {
      const rowsDeleted = await knex('employed').where({ id }).del(); // Eliminar empleado por su id
      if (rowsDeleted === 0) {
        return { success: false, msg: 'No se encontró el empleado con el ID especificado.' };
      }
      return { success: true, msg: 'Empleado eliminado correctamente.' };
    } catch (error) {
      console.log(error);
      return { success: false, error: error.message };
    }
};


module.exports={
    insertData,
    getData,
    deleteEmployed
};