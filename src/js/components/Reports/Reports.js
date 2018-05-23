// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReportsTextList from './TextList/ReportsTextList'
import ReportsTexts from './Texts/ReportsTexts'
import type { CategoryType } from '../../types/category';
import type { ReportType } from '../../types/report';
import type { PupilType } from '../../types/pupil';
import type { TextType } from '../../types/text';
import { removeItem }  from '../../utils/reducers/array';
import './Reports.css';

type Props = {
  activePupil: PupilType | Object,
  activeReport: ReportType | Object,
  categories: Array<CategoryType>,
  texts: Array<TextType>,
};

type State = {
  selected: Object,
};


/**
* The interface to build a report.
*/
export class Reports extends Component<Props, State> {
  static defaultProps = {
    activePupil: {},
    activeReport: {},
    categories: [],
    texts: [],
  };

  props: Props;
  state: State;
  handleTextToggle: Function;

  constructor(props: Props) {
    super(props);

    this.state = {
      selected: {},
    };

    this.handleTextToggle = this.handleTextToggle.bind(this);
  }

  handleTextToggle = (pupilId: string) => (event: SyntheticEvent<>) => {
    const newSelected = JSON.parse(JSON.stringify(this.state.selected));
    const activePupilId = this.props.activePupil.id;

    if (newSelected[activePupilId] === undefined) newSelected[activePupilId] = [];
    let pupilIndex = newSelected[activePupilId].indexOf(pupilId);

    if (pupilIndex > -1) {
      newSelected[activePupilId] = removeItem(newSelected[activePupilId], pupilIndex);
    } else {
      newSelected[activePupilId].push(pupilId);
    }

    this.setState({ selected: newSelected });
  }

  render() {
    const selectedTexts = (this.state.selected[this.props.activePupil.id] !== undefined) ? [...this.state.selected[this.props.activePupil.id]] : [];

    return (
      <section className="Reports">
        <div className="Reports__left">
          <ReportsTexts
            activePupil={this.props.activePupil}
            handleTextToggle={this.handleTextToggle}
            selectedTexts={selectedTexts}
            texts={this.props.texts}
          />
        </div>
        <div className="Reports__right">
          <ReportsTextList
            activePupil={this.props.activePupil}
            categories={this.props.categories}
            handleTextToggle={this.handleTextToggle}
            selectedTexts={selectedTexts}
            texts={this.props.texts}
          />
        </div>
      </section>
    )
  }
}


const mapStateToProps = (state: Object, props: Props) => {
  return {
    categories: state.categories,
    texts: state.texts,
  }
};


export default connect(mapStateToProps)(Reports);
