// @flow

import * as React from 'react';
import classNames from 'classnames';
import { FieldArray } from 'formik';
import ItemList from '../ItemList/ItemList';
import NoItems from '../../NoItems/NoItems';
import SearchField from '../SearchField/SearchField';
import Translation, { text } from '../../Translation/Translation';
import type { DomainType } from '../../../types/domain';
import type { SearchProps, WithSearchProps } from '../../../hoc/withSearch';
import type { UiTab, UiView } from '../../../types/misc';
import withSearch from '../../../hoc/withSearch';
import { UI_VIEW_ALL, UI_VIEW_SELECTED, UI_VIEW_UNSELECTED } from '../../../constants/ui';
import './ItemSelection.css';

const NS = 'ItemSelection';
const tabs: UiTab[] = [
  { view: UI_VIEW_ALL, transKey: 'TabAll' },
  { view: UI_VIEW_SELECTED, transKey: 'TabSelected' },
  { view: UI_VIEW_UNSELECTED, transKey: 'TabUnselected' },
];

export type Props = {
  items: DomainType[], // Already sorted for display.
  name: string, // Name of property in Formik's values object.
  searchMin: number, // Minimum number of items before the search shows.
  selected: String[], // IDs from the domain objects.
} & WithSearchProps;

type State = {
  view: UiView,
};

export class ItemSelection extends React.PureComponent<Props, State> {
  static defaultProps = {
    items: [],
    name: '',
    searchMin: 2,
    selected: [],
  };

  props: Props;
  state: State = {
    view: 'all',
  };

  handleViewChange = (view: UiView) => {
    if (this.state.view !== view) {
      this.setState({ view });
    }
  };

  getVisibleItems = (items: DomainType[], selected: String[], search: SearchProps): DomainType[] => {
    let visibleItems: DomainType[] =
      search.term === '' ? items : items.filter((item: DomainType) => item.contains(search.term, search.anywhere));

    if (this.state.view === UI_VIEW_SELECTED) {
      visibleItems = visibleItems.filter((item: DomainType) => selected.indexOf(item.id) > -1);
    } else if (this.state.view === UI_VIEW_UNSELECTED) {
      visibleItems = visibleItems.filter((item: DomainType) => selected.indexOf(item.id) < 0);
    }

    return visibleItems;
  };

  renderContent = (): React.Node => {
    const { items, name, search, selected } = this.props;
    const visibleItems: DomainType[] = this.getVisibleItems(items, selected, search);
    let transKey: string = 'None';

    if (items.length > 0) {
      if (visibleItems.length > 0) {
        return (
          <FieldArray
            name={name}
            render={arrayHelpers => (
              <ItemList
                {...arrayHelpers}
                anywhere={search.anywhere}
                items={visibleItems}
                selected={selected}
                totalCount={items.length}
              />
            )}
          />
        );
      }

      if (this.state.view === UI_VIEW_SELECTED) {
        transKey = 'NoSelected';
      } else if (this.state.view === UI_VIEW_UNSELECTED) {
        transKey = 'NoUnselected';
      }
    } else {
      if (search.term !== '') {
        if (search.anywhere) {
          transKey = 'NoItemsAnywhere';
        } else {
          transKey = 'NoItems';
        }
      }
    }

    return (
      <NoItems>
        <Translation name={transKey} ns="ItemList" placeholders={{ NAME: name }} />
      </NoItems>
    );
  };

  renderTabs = (): React.Node => {
    if (this.props.items.length < 1) {
      return null;
    }

    return (
      <ul className="ItemSelection__tabs">
        {tabs.map((tab: UiTab) => {
          const label = text(tab.transKey, NS);

          return (
            <li
              className={classNames('ItemSelection__tab', {
                'ItemSelection__tab--selected': this.state.view === tab.view,
              })}
              key={tab.view}
              onClick={() => this.handleViewChange(tab.view)}
              title={label}
            >
              {label}
            </li>
          );
        })}
      </ul>
    );
  };

  render() {
    const { items, search, searchMin } = this.props;
    let hasSearch: boolean = items.length > 0 && items.length > searchMin;

    return (
      <div className={classNames(NS, { 'ItemSelection--hasSearch': hasSearch })}>
        {this.renderTabs()}
        <div className="ItemSelection__content">
          {hasSearch && (
            <div className="ItemSelection__search">
              <SearchField
                anywhere={search.anywhere}
                anywhereOnClick={search.handleToggleAnywhere}
                clearOnClick={search.handleToggleVisibility}
                dark
                iconOnClick={search.handleToggleVisibility}
                onChange={search.handleChange}
                onKeyUp={search.handleKeyUp}
                placeholder={text('Placeholder', NS)}
                term={search.term}
                visible={true}
              />
            </div>
          )}
          {this.renderContent()}
        </div>
      </div>
    );
  }
}

export default withSearch(ItemSelection, true);
