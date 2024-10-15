const {validationResult}  = require('express-validator')
const subActivityModel = require('../models/subActivityModel')

const insertSubActivity = async (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error('Invalid value');
        error.status = 400;
        error.stack = errors.array();
        return next(error)
    }
    try{
        const resultInsert = await subActivityModel.insertSubActivity(req.body);
        if(!resultInsert.success){
            const error = new Error(resultInsert.message);
            error.status = 404;
            throw error
        }
        return res.status(201).json({msg: 'Sub Activity Saved successfully'})

    }catch(error){
        next(error)
    }
}

const getSubActivities = async (req,res,next)=>{
    try {
        const resultData = await subActivityModel.getSubActivities();
        if(!resultData.success){
            const error = new Error(resultData.msg);
            error.status = 404;
            throw error
        }
        return res.status(200).json(resultData.data)
    } catch (error) {
        next(error)
    }
}

const searchSubActivity = async (req,res,next)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        const error = new Error('Invalid value');
        error.status = 400;
        error.stack = errors.array();
        return next(error)
    }
    try {
        const {id} = req.params;
        const resultData = await subActivityModel.searchSubActivity(id);
        if(!resultData.success){
            const error = new Error(resultData.msg);
            error.status = 404;
            throw error
        }
        return res.status(200).json(resultData.data);
    } catch (error) {
        next(error)
    }

}

const deleteSubActivity = async (req,res,next)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        const error = new Error('Invalid value');
        error.status = 400;
        error.stack = errors.array();
        return next(error)
    }
    try {
        const {id} = req.params;
        const resultDelete = await subActivityModel.deleteSubActivity(id);
        if(!resultDelete.success){
            const error = new Error(resultDelete.msg);
            error.status = 404;
            throw error
        }
        return res.status(200).json({msg: 'Sub Activity Deleted successfully'})
    } catch (error) {
        next(error)
    }
}
const updateSubActivity = async (req,res,next)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        const error = new Error('Invalid value');
        error.status = 400;
        error.stack = errors.array();
        return next(error)
    }
    try {
        const {id} = req.params;
        const resultUpdate = await subActivityModel.updateSubActivity(id, req.body);
        if(!resultUpdate.success){
            const error = new Error(resultUpdate.msg);
            error.status = 404;
            throw error
        }
        return res.status(200).json({msg: 'Sub Activity Updated successfully'})
    } catch (error) {
        next(error) 
    }
}
const searcNameSubActivity = async (req,res,next)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        const error = new Error('Invalid value');
        error.status = 400;
        error.stack = errors.array();
        return next(error)
    }
    try {
        const {name_sub_activity} = req.params;
        const resultData = await subActivityModel.searcNameSubActivity(name_sub_activity);
        if(!resultData.success){
            const error = new Error(resultData.msg);
            error.status = 404;
            throw error
        }
        return res.status(200).json(resultData.data);
    } catch (error) {
        next(error)
    }
}
module.exports= {
    insertSubActivity,
    getSubActivities,
    searchSubActivity,
    deleteSubActivity,
    updateSubActivity,
    searcNameSubActivity
}