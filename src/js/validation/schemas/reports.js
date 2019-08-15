// @flow

import Yup from 'yup';
import { text } from '../../components/Translation/Translation';

const reportSchema = (): Object => {
  return Yup.object().shape({
    label: Yup.string()
      .trim()
      .required(text('ReportLabel', 'Validation')),
    classes: Yup.array()
      .of(Yup.string())
      .min(1, text('ReportClasses', 'Validation')),
    maxChars: Yup.number().integer(text('ReportMaxChars', 'Validation')),
  });
};

export default reportSchema;
