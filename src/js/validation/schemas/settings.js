// @flow

import Yup from 'yup';

const settingsSchema = (): Object => {
  return Yup.object().shape({
    language: Yup.string().required(),
  });
};

export default settingsSchema;
