const employedModel = require('../models/employedModel');

const insertData = async (body) => {
  try {
    console.log('Ingresando');
    const result = await employedModel.insertData(body);
    if (!result.success) {
      const error = new Error('Error al insertar');
      error.status = 400;
      throw error;
    }
    console.log('Empleado Ingresado Ingresado');
    return { status: 200, msg: 'Empleado Registrado con exito' };
  } catch (error) {
    throw error;
  }
};

const getData = async () => {
  try {
    console.log('Extrayendo datos de empleados.');
    const result = await employedModel.getData();

    if (!result.success || result.data.length === 0) {
      console.log('hubo un error o no hay empleados');
      const error = new Error('Data not Found');
      error.status = 404;
      error.details = 'the database is empty';
      throw error;
    }

    return { status: 200, msg: 'Empleados encontrados', data: result.data };
  } catch (error) {
    throw error;
  }
};
const deleteEmployed = async (params) => {
  try {
    const id = Number(params.id);
    if (isNaN(id) || id <= 0) {
      const error = new Error('invalid ID provided');
      error.status = 400;
      throw error;
    }

    const result = await employedModel.deleteEmployed(id);
    if (!result.success) {
      const error = new Error(result.msg);
      error.status = 400;
      throw error;
    }
    console.log(`Eliminando empleado con ID: ${id}`);
    return { status: 200, msg: result.msg };
  } catch (error) {
    throw error;
  }
};

const searchEmployed = async (id) => {
  try {
    const result = await employedModel.searchEmployed(id);
    if (!result.success) {
      const error = new Error('User not Found Error');
      error.status = 400;
      error.message =
        'User count find because doesnt be registered or is deleted';
      throw error;
    }
    return { status: 200, data: result.data };
  } catch (error) {
    throw error;
  }
};
const updateEmployee = async (body, id) => {
  try {
    const result = await employedModel.updateEmployee(body, id);
    if (!result.success) {
      const error = new Error('Update Employed Error');
      error.status = 400;
      throw error;
    }
    return { status: 200, msg: 'employed updated successfully' };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  insertData,
  getData,
  deleteEmployed,
  searchEmployed,
  updateEmployee,
};
