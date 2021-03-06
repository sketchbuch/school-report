// @flow

import JSZip from 'jszip';
import Docxtemplater from 'docxtemplater';
import type { ExportContent, ExportType } from '../types/export';
import type { SidebarBuilderItemType } from '../types/sidebarBuilderItem';
import type { TextType } from '../types/text';
import { exportContentDefault } from '../types/export';
import { getPupilTextHtml } from '../utils/html';
import { text } from '../components/Translation/Translation';

let electron = null;
let fs = require('fs');
var path = require('path');

// If in electron environment:
if (window !== undefined && window.require) {
  electron = window.require('electron');
  fs = electron.remote.require('fs');
}

const APP_PATH = electron !== null ? electron.remote.app.getAppPath() : '';
const HOME_PATH = electron !== null ? electron.remote.app.getPath('home') : '';
const FOLDER = window.location.hostname === 'localhost' ? 'public' : 'build';

export const exportWord = (exportConfig: ExportType, callback: Function): void => {
  const filePath = `${APP_PATH}/${FOLDER}/data/template.docx`;
  const content = fs.readFileSync(filePath, 'binary');
  const zip = new JSZip(content);
  const doc = new Docxtemplater();

  doc.loadZip(zip);
  // Set docxtemplater template variables
  doc.setData({
    class_count: exportConfig.classCount,
    content: exportConfig.content,
    export_date: exportConfig.exported.trim(),
    name: exportConfig.name.trim(),
    pupil_count: exportConfig.pupilCount,
    report_name: exportConfig.reportName.trim(),
  });

  try {
    doc.render();

    fs.writeFile(
      path.resolve(HOME_PATH, exportConfig.name.trim() + '.docx'),
      doc.getZip().generate({ type: 'nodebuffer' }),
      'UTF-8',
      callback({
        success: true,
        errorObj: null,
      })
    );
  } catch (error) {
    callback({
      success: false,
      errorObj: error,
    });
  }
};

export const getDateFromTs = (ts: number): string => {
  const exportDate = new Date(ts);
  const exportDateYyyy = exportDate.getFullYear();
  let exportDateDd = exportDate.getDate();
  let exportDateMm = exportDate.getMonth() + 1;

  if (exportDateDd < 10) {
    exportDateDd = '0' + exportDateDd;
  }
  if (exportDateMm < 10) {
    exportDateMm = '0' + exportDateMm;
  }

  return text('DateFormat', 'Lang', {
    D: exportDateDd,
    M: exportDateMm,
    Y: exportDateYyyy,
  });
};

/**
 * Returns the content - a list of pupils and associated texts.
 */
export const getContent = (
  items: Array<SidebarBuilderItemType>,
  builderData: Object,
  texts: Array<TextType>
): ExportContent => {
  const content: ExportContent = {
    ...exportContentDefault,
  };

  items.forEach(function(item) {
    if (item.pupils.length > 0) {
      const newClass = {
        class_name: item.classRec.getLabel(),
        class_name_count: `${item.classRec.getLabel()} (${item.pupils.length})`,
        pupil_count: item.pupils.length,
        pupils: [],
      };

      item.pupils.forEach(function(pupil) {
        if (builderData[item.id] !== undefined && builderData[item.id][pupil.id] !== undefined) {
          const newContentItem = {
            pupil_name: `${pupil.getLabel()}`,
            texts: [],
          };

          builderData[item.id][pupil.id].forEach(function(textId: string) {
            var textEle = texts.find((text: TextType) => text.id === textId);
            if (textEle !== undefined) {
              const textHtml = getPupilTextHtml(textEle.getLabel(0), pupil, false);
              newContentItem.texts.push(textHtml.__html);
            }
          });

          newClass.pupils.push(newContentItem);
          content.pupilCount += 1;
        }
      });

      if (newClass.pupils.length > 0) {
        content.content.push(newClass);
        content.classCount += 1;
      }
    }
  });

  return content;
};
