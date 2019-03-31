// @flow

import * as React from 'react';
import { FieldArray } from 'formik';
import SearchField from '../SearchField/SearchField';
import ItemList from '../ItemList/ItemList';
import type { DomainType } from '../../../types/domain';
import { text } from '../../Translation/Translation';
import type { WithSearchProps } from '../../../hoc/withSearch';
import withSearch from '../../../hoc/withSearch';
import './ItemSelection.css';

const NS = 'ItemSelection';

export type Props = {
  items: DomainType[], // Already sorted for display.
  name: string, // Name of property in Formik's values object.
  searchMin: number, // Minimum number of items before the search shows.
  selected: String[], // IDs from the domain objects.
} & WithSearchProps;

export class ItemSelection extends React.PureComponent<Props> {
  static defaultProps = {
    items: [],
    name: '',
    searchMin: 2,
    selected: [],
  };

  props: Props;

  render() {
    const { items, name, search, searchMin, selected } = this.props;
    const visibleItems = search.term === '' ? items : items.filter(item => item.contains(search.term, search.anywhere));

    return (
      <div className="ItemSelection">
        {items.length > 0 && items.length > searchMin && (
          <div className="ItemSelection__search">
            <SearchField
              anywhere={search.anywhere}
              anywhereOnClick={search.anywhereIconClick}
              clearOnClick={search.searchIconClick}
              dark
              iconOnClick={search.searchIconClick}
              onChange={search.searchChange}
              onKeyUp={search.searchChange}
              placeholder={text('Placeholder', NS)}
              term={search.term}
              visible={true}
            />
          </div>
        )}
        <FieldArray
          name={name}
          render={arrayHelpers => (
            <ItemList {...arrayHelpers} totalCount={items.length} items={visibleItems} selected={selected} />
          )}
        />
      </div>
    );
  }
}

export default withSearch(ItemSelection);
