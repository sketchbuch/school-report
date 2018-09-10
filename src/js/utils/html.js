// @flow

import type { PupilType } from '../types/pupil';


export const placeholderMap = [
  { symbol: 'N', function: 'getLabel' },
  { symbol: 'F', property: 'firstname' },
  { symbol: 'L', property: 'lastname' },
  { symbol: 'PS', function: 'getPronoun' },
  { symbol: 'PO', function: 'getPronoun' },
  { symbol: 'PP', function: 'getPronoun' },
];

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
  placeholderMap.forEach(ph =>{
    let phVal = '';

    if (ph.function !== undefined) {
      phVal = pupil[ph.function]();
    } else if (ph.property !== undefined) {
      phVal = pupil[ph.property];
    }

    newText = newText.replace(new RegExp(`#${ph.symbol}#`, 'g'), highlightStart + phVal + highlightEnd);
  });

  return { __html: newText };
}
