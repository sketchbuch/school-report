// @flow

import Yup from 'yup';
import { text } from '../components/Translation/Translation';

export const CLASS_LABEL_MAX = 20;


/**
* Validation scheme for a class.

* @return object
*/
export function classSchema(): Object {
  return Yup.object().shape({
    label: Yup.string().trim().required(text('ClassLabel', 'Validation')),
  });
}

/**
* Validation scheme for a pupil.

* @return object
*/
export function pupilSchema(): Object {
  return Yup.object().shape({
    description: Yup.string().trim(),
    firstname: Yup.string().trim().required(text('PupilFirstname', 'Validation')),
    lastname: Yup.string().trim().required(text('PupilLastname', 'Validation')),
  });
}

/**
* Validation scheme for a text.

* @return object
*/
export function textSchema(): Object {
  return Yup.object().shape({
    bodytext: Yup.string().trim().required(text('TextBodytext', 'Validation')),
    categories: Yup.array().of(Yup.string()),
  });
}

/**
* Validation scheme for a class with a prefix.

* @return object
*/
export function prefixedClassSchema(): Object {
  return Yup.object().shape({
    class: classSchema(),
  });
}

/**
* Validation scheme for a pupil with a prefix.

* @return object
*/
export function prefixedPupilSchema(): Object {
  return Yup.object().shape({
    pupil: pupilSchema(),
  });
}

/**
* Validation scheme for a text with a prefix.

* @return object
*/
export function prefixedTextSchema(): Object {
  return Yup.object().shape({
    text: textSchema(),
  });
}
