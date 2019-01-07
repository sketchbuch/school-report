// @flow

import { ucFirst } from './strings';
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
export function getPupilTextHtml(
  text: string,
  pupil: PupilType | Object,
  highlight: boolean = true
): Object {
  const highlightStart = highlight ? '<strong>' : '';
  const highlightEnd = highlight ? '</strong>' : '';
  let newText = text;

  placeholderMap.forEach(ph => {
    const phSymbol = `#${ph.symbol}#`;
    let phVal = phSymbol;
    let isPronoun = false;

    if (ph.function !== undefined) {
      if (ph.function === 'getPronoun') {
        isPronoun = true;
        phVal = pupil[ph.function](ph.symbol);
      } else {
        phVal = pupil[ph.function]();
      }
    } else if (ph.property !== undefined) {
      phVal = pupil[ph.property];
    }

    if (isPronoun) {
      newText = newText.replace(
        new RegExp(`\\. ${phSymbol}`, 'g'),
        '. ' + highlightStart + ucFirst(phVal) + highlightEnd
      );
    }
    newText = newText.replace(
      new RegExp(phSymbol, 'g'),
      highlightStart + phVal + highlightEnd
    );
  });

  return { __html: newText };
}
