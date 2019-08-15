// @flow

import Yup from 'yup';
import { text } from '../../components/Translation/Translation';

const exportSchema = (): Object => {
  return Yup.object().shape({
    name: Yup.string()
      .trim()
      .required(text('ReportExportName', 'Validation')),
  });
};

export default exportSchema;
