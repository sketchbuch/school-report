// @flow

const validate = (field: string, errObj: Object, touchedObj: Object): boolean => {
  if (errObj[field] !== undefined && touchedObj[field] !== undefined) {
    return false;
  }

  return true;
};

export default validate;
