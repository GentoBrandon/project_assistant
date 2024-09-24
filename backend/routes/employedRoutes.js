const express = require('express');
const 
{insertData} = require('../controllers/employedController');
const router = express.Router();

//router.post('/crear', createEmployed);

router.post('/crear', async(req, res)=>{
    try {
        await insertData(req.body);
        return res.status(200).json({msg: 'sucessfully'});

    } catch (e) {
        return res.status(500).json({msg: 'Server error', error: e.message });
        
    }
});

module.exports = router;
