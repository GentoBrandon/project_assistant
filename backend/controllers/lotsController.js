const lotsModel = require('../models/lotsModel')

const getData = async ()=>{
    try{    
        const result = await lotsModel.getData()
        if(!result.success){
            const error = new Error('DAta Empty');
            error.status = 400;
            error.details = "Database doesnt have data"
            throw error;
        }
        return {status: 200,data: result.data};
    }catch(error){
        throw error;
    }
}

module.exports = {
    getData
}