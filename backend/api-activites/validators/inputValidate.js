const { body, param } = require('express-validator');

const inputActivity = () => {
  return [
    body('name_activity')
      .notEmpty()
      .withMessage('This fiel is requerid')
      .isString()
      .withMessage('the field must be a String'),
  ];
};

const inputIDActivity = () => {
  return [param('id').isInt().withMessage('the param must be a Integer')];
};

const inputIDBodyActivity = () => {
  return [inputIDActivity(), inputActivity()];
};
module.exports = {
  inputActivity,
  inputIDActivity,
  inputIDBodyActivity,
};
