const employedModel = require('../models/employedModel');

const insertData = async (body) => {
  try {
    console.log('Ingresando');
    const result = await employedModel.insertData(body);
    if (!result.success) {
      throw new Error('Error al insertar ');
    }
    console.log('Empleado Ingresado Ingresado');
    return { status: 200, msg: 'Empleado Registrado con exito' };
  } catch (e) {
    return { status: 500, msg: e.message };
  }
};

const getData = async () => {
  try {
    console.log('Extrayendo datos de empleados.');
    const result = await employedModel.getData();

    if (!result.success) {
      throw new Error('Error al extraer datos.');
    }

    return { status: 200, msg: 'Empleados encontrados', data: result.data };
  } catch (error) {
    console.log(error);
    return { status: 500, msg: error.message };
  }
};
const deleteEmployed = async (params) => {
  try {
    // Convertir el ID a número
    const id = Number(params.id);

    // Validar que el ID sea un número válido
    if (isNaN(id) || id <= 0) {
      return { status: 400, msg: 'ID inválido proporcionado' };
    }

    console.log(`Eliminando empleado con ID: ${id}`);

    // Llamar al modelo para eliminar el empleado
    const result = await employedModel.deleteEmployed(id);

    // Verificar si el proceso de eliminación fue exitoso
    if (!result.success) {
      return { status: 404, msg: result.msg }; // Empleado no encontrado o error
    }

    // Retornar respuesta exitosa
    return { status: 200, msg: result.msg };
  } catch (error) {
    // Manejo de errores
    console.error(`Error al eliminar el empleado con ID: ${params.id}`, error);
    return { status: 500, msg: 'Falló el servidor' };
  }
};

const searchEmployed = async (id) => {
  try {
    const result = await employedModel.searchEmployed(id);
    if (!result.success) {
      throw new Error('Error no se encontro el usuario');
    }
    return { success: true, status: 200, data: result.data };
  } catch (error) {
    return { success: false, status: 500, msg: error.message };
  }
};

module.exports = {
  insertData,
  getData,
  deleteEmployed,
  searchEmployed,
};
