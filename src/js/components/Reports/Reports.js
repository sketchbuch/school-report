// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import ReportsTextList from './TextList/ReportsTextList'
import ReportsTexts from './Texts/ReportsTexts'
import type { CategoryType } from '../../types/category';
import type { ClassType } from '../../types/class';
import type { ReportType } from '../../types/report';
import type { PupilType } from '../../types/pupil';
import type { TextType } from '../../types/text';
import type { DispatchType } from '../../types/functions';
import * as builderActions from '../../actions/builderActions';
import { moveItem, removeItem }  from '../../utils/reducers/array';
import './Reports.css';

type Props = {
  activeClass: ClassType | Object,
  activePupil: PupilType | Object,
  activeReport: ReportType | Object,
  builder: Object,
  categories: Array<CategoryType>,
  dragReports: Function,
  saveReports: Function,
  texts: Array<TextType>,
};


/**
* The interface to build a report.
*/
export class Reports extends Component<Props> {
  static defaultProps = {
    activeClass: {},
    activePupil: {},
    activeReport: {},
    builder: {},
    categories: [],
    dragReports: ()=>{},
    saveReports: ()=>{},
    texts: [],
  };

  props: Props;
  handleEndDrag: ()=>{};
  handleTextMove: ()=>{};
  handleTextToggle: ()=>{};

  constructor(props: Props) {
    super(props);

    this.handleEndDrag = this.handleEndDrag.bind(this);
    this.handleTextMove = this.handleTextMove.bind(this);
    this.handleTextToggle = this.handleTextToggle.bind(this);
  }

  handleEndDrag() {
    const reportId = this.props.activeReport.id;
    const classId = this.props.activeClass.id;
    const pupilId = this.props.activePupil.id;

    this.props.saveReports(
      reportId,
      classId,
      pupilId,
      [...this.props.builder[reportId][classId][pupilId]], // Must exist or wouldn't be able to drag
    );
  }

  /**
   * Method called by drag and drop when a drag source is hovering over a drop target.
   */
  handleTextMove(sourceId: string, targetId: string, before: boolean = false) {
    const { builder } = this.props;
    const reportId = this.props.activeReport.id;
    const classId = this.props.activeClass.id;
    const pupilId = this.props.activePupil.id;
    let selected = [...builder[reportId][classId][pupilId]];

    let sourceIndex = selected.indexOf(sourceId);
    let targetIndex = selected.indexOf(targetId);

    if (sourceIndex < 0 || targetIndex < 0) return;
    if (before && targetIndex > 0) targetIndex -= 1;
    
    selected = moveItem(selected, sourceId, sourceIndex, targetIndex); 
    
    this.props.dragReports(
      reportId,
      classId,
      pupilId,
      selected,
    );
  }

  /**
   * Toggles the selected state of a text.
   */
  handleTextToggle = (textId: string) => (event: SyntheticEvent<>) => {
    const { builder } = this.props;
    const reportId = this.props.activeReport.id;
    const classId = this.props.activeClass.id;
    const pupilId = this.props.activePupil.id;
    let selected = [];

    if (builder[reportId] === undefined) {
      selected.push(textId);
    } else if (builder[reportId][classId] === undefined) {
      selected.push(textId);
    } else if (builder[reportId][classId][pupilId] === undefined) {
      selected.push(textId);
    } else {
      const textIndex = builder[reportId][classId][pupilId].indexOf(textId);
      selected = [...builder[reportId][classId][pupilId]];

      if (textIndex > -1) {
        selected = removeItem(selected, textIndex);
      } else {
        selected.push(textId);
      }
    }
    
    this.props.saveReports(
      reportId,
      classId,
      pupilId,
      selected,
    );
  }

  render() {
    const { builder } = this.props;
    const reportId = this.props.activeReport.id;
    const classId = this.props.activeClass.id;
    const pupilId = this.props.activePupil.id;

    let selected = [];
    if (builder[reportId] !== undefined) {
      if (builder[reportId][classId] !== undefined) {
        if (builder[reportId][classId][pupilId] !== undefined) {
          selected = builder[reportId][classId][pupilId];
        }
      }
    }

    return (
      <section className="Reports">
        <div className="Reports__left">
          <ReportsTexts
            activePupil={this.props.activePupil}
            handleEndDrag={this.handleEndDrag}
            handleTextMove={this.handleTextMove}
            handleTextToggle={this.handleTextToggle}
            selectedTexts={selected}
            texts={this.props.texts}
          />
        </div>
        <div className="Reports__right">
          <ReportsTextList
            activePupil={this.props.activePupil}
            categories={this.props.categories}
            handleTextToggle={this.handleTextToggle}
            selectedTexts={selected}
            texts={this.props.texts}
          />
        </div>
      </section>
    )
  }
}


const mapStateToProps = (state: Object, props: Props) => {
  return {
    builder: state.builder,
    categories: state.categories,
    texts: state.texts,
  }
};

const mapDispatchToProps = (dispatch: DispatchType) => {
  return {
    dragReports: (reportId: string, classId: string, pupilId: string, selected: Array<string>) => {
      dispatch(builderActions.drag(reportId, classId, pupilId, selected));
    },
    saveReports: (reportId: string, classId: string, pupilId: string, selected: Array<string>, callback?: Function = ()=>{}) => {
      dispatch(builderActions.save(reportId, classId, pupilId, selected, callback));
    },
  }
}

Reports = DragDropContext(HTML5Backend)(Reports);


export default connect(mapStateToProps, mapDispatchToProps)(Reports);
