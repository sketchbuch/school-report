// @flow

import { writeAppData, writeBuilderData } from '../fs/fs';
import { BUILDER_FOLDER } from '../constants/io';
import { persistenceSuccess, persistenceError } from '../actions/dataActions';


/**
* Wrapper for writeAppData for saving app json files.
*
* @param function dispatch The redux dispatch function.
* @param function getState The redux getState store function.
* @param function callback A function to be called by writeAppData after file ops have been completed.
* @param array content An array of files to save.
*/
export default function persist(dispatch: Function, getState: Function, callback: Function, content: Array<string>) {
  let persistFiles = [];
  let contentTosave = {};
  content.forEach(filePath => {
    const STATE_KEY = filePath.toLowerCase();
    
    if (getState()[STATE_KEY] !== undefined) {
      contentTosave[filePath] = {[STATE_KEY]: getState()[STATE_KEY]};
      persistFiles.push(STATE_KEY);
    }
  });
  const PERSIST_KEY = persistFiles.join(', ');

  writeAppData(
    contentTosave,
    (ioResult: Object) => {
      if (ioResult.success) {
        dispatch(persistenceSuccess(PERSIST_KEY))
      } else {
        dispatch(persistenceError(PERSIST_KEY));
      }

      callback(ioResult);
    }
  );
}

/**
* Wrapper for writeAppData for saving builder json files.
*
* @param function dispatch The redux dispatch function.
* @param function getState The redux getState store function.
* @param function callback A function to be called by writeAppData after file ops have been completed.
* @param string reportId The ID of the report that this builder is for.
*/
export function persistBuilder(dispatch: Function, getState: Function, callback: Function, reportId: string) {
  const STATE_KEY = 'builder';
  const PERSIST_KEY = `builder-${reportId}`;

  writeBuilderData(
    reportId,
    getState()[STATE_KEY] || {},
    (ioResult: Object) => {
      if (ioResult.success) {
        dispatch(persistenceSuccess(PERSIST_KEY))
      } else {
        dispatch(persistenceError(PERSIST_KEY));
      }

      callback(ioResult);
    }
  );
}
