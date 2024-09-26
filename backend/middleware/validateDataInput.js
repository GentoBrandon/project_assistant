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
    param('id').isNumeric().withMessage('ID is must a valid number'),
  ];
};

const inputId = () => {
  return [param('id').isNumeric().withMessage('ID is must a valid number')];
};
module.exports = {
  SingUpCheck,
  inputId,
};
