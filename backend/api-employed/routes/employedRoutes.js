const express = require('express');
const {
  deleteEmployed,
  insertData,
  getData,
  searchEmployed,
  updateEmployee,
} = require('../controllers/employedController');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const validatorData = require('../validators/validataEmployedInput');

router.post('/crear', validatorData.SingUpCheck(), async (req, res, next) => {
  const resultsData = validationResult(req);
  if (!resultsData.isEmpty()) {
    console.log('field Empty');
    const error = new Error('Validation Error');
    error.status = 400;
    error.details = resultsData.array();
    return next(error);
  }
  try {
    const result = await insertData(req.body);
    return res.status(result.status).json({ msg: result.msg });
  } catch (error) {
    next(error);
  }
});

router.get('/viewEmployed', async (req, res, next) => {
  try {
    const result = await getData();
    return res.status(result.status).json({ data: result.data });
  } catch (error) {
    next(error);
  }
});

router.delete(
  '/deleteEmployed/:id',
  validatorData.inputId(),
  async (req, res, next) => {
    const resultsData = validationResult(req);
    if (!resultsData.isEmpty()) {
      console.log('field Empty');
      const error = new Error('Validation Error');
      error.status = 400;
      error.details = resultsData.array();
      return next(error);
    }
    try {
      const result = await deleteEmployed(req.params);
      return res.status(result.status).json({ msg: result.msg });
    } catch (error) {
      next(error);
    }
  }
);
router.get(
  '/searchEmployed/:id',
  validatorData.inputId(),
  async (req, res, next) => {
    const resultsData = validationResult(req);
    if (!resultsData.isEmpty()) {
      console.log('field Empty');
      const error = new Error('Validation Error');
      error.status = 400;
      error.details = resultsData.array();
      return next(error);
    }
    try {
      const { id } = req.params;
      const result = await searchEmployed(id);
      return res.status(result.status).json({ data: result.data });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/updateEmployed/:id',
  validatorData.checkInputsOptionalEmployed(),
  async (req, res, next) => {
    const resultsData = validationResult(req);
    if (!resultsData.isEmpty()) {
      console.log('field Empty');
      const error = new Error('Validation Error');
      error.status = 400;
      error.details = resultsData.array();
      return next(error);
    }
    try {
      const { id } = req.params;
      const result = await updateEmployee(req.body, id);
      return res.status(result.status).json({
        msg: result.msg,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
