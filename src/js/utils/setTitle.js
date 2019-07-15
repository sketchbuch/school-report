// @flow

import { text } from '../components/Translation/Translation';

const setTitle = (titleTxt: string = ''): void => {
  const trimmedTxt: string = titleTxt.trim();

  if (trimmedTxt === '') {
    document.title = text('Name', 'App');
  } else {
    document.title = text('Name', 'App') + titleSep + trimmedTxt;
  }
};

export const titleSep: string = ' - ';

export default setTitle;
