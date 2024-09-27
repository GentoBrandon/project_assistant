const express = require('express');
const router = express.Router();
const lotsController = require('../controllers/lotsController');

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
router.get('/getData/:id', async (req, res, next) => {
  try {
    const result = await lotsController.getDataById(req.params.id);
    return res.status(result.status).json({ data: result.data });
  } catch (error) {
    next(error);
  }
});

// POST new lot
router.post('/insertData', async (req, res, next) => {
  try {
    const result = await lotsController.insertData(req.body);
    return res.status(result.status).json({ message: result.data });
  } catch (error) {
    next(error);
  }
});

// PUT update lot
router.put('/updateData/:id', async (req, res, next) => {
  try {
    const result = await lotsController.updateData(req.params.id, req.body);
    return res.status(result.status).json({ message: result.data });
  } catch (error) {
    next(error);
  }
});

// DELETE lot
router.delete('/deleteData/:id', async (req, res, next) => {
  try {
    const result = await lotsController.deleteData(req.params.id);
    return res.status(result.status).json({ message: result.data });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
