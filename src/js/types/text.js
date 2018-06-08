// @flow

import { generateId } from '../utils/ids';
import { ICON_TEXTS } from '../constants/icons';
import { TEXT_CROP_LEN } from '../constants/misc';
import { cropStr } from '../utils/strings';
import {
  ROUTE_DEL_TEXT,
  ROUTE_EDIT_TEXT,
} from '../constants/routes';


/**
* Report Text type def.
*/

export type TextType = {
  bodytext: string,
  categories: Array<string>,
  contains: Function,
  created: number,
  getDescription: Function,
  getIcon: Function,
  getLabel: Function,
  getTooltip: Function,
  getUrl: Function,
  id: string,
  lang: string,
  updated: number,
};

const textDefault: TextType = {
  bodytext: '',
  categories: [],
  contains: ()=>{},
  created: -1,
  getDescription: ()=>{},
  getIcon: ()=>{},
  getLabel: ()=>{},
  getTooltip: ()=>{},
  getUrl: ()=>{},
  id: '',
  lang: '',
  updated: -1,
};

export const textSort = ['bodytext', 'updated'];

/**
* Returns an object of TextType based on textObj but with additional props set.
*
* @param TextType textObj The initial text object.
* @param number ts A timestamp used for the id, created, and updated.
* @param string lang The language code for the the text.
* @return TextType The new text object.
*/
export function TextFactory(textObj: TextType, ts: number, lang: string): TextType {
  return hydrateText({
    ...textObj,
    created: ts,
    updated: ts,
    lang: lang,
    id: generateId(getTextIdStr(textObj), ts),
  });
}

/**
* Returns an updated textObj with getters.
*
* @param TextType textObj The text object.
* @return TextType The hydrated text object.
*/
export function hydrateText(textObj: TextType): TextType {
  return {
    ...textDefault,
    ...textObj,
    contains: function (term?: string) {
      if (term) {
        const searchStr = this.bodytext;
        if (term && searchStr.toLowerCase().indexOf(term) !== -1) return true;
      }

      return false;
    },
    getDescription: function () {
      return '';
    },
    getIcon: function () {
      return ICON_TEXTS;
    },
    getLabel: function (cropLength: number) {
      return cropStr(this.bodytext, (cropLength !== undefined) ? cropLength : TEXT_CROP_LEN);
    },
    getTooltip: function () {
      return this.getLabel();
    },
    getUrl: function (linkType: string) {
      if (linkType === 'delete') return ROUTE_DEL_TEXT.replace(':textId', this.id);
      return ROUTE_EDIT_TEXT.replace(':textId', this.id);
    },
  };
}

/**
* Returns a string to be used when creating an ID for texts.
*
* @param TextType textObj The text record.
* @return string The string to be used in creating the ID.
*/
export function getTextIdStr(textObj: TextType): string {
  return 'text:' + textObj.bodytext + '_' + textObj.lang;
}

export default textDefault;