// @flow

import debounce from 'debounce';
import { writeAppData } from '../fs/fs';
import { persistenceSuccess, persistenceError } from '../actions/dataActions';

const persisters = {};

/**
 * Wrapper for writeAppData for saving app json files.
 *
 * @param function dispatch The redux dispatch function.
 * @param function getState The redux getState store function.
 * @param function callback A function to be called by writeAppData after file ops have been completed.
 * @param array content An array of files to save.
 */
export default function persist(
  dispatch: Function,
  getState: Function,
  callback: Function,
  content: Array<string>,
  immediate: boolean = false
) {
  let persistFiles = [];
  let contentTosave = {};
  content.forEach(filePath => {
    const STATE_KEY = filePath.toLowerCase();

    if (getState()[STATE_KEY] !== undefined) {
      contentTosave[filePath] = { [STATE_KEY]: getState()[STATE_KEY] };
      persistFiles.push(STATE_KEY);
    }
  });

  const PERSIST_TYPE = persistFiles.join('_').toLowerCase();

  if (persisters[PERSIST_TYPE] === undefined) {
    persisters[PERSIST_TYPE] = debounce(
      () => {
        writeAppData(contentTosave, (ioResult: Object) => {
          if (ioResult.success) {
            dispatch(persistenceSuccess(PERSIST_TYPE));
          } else {
            dispatch(persistenceError(PERSIST_TYPE));
          }

          callback(ioResult);
        });
      },
      750,
      immediate
    );
  }

  persisters[PERSIST_TYPE]();
}
