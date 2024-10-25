const lotsModel = require('../models/lotsModel');

const getData = async () => {
  try {
    const result = await lotsModel.getData();
    if (!result.success) {
      const error = new Error('Data Empty');
      error.status = 404;
      throw error;
    }
    return { status: 200, data: result.data };
  } catch (error) {
    throw error;
  }
};

const getDataById = async (id) => {
  try {
    const result = await lotsModel.getDataById(id);
    if (!result.success) {
      const error = new Error('Data not found');
      error.status = 404;
      throw error;
    }
    return { status: 200, data: result.data };
  } catch (error) {
    throw error;
  }
};

const insertData = async (body) => {
  try {
    await lotsModel.insertData(body);
    return { status: 201, data: 'Data inserted successfully' };
  } catch (error) {
    throw error;
  }
};

const updateData = async (id, body) => {
  try {
    const result = await lotsModel.updateData(id, body);
    if (!result.success) {
      const error = new Error('Data not found for update');
      error.status = 404;
      throw error;
    }
    return { status: 200, data: 'Data updated successfully' };
  } catch (error) {
    throw error;
  }
};

const deleteData = async (id) => {
  try {
    const result = await lotsModel.deleteData(id);
    if (!result.success) {
      const error = new Error('Data not found for deletion');
      error.status = 404;
      throw error;
    }
    return { status: 200, data: 'Data deleted successfully' };
  } catch (error) {
    throw error;
  }
};

const countAllLots = async(req,res,next)=>{
  try {
    const resultCountLots = await lotsModel.countLots();
    if(!resultCountLots.success){
      const error = new Error('Data Empty');
      error.status = 404;
      throw error;
    }
    return res.status(200).json(resultCountLots.data);
  } catch (error) {
    next(error);
  }
}
module.exports = {
  getData,
  getDataById,
  insertData,
  updateData,
  deleteData,
  countAllLots
};
