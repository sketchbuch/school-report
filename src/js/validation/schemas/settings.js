// @flow

import Yup from 'yup';


/**
* Validation scheme for a class.

* @return object
*/
export default function settingsSchema(): Object {
  return Yup.object().shape({
    language: Yup.string().required(),
  });
}
