const {body, validationResult,param} = require('express-validator');
const inputData = ()=>{
    return [
        body('employee_id').notEmpty().withMessage('the field is required')
        .isInt().withMessage('employee_id must be an integer'),
        body('activity_id').notEmpty().withMessage('the field is required')
        .isInt().withMessage('activity_id must be an integer'),
        body('lot_id').notEmpty().withMessage('the field is required')
        .isInt().withMessage('lot_id must be an integer'),
        body('sub_activity_id').notEmpty().withMessage('the field is required')
        .isInt().withMessage('sub_activity_id must be an integer'),
        body('date').notEmpty().withMessage('the field is required')
        .isDate().withMessage('date must be a date')
    ]
}

const inputId = () =>{
    return [
        param('id').notEmpty().withMessage('the field is required')
        .isInt().withMessage('id must be an integer')
    ]
}

module.exports = {
    inputData,
    inputId
}