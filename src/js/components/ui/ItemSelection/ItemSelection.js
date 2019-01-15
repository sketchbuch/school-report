// @flow

import * as React from 'react';
import { FieldArray } from 'formik';
import { text } from '../../Translation/Translation';
import TextInput from '../TextInput/TextInput';
import ItemList from '../ItemList/ItemList';
import Icon from '../../Icon/Icon';
import { ICON_CLOSE } from '../../../constants/icons';
import type { DomainType } from '../../../types/domain';
import './ItemSelection.css';

type Props = {
  items: Array<DomainType>, // Already sorted for display.
  name: string, // Name of property in Formik's values object.
  searchMin: number, // Minimum number of items before the search shows.
  selected: Array<String>, // IDs from the domain objects.
};

type State = {
  newLabel: string,
  term: string,
};

/**
 * Item select with search and new item controls.
 */
export class ItemSelection extends React.Component<Props, State> {
  static defaultProps = {
    items: [],
    name: '',
    searchMin: 2,
    selected: [],
  };

  props: Props;
  handleClear: Function;
  handleSearch: Function;

  constructor(props: Props) {
    super(props);

    this.state = {
      newLabel: '',
      term: '',
    };

    this.handleClear = this.handleClear.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleClear(event: SyntheticInputEvent<HTMLInputElement>) {
    this.setState({ term: '' });
  }

  handleSearch(event: SyntheticInputEvent<HTMLInputElement>) {
    const term = event.currentTarget.value;
    this.setState({ term });
  }

  render() {
    const { items, name, searchMin, selected } = this.props;
    const visibleItems = this.state.term === '' ? items : items.filter(item => item.contains(this.state.term));

    return (
      <div className="ItemSelection">
        {items.length > 0 && items.length > searchMin && (
          <div className="ItemSelection__search">
            <TextInput
              onChange={this.handleSearch}
              placeholder={text('Placeholder', 'ItemSelection')}
              value={this.state.term}
            />
            <span
              className="ItemSelection__searchclear"
              onClick={this.handleClear}
              title={text('Clear', 'ItemSelection')}
            >
              <Icon type={ICON_CLOSE} />
            </span>
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

export default ItemSelection;
