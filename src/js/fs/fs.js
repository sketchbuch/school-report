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

const readFile = (filePath: string, callback: Function): void => {
  fs.readFile(filePath, 'UTF-8', (err?: any, data?: string = '') => {
    callback({
      success: !err,
      errorObj: err,
      data: data ? JSON.parse(data) : {},
    });
  });
};

const getLanguagePath = (lang: string): string => {
  return `${APP_PATH}/${FOLDER}/data/translations_${lang}.${io.FILE_TYPE}`;
};

const getDataPath = (filePath: string): string => {
  return `${DATA_PATH}${io.DATA_FOLDER}${filePath.trim()}.${io.FILE_TYPE}`;
};

export const readDataFile = (fileName: string, callback: Function): void => {
  readFile(getDataPath(fileName), callback);
};

export const readLangFile = (lang: string, callback: Function): void => {
  readFile(getLanguagePath(lang), callback);
};

export const dataFolderExists = (): boolean => {
  return fs.existsSync(DATA_FOLDER);
};

export const createDataFolder = (): void => {
  try {
    fs.mkdirSync(DATA_FOLDER);
  } catch (err) {}
};

export const readAppData = (fileNames: Array<string>, callback: Function): void => {
  let files: Array<Promise<{| data: string, path: string |}>> = fileNames.map((filePath: string) => {
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
};

export const writeAppData = (content: Object, callback: Function): void => {
  let files: Array<Promise<string>> = Object.keys(content).map((fileName: string, index: number) => {
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
};
