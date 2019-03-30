// @flow

import * as React from 'react';
import classNames from 'classnames';
import type { Dispatch } from 'redux';
import * as categoryActions from '../../../actions/categoryActions';
import * as classActions from '../../../actions/classActions';
import * as pupilActions from '../../../actions/pupilActions';
import * as reportActions from '../../../actions/reportActions';
import * as textActions from '../../../actions/textActions';
import NoItems from '../../NoItems/NoItems';
import SidebarBuilderItem from '../BuilderItem/SidebarBuilderItem';
import SidebarItem from '../Item/SidebarItem';
import SidebarPageBrowser from '../PageBrowser/SidebarPageBrowser';
import SidebarReportItem from '../ReportItem/SidebarReportItem';
import SidebarSubheader from '../Subheader/SidebarSubheader';
import Translation from '../../Translation/Translation';
import pageBrowserPropsDefault from '../../../types/pageBrowser';
import type { DomainType } from '../../../types/domain';
import type { PageBrowserProps } from '../../../types/pageBrowser';
import type { SidebarListTypes } from '../../../types/sidebarList';
import type { TextType } from '../../../types/text';
import { CATEGORY_ALL, CATEGORY_NONE } from '../../../constants/misc';
import { getCustomNumProp } from '../../../utils/dom';
import { sortObjectsAz } from '../../../utils/sort';
import './SidebarList.css';

const actions = {
  category: categoryActions,
  class: classActions,
  pupil: pupilActions,
  report: reportActions,
  text: textActions,
};

// TODO - fix types
type Props = {
  builder: boolean,
  children?: React.Node,
  curPage: number,
  description: ?(pupilId: string, classId: string) => string | null,
  dispatch: Dispatch,
  filter: string,
  items: Object[],
  listType: SidebarListTypes,
  noItemsTxt: string,
  onPbChange?: (curPage: number) => void,
  onReportClick?: (id: string, label: string) => (event: SyntheticMouseEvent<HTMLElement>) => void,
  pagesToShow: number,
  perPage: number,
  prefixItems: Object[],
  reportSidebar: string | false,
  sortOrder: string[],
  term: string,
  termAnywhere: boolean,
  usePb: boolean,
};

type State = {
  existingItems: string[],
};

class SidebarList extends React.Component<Props, State> {
  static defaultProps = {
    builder: false,
    curPage: 1,
    description: null,
    filter: '',
    items: [],
    listType: 'class',
    pagesToShow: 3,
    perPage: 20,
    prefixItems: [],
    reportSidebar: false,
    sortOrder: ['updated'],
    term: '',
    termAnywhere: false,
    usePb: false,
  };

  props: Props;
  state: State;
  existingItems: string[] = [];
  itemDuration: number = getCustomNumProp('--sidebaritem-ms');

  // TODO - try and remove
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
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.items.length < 1 && prevProps.items.length > 0) {
      this.setState({ existingItems: [] });
    }
  }

  onDelete = (id: string, callback?: Function = () => {}): void => {
    this.props.dispatch(actions[this.props.listType].deleteOne(id, callback));
  };

  /**
   * Updates the local state of existing items. Called by an item after its new animation finishes.
   */
  updateExistingItems(itemId: string): void {
    if (!this.state.existingItems.includes(itemId)) {
      this.setState({ existingItems: [...this.state.existingItems, itemId] });
    }
  }

  getSortedItems(): DomainType[] {
    let sortedItems: DomainType[] = sortObjectsAz(this.props.items, this.props.sortOrder);

    if (this.props.filter) {
      if (this.props.filter !== CATEGORY_ALL) {
        if (this.props.filter === CATEGORY_NONE) {
          sortedItems = sortedItems.filter((item: DomainType) => {
            if (item.categories !== undefined) {
              const textItem: TextType = { ...item };

              if (textItem.categories.length < 1) {
                return true;
              }
            }

            return false;
          });
        } else {
          sortedItems = sortedItems.filter((item: DomainType) => {
            if (item.categories !== undefined) {
              const textItem: TextType = { ...item };

              if (textItem.categories.includes(this.props.filter)) {
                return true;
              }
            }

            return false;
          });
        }
      }
    }

    if (this.props.term !== '') {
      const displayProp: ?string = this.props.listType === 'pupil' ? this.props.sortOrder[0] : undefined;
      sortedItems = sortedItems.filter(item => item.contains(this.props.term, this.props.termAnywhere, displayProp));
    }

    return sortedItems;
  }

  render() {
    let sortedItems: DomainType[] = this.getSortedItems();
    const itemForPaging: number = sortedItems.length;

    if (this.props.usePb) {
      const itemstart: number = 0 + this.props.perPage * (this.props.curPage - 1);
      sortedItems = sortedItems.slice(itemstart, itemstart + this.props.perPage);
    }

    if (itemForPaging > 0) {
      const showPb: boolean = this.props.usePb && itemForPaging > this.props.perPage;
      const pbProps: PageBrowserProps = {
        ...pageBrowserPropsDefault,
        curPage: this.props.curPage,
        itemCount: itemForPaging,
        pagesToShow: this.props.pagesToShow,
        perPage: this.props.perPage,
      };

      if (this.props.prefixItems.length > 0) {
        sortedItems = this.props.prefixItems.concat(sortedItems);
      }

      return (
        <React.Fragment>
          {this.props.children && <SidebarSubheader>{this.props.children}</SidebarSubheader>}
          <ul
            className={classNames('SidebarList', { 'SidebarList--pb': showPb, 'SidebarList--sh': this.props.children })}
            data-type={this.props.listType}
          >
            {sortedItems.map((item: Object) => {
              if (this.props.reportSidebar && this.props.onReportClick) {
                return (
                  <SidebarReportItem
                    item={item}
                    itemType={this.props.listType}
                    key={item.id}
                    selected={this.props.reportSidebar}
                    onReportClick={this.props.onReportClick}
                  />
                );
              } else if (this.props.builder) {
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
          {showPb && <SidebarPageBrowser {...pbProps} onChange={this.props.onPbChange} />}
        </React.Fragment>
      );
    } else if (this.props.term !== '' || this.props.filter !== '') {
      let searchNone = 'NoneSearched-' + this.props.listType;

      if (this.props.term === '' && this.props.filter !== '') {
        searchNone = 'NoneCategory-' + this.props.listType;
      } else if (this.props.term !== '' && this.props.termAnywhere) {
        searchNone += '-anywhere';
      }

      return (
        <React.Fragment>
          {this.props.children && <SidebarSubheader>{this.props.children}</SidebarSubheader>}
          <NoItems>
            <Translation name={searchNone} ns="SidebarList" />
          </NoItems>
        </React.Fragment>
      );
    } else {
      return <NoItems message={this.props.noItemsTxt} />;
    }
  }
}

export default SidebarList;
