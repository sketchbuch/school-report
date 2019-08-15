// @flow

import Yup from 'yup';
import { text } from '../components/Translation/Translation';

export const CLASS_LABEL_MAX = 20;

export const classSchema = (): Object => {
  return Yup.object().shape({
    label: Yup.string()
      .trim()
      .required(text('ClassLabel', 'Validation')),
  });
};

export const pupilSchema = (): Object => {
  return Yup.object().shape({
    description: Yup.string().trim(),
    firstname: Yup.string()
      .trim()
      .required(text('PupilFirstname', 'Validation')),
    lastname: Yup.string()
      .trim()
      .required(text('PupilLastname', 'Validation')),
  });
};

export const textSchema = (): Object => {
  return Yup.object().shape({
    bodytext: Yup.string()
      .trim()
      .required(text('TextBodytext', 'Validation')),
    categories: Yup.array()
      .of(Yup.string())
      .min(0),
  });
};

export const prefixedClassSchema = (): Object => {
  return Yup.object().shape({
    class: classSchema(),
  });
};

export const prefixedPupilSchema = (): Object => {
  return Yup.object().shape({
    pupil: pupilSchema(),
  });
};

export const prefixedTextSchema = (): Object => {
  return Yup.object().shape({
    text: textSchema(),
  });
};
