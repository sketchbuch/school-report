// @flow

import { text } from '../components/Translation/Translation';


/**
* Sets the window title.
*
* @param string titleTxt The text to used as the window title.
*/
export default function setTitle(titleTxt: string = '') {
  const trimmedTxt = titleTxt.trim();

  if (trimmedTxt === '') {
    document.title = text('Name', 'App');
  } else {
    document.title = text('Name', 'App') + titleSep + trimmedTxt;
  }
}

export const titleSep = ' - ';
