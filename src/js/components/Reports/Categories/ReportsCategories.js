// @flow

import React, { Component } from 'react';
import SearchField from '../../ui/SearchField/SearchField';
import Sidebar from '../../Sidebar/Sidebar';
import SidebarHeader from '../../Sidebar/Header/SidebarHeader';
import SidebarList from '../../Sidebar/List/SidebarList';
import categoryDefault, { CategoryFactory } from '../../../types/category';
import type { CategoryType } from '../../../types/category';
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
} & WithSearchProps;

export class ReportsCategories extends Component<Props> {
  static defaultProps = {};

  props: Props;

  getSpecialCats(): CategoryType[] {
    const specialCats: CategoryType[] = [];

    const all: CategoryType = CategoryFactory({ ...categoryDefault, label: text('CatsAll', 'CatSelect') }, Date.now());
    all.id = CATEGORY_ALL;
    specialCats.push(all);

    const selected: CategoryType = CategoryFactory(
      { ...categoryDefault, label: text('CatsSelected', 'CatSelect') },
      Date.now()
    );
    selected.id = CATEGORY_SELECTED;
    specialCats.push(selected);

    const unselected: CategoryType = CategoryFactory(
      { ...categoryDefault, label: text('CatsUnselected', 'CatSelect') },
      Date.now()
    );
    unselected.id = CATEGORY_UNSELECTED;
    specialCats.push(unselected);

    const uncategorised: CategoryType = CategoryFactory(
      { ...categoryDefault, label: text('CatsUncategorised', 'CatSelect') },
      Date.now()
    );
    uncategorised.id = CATEGORY_NONE;
    specialCats.push(uncategorised);

    return specialCats;
  }

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
            listType="category"
            noItemsTxt={text('Categories', 'SidebarNoItems')}
            onPbChange={search.pageChange}
            onReportClick={catClick}
            prefixItems={specialCats}
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
