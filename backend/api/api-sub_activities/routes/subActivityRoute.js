const subActivityController = require('../controllers/subActivityController');
const express = require('express');
const router = express.Router();
const validatorSubActivity = require('../validators/inputValidate');
router.post('/insert-sub-activity',validatorSubActivity.inputData(),subActivityController.insertSubActivity);
router.get('/get-sub-activities',subActivityController.getSubActivities);
router.get('/search-sub-activity/:id',validatorSubActivity.inputId(),subActivityController.searchSubActivity);
router.delete('/delete-sub-activity/:id',validatorSubActivity.inputId(),subActivityController.deleteSubActivity);
router.put('/update-sub-activity/:id',validatorSubActivity.inputDataUpdate(),subActivityController.updateSubActivity);
router.get('/search-name-sub-activity/:name_sub_activity',validatorSubActivity.inputNameSubActivity(),subActivityController.searcNameSubActivity);
router.get('/search-activity/:id',validatorSubActivity.inputId(),subActivityController.searchActivity);
router.get('/get-count-sub-activities',subActivityController.getCountSubActivity)
module.exports = router;