// @flow

import Yup from 'yup';
import { text } from '../../components/Translation/Translation';


/**
* Validation scheme for an export.

* @return object
*/
export default function reportSchema(): Object {
  return Yup.object().shape({
    name: Yup.string().trim().required(text('ReportExportName', 'Validation')),
  });
}
