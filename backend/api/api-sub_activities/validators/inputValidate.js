const {body,param} = require('express-validator')
const inputData = ()=>{
    return [
        body('name_sub_activity')
        .notEmpty()
        .withMessage('the field is requerid')
        .isString()
        .withMessage('field must be a String'),
      body('description')
        .notEmpty()
        .withMessage('the field is requerid')
        .isString()
        .withMessage('the field must be a Numeric'),
        body('id_actividad').notEmpty().withMessage('the field is requerid').isNumeric().withMessage('the field must be a Numeric')  
    ]
}

const inputId = ()=>{
    return [
        param('id')
        .notEmpty()
        .withMessage('the field is requerid')
        .isNumeric()
        .withMessage('the field must be a Numeric')
    ]
}
const inputDataUpdate =()=>{
  return [inputId(),
  inputData()]
}
const inputNameSubActivity = ()=>{
  return [
      param('name_sub_activity')
      .notEmpty()
      .withMessage('the field is requerid')
      .isString()
      .withMessage('field must be a String')
  ]
}
module.exports = {inputData,
  inputId,
  inputDataUpdate,
  inputNameSubActivity
}