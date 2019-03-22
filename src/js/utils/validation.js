// @flow

export default function validate(field: string, errObj: Object, touchedObj: Object): boolean {
  if (errObj[field] !== undefined && touchedObj[field] !== undefined) {
    return false;
  }

  return true;
}
