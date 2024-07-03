// utils/validationUtils.js
exports.isValidNumber = (value) => {
    return !isNaN(value) && isFinite(value);
  };
  