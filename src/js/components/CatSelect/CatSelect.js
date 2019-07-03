// @flow

import * as React from 'react';
import type { CategoryType } from '../../types/category';
import type { SelectOption } from '../../types/ui';
import type { TextType } from '../../types/text';
import { Select } from '../Ui';
import { categorySort } from '../../types/category';
import { defaultSelectOption } from '../../types/ui';
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

const NS: string = 'CatSelect';

export type Props = {
  categories: CategoryType[],
  onChange: (option: SelectOption) => void,
  option: string,
  selectedCount: number,
  texts: TextType[],
  useSelected: boolean,
};

export class CatSelect extends React.Component<Props> {
  static defaultProps = {
    categories: [],
    option: '',
    selectedCount: 0,
    texts: [],
    useSelected: true,
  };

  props: Props;

  getOptions = (): SelectOption[] => {
    const { categories, option, selectedCount, texts, useSelected } = this.props;
    const uncategorisedCount: number = texts.filter((text: TextType) => text.categories.length < 1).length;
    const sortedCategories: CategoryType[] = sortObjectsAz(categories, categorySort);
    const unselectedCount: number = texts.length - selectedCount;
    const options: SelectOption[] = [
      {
        ...defaultSelectOption,
        label: `${text('CatsAll', NS)} (${texts.length})`,
        value: CATEGORY_ALL,
      },
    ];

    if (useSelected) {
      if (selectedCount > 0) {
        options.push({
          ...defaultSelectOption,
          label: `${text('CatsSelected', NS)} (${selectedCount})`,
          value: CATEGORY_SELECTED,
        });
      }
      if (unselectedCount > 0) {
        options.push({
          ...defaultSelectOption,
          label: `${text('CatsUnselected', NS)} (${unselectedCount})`,
          value: CATEGORY_UNSELECTED,
        });
      }
    }
    if (uncategorisedCount > 0 || option === CATEGORY_NONE) {
      options.push({
        ...defaultSelectOption,
        label: `${text('CatsUncategorised', NS)} (${uncategorisedCount})`,
        value: CATEGORY_NONE,
      });
    }
    options.push({
      ...defaultSelectOption,
      disabled: true,
      label: '----',
      value: CATEGORY_DISABLED,
    });

    sortedCategories.forEach((cat: CategoryType) => {
      const textCount: number = texts.filter((text: TextType) => text.categories.includes(cat.id)).length;

      if (textCount < 1 && option !== cat.id) {
        return;
      }

      options.push({
        ...defaultSelectOption,
        label: `${cat.getLabel()} (${textCount})`,
        value: cat.id,
      });
    });

    return options;
  };

  render() {
    const { categories, onChange, option } = this.props;

    if (categories.length < 1) {
      return null;
    }

    return (
      <div className={NS}>
        <Select onChange={onChange} options={this.getOptions()} title={text('Tooltip', NS)} value={option} />
      </div>
    );
  }
}

export default CatSelect;
