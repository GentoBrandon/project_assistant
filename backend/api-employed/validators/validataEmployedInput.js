const { body, param } = require('express-validator');
const SingUpCheck = () => {
  return [
    body('name')
      .trim()
      .not()
      .isEmpty()
      .isString()
      .withMessage('Please enter only Letters'),
    body('last_name').notEmpty().not().isEmpty().isString(),
    body('dpi').trim().not().isEmpty().isString(),
    body('number_IGGS').trim().not().isEmpty().isString(),
    body('phone_number').trim().not().isEmpty().isString(),
    body('number_NIT').trim().not().isEmpty().isString(),
  ];
};
const checkInputsOptionalEmployed = () => {
  return [
    param('id')
      .notEmpty()
      .withMessage('the param is requerid')
      .isInt()
      .withMessage('the param must be a number'),
    body('name')
      .optional()
      .notEmpty()
      .withMessage('This field is Requerid')
      .isString()
      .withMessage('the field must be a string'),
    body('last_name')
      .optional()
      .notEmpty()
      .withMessage('the field is requerid')
      .isString()
      .withMessage('the field must be a string'),
    body('dpi')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('the field is requerid')
      .isString()
      .withMessage('the field must b a String'),
    body('number_IGGS')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('the field is requerid')
      .isString()
      .withMessage('the field must b a String'),
    body('phone_number')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('the field is requerid')
      .isString()
      .withMessage('the field must b a String'),
    body('number_NIT')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('the field is requerid')
      .isString()
      .withMessage('the field must b a String'),
  ];
};
const inputId = () => {
  return [param('id').isNumeric().withMessage('ID is must a valid number')];
};
module.exports = {
  SingUpCheck,
  inputId,
  checkInputsOptionalEmployed,
};
