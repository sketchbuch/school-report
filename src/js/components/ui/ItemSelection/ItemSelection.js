// @flow

import * as React from 'react';
import { FieldArray } from 'formik';
import Icon from '../../Icon/Icon';
import ItemList from '../ItemList/ItemList';
import TextInput from '../TextInput/TextInput';
import type { DomainType } from '../../../types/domain';
import { ICON_CLOSE } from '../../../constants/icons';
import { text } from '../../Translation/Translation';
import './ItemSelection.css';

export type Props = {
  items: DomainType[], // Already sorted for display.
  name: string, // Name of property in Formik's values object.
  searchMin: number, // Minimum number of items before the search shows.
  selected: String[], // IDs from the domain objects.
};

type State = {
  newLabel: string,
  term: string,
};

export class ItemSelection extends React.Component<Props, State> {
  static defaultProps = {
    items: [],
    name: '',
    searchMin: 2,
    selected: [],
  };

  props: Props;
  state: State = {
    newLabel: '',
    term: '',
  };

  handleClear = (event: SyntheticMouseEvent<EventTarget>): void => {
    this.setState({ term: '' });
  };

  handleSearch = (event: SyntheticKeyboardEvent<HTMLInputElement>): void => {
    const term = event.currentTarget.value;
    this.setState({ term });
  };

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
