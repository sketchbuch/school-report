// @flow

import Yup from 'yup';
import { text } from '../../components/Translation/Translation';

/**
* Validation scheme for a category.

* @return object
*/
export default function categorySchema(): Object {
  return Yup.object().shape({
    label: Yup.string()
      .trim()
      .required(text('CategoryLabel', 'Validation')),
  });
}
