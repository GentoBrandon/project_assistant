const db = require('../../../config/db');


const insertSubActivity = async (body) => {
    try{
        const resultInsert = await db('sub_activities').insert({
            name_sub_activity: body.name_sub_activity,
            description: body.description,
            id_actividad: body.id_actividad
        })
        if(resultInsert===0){
            return {
                success: false,
                message: 'Error inserting sub activity'
            }
        }
        return {
            success: true
        }
    }catch(error){
        throw{
            msg: 'Error while sub_activity',
            stack: error.stack
        }
    }
}
const getSubActivities = async () => {
    try {
        const resultData = await db('sub_activities').select('*');
        if(!resultData){
            return{
                success: false,
                msg: 'Data not found'
            }
        }
        return {
            success: true,
            data: resultData
        }
    } catch (error) {
        throw{
            msg: 'Error while get sub_activities',
            stack: error.stack
        }
    }
}

const searchSubActivity = async (id) => {
    try {
        const resultData = await db('sub_activities').select('*').where('id', id).first();
        if(!resultData){
            return{
                success: false,
                msg: 'Data not found'
            }
        }
        return{
            success: true,
            data: resultData
        }
    } catch (error) {
        throw{
            msg: 'Error while get sub_activity',
            stack: error.stack
    }
}
}

const deleteSubActivity = async (id) => {
    try {
        const resultDelete = await db('sub_activities').where('id', id).del();
        if(resultDelete===0){
            return{
                success: false,
                msg: 'Error deleting sub_activity'
            }
        }
        return{
            success: true
        }
    } catch (error) {
        throw{
            msg: 'Error while delete sub_activity',
            stack: error.stack
        }
    }
}
const updateSubActivity = async (id, body) => {
    try {
        const resultUpdate = await db('sub_activities').where('id', id).update({
            name_sub_activity: body.name_sub_activity,
            description: body.description,
            id_actividad: body.id_actividad
        })
        if(resultUpdate===0){
            return{
                success: false,
                msg: 'Error updating sub_activity'
            }
        }
        return{
            success: true
        }
    } catch (error) {
        throw{
            msg: 'Error while update sub_activity',
            stack: error.stack
            }
    }
}
const searcNameSubActivity = async (name_sub_activity) => {
    try {
        const resultData = await db('sub_activities').select('*').where('name_sub_activity', name_sub_activity).first();
        if(!resultData){
            return{
                success: false,
                msg: 'Data not found'
            }
        }
        return{
            success: true,
            data: resultData
        }
    } catch (error) {
        throw{
            msg: 'Error while get sub_activity',
            stack: error.stack
    }
}
}

const searchActivity = async (id_actividad) =>{
    try {
        const resultData = await db('sub_activities').select('*').where({id_actividad:id_actividad});
        console.log(resultData)
        if(!resultData){
            return{
                success: false,
                msg: 'Data not found'
            }
        }
        return{
            success: true,
            data: resultData
        }
    } catch (error) {   
        throw{
            msg: 'Error while get sub_activity',
            stack: error.stack
        }
        
    }
}
module.exports = {
    insertSubActivity,
    getSubActivities,
    searchSubActivity,
    deleteSubActivity,
    updateSubActivity,
    searcNameSubActivity,
    searchActivity
}