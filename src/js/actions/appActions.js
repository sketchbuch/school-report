// @flow

import { APP_ERRORED, APP_LOADED } from '../constants/actionTypes';
import type { ActionCreator } from '../types/action';
import { getCustomNumProp } from '../utils/dom';


/**
* App Actions
*/

export function loaded(): ActionCreator {
  hideLoader();
  return { type: APP_LOADED };
}

export function errored(): ActionCreator {
  hideLoader();
  return { type: APP_ERRORED };
}

function hideLoader() {
  const alDuration = getCustomNumProp('--apploader-ms');
  document.getElementsByTagName('html')[0].classList.add('app-initialised');

  setTimeout(
    () => {
      let appLoaderEle = document && document.getElementById('apploader');
      if (appLoaderEle && appLoaderEle.parentNode) appLoaderEle.parentNode.removeChild(appLoaderEle);
    },
    alDuration,
  );
}
