// @flow

import type { DomainBaseType } from './domain';
import domainBaseDefault from './domain';
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
  ...$Exact<DomainBaseType>,
  bodytext: string,
  categories: Array<string>,
  charCount: number,
  lang: string,
};

const textDefault: TextType = {
  ...domainBaseDefault,
  bodytext: '',
  categories: [],
  charCount: 0,
  lang: '',
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
    charCount: textObj.bodytext.length,
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
    contains: function (term?: string, anywhere?: boolean = false) {
      if (term) {
        term = term.toLowerCase();
        const searchStr = this.bodytext;

        if (!anywhere && searchStr.toLowerCase().indexOf(term) === 0) {
          return true;
        } else if (searchStr.toLowerCase().indexOf(term) !== -1) {
          return true;
        }
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
      let theUrl = ROUTE_EDIT_TEXT;
      
      if (linkType === 'delete') theUrl = ROUTE_DEL_TEXT;

      return theUrl.replace(':textId', this.id);
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
