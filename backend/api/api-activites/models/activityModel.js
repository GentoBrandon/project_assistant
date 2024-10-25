const knex = require('../../../config/db');
const getData = async () => {
  try {
    const resultData = await knex('activities').select('*');
    if (resultData.length === 0) {
      return {
        success: false,
        message: 'data Empty',
      };
    }
    return {
      success: true,
      data: resultData,
    };
  } catch (error) {
    throw {
      message: 'Error while getting  data',
      error: error.message,
      stack: error.stack,
    };
  }
};

const insertData = async (body) => {
  try {
    const resultData = await knex('activities').insert({
      name_activity: body.name_activity,
    });

    if (resultData === 0) {
      return {
        success: false,
        msg: 'Activity doesnt saved',
      };
    }
    return { success: true };
  } catch (error) {
    console.log('Failed to save data');
    throw {
      message: 'Error while saving data',
      stack: error.stack,
    };
  }
};

const searchData = async (id) => {
  try {
    const resultData = await knex('activities').where({ id }).first();
    if (!resultData) {
      return {
        success: false,
        msg: 'count find the activity',
      };
    }
    return { success: true, activity: resultData };
  } catch (error) {
    console.log('activity found Error');
    throw {
      message: 'Error find Activity',
      stack: error.stack,
    };
  }
};
const deleteActivity = async (id) => {
  try {
    // Paso 1: Verificar si la actividad existe
    const activityFound = await searchData(id);

    if (!activityFound.success) {
      return {
        success: false,
        msg: 'Activity not found or Activity already was deleted',
      };
    }

    // Paso 2: Eliminar la actividad
    const activityDeleted = await knex('activities').where({ id }).del();

    // Verificar si la eliminación fue exitosa
    if (activityDeleted === 0) {
      return {
        success: false,
        msg: 'Could not delete Activity',
      };
    }

    // Devolver éxito si la actividad fue eliminada
    return {
      success: true,
      msg: 'Activity deleted successfully',
    };
  } catch (error) {
    console.log('Error while deleting activity', error);

    throw {
      message: 'Error while deleting activity',
      stack: error.stack,
    };
  }
};

const updateActivity = async (id, body) => {
  try {
    const activityFound = await searchData(id);
    if (!activityFound.success) {
      return {
        success: false,
        msg: 'Activity not found',
      };
    }
    const activityUpdated = await knex('activities').where({ id }).update({
      name_activity: body.name_activity,
    });

    if (activityUpdated === 0) {
      return {
        success: false,
        msg: 'Activity not found or not updated',
      };
    }
    return { success: true, msg: 'Activity updated successfully' };
  } catch (error) {
    console.log('Error while updating activity', error);
    throw {
      message: 'Error while updating activity',
      stack: error.stack,
    };
  }
};

const countActivities = async () =>{
  try {
    const resultCounter = await knex('activities').count('id');
    if(!resultCounter){
      return {
        success: false
      }
    }
    return {
      success: true,
      data : resultCounter[0]
    }
  } catch (error) {
    throw{
      message: 'Error while counting activities',
      error: error.message,
      stack: error.stack
    }
  }
}
module.exports = {
  getData,
  insertData,
  searchData,
  deleteActivity,
  updateActivity,
  countActivities
};
