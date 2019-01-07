// @flow

import * as React from 'react';
import NoItems from '../../NoItems/NoItems';
import Translation from '../../Translation/Translation';
import SidebarSubheader from '../Subheader/SidebarSubheader';
import SidebarItem from '../Item/SidebarItem';
import SidebarPageBrowser from '../PageBrowser/SidebarPageBrowser';
import SidebarBuilderItem from '../BuilderItem/SidebarBuilderItem';
import type { PageBrowserProps } from '../../../types/pageBrowser';
import type { SidebarListTypes } from '../../../types/sidebarList';
import { sortObjectsAz } from '../../../utils/sort';
import { getCustomNumProp } from '../../../utils/dom';
import * as categoryActions from '../../../actions/categoryActions';
import * as classActions from '../../../actions/classActions';
import * as pupilActions from '../../../actions/pupilActions';
import * as reportActions from '../../../actions/reportActions';
import * as textActions from '../../../actions/textActions';
import './SidebarList.css';

type Props = {
  builder: boolean,
  children?: React.Node,
  curPage: number,
  description: ?(pupilId: string, classId: string) => string | null,
  dispatch: Function,
  filter: string,
  items: Array<Object>,
  listType: SidebarListTypes,
  noItemsTxt: string,
  onChange: (curPage: number) => void,
  pagesToShow: number,
  perPage: number,
  sortOrder: Array<string>,
  term: string,
  usePb: boolean,
};

type State = {
  existingItems: Array<string>,
};

const actions = {
  category: categoryActions,
  class: classActions,
  pupil: pupilActions,
  report: reportActions,
  text: textActions,
};

/**
 * Sidebar list of items
 */
class SidebarList extends React.Component<Props, State> {
  static defaultProps = {
    builder: false,
    curPage: 1,
    description: null,
    filter: '',
    items: [],
    listType: 'class',
    onChange: null,
    pagesToShow: 3,
    perPage: 20,
    sortOrder: ['updated'],
    term: '',
    usePb: false,
  };

  props: Props;
  state: State;
  existingItems: Array<string>;
  itemDuration: number;
  onDelete: Function;
  updateExistingItems: (itemId: string) => void;

  constructor(props: Props) {
    super(props);

    this.state = {
      existingItems: [],
    };

    this.props.items.forEach(item => {
      if (!this.state.existingItems.includes(item.id)) {
        this.state.existingItems.push(item.id);
      }
    });

    this.itemDuration = getCustomNumProp('--sidebaritem-ms');
    this.onDelete = (id: string, callback?: Function = () => {}) =>
      this.props.dispatch(actions[this.props.listType].deleteOne(id, callback));
    this.onDelete = this.onDelete.bind(this);
    this.updateExistingItems = this.updateExistingItems.bind(this);
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.items.length < 1 && prevProps.items.length > 0) {
      this.setState({ existingItems: [] });
    }
  }

  /**
   * Updates the local state of existing items. Called by an item after its new animation finishes.
   *
   * @param string itemId The ID of a new item for the existing items.
   */
  updateExistingItems(itemId: string): void {
    if (!this.state.existingItems.includes(itemId)) {
      this.setState({ existingItems: [...this.state.existingItems, itemId] });
    }
  }

  getSortedItems() {
    let sortedItems = sortObjectsAz(this.props.items, this.props.sortOrder);

    if (this.props.filter) {
      if (this.props.filter !== 'category-all') {
        if (this.props.filter === 'category-nocat') {
          sortedItems = sortedItems.filter(
            item => item.categories.length === 0
          );
        } else {
          sortedItems = sortedItems.filter(item =>
            item.categories.includes(this.props.filter)
          );
        }
      }
    }

    if (this.props.term !== '') {
      sortedItems = sortedItems.filter(item => item.contains(this.props.term));
    }

    return sortedItems;
  }

  renderContent() {
    let sortedItems = this.getSortedItems();
    const itemForPaging = sortedItems.length;

    if (this.props.usePb) {
      const itemstart = 0 + this.props.perPage * (this.props.curPage - 1);
      sortedItems = sortedItems.slice(
        itemstart,
        itemstart + this.props.perPage
      );
    }

    if (itemForPaging > 0) {
      const showPb = this.props.usePb && itemForPaging > this.props.perPage;
      const pbProps: PageBrowserProps = {
        curPage: this.props.curPage,
        itemCount: itemForPaging,
        pagesToShow: this.props.pagesToShow,
        perPage: this.props.perPage,
      };
      let classes = 'SidebarList';
      if (showPb) {
        classes += ' SidebarList--pb';
      }
      if (this.props.children) {
        classes += ' SidebarList--sh';
      }

      return (
        <React.Fragment>
          {this.props.children && (
            <SidebarSubheader>{this.props.children}</SidebarSubheader>
          )}
          <ul className={classes} data-type={this.props.listType}>
            {sortedItems.map(item => {
              if (this.props.builder) {
                return (
                  <SidebarBuilderItem
                    description={this.props.description}
                    item={item}
                    itemType={this.props.listType}
                    key={item.id}
                    sortOrder={this.props.sortOrder}
                  />
                );
              } else {
                return (
                  <SidebarItem
                    isNew={!this.state.existingItems.includes(item.id)}
                    item={item}
                    itemDuration={this.itemDuration}
                    itemType={this.props.listType}
                    key={item.id}
                    onDelete={this.onDelete}
                    sortOrder={this.props.sortOrder}
                    updateExistingItems={this.updateExistingItems}
                  />
                );
              }
            })}
          </ul>
          {showPb && (
            <SidebarPageBrowser {...pbProps} onChange={this.props.onChange} />
          )}
        </React.Fragment>
      );
    } else if (this.props.term !== '' || this.props.filter !== '') {
      let searchNone = 'NoneSearched-' + this.props.listType;

      if (this.props.term === '' && this.props.filter !== '') {
        searchNone = 'NoneCategory-' + this.props.listType;
      }

      return (
        <React.Fragment>
          {this.props.children && (
            <SidebarSubheader>{this.props.children}</SidebarSubheader>
          )}
          <NoItems>
            <Translation name={searchNone} ns="SidebarList" />
          </NoItems>
        </React.Fragment>
      );
    } else {
      return <NoItems message={this.props.noItemsTxt} />;
    }
  }

  render() {
    return this.renderContent();
  }
}

export default SidebarList;
