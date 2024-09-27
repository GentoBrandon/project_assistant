const knex = require('../database/db');

const getData = async () => {
  try {
    const result = await knex('lots').select('*');
    if (result.length === 0) {
      return { success: false };
    }
    return { success: true, data: result };
  } catch (error) {
    throw new Error('Error retrieving data from database');
  }
};

const getDataById = async (id) => {
  try {
    const result = await knex('lots').where('id', id).first();
    if (!result) {
      return { success: false };
    }
    return { success: true, data: result };
  } catch (error) {
    throw new Error('Error retrieving data from database');
  }
};

const insertData = async (body) => {
  try {
    await knex('lots').insert({
      name_lots: body.name_lots,
      area: body.area,
    });
    return { success: true };
  } catch (error) {
    throw new Error('No se pudo Ingresar');
  }
};

const updateData = async (id, body) => {
  try {
    const updatedRows = await knex('lots').where('id', id).update({
      name_lots: body.name_lots,
      area: body.area,
    });
    if (updatedRows === 0) {
      return { success: false };
    }
    return { success: true };
  } catch (error) {
    throw new Error('No se pudo actualizar');
  }
};

const deleteData = async (id) => {
  try {
    const deletedRows = await knex('lots').where('id', id).del();
    if (deletedRows === 0) {
      return { success: false };
    }
    return { success: true };
  } catch (error) {
    throw new Error('No se pudo eliminar');
  }
};

module.exports = {
  getData,
  getDataById,
  insertData,
  updateData,
  deleteData,
};
