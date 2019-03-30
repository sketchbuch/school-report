// @flow

import React, { Component } from 'react';
import SearchField from '../../ui/SearchField/SearchField';
import Sidebar from '../../Sidebar/Sidebar';
import SidebarHeader from '../../Sidebar/Header/SidebarHeader';
import SidebarList from '../../Sidebar/List/SidebarList';
import type { SearchkeyProp } from '../../../hoc/withSearch';
import type { CategoryType } from '../../../types/category';
import { categorySort } from '../../../types/category';
import categoryDefault, { CategoryFactory } from '../../../types/category';
import { text } from '../../Translation/Translation';
import './ReportsCategories.css';

// TODO: fix types
export type Props = {
  catClick: (catId: string, catLabel: string) => (event: SyntheticMouseEvent<HTMLElement>) => void,
  catId: string,
  categories: CategoryType[],
  searchProps: SearchkeyProp,
};

export class ReportsCategories extends Component<Props> {
  static defaultProps = {};

  props: Props;

  getCats(categories: CategoryType[]): CategoryType[] {
    const cats: CategoryType[] = [...categories];

    // AddCategory All
    const all: CategoryType = CategoryFactory({ ...categoryDefault, label: text('CatsAll', 'CatSelect') }, Date.now());
    all.id = 'category-all';
    cats.unshift(all);
    const uncategorised: CategoryType = CategoryFactory(
      { ...categoryDefault, label: text('CatsUncategorised', 'CatSelect') },
      Date.now()
    );
    uncategorised.id = 'category-nocat';
    cats.unshift(uncategorised);

    return cats;
  }

  render() {
    const { catClick, catId, categories, searchProps } = this.props;
    const cats: CategoryType[] = this.getCats(categories);

    console.log();

    return (
      <div className="ReportsCategories">
        <Sidebar footer={false}>
          <SidebarHeader controlsExpanded={searchProps.visible} title={text('Header-category', 'SidebarHeader')}>
            <SearchField
              anywhere={searchProps.anywhere}
              anywhereOnClick={searchProps.anywhereIconClick}
              clearOnClick={searchProps.searchIconClick}
              iconOnClick={searchProps.searchIconClick}
              onChange={searchProps.searchChange}
              onKeyUp={searchProps.searchChange}
              placeholder={text('SearchPlaceholder-category', 'SidebarHeader')}
              term={searchProps.term}
              visible={searchProps.visible}
            />
          </SidebarHeader>
          <SidebarList
            curPage={searchProps.page}
            dispatch={() => {}}
            items={cats}
            listType="category"
            noItemsTxt={text('Categories', 'SidebarNoItems')}
            onPbChange={searchProps.pageChange}
            onReportClick={catClick}
            reportSidebar={catId}
            sortOrder={categorySort}
            term={searchProps.term}
            termAnywhere={searchProps.anywhere}
            usePb
          />
        </Sidebar>
      </div>
    );
  }
}

export default ReportsCategories;
