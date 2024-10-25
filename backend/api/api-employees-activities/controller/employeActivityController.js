const employeActivityModel = require('../model/employeActivityModel');
const {validationResult} = require('express-validator');
const createNewEmployeeActivity = async (req, res, next) => {
    const result = validationResult(req);
    if(!result.isEmpty()){
        const error = new Error('Validation failed, entered data is incorrect');
        error.statusCode = 422;
        error.details = result.array();
        return next (error);
    }   
    try{
        const resultInsert = await employeActivityModel.inserNewEmployeeActivity(req.body);
        if(!resultInsert.success){
            const error = new Error(resultInsert.message);
            error.statusCode = 400;
            throw error;
        }
        res.status(201).json({message : resultInsert.message});
    }catch(error){
        next(error);
    }
}

const getAllEmployeeActivities = async (req, res, next) => {
    try {
        const resultData = await employeActivityModel.getAllActivitiesEmployees()
        if(!resultData.success){
            const error = new Error(resultData.message)
            error.status = 400
            throw error 
        }
        return res.status(200).json(resultData.data)
    } catch (error) {
        next(error);
    }
}

const updateEmployeeActivity = async (req,res,next)=>{
    const result = validationResult(req);
    if(!result.isEmpty()){
        const error = new Error('Validation failed, entered data is incorrect');
        error.statusCode = 422;
        error.details = result.array();
        return next (error);
    }   
    try{
        const {id} = req.params
        const resultUpdate = await employeActivityModel.editEmployeeActivity(id,req.body);
        if(!resultUpdate.success){
            const error = new Error(resultUpdate.message);
            error.statusCode = 400;
            throw error;
        }
        res.status(200).json({message : resultUpdate.message});
    }catch(error){
        next(error);
    }
}

const deletedEmployeeActivity = async (req,res,next)=>{
    const result = validationResult(req);
    if(!result.isEmpty()){
        const error = new Error('Validation failed, entered data is incorrect');
        error.statusCode = 422;
        error.details = result.array();
        return next (error);
    }   
    try {
        const {id} = req.params
        const result  = await employeActivityModel.deleteEmployeeActivity(id);
        if(result.success){
            const error = new Error(result.message)
            error.status = 400
            throw error
        }
        res.status(200).json({message : result.message})
    } catch (error) {
        next(error);
    }
}
const getCountAllRegActivities = async(req,res,next)=>{
    try {
        const resultCount = await employeActivityModel.countAllRegActivities();
        if(!resultCount.success){
            const error = new Error(resultCount.message)
            error.status = 400
            throw error
        }
        return res.status(200).json({count: resultCount.data})
    } catch (error) {
        next(error);
    }
}
module.exports = {
    createNewEmployeeActivity,
    getAllEmployeeActivities,
    updateEmployeeActivity,
    deletedEmployeeActivity,
    getCountAllRegActivities
}