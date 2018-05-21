// @flow

import type { PupilType } from '../types/pupil';


/**
* Returns the text with the placeholders replaced
*
* @param {string} text The text to change.
* @return {object}
*/
export function getPupilTextHtml(text: string, pupil: PupilType | Object): Object {
  let newText = text;

  // Replace pupil specific placeholders:
  newText = newText.replace(new RegExp('#N#', 'g'), '<strong>' + pupil.getLabel() + '</strong>');
  newText = newText.replace(new RegExp('#F#', 'g'), '<strong>' + pupil.firstname + '</strong>');
  newText = newText.replace(new RegExp('#L#', 'g'), '<strong>' + pupil.lastname + '</strong>');

  // Replace language specific placeholders:

  return { __html: newText };
}
