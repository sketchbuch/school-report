// @flow

import { ucFirst, wrapText } from './strings';
import type { InsertDangerousHtmlObj } from '../types/misc';
import type { PupilType } from '../types/pupil';

export type PlaceHolderMapObject = {
  function?: string,
  property?: string,
  symbol: string,
};

export const placeholderMap: PlaceHolderMapObject[] = [
  { symbol: 'N', function: 'getLabel' },
  { symbol: 'F', property: 'firstname' },
  { symbol: 'L', property: 'lastname' },
  { symbol: 'PS', function: 'getPronoun' },
  { symbol: 'PO', function: 'getPronoun' },
  { symbol: 'PP', function: 'getPronoun' },
];

export const getPupilTextHtml = (
  text: string,
  pupil: PupilType | Object,
  highlight: boolean = true
): InsertDangerousHtmlObj => {
  const highlightStart: string = highlight ? '<strong>' : '';
  const highlightEnd: string = highlight ? '</strong>' : '';
  let newText: string = text;

  placeholderMap.forEach((ph: PlaceHolderMapObject) => {
    const phSymbol = wrapText(ph.symbol);
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
    newText = newText.replace(new RegExp(phSymbol, 'g'), highlightStart + phVal + highlightEnd);
  });

  return { __html: newText };
};
