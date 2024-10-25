const express = require('express');
const router = express.Router();
const lotsController = require('../controllers/lotsController');
const validator = require('../validators/validateDataInput');
const { validationResult } = require('express-validator');
// GET all lots
router.get('/getData', async (req, res, next) => {
  try {
    const result = await lotsController.getData();
    return res.status(result.status).json({ data: result.data });
  } catch (error) {
    next(error);
  }
});

// GET lot by ID
router.get(
  '/getData/:id',
  validator.validateInputId(),
  async (req, res, next) => {
    const resultinput = validationResult(req);
    if (!resultinput.isEmpty()) {
      const error = new Error('Input ID Error');
      error.details = resultinput.array();
      return next(error);
    }
    try {
      const result = await lotsController.getDataById(req.params.id);
      return res.status(result.status).json({ data: result.data });
    } catch (error) {
      next(error);
    }
  }
);

// POST new lot
router.post(
  '/insertData',
  validator.checkInputData(),
  async (req, res, next) => {
    const resultInput = validationResult(req);
    if (!resultInput.isEmpty()) {
      const error = new Error('Data input Error');
      error.details = resultInput.array();
      return next(error);
    }
    try {
      const result = await lotsController.insertData(req.body);
      return res.status(result.status).json({ message: result.data });
    } catch (error) {
      next(error);
    }
  }
);

// PUT update lot
router.put(
  '/updateData/:id',
  validator.validateDataUpdate(),
  async (req, res, next) => {
    const resultInput = validationResult(req);
    if (!resultInput.isEmpty()) {
      const error = new Error('Error Data Input');
      error.details = resultInput.array();
      return next(error);
    }
    try {
      const result = await lotsController.updateData(req.params.id, req.body);
      return res.status(result.status).json({ message: result.data });
    } catch (error) {
      next(error);
    }
  }
);

// DELETE lot
router.delete(
  '/deleteData/:id',
  validator.validateInputId(),
  async (req, res, next) => {
    try {
      const result = await lotsController.deleteData(req.params.id);
      return res.status(result.status).json({ message: result.data });
    } catch (error) {
      next(error);
    }
  }
);

router.get('/get-count-lots',lotsController.countAllLots)
module.exports = router;
