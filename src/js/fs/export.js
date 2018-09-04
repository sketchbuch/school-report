// @flow

import JSZip from 'jszip';
import Docxtemplater from 'docxtemplater';
import type { ExportType } from '../types/export';
import * as io from '../constants/io';
import type { SidebarBuilderItemType } from '../types/sidebarBuilderItem';

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
  // Set docxtemplater template variables
  doc.setData({
    name: exportConfig.name.trim(),
    report_name: exportConfig.reportName.trim(),
    export_date: exportConfig.exported.trim(),
    class_count: exportConfig.classCount,
    pupil_count: exportConfig.pupilCount,
    classes: exportConfig.classes,
  });

  try {
      doc.render();
  }
  catch (error) {
      console.log(error);
      throw error;
  }

  fs.writeFileSync(
    path.resolve(HOME_PATH, exportConfig.name.trim() + '.docx'),
    doc.getZip().generate({ type: 'nodebuffer' })
  );
}

/**
* Returns the export date.
* 
* @param {integer} ts The timestamp to get the formated date for.
* @param {string} The Formated date.
*/
export function getDateFromTs(ts: number): string {
  const exportDate = new Date();
  const exportDateYyyy = exportDate.getFullYear();
  let exportDateDd = exportDate.getDate();
  let exportDateMm = exportDate.getMonth() + 1;

  if(exportDateDd < 10) exportDateDd = '0' + exportDateDd;
  if(exportDateMm < 10) exportDateMm = '0' + exportDateMm;

  return `${exportDateDd}/${exportDateMm}/${exportDateYyyy}`;
}

/**
* Returns the total number of pupils in the report.
* 
* @param {array} items The array of classes, as create for the edit builder layout sidebar.
* @param {integer} pupilCount The number of pupils.
*/
export function getPupilCount(items: Array<SidebarBuilderItemType>): number {
  let pupilCount = 0;

  items.forEach(function(item){
    pupilCount += item.pupils.length;
  });

  return pupilCount;
}

/**
* Returns the total number of classes (only classes with pupils count).
* 
* @param {array} items The array of classes, as create for the edit builder layout sidebar.
* @param {integer} classCount The number of classes.
*/
export function getClassCount(items: Array<SidebarBuilderItemType>): number {
  let classCount = 0;

  items.forEach(function(item){
    if (item.pupils.length > 0) classCount += 1;
  });

  return classCount;
}

/**
* Returns the list of classes. Used to list classes and pupils on the front page summary.
* 
* @param {array} items The array of classes, as create for the edit builder layout sidebar.
* @param {array} classes Array of class names.
*/
export function getClassList(items: Array<SidebarBuilderItemType>) {
  const classes = [];

  items.forEach(function(item){
    if (item.pupils.length > 0) {
      const newClass = {
        class_name: `${item.classRec.getLabel()}`,
        class_name_count: `${item.classRec.getLabel()} (${item.pupils.length})`,
        pupils: [],
      };

      item.pupils.forEach(function(pupil){
        newClass.pupils.push({ pupil_name: pupil.getLabel() });
      });
  
      classes.push(newClass);
    }
  });

  return classes;
}