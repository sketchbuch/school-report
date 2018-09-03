// @flow

import JSZip from 'jszip';
import Docxtemplater from 'docxtemplater';
import type { ExportType } from '../types/export';
import * as io from '../constants/io';

let electron = null;
let fs = require('fs');
var path = require('path');

  // If in electron environment:
if (window !== undefined && window.require) {
  electron = window.require('electron');
  fs = electron.remote.require('fs');
}

const APP_PATH = (electron !== null) ? electron.remote.app.getAppPath() : '';
const DATA_PATH = (electron !== null) ? electron.remote.app.getPath('userData') : '';
const HOME_PATH = (electron !== null) ? electron.remote.app.getPath('home') : '';
const FOLDER = (window.location.hostname === 'localhost') ? 'public' : 'build';


/**
* Saves a report as a word file.
*/
export function exportWord(exportConfig: ExportType) {
  const filePath = `${APP_PATH}/${FOLDER}/data/template.docx`;
  const content = fs.readFileSync(filePath, 'binary');
  const zip = new JSZip(content);
  const doc = new Docxtemplater();
  doc.loadZip(zip);
  
  //set the templateVariables
  doc.setData({
    name: exportConfig.name.trim(),
  });

  try {
      // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
      doc.render();
      console.log('in try');
  }
  catch (error) {
      var e = {
          message: error.message,
          name: error.name,
          stack: error.stack,
          properties: error.properties,
      }
      console.log(JSON.stringify({error: e}));
      // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
      throw error;
  }

  var buf = doc.getZip().generate({type: 'nodebuffer'});

  // buf is a nodejs buffer, you can either write it to a file or do anything else with it.
  fs.writeFileSync(path.resolve(HOME_PATH, 'output.docx'), buf);
}