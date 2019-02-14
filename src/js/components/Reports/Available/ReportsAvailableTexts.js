// @flow

import React, { Component } from 'react';
import Icon from '../../Icon/Icon';
import LetterCount from '../../LetterCount/LetterCount';
import NoItems from '../../NoItems/NoItems';
import Translation from '../../Translation/Translation';
import type { CategoryType } from '../../../types/category';
import type { PupilType } from '../../../types/pupil';
import type { TextType } from '../../../types/text';
import { ICON_SUCCESS } from '../../../constants/icons';
import { getPupilTextHtml } from '../../../utils/html';
import './ReportsAvailableTexts.css';

type Props = {
  activePupil: PupilType | Object,
  categories: Array<CategoryType>,
  disableTexts: boolean,
  handleTextToggle: Function,
  selectedTexts: Array<string>,
  term: string,
  texts: Array<TextType>,
};

/**
 * A list of available texts.
 */
export class ReportsAvailableTexts extends Component<Props> {
  static defaultProps = {
    activePupil: {},
    categories: [],
    handleTextToggle: () => {},
    selectedTexts: [],
    term: '',
    texts: [],
  };

  props: Props;

  render() {
    return (
      <div className="ReportsAvailableTexts">
        {this.props.texts.length > 0 ? (
          <ul className="ReportsAvailableTexts_list">
            {this.props.texts.map(text => {
              const pupilText = getPupilTextHtml(text.getLabel(0), this.props.activePupil);
              const isSelected = this.props.selectedTexts.indexOf(text.id) > -1 ? true : false;
              const isActive = !isSelected && this.props.disableTexts;
              let classes = isSelected
                ? 'ReportsAvailableTexts__item ReportsAvailableTexts__item--selected'
                : 'ReportsAvailableTexts__item';
              if (isActive) {
                classes += ' ReportsAvailableTexts__item--disabled';
              }

              return (
                <li key={text.id} className={classes} onClick={isActive ? null : this.props.handleTextToggle(text.id)}>
                  <span dangerouslySetInnerHTML={pupilText} />
                  <LetterCount count={pupilText.__html.replace(/<(.|\n)*?>/g, '').length} />
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
