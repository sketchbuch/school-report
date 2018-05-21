// @flow

import React, { Component } from 'react';
import Icon from '../../Icon/Icon';
import NoItems from '../../NoItems/NoItems';
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
  handleTextToggle: Function,
  selectedTexts: Array<string>,
  texts: Array<TextType>,
};

type State = {
  option: string,
};


/**
* Selected texts for a pupil in a report.
*/
export class ReportsTextList extends Component<Props, State> {
  static defaultProps = {
    activePupil: {},
    categories: [],
    handleTextToggle: ()=>{},
    selectedTexts: [],
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
    if (this.state.option !== 'category-all') {
      if (this.state.option === 'category-nocat') {
        return this.props.texts.filter(text => text.categories.length === 0);
      } else {
        return this.props.texts.filter(text => text.categories.includes(this.state.option));
      }
    }

    return this.props.texts;
  }

  render() {
    const visibleTexts = this.getVisibleTexts();

    return (
      <div className="ReportsTextList">
        <ReportsCatSelect categories={this.props.categories} onChange={this.onFilterChanage} option={this.state.option} texts={this.props.texts} />

        {visibleTexts.length > 0 ? (
          <ul className="ReportsTextList_list">
            {visibleTexts.map(text => {
              const isSelected = (this.props.selectedTexts.indexOf(text.id) > -1) ? true : false;
              const classes = (isSelected) ? 'ReportsTextList__item ReportsTextList__item--selected' : 'ReportsTextList__item';

              return (
                <li key={text.id} className={classes} onClick={this.props.handleTextToggle(text.id)}>
                  <span dangerouslySetInnerHTML={getPupilTextHtml(text.getLabel(0), this.props.activePupil)} />
                  {isSelected && <span className="ReportsTextList__itemselected"><Icon type={ ICON_SUCCESS } /></span>}
                </li>
              )
            })}
          </ul>
        ) : (
          <NoItems><Translation name="None" ns="ReportsTextList" /></NoItems>
        )}
      </div>
    )
  }
}


export default ReportsTextList;
