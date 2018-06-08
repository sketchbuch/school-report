// @flow

import * as React from 'react';
import { text } from '../../Translation/Translation';
import { sortObjectsAz } from '../../../utils/sort';
import type { CategoryType } from '../../../types/category';
import type { TextType } from '../../../types/text';
import { categorySort } from '../../../types/category';
import './ReportsCatSelect.css';

type Props = {
  categories: Array<CategoryType>,
  onChange: Function,
  option: string,
  texts: Array<TextType>,
};


/**
* A category selector for texts.
*/
export class ReportsCatSelect extends React.Component<Props> {
  static defaultProps = {
    categories: [],
    onChange: ()=>{},
    option: '',
    texts: [],
  };

  props: Props;

  render() {
    const {
      categories,
      onChange,
      option,
      texts,
    } = this.props;
    const uncategorisedTexts = texts.filter(text => text.categories.length < 1).length;
    const sortedCategories = sortObjectsAz(categories, categorySort);
    if (categories.length < 1) return null;

    return (
      <div className="ReportsCatSelect">
        <select value={option} onChange={onChange} title={text('Tooltip', 'ReportsCatSelect')}>
          <option key="category-all" value="category-all">{text('CatsAll', 'ReportsCatSelect')} ({texts.length})</option>
          {uncategorisedTexts > 0 && <option key="category-nocat" value="category-nocat">{text('CatsUncategorised', 'ReportsCatSelect')} ({uncategorisedTexts})</option> }
          <option key="category-disabled" disabled className="ReportsCatSelect_sep">---</option>

          {categories.length > 0 && (
            sortedCategories.map(cat => {
              const textCount = texts.filter(text => text.categories.includes(cat.id)).length;
              if (textCount < 1) return null;
              return <option key={cat.id} value={cat.id}>{cat.getLabel()} ({textCount})</option>
            })
          )}
        </select>
      </div>
    )
  }
}


export default ReportsCatSelect;