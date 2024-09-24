const { body, validationResult } = require('express-validator');
const employedModel = require('../models/employedModel')

const insertData = async(body)=>{
    try {
      console.log("Ingresando");
      const result = await employedModel.insertData(body);
      if(!result.success){
          throw new Error('Error al insertar ')
      }
        console.log("Empleado Ingresado Ingresado");
        return {status: 200,msg: 'Empleado Registrado con exito'}
      } catch (e) {
        return {status: 500,msg:e.message};
      }    
}

const getData = async () => {
  try {
    console.log("Extrayendo datos de empleados.");
    const result = await employedModel.getData();

    if (!result.success) {
      throw new Error('Error al extraer datos.');
    }

    return { status: 200, msg: 'Empleados encontrados', data:result.data };
  } catch (error) {
    console.log(error);
    return { status: 500, msg: error.message };
  }
};

const deleteEmployed = async (req, res) => {
  const { id } = req.params; // Obtener el id de los parámetros de la URL
  try {
    console.log(`Eliminando empleado con ID: ${id}`);
    const result = await employedModel.deleteEmployed(id);

    if (!result.success) {
      throw new Error('Error al eliminar.');
    }

    return res.status(200).json({ status: 200, msg: result.msg });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 500, msg: error.message });
  }
};

  module.exports = {
    insertData,
    getData,
    deleteEmployed
  };
  