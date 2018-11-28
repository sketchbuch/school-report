// @flow

import React, { Component } from 'react';
import Icon from '../../Icon/Icon';
import NoItems from '../../NoItems/NoItems';
import LetterCount from '../../LetterCount/LetterCount';
import ReportsCatSelect from '../CatSelect/ReportsCatSelect';
import Translation from '../../Translation/Translation';
import type { CategoryType } from '../../../types/category';
import type { PupilType } from '../../../types/pupil';
import type { TextType } from '../../../types/text';
import { getPupilTextHtml } from '../../../utils/html';
import { ICON_SUCCESS } from '../../../constants/icons';
import './ReportsTextList.css';

type Props = {
  activePupil: PupilType | Object,
  categories: Array<CategoryType>,
  disableTexts: boolean,
  handleTextToggle: Function,
  selectedTexts: Array<string>,
  term: string,
  texts: Array<TextType>,
};

type State = {
  option: string,
};


/**
* A list of available texts.
*/
export class ReportsTextList extends Component<Props, State> {
  static defaultProps = {
    activePupil: {},
    categories: [],
    handleTextToggle: ()=>{},
    selectedTexts: [],
    term: '',
    texts: [],
  };

  props: Props;
  state: State;
  onFilterChanage: Function;

  constructor(props: Props) {
    super(props);

    this.state = {
      option: 'category-all',
    };

    this.onFilterChanage = this.onFilterChanage.bind(this);
  }

  onFilterChanage(event: SyntheticInputEvent<HTMLInputElement>) {
    this.setState({option: event.target.value});
  }

  getVisibleTexts() {
    let visibleTexts = [];

    if (this.state.option !== 'category-all') {
      if (this.state.option === 'category-nocat') {
        visibleTexts = this.props.texts.filter(text => text.categories.length === 0);
      } else if (this.state.option === 'category-selected') {
        visibleTexts = this.props.texts.filter(text => this.props.selectedTexts.indexOf(text.id) > -1);
      } else if (this.state.option === 'category-unselected') {
        visibleTexts = this.props.texts.filter(text => this.props.selectedTexts.indexOf(text.id) < 0);
      } else {
        visibleTexts = this.props.texts.filter(text => text.categories.includes(this.state.option));
      }
    } else {
      visibleTexts = [...this.props.texts];
    }

    if (this.props.term !== '') visibleTexts = visibleTexts.filter(text => text.contains(this.props.term));

    return visibleTexts;
  }

  render() {
    const visibleTexts = this.getVisibleTexts();

    return (
      <div className="ReportsTextList">
        <ReportsCatSelect 
          categories={this.props.categories} 
          onChange={this.onFilterChanage} 
          option={this.state.option} 
          selectedCount={this.props.selectedTexts.length} 
          texts={this.props.texts} 
        />

        {visibleTexts.length > 0 ? (
          <ul className="ReportsTextList_list">
            {visibleTexts.map(text => {
              const pupilText = getPupilTextHtml(text.getLabel(0), this.props.activePupil);
              const isSelected = (this.props.selectedTexts.indexOf(text.id) > -1) ? true : false;
              const isActive = !isSelected && this.props.disableTexts;
              let classes = (isSelected) ? 'ReportsTextList__item ReportsTextList__item--selected' : 'ReportsTextList__item';
              if (isActive) classes += ' ReportsTextList__item--disabled';

              return (
                <li key={text.id} className={classes} onClick={isActive ? null : this.props.handleTextToggle(text.id)}>
                  <span dangerouslySetInnerHTML={pupilText} />
                  <LetterCount count={pupilText.__html.replace(/<(.|\n)*?>/g, '').length} />
                  {isSelected && <span className="ReportsTextList__itemselected"><Icon type={ ICON_SUCCESS } /></span>}
                </li>
              )
            })}
          </ul>
        ) : (
          this.props.term !== '' ? (
            <NoItems><Translation name="NoneSearched" ns="ReportsTextList" /></NoItems>
          ) : (
            <NoItems><Translation name="None" ns="ReportsTextList" /></NoItems>
          )
        )}
      </div>
    )
  }
}


export default ReportsTextList;
