// @flow

import React, { Component } from 'react';
import { SearchField } from '../../Ui';
import Sidebar from '../../Sidebar/Sidebar';
import SidebarHeader from '../../Sidebar/Header/SidebarHeader';
import SidebarList from '../../Sidebar/List/SidebarList';
import categoryDefault, { CategoryFactory } from '../../../types/category';
import type { CategoryType } from '../../../types/category';
import type { TextType } from '../../../types/text';
import type { WithSearchProps } from '../../../hoc/withSearch';
import withSearch from '../../../hoc/withSearch';
import { CATEGORY_ALL, CATEGORY_NONE, CATEGORY_SELECTED, CATEGORY_UNSELECTED } from '../../../constants/misc';
import { categorySort } from '../../../types/category';
import { text } from '../../Translation/Translation';
import './ReportsCategories.css';

export type Props = {
  catClick: (catId: string, catLabel: string) => (event: SyntheticMouseEvent<HTMLElement>) => void,
  catId: string,
  categories: CategoryType[],
  selectedTexts: string[],
  texts: TextType[],
} & WithSearchProps;

type SpecialType = { key: string, transName: string };

const getSpecialCategory = ({ key, transName }: SpecialType, isLast: boolean): CategoryType => {
  const specialCat: CategoryType = CategoryFactory(
    { ...categoryDefault, label: text(transName, 'CatSelect') },
    Date.now()
  );
  specialCat.id = key;
  specialCat.type = isLast ? 'special-last' : 'special';
  return specialCat;
};

export class ReportsCategories extends Component<Props> {
  static defaultProps = {
    categories: [],
    selectedTexts: [],
    texts: [],
  };

  props: Props;

  getSpecialCats(): CategoryType[] {
    const specialTypes: SpecialType[] = [
      { key: CATEGORY_ALL, transName: 'CatsAll' },
      { key: CATEGORY_SELECTED, transName: 'CatsSelected' },
      { key: CATEGORY_UNSELECTED, transName: 'CatsUnselected' },
      { key: CATEGORY_NONE, transName: 'CatsUncategorised' },
    ];

    return specialTypes.map((specialType: SpecialType, index: number) => {
      return getSpecialCategory(specialType, index + 1 === specialTypes.length);
    });
  }

  countCatTexts = (config?: Object): string => {
    if (config != null && config.itemId != null) {
      const CATEGORY_ID = config.itemId;
      let textCount: number = this.props.texts.length;

      if (CATEGORY_ID !== CATEGORY_ALL) {
        if (CATEGORY_ID === CATEGORY_NONE) {
          textCount = this.props.texts.filter((text: TextType) => text.categories.length === 0).length;
        } else if (CATEGORY_ID === CATEGORY_SELECTED) {
          textCount = this.props.texts.filter((text: TextType) => this.props.selectedTexts.indexOf(text.id) > -1)
            .length;
        } else if (CATEGORY_ID === CATEGORY_UNSELECTED) {
          textCount = this.props.texts.filter((text: TextType) => this.props.selectedTexts.indexOf(text.id) < 0).length;
        } else {
          textCount = this.props.texts.filter((text: TextType) => text.categories.includes(CATEGORY_ID)).length;
        }
      }

      if (textCount > 0) {
        return '(' + textCount + ')';
      }
    }

    return '';
  };

  render() {
    const { catClick, catId, categories, search } = this.props;
    const specialCats: CategoryType[] = this.getSpecialCats();

    return (
      <div className="ReportsCategories">
        <Sidebar footer={false}>
          <SidebarHeader controlsExpanded={search.visible} title={text('Header-category', 'SidebarHeader')}>
            <SearchField
              anywhere={search.anywhere}
              anywhereOnClick={search.anywhereIconClick}
              clearOnClick={search.searchIconClick}
              iconOnClick={search.searchIconClick}
              onChange={search.searchChange}
              onKeyUp={search.searchChange}
              placeholder={text('SearchPlaceholder-category', 'SidebarHeader')}
              term={search.term}
              visible={search.visible}
            />
          </SidebarHeader>
          <SidebarList
            curPage={search.page}
            dispatch={() => {}}
            items={categories}
            description={this.countCatTexts}
            listType="category"
            noItemsTxt={text('Categories', 'SidebarNoItems')}
            onPbChange={search.pageChange}
            onReportClick={catClick}
            prefixItems={specialCats}
            reducedSidebar={true}
            reportSidebar={catId}
            sortOrder={categorySort}
            term={search.term}
            termAnywhere={search.anywhere}
            usePb
          />
        </Sidebar>
      </div>
    );
  }
}

export default withSearch(ReportsCategories);
