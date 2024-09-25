const knex = require('../database/db');

const insertData = async (body) => {
  try {
    await knex('employed').insert({
      name: body.name,
      last_name: body.last_name,
      dpi: body.dpi,
      number_IGGS: body.number_IGGS,
      phone_number: body.phone_number,
      number_NIT: body.number_NIT,
    });
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false };
  }
};

const getData = async () => {
  try {
    const data = await knex('employed').select('*');
    return { success: true, data };
  } catch (error) {
    console.log(error);
    return { success: false, error: error.message };
  }
};

const deleteEmployed = async (id) => {
  try {
    // Buscar si el usuario existe
    const userFound = await knex('employed').where({ id }).select('id').first(); // Usar .first() para obtener el primer resultado

    // Validar si el usuario no fue encontrado
    if (!userFound) {
      return { success: false, msg: 'User not found' }; // Usuario no encontrado
    }

    // Eliminar al usuario si fue encontrado
    await knex('employed').where({ id }).del();
    return { success: true, msg: 'User deleted successfully' };
  } catch (err) {
    console.error(err);
    return { success: false, msg: 'User not deleted' };
  }
};
const searchEmployed = async (id) => {
  try {
    const result = await knex('employed').where({ id }).select('*').first();
    if (!result) {
      return { success: false };
    }
    return { success: true, data: result };
  } catch (err) {
    return { success: false, error: err };
  }
};
module.exports = {
  insertData,
  getData,
  deleteEmployed,
  searchEmployed,
};
