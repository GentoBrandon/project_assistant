const e = require('express');
const activitiesModel = require('../models/activityModel');
const validateActivity = require('../validators/inputValidate');
const { validationResult } = require('express-validator');
const getData = async (req, res, next) => {
  try {
    const resultData = await activitiesModel.getData();
    if (!resultData.success) {
      const error = new Error(resultData.message);
      error.status = 404;
      throw error;
    }
    return res.status(200).json({ data: resultData.data });
  } catch (error) {
    next(error);
  }
};
const insertData = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error();
    error.status = 400;
    error.stack = errors.array();
    error.message = errors.array();
    return next(error);
  }
  try {
    const resultData = await activitiesModel.insertData(req.body);
    if (!resultData.success) {
      const error = new Error(resultData.msg | 'Error to save the data');
      error.status = 400;
      throw error;
    }
    return res.status(201).json({ msg: 'Data Saved successfully' });
  } catch (error) {
    next(error);
  }
};

const searchData = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error();
    error.status = 400;
    error.details = 'The input value is incorrect';
    error.message = errors.array();
    return next(error);
  }
  try {
    const { id } = req.params;
    const resultData = await activitiesModel.searchData(id);
    if (!resultData.success) {
      const error = new Error(resultData.msg);
      error.status = 400;
      throw error;
    }
    return res.status(200).json({ data: resultData.activity });
  } catch (error) {
    next(error);
  }
};
const deletActivity = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error();
    error.status = 400;
    error.details = 'The input value is incorrect';
    error.message = errors.array();
    return next(error);
  }
  try {
    const { id } = req.params;
    const activityDelet = await activitiesModel.deleteActivity(id);
    if (!activityDelet.success) {
      const error = new Error(activityDelet.msg);
      error.status = 404;
      throw error;
    }
    return res.status(200).json({ msg: activityDelet.msg });
  } catch (error) {
    next(error);
  }
};

const updateActivity = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error();
    error.status = 400;
    error.details = 'The input value is incorrect';
    error.message = errors.array();
    return next(error);
  }
  try {
    const { id } = req.params;

    const returnData = await activitiesModel.updateActivity(id, req.body);
    if (!returnData.success) {
      const error = new Error(returnData.msg);
      error.status = 404;
      throw error;
    }
    return res.status(200).json({ msg: returnData.msg });
  } catch (error) {
    next(error);
  }
};

const getAllActivities = async (req,res,next)=>{
  try{
      const resultData = await activitiesModel.countActivities();
      if(!resultData.success){
        const error = new Error('Error while counting activities');
        error.status = 404;
        throw error;
      }
      return res.status(200).json(resultData.data)
  }catch(error){
    next(error);
  }
}
module.exports = {
  getData,
  insertData,
  searchData,
  deletActivity,
  updateActivity,
  getAllActivities
};
