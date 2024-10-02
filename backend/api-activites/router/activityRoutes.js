const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');
const validatorActivity = require('../validators/inputValidate');
router.get('/getdata', activityController.getData);
router.post(
  '/insertData',
  validatorActivity.inputActivity(),
  activityController.insertData
);
router.get(
  '/searchData/:id',
  validatorActivity.inputIDActivity(),
  activityController.searchData
);
router.delete(
  '/deleteActivity/:id',
  validatorActivity.inputIDActivity(),
  activityController.deletActivity
);
router.put(
  '/updateActivity/:id',
  validatorActivity.inputIDBodyActivity(),
  activityController.updateActivity
);
module.exports = router;
