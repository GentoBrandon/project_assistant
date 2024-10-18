const knex = require('../../../config/db');

const inserNewEmployeeActivity = async (body) => {
    try {
        const resultInsert = await knex('employees_activities').insert({
            employee_id : body.employee_id,
            lot_id : body.lot_id,
            activity_id : body.activity_id,
            sub_activity_id : body.sub_activity_id,
            date : body.date,
        })
        if(!resultInsert){
            return {
                success : false,
                message : "Dont save the employees' activity " 
            }
        }
        return {
            success : true,
            message : 'The employees activity was saved successfully'
        }
    } catch (error) {
        throw{
            message : 'Error to save the employees activity',
            stack: error.stack
        };
        
    }
}

const getAllActivitiesEmployees = async ()=>{
    try {
        const resultData = await knex('employees_activities').select('*');
        if(!resultData){
            return {
                success: false,
                message: "Data not found"
                        
            }
        }
        return {
            success: true,
            message: "Data Found Successfylly",
            data : resultData
        }
    } catch (error) {
        throw{
            message : 'Error to get the employees activity',
            stack : error.stack   
        }
    }
}
const editEmployeeActivity = async (id,body) =>{
    try {
        const resultEdit = await knex('employees_activities').where({id: id}).update({
            employee_id : body.employee_id,
            lot_id : body.lot_id,
            activity_id : body.activity_id,
            sub_activity_id : body.sub_activity_id,
            date : body.date,
        
        })

        if(!resultEdit){
            return {
                success : false,
                message : "Dont save the employees' activity "
            }
        }
        return {
            success : true,
            message : 'The employees activity was update successfully'
        }
    } catch (error) {
        throw{
            message : 'Error to update the employees activity',
            stack: error.stack
        }
    }
}

const deleteEmployeeActivity = async (id) =>{
    try{
        const resultDelete = await knex('employees_activities').where({id: id}).del();
        if(!resultDelete){
            return {
                success : false,
                message : "Dont delete the employees' activity "
            }
        }
        return {
            success : true,
            message : 'The employees activity was delete successfully'
        }
    }catch(error){
        throw{
            message : 'Error to delete the employees activity', 
            stack: error.stack
        }
}
}
module.exports = {
    inserNewEmployeeActivity,
    getAllActivitiesEmployees,
    editEmployeeActivity,
    deleteEmployeeActivity
}