const express = require('express');
const {
  deleteEmployed,
  insertData,
  getData,
  searchEmployed,
} = require('../controllers/employedController');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const validatorData = require('../middleware/validateDataInput');
//router.post('/crear', createEmployed);

router.post('/crear', validatorData.SingUpCheck(), async (req, res) => {
  const resultsData = validationResult(req);
  if (!resultsData.isEmpty()) {
    console.log('field Empty');
    return res.status(400).json({ errors: resultsData.array() });
  }
  try {
    const result = await insertData(req.body);
    return res.status(result.status).json({ msg: result.msg });
  } catch (e) {
    return res.status(500).json({ msg: 'Error al Servidor' });
  }
});

router.get('/viewEmployed', async (req, res) => {
  try {
    const result = await getData(); // Obtiene el resultado del controlador
    return res.status(result.status).json({ data: result.data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
});

router.delete('/deleteEmployed/:id', async (req, res) => {
  try {
    const result = await deleteEmployed(req.params);
    return res.status(result.status).json({ msg: result.msg });
  } catch (error) {
    return res.status(result.status).json({ msg: result.msg });
  }
});

router.get('/searchEmployed/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await searchEmployed(id);
    if (!result.success) {
      throw new Error('No se pudo Buscar');
    }
    return res.status(result.status).json({ data: result.data });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});
module.exports = router;
