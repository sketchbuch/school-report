// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import ReportsTextList from './TextList/ReportsTextList'
import ReportsTexts from './Texts/ReportsTexts'
import type { CategoryType } from '../../types/category';
import type { ReportType } from '../../types/report';
import type { PupilType } from '../../types/pupil';
import type { TextType } from '../../types/text';
import type { DispatchType } from '../../types/functions';
import * as builderActions from '../../actions/builderActions';
import { moveItem, removeItem }  from '../../utils/reducers/array';
import './Reports.css';

type Props = {
  activePupil: PupilType | Object,
  activeReport: ReportType | Object,
  categories: Array<CategoryType>,
  initialSelected: Object,
  saveReorts: (reportId: string, selected: Object, callback?: ()=>{})=>{},
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
    initialSelected: {},
    saveReorts: ()=>{},
    texts: [],
  };

  props: Props;
  state: State;
  handleEndDrag: ()=>{};
  handleTextMove: ()=>{};
  handleTextToggle: ()=>{};

  constructor(props: Props) {
    super(props);

    this.state = {
      selected: props.initialSelected,
    };

    this.handleEndDrag = this.handleEndDrag.bind(this);
    this.handleTextMove = this.handleTextMove.bind(this);
    this.handleTextToggle = this.handleTextToggle.bind(this);
  }

  handleEndDrag() {
    console.log(this.props.activeReport.id,);
    this.props.saveReorts(
      this.props.activeReport.id,
      this.state.selected,
      //()=> {console.log('saved!!!!')},
    );
  }

  /**
   * Method called by drag and drop when a drag source is hovering over a drop target.
   */
  handleTextMove(sourceId: string, targetId: string, before: boolean = false) {
    const newSelected = JSON.parse(JSON.stringify(this.state.selected)); // Clone
    const activePupilId = this.props.activePupil.id;

    if (newSelected[activePupilId] === undefined) return;

    let sourceIndex = newSelected[activePupilId].indexOf(sourceId);
    let targetIndex = newSelected[activePupilId].indexOf(targetId);

    if (sourceIndex < 0 || targetIndex < 0) return;
    if (before && targetIndex > 0) targetIndex -= 1;
    
    newSelected[activePupilId] = moveItem(newSelected[activePupilId], sourceId, sourceIndex, targetIndex);
    this.setState({ selected: newSelected });
  }

  /**
   * Toggles the selected state of a text. Uyed in both the list of selected texts and the list of available texts.
   */
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
    this.handleEndDrag();
  }

  render() {
    const selectedTexts = (this.state.selected[this.props.activePupil.id] !== undefined) ? [...this.state.selected[this.props.activePupil.id]] : [];

    return (
      <section className="Reports">
        <div className="Reports__left">
          <ReportsTexts
            activePupil={this.props.activePupil}
            handleEndDrag={this.handleEndDrag}
            handleTextMove={this.handleTextMove}
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

const mapDispatchToProps = (dispatch: DispatchType) => {
  return {
    saveReorts: (reportId: string, selected: Object, callback?: Function = ()=>{}) => {
      dispatch(builderActions.save(reportId, selected, callback));
    }
  }
}

Reports = DragDropContext(HTML5Backend)(Reports);


export default connect(mapStateToProps, mapDispatchToProps)(Reports);
