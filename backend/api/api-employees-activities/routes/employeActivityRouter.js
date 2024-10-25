const employeActivityController = require('../controller/employeActivityController');
const express = require('express');
const router = express.Router();
const validator = require('../validator/validatorInput');
router.post('/create-employe-activity',validator.inputData(), employeActivityController.createNewEmployeeActivity);
router.get('/get-all',employeActivityController.getAllEmployeeActivities)
router.put('/update/:id',[
    validator.inputData(),
    validator.inputId()],employeActivityController.updateEmployeeActivity)

router.delete('/delete/:id',validator.inputId(),employeActivityController.deletedEmployeeActivity)
router.get('/get-count-employees-activities',employeActivityController.getCountAllRegActivities)
module.exports = router