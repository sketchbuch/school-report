// @flow

/**
 * Returns true if a field is valid, else false;
 *
 * @param string field The prefix to the id.
 * @param object errObj The Formik error object.
 * @param object touchedObj The Formik touched object.
 * @return boolean
 */
export default function validate(
  field: string,
  errObj: Object,
  touchedObj: Object
): boolean {
  if (errObj[field] !== undefined && touchedObj[field] !== undefined) {
    return false;
  }

  return true;
}
