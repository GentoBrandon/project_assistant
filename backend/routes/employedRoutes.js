const express = require('express');
const {deleteEmployed,insertData, getData} = require('../controllers/employedController');
const router = express.Router();

//router.post('/crear', createEmployed);

router.post('/crear', async(req, res)=>{
    try {
       const result=  await insertData(req.body);
        return res.status(result.status).json({msg: result.msg});

    } catch (e) {
        return res.status(500).json({msg: result.msg});
        
    }
});


router.get('/viewEmployed', async (req, res) => {
    try {
        const result = await getData(); // Obtiene el resultado del controlador
        return res.status(result.status).json({ data:result.data});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server error' });
    }
});

router.delete('/deleteEmployed/:id', async (req, res) => {
    try {
        await deleteEmployed(req, res);
        return res.status(200).json({msg : 'Eliminado exitosamente'});
    } catch (error) {
        return res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
