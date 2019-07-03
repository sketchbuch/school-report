// @flow

import debounce from 'debounce';
import type { FsObject } from '../types/fsObject';
import { persistenceSuccess, persistenceError } from '../actions/dataActions';
import { writeAppData } from '../fs/fs';

const persisters = {};

/**
 * Wrapper for writeAppData for saving app json files.
 */
export default function persist(
  dispatch: Function,
  getState: Function,
  callback: Function,
  content: Array<string>,
  immediate: boolean = false
) {
  let persistFiles = [];

  content.forEach(filePath => {
    const STATE_KEY: string = filePath.toLowerCase();

    if (getState()[STATE_KEY] !== undefined) {
      persistFiles.push(STATE_KEY);
    }
  });

  const PERSIST_TYPE = persistFiles.join('_').toLowerCase();

  if (persisters[PERSIST_TYPE] === undefined) {
    persisters[PERSIST_TYPE] = debounce(
      callback => {
        let contentTosave = {};
        content.forEach(filePath => {
          const STATE_KEY: string = filePath.toLowerCase();

          if (getState()[STATE_KEY] !== undefined) {
            contentTosave[filePath] = { [STATE_KEY]: getState()[STATE_KEY] };
          }
        });

        writeAppData(contentTosave, (ioResult: FsObject) => {
          if (ioResult.success) {
            dispatch(persistenceSuccess(PERSIST_TYPE));
          } else {
            dispatch(persistenceError(PERSIST_TYPE));
          }

          callback(ioResult);
        });
      },
      500,
      immediate
    );
  }

  persisters[PERSIST_TYPE](callback);
}
