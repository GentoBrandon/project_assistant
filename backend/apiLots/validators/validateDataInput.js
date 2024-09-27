const {body,param} = require('express-validator');
const checkInputData = ()=>{
    return [
        body('name_lots').notEmpty().withMessage('the field is requerid')
        .isString().withMessage('field must be a String'),
        body('area').notEmpty().withMessage('the field is requerid')
        .isNumeric().withMessage('the field must be a Numeric')
    ]
}
const validateInputId = ()=>{
    return [
        param('id').notEmpty().withMessage('the param is requerid')
        .isNumeric().withMessage('the param must be a number')
    ]
}
const validateDataUpdate=()=>{
    return [validateInputId(),
    body('name_lots').notEmpty().withMessage("the field cant empty")
    .isString().withMessage('the field must be a String'),
    body('area').notEmpty().withMessage('the field cant empty')
    .isNumeric().withMessage('the field must be a number')
]
}
module.exports = {
    checkInputData,
    validateInputId,
    validateDataUpdate
}