// @flow

import type { PupilType } from '../types/pupil';


/**
* Returns the text with the placeholders replaced
*
* @param {string} text The text to change.
* @return {object}
*/
export function getPupilTextHtml(text: string, pupil: PupilType | Object, highlight: boolean = true): Object {
  const highlightStart = (highlight) ? '<strong>' : '';
  const highlightEnd = (highlight) ? '</strong>' : '';
  let newText = text;

  // Replace pupil specific placeholders:
  newText = newText.replace(new RegExp('#N#', 'g'), highlightStart + pupil.getLabel() + highlightEnd);
  newText = newText.replace(new RegExp('#F#', 'g'), highlightStart + pupil.firstname + highlightEnd);
  newText = newText.replace(new RegExp('#L#', 'g'), highlightStart + pupil.lastname + highlightEnd);

  // Replace language specific placeholders:

  return { __html: newText };
}
