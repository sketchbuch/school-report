// @flow

import Yup from 'yup';
import { text } from '../../components/Translation/Translation';

const categorySchema = (): Object => {
  return Yup.object().shape({
    label: Yup.string()
      .trim()
      .required(text('CategoryLabel', 'Validation')),
  });
};

export default categorySchema;
