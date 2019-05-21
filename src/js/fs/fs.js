// @flow

import * as io from '../constants/io';

let electron = null;
let fs = require('fs');

// If in electron environment:
if (window !== undefined && window.require) {
  electron = window.require('electron');
  fs = electron.remote.require('fs');
}

const APP_PATH: string = electron !== null ? electron.remote.app.getAppPath() : '';
const DATA_PATH: string = electron !== null ? electron.remote.app.getPath('userData') : '';
const FOLDER: string = window.location.hostname === 'localhost' ? 'public' : 'build';
const DATA_FOLDER: string = `${DATA_PATH}${io.DATA_FOLDER}`;

/**
 * Loads a file async. from the filesystem. callback receives a results object: {
 *   success: boolean ,
 *   errorObj: object | null,
 *   data: object,
 * }
 *
 * @param string fileName The full path to the file that should be loaded.
 * @param function callback The function to call with the results of the load attempt.
 */
function readFile(filePath: string, callback: Function) {
  fs.readFile(filePath, 'UTF-8', (err?: any, data?: string = '') => {
    callback({
      success: !err,
      errorObj: err,
      data: data ? JSON.parse(data) : {},
    });
  });
}

/**
 * Returns the full filepath for a language file stored in the app installation folder.
 *
 * @param string lang The key of the language to load.
 */
function getLanguagePath(lang: string): string {
  return `${APP_PATH}/${FOLDER}/data/translations_${lang}.${io.FILE_TYPE}`;
}

/**
 * Returns the full filepath for a data file stored in the app config folder (OS dependent).
 *
 * @param string filePath The path for the file including filename.
 */
function getDataPath(filePath: string): string {
  return `${DATA_PATH}${io.DATA_FOLDER}${filePath.trim()}.${io.FILE_TYPE}`;
}

/**
 * Wrapper that calls readFile to load a data file.
 *
 * @param string fileName The name of the file to load or a complete file path.
 * @param function callback The function to call with the results of the load attempt.
 */
export function readDataFile(fileName: string, callback: Function) {
  readFile(getDataPath(fileName), callback);
}

/**
 * Wrapper that calls readFile to load a language file.
 *
 * @param string lang The key of the language to load.
 * @param function callback The function to call with the results of the load attempt.
 */
export function readLangFile(lang: string, callback: Function) {
  readFile(getLanguagePath(lang), callback);
}

export function dataFolderExists(): boolean {
  return fs.existsSync(DATA_FOLDER);
}

export function createDataFolder() {
  try {
    fs.mkdirSync(DATA_FOLDER);
  } catch (err) {}
}

/**
 * Loads multiple app data files async. from the filesystem. callback receives a results object: {
 *   success: boolean ,
 *   errorObj: object | null,
 *   data: string,
 * }
 *
 * @param array fileNames An array of file names (without extension) to load.
 * @param function callback The function to call with the results of the load attempt.
 */
export function readAppData(fileNames: Array<string>, callback: Function) {
  let files = fileNames.map(filePath => {
    return new Promise((resolve, reject) => {
      const FILE_PATH = getDataPath(filePath);

      fs.readFile(FILE_PATH, 'UTF-8', (err?: any, data?: string = '') => {
        if (err) {
          reject(err);
        } else {
          resolve({
            path: FILE_PATH,
            data: data,
          });
        }
      });
    });
  });

  Promise.all(files)
    .then(responses => {
      let data = {};

      for (let response of responses) {
        let jsonResonse = null;

        try {
          // Check validity
          jsonResonse = JSON.parse(response.data);
        } catch (e) {}

        if (jsonResonse !== null) {
          data = { ...data, ...jsonResonse };
        }
      }

      callback({
        success: true,
        errorObj: null,
        data: JSON.stringify(data),
      });
    })
    .catch(err => {
      callback({
        success: false,
        errorObj: err,
        data: '',
      });
    });
}

/**
 * Writes multiple app data files async. based on DATA_PATHS. callback receives a results object: {
 *   success: boolean ,
 *   errorObj: object | null,
 * }
 *
 * @param object content An object with string content, keyed by file name: { Classes: "{"classes":[]}" }
 * @param function callback The function to call with the results of the save attempt.
 */
export function writeAppData(content: Object, callback: Function) {
  let files = Object.keys(content).map(function(fileName, index) {
    return new Promise((resolve, reject) => {
      const FILE_PATH = getDataPath(fileName);

      fs.writeFile(FILE_PATH, JSON.stringify(content[fileName]), 'UTF-8', (err?: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(FILE_PATH);
        }
      });
    });
  });

  Promise.all(files)
    .then(responses => {
      callback({
        success: true,
        errorObj: null,
      });
    })
    .catch(err => {
      callback({
        success: false,
        errorObj: err,
      });
    });
}
