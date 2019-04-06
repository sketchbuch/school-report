// @flow

import * as React from 'react';
import classNames from 'classnames';
import Icon from '../../Icon/Icon';
import LetterCount from '../../LetterCount/LetterCount';
import NoItems from '../../NoItems/NoItems';
import { SearchField } from '../../Ui';
import SidebarHeader from '../../Sidebar/Header/SidebarHeader';
import SidebarPageBrowser from '../../Sidebar/PageBrowser/SidebarPageBrowser';
import Translation from '../../Translation/Translation';
import pageBrowserPropsDefault from '../../../types/pageBrowser';
import type { CategoryType } from '../../../types/category';
import type { InsertDangerousHtmlObj } from '../../../types/misc';
import type { PageBrowserProps } from '../../../types/pageBrowser';
import type { PupilType } from '../../../types/pupil';
import type { SearchProps } from '../../../hoc/withSearch';
import type { TextType } from '../../../types/text';
import type { WithSearchProps } from '../../../hoc/withSearch';
import withSearch from '../../../hoc/withSearch';
import { CATEGORY_ALL, CATEGORY_NONE, CATEGORY_SELECTED, CATEGORY_UNSELECTED } from '../../../constants/misc';
import { ICON_SUCCESS } from '../../../constants/icons';
import { getPupilTextHtml } from '../../../utils/html';
import { text } from '../../Translation/Translation';
import './ReportsAvailableTexts.css';

export type Props = {
  activePupil: PupilType | Object,
  categories: CategoryType[],
  categoryId: string,
  categoryLabel: string,
  children?: React.Node,
  disableTexts: boolean,
  onTextToggle: (textId: string) => (event: SyntheticEvent<>) => void,
  pagesToShow: number,
  perPage: number,
  selectedTexts: string[],
  texts: TextType[],
  usePb: boolean,
} & WithSearchProps;

export class ReportsAvailableTexts extends React.Component<Props> {
  static defaultProps = {
    activePupil: {},
    categories: [],
    children: null,
    onTextToggle: () => () => {},
    pagesToShow: 3,
    perPage: 20,
    selectedTexts: [],
    texts: [],
    usePb: true,
  };

  props: Props;

  componentDidUpdate = (prevProps: Props) => {
    if (this.props.categoryId !== prevProps.categoryId) {
      this.props.search.handlePageChange(1);
    }
  };

  getCatTexts = (categoryId: string, texts: TextType[], selectedTexts: string[], search: SearchProps): TextType[] => {
    let visibleTexts: TextType[] = [];

    if (categoryId !== CATEGORY_ALL) {
      if (categoryId === CATEGORY_NONE) {
        visibleTexts = texts.filter((text: TextType) => text.categories.length === 0);
      } else if (categoryId === CATEGORY_SELECTED) {
        visibleTexts = texts.filter((text: TextType) => selectedTexts.indexOf(text.id) > -1);
      } else if (categoryId === CATEGORY_UNSELECTED) {
        visibleTexts = texts.filter((text: TextType) => selectedTexts.indexOf(text.id) < 0);
      } else {
        visibleTexts = texts.filter((text: TextType) => text.categories.includes(categoryId));
      }
    } else {
      visibleTexts = [...texts];
    }

    if (search.visible && search.term !== '') {
      visibleTexts = visibleTexts.filter((text: TextType) => text.contains(search.term, search.anywhere));
    }

    return visibleTexts;
  };

  render() {
    const {
      activePupil,
      categoryId,
      categoryLabel,
      disableTexts,
      onTextToggle,
      search,
      selectedTexts,
      texts,
    } = this.props;
    let catTexts: TextType[] = this.getCatTexts(categoryId, texts, selectedTexts, search);
    const catsForPaging: number = catTexts.length;

    if (this.props.usePb) {
      const itemstart: number = 0 + this.props.perPage * ((search.page || 1) - 1);
      catTexts = catTexts.slice(itemstart, itemstart + this.props.perPage);
    }

    const showPb: boolean = this.props.usePb && catsForPaging > this.props.perPage;
    const pbProps: PageBrowserProps = {
      ...pageBrowserPropsDefault,
      curPage: search.page,
      itemCount: catsForPaging,
      pagesToShow: this.props.pagesToShow,
      perPage: this.props.perPage,
    };

    return (
      <div className="ReportsAvailableTexts">
        <SidebarHeader controlsExpanded={search.visible} title={categoryLabel}>
          <SearchField
            anywhere={search.anywhere}
            anywhereOnClick={search.handleToggleAnywhere}
            clearOnClick={search.handleToggleVisibility}
            iconOnClick={search.handleToggleVisibility}
            onKeyUp={search.handleKeyUp}
            onChange={search.handleChange}
            placeholder={text('SearchPlaceholder-text', 'SidebarHeader', {
              CAT_LABEL: categoryLabel,
            })}
            term={search.term}
            visible={search.visible}
          />
        </SidebarHeader>
        {catTexts.length > 0 ? (
          <React.Fragment>
            <ul className={classNames('ReportsAvailableTexts_list', { 'ReportsAvailableTexts_list--pb': showPb })}>
              {catTexts.map(text => {
                const pupilText: InsertDangerousHtmlObj = getPupilTextHtml(text.getLabel(0), activePupil);
                const isSelected: boolean = selectedTexts.indexOf(text.id) > -1 ? true : false;
                const isActive: boolean = !isSelected && disableTexts;

                return (
                  <li
                    key={text.id}
                    className={classNames('ReportsAvailableTexts__item', {
                      'ReportsAvailableTexts__item--selected': isSelected,
                      'ReportsAvailableTexts__item--disabled': isActive,
                    })}
                    onClick={isActive ? null : onTextToggle(text.id)}
                  >
                    <span dangerouslySetInnerHTML={pupilText} />
                    <LetterCount count={pupilText.__html.replace(/<(.|\n)*?>/g, '').length.toString()} />
                    {isSelected && (
                      <span className="ReportsAvailableTexts__itemselected">
                        <Icon type={ICON_SUCCESS} />
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
            {showPb && <SidebarPageBrowser {...pbProps} reduced={true} onChange={search.handlePageChange} />}
          </React.Fragment>
        ) : search.term !== '' ? (
          <NoItems>
            <Translation name={search.anywhere ? 'NoneSearchedAnywhere' : 'NoneSearched'} ns="ReportsAvailableTexts" />
          </NoItems>
        ) : (
          <NoItems>
            <Translation name="None" ns="ReportsAvailableTexts" />
          </NoItems>
        )}
      </div>
    );
  }
}

/*} else if (this.props.term !== '' || this.props.filter !== '') {
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
    } */

export default withSearch(ReportsAvailableTexts);
