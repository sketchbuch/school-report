// @flow

import setTitle from './setTitle';

const setLayoutTitle = (titleTxt: string = '', route?: string): void => {
  if (route) {
    if (window.location.pathname === route) {
      setTitle(titleTxt);
    }

    return;
  }

  setTitle(titleTxt);
};

export default setLayoutTitle;
