// @flow

import * as React from 'react';
import type { CategoryType } from '../../types/category';
import type { TextType } from '../../types/text';
import { categorySort } from '../../types/category';
import { sortObjectsAz } from '../../utils/sort';
import { text } from '../Translation/Translation';
import {
  CATEGORY_ALL,
  CATEGORY_DISABLED,
  CATEGORY_NONE,
  CATEGORY_SELECTED,
  CATEGORY_UNSELECTED,
} from '../../constants/misc';
import './CatSelect.css';

export type Props = {
  categories: CategoryType[],
  onChange: Function,
  option: string,
  selectedCount: number,
  texts: TextType[],
  useSelected: boolean,
};

/**
 * A category selector for texts.
 */
export class CatSelect extends React.Component<Props> {
  static defaultProps = {
    categories: [],
    onChange: () => {},
    option: '',
    selectedCount: 0,
    texts: [],
    useSelected: true,
  };

  props: Props;

  render() {
    const { categories, onChange, option, selectedCount, texts, useSelected } = this.props;

    if (categories.length < 1) {
      return null;
    }

    const uncategorisedCount: number = texts.filter(text => {
      return text.categories.length < 1;
    }).length;
    const sortedCategories: CategoryType[] = sortObjectsAz(categories, categorySort);
    const unselectedCount: number = texts.length - selectedCount;

    return (
      <div className="CatSelect">
        <select value={option} onChange={onChange} title={text('Tooltip', 'CatSelect')}>
          <option key={CATEGORY_ALL} value={CATEGORY_ALL}>
            {text('CatsAll', 'CatSelect')} ({texts.length})
          </option>
          {useSelected && selectedCount > 0 && (
            <option key={CATEGORY_SELECTED} value={CATEGORY_SELECTED}>
              {text('CatsSelected', 'CatSelect')} ({selectedCount})
            </option>
          )}
          {useSelected && unselectedCount > 0 && (
            <option key={CATEGORY_UNSELECTED} value={CATEGORY_UNSELECTED}>
              {text('CatsUnselected', 'CatSelect')} ({unselectedCount})
            </option>
          )}
          {(uncategorisedCount > 0 || option === CATEGORY_NONE) && (
            <option key={CATEGORY_NONE} value={CATEGORY_NONE}>
              {text('CatsUncategorised', 'CatSelect')} ({uncategorisedCount})
            </option>
          )}
          <option key={CATEGORY_DISABLED} disabled className="CatSelect_sep">
            ---
          </option>

          {sortedCategories.map(cat => {
            const textCount = texts.filter(text => text.categories.includes(cat.id)).length;

            if (textCount < 1 && option !== cat.id) {
              return null;
            }

            return (
              <option key={cat.id} value={cat.id}>
                {cat.getLabel()} ({textCount})
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}

export default CatSelect;
