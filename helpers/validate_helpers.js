var validator = require("validator");

const returnError = (message) => {
  return {
    status: false,
    message: message,
  };
};

const returnSuccess = () => {
  return {
    status: true,
    message: "validated successfully",
  };
};

const isEmptyFunc = (value) => {
  if (value == null) {
    return true;
  }
  if (value == "") {
    return true;
  }
  if (value.length == 0) {
    return true;
  }
  return false;
};

const IsJsonString = (str) => {
  try {
    JSON.parse(JSON.stringify(str));
  } catch (e) {
    return false;
  }
  return true;
};

const IsNumeric = (str) => {
  try {
    if (Number.parseInt(str) == 0) {
      return false;
    }
  } catch (e) {
    return false;
  }
  return true;
};

exports.validate = (body, validateArray) => {
  for (let index = 0; index < validateArray.length; index++) {
    const item = validateArray[index];
    let value = body[item.key];
    value = value; //value != null ? JSON.stringify(value) : null;
    console.log(value, typeof value);
    let required = false;
    let isEmpty = isEmptyFunc(value);

    if (item.validation.includes("required")) {
      required = true;
      if (isEmpty) {
        return returnError(`${item.key} is empty`);
      }
    }

    if (item.validation.includes("name")) {
      var alphaExp = /^[a-zA-Z]+$/;
      if (!value.match(alphaExp)) {
        return returnError(`${item.key} is can not be null or integer`);
      }
    }

    if (item.validation.includes("image")) {
      var ImageValidate = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;
      if (!value.match(ImageValidate)) {
        return returnError(`${item.key} inavlid image format`);
      }
    }

    if (item.validation.includes("mobile")) {
      var mobilenumber = /^\d{10}$/;
      if (!value.match(mobilenumber)) {
        return returnError(
          `${item.key} please enter 10 digit number or enter valid format`
        );
      }
    }

    if (item.validation.includes("string")) {
      if (typeof value != "string" && !isEmpty) {
        return returnError(`${item.key} is not valid string`);
      }
    }
    if (item.validation.includes("isAlphanumeric")) {
      if (!validator.isAlphanumeric(value) && !isEmpty) {
        return returnError(`${item.key} is not valid a string`);
      }
    }
    if (item.validation.includes("numeric")) {
      if (!IsNumeric(value) && !isEmpty) {
        return returnError(`${item.key} is not numeric`);
      }
    }
    if (item.validation.includes("number")) {
      if (value != 0 && !Number(value) && !isEmpty) {
        return returnError(`${item.key} is not number`);
      }
    }
    if (item.validation.includes("float")) {
      if (!(value % 1 === 0) && !isEmpty && !IsNumeric(value)) {
        return returnError(`${item.key} is not float`);
      }
    }
    if (item.validation.includes("notnull")) {
      if (!value || value == null) {
        return returnError(`${item.key} field can not be null`);
      }
    }
    if (item.validation.includes("decimal")) {
      if (!validator.isFloat(value) && !isEmpty) {
        return returnError(`${item.key} is not numeric`);
      }
    }
    if (item.validation.includes("url")) {
      if (!validator.isURL(value) && !isEmpty) {
        return returnError(`${item.key} is not url`);
      }
    }
    if (item.validation.includes("email")) {
      if (!validator.isEmail(value) && !isEmpty) {
        return returnError(`${item.key} format is wrong please check`);
      }
    }
    if (item.validation.includes("array")) {
      if (!Array.isArray(value) && !isEmpty) {
        return returnError(`${item.key} is not Array`);
      }
      if (Array.isArray(value) && item.validation.includes("arrayString")) {
        for (let index = 0; index < value.length; index++) {
          const element = value[index];
          if (!validator.isAlphanumeric(element)) {
            return returnError(`${item.key} is not array string`);
          }
        }
      }
      if (Array.isArray(value) && item.validation.includes("arrayUrl")) {
        for (let index = 0; index < value.length; index++) {
          const element = value[index];
          console.log(validator.isURL(element), element);
          if (!validator.isURL(element)) {
            return returnError(`${item.key} is not array url`);
          }
        }
      }
    }
    if (item.validation.includes("bool")) {
      if (!typeof value == Boolean && !isEmpty) {
        return returnError(`${item.key} is not bool`);
      }
    }
    if (item.validation.includes("json")) {
      if (!IsJsonString(value) && !isEmpty) {
        return returnError(`${item.key} is not json`);
      }
    }
    if (item.validation.includes("date")) {
      if (!validator.isDate(value) && !isEmpty) {
        return returnError(`${item.key} is not date`);
      }
    }
    if (item.validation.includes("uuid")) {
      if (!validator.isUUID(value) && !isEmpty) {
        return returnError(`${item.key} is not uuid`);
      }
    }
  }
  return returnSuccess();
};

exports.responseHelper = (res, status, data, message) => {
  const resStatus = status ? "success" : "fail";
  const validRes = {
    status: resStatus,
    data,
    message,
  };
  res.status(200).send(validRes);
};
