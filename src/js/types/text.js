// @flow

import type { DomainBaseType } from './domain';
import domainBaseDefault from './domain';
import { generateId } from '../utils/ids';
import { ICON_TEXTS } from '../constants/icons';
import { TEXT_CROP_LEN } from '../constants/misc';
import { cropStr } from '../utils/strings';
import { ROUTE_DEL_TEXT, ROUTE_EDIT_TEXT } from '../constants/routes';

export type TextType = {
  ...$Exact<DomainBaseType>,
  bodytext: string,
  categories: string[],
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

export const TextFactory = (textObj: TextType, ts: number, lang: string): TextType => {
  return hydrateText({
    ...textObj,
    created: ts,
    updated: ts,
    lang: lang,
    charCount: textObj.bodytext.length,
    id: generateId(getTextIdStr(textObj), ts),
  });
};

export const hydrateText = (textObj: TextType): TextType => {
  return {
    ...textDefault,
    ...textObj,
    contains: function(term?: string, anywhere?: boolean = false) {
      if (term) {
        term = term.toLowerCase();
        const searchStr = this.bodytext.toLowerCase();

        if (anywhere) {
          if (searchStr.indexOf(term) !== -1) {
            return true;
          }
        } else {
          if (searchStr.indexOf(term) === 0) {
            return true;
          }
        }
      }

      return false;
    },
    getDescription: function() {
      return '';
    },
    getIcon: function() {
      return ICON_TEXTS;
    },
    getLabel: function(cropLength: number) {
      return cropStr(this.bodytext, cropLength !== undefined ? cropLength : TEXT_CROP_LEN);
    },
    getTooltip: function() {
      return this.getLabel();
    },
    getUrl: function(linkType: string) {
      let theUrl = ROUTE_EDIT_TEXT;

      if (linkType === 'delete') {
        theUrl = ROUTE_DEL_TEXT;
      }

      return theUrl.replace(':textId', this.id);
    },
  };
};

export const getTextIdStr = (textObj: TextType): string => {
  return 'text:' + textObj.bodytext + '_' + textObj.lang;
};

export default textDefault;
