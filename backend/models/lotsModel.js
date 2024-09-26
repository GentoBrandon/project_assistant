const knex = require('../database/db');
const getData = async () => {
    try {
        console.log('getting data')
        const result = await knex('lots').select('*');
        if(result.length === 0){
            console.log('data empty');
            return {success: false};
        }
        console.log('Data gotten')
        return {success : true, data: result};
    } catch (error) {
        console.error('Database error:', error.message);
        throw new Error('Error retrieving data from database');
    }
}
module.exports = {
    getData
}