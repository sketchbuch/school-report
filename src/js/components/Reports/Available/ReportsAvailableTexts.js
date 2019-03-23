// @flow

import * as React from 'react';
import classNames from 'classnames';
import Icon from '../../Icon/Icon';
import LetterCount from '../../LetterCount/LetterCount';
import NoItems from '../../NoItems/NoItems';
import Translation from '../../Translation/Translation';
import type { CategoryType } from '../../../types/category';
import type { InsertDangerousHtmlObj } from '../../../types/misc';
import type { PupilType } from '../../../types/pupil';
import type { TextType } from '../../../types/text';
import { ICON_SUCCESS } from '../../../constants/icons';
import { getPupilTextHtml } from '../../../utils/html';
import './ReportsAvailableTexts.css';

// TODO - fix types
export type Props = {
  activePupil: PupilType | Object,
  categories: CategoryType[],
  children?: React.Node,
  disableTexts: boolean,
  handleTextToggle: Function,
  selectedTexts: string[],
  term: string,
  texts: TextType[],
};

export class ReportsAvailableTexts extends React.Component<Props> {
  static defaultProps = {
    activePupil: {},
    categories: [],
    children: null,
    handleTextToggle: () => {},
    selectedTexts: [],
    term: '',
    texts: [],
  };

  props: Props;

  render() {
    return (
      <div className="ReportsAvailableTexts">
        {this.props.children}
        {this.props.texts.length > 0 ? (
          <ul className="ReportsAvailableTexts_list">
            {this.props.texts.map(text => {
              const pupilText: InsertDangerousHtmlObj = getPupilTextHtml(text.getLabel(0), this.props.activePupil);
              const isSelected: boolean = this.props.selectedTexts.indexOf(text.id) > -1 ? true : false;
              const isActive: boolean = !isSelected && this.props.disableTexts;

              return (
                <li
                  key={text.id}
                  className={classNames('ReportsAvailableTexts__item', {
                    'ReportsAvailableTexts__item--selected': isSelected,
                    'ReportsAvailableTexts__item--disabled': isActive,
                  })}
                  onClick={isActive ? null : this.props.handleTextToggle(text.id)}
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
        ) : this.props.term !== '' ? (
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
