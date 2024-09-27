const knex = require('../../config/db');

const insertData = async (body) => {
  try {
    await knex('employed').insert({
      name: body.name,
      last_name: body.last_name,
      direction: body.direction,
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
    const { success } = await searchEmployed(id); //knex('employed').where({ id }).select('id').first(); // Usar .first() para obtener el primer resultado
    if (!success) {
      return { success: false, msg: 'User already was deleted' }; // Usuario no encontrado
    }
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
const updateEmployee = async (body, id) => {
  try {
    const { success } = await searchEmployed(id); //knex('employed').where({ id }).select('id').first(); // Usar .first() para obtener el primer resultado
    if (!success) {
      return { success: false }; // Usuario no encontrado
    }
    const updateData = {}; // Objeto para almacenar los campos a actualizar

    // Solo agregar los campos presentes en el body a updateData
    if (body.name) updateData.name = body.name;
    if (body.last_name) updateData.last_name = body.last_name;
    if (body.direction) updateData.direction = body.direction;
    if (body.dpi) updateData.dpi = body.dpi;
    if (body.number_IGGS) updateData.number_IGGS = body.number_IGGS;
    if (body.phone_number) updateData.phone_number = body.phone_number;
    if (body.number_NIT) updateData.number_NIT = body.number_NIT;

    await knex('employed').where({ id }).update(updateData);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};
module.exports = {
  insertData,
  getData,
  deleteEmployed,
  searchEmployed,
  updateEmployee,
};
