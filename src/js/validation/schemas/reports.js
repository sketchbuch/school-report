// @flow

import Yup from 'yup';
import { text } from '../../components/Translation/Translation';


/**
* Validation scheme for a report.

* @return object
*/
export default function reportSchema(): Object {
  return Yup.object().shape({
    label: Yup.string().trim().required(text('ReportLabel', 'Validation')),
    classes: Yup.array().of(Yup.string()).min(1, text('ReportClasses', 'Validation')),
  });
}
