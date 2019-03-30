// @flow

import * as React from 'react';
import classNames from 'classnames';
import Icon from '../../Icon/Icon';
import LetterCount from '../../LetterCount/LetterCount';
import NoItems from '../../NoItems/NoItems';
import SearchField from '../../ui/SearchField/SearchField';
import SidebarHeader from '../../Sidebar/Header/SidebarHeader';
import Translation from '../../Translation/Translation';
import type { CategoryType } from '../../../types/category';
import type { InsertDangerousHtmlObj } from '../../../types/misc';
import type { PupilType } from '../../../types/pupil';
import type { SearchkeyProp } from '../../../hoc/withSearch';
import type { TextType } from '../../../types/text';
import { ICON_SUCCESS } from '../../../constants/icons';
import { getPupilTextHtml } from '../../../utils/html';
import { text } from '../../Translation/Translation';
import './ReportsAvailableTexts.css';

// TODO - fix types
export type Props = {
  activePupil: PupilType | Object,
  categoryId: string,
  categoryLabel: string,
  categories: CategoryType[],
  children?: React.Node,
  disableTexts: boolean,
  handleTextToggle: Function,
  searchProps: SearchkeyProp,
  selectedTexts: string[],
  texts: TextType[],
};

export class ReportsAvailableTexts extends React.Component<Props> {
  static defaultProps = {
    activePupil: {},
    categories: [],
    children: null,
    handleTextToggle: () => {},
    selectedTexts: [],
    texts: [],
  };

  props: Props;

  getCatTexts = (categoryId: string, texts: TextType[], selectedTexts: string[], search: SearchkeyProp): TextType[] => {
    let visibleTexts: TextType[] = [];

    if (categoryId !== 'category-all') {
      if (categoryId === 'category-nocat') {
        visibleTexts = texts.filter((text: TextType) => text.categories.length === 0);
      } else if (categoryId === 'category-selected') {
        visibleTexts = texts.filter((text: TextType) => selectedTexts.indexOf(text.id) > -1);
      } else if (categoryId === 'category-unselected') {
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
      handleTextToggle,
      searchProps,
      selectedTexts,
      texts,
    } = this.props;
    const catTexts: TextType[] = this.getCatTexts(categoryId, texts, selectedTexts, searchProps);

    return (
      <div className="ReportsAvailableTexts">
        <SidebarHeader controlsExpanded={searchProps.visible} title={categoryLabel}>
          <SearchField
            anywhere={searchProps.anywhere}
            anywhereOnClick={searchProps.anywhereIconClick}
            clearOnClick={searchProps.searchIconClick}
            iconOnClick={searchProps.searchIconClick}
            onKeyUp={searchProps.searchChange}
            onChange={searchProps.searchChange}
            placeholder={text('SearchPlaceholder-text', 'SidebarHeader', {
              CAT_LABEL: categoryLabel,
            })}
            term={searchProps.term}
            visible={searchProps.visible}
          />
        </SidebarHeader>
        {catTexts.length > 0 ? (
          <ul className="ReportsAvailableTexts_list">
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
                  onClick={isActive ? null : handleTextToggle(text.id)}
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
        ) : searchProps.term !== '' ? (
          <NoItems>
            <Translation name="NoneSearched" ns="ReportsAvailableTexts" />
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

export default ReportsAvailableTexts;
