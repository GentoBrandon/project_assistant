const express = require('express');
const { route } = require('./employedRoutes');
const router = express.Router();
const lotsController = require('../controllers/lotsController');
router.get('/getData', async (req, res, next) => {
    try{  
        const result = await lotsController.getData();
        return res.status(result.status).json({data : result.data});
    }catch(error){
        next(error);
    }
});

module.exports = router;
