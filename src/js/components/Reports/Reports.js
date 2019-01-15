// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import ReportsTextList from './TextList/ReportsTextList';
import ReportsTexts from './Texts/ReportsTexts';
import { getSelectedTexts } from '../../utils/redux';
import type { CategoryType } from '../../types/category';
import type { ClassType } from '../../types/class';
import type { ReportType } from '../../types/report';
import type { PupilType } from '../../types/pupil';
import type { TextType } from '../../types/text';
import type { DispatchType } from '../../types/functions';
import * as builderActions from '../../actions/builderActions';
import { moveItem, removeItem } from '../../utils/reducers/array';
import './Reports.css';

type Props = {
  activeClass: ClassType | Object,
  activePupil: PupilType | Object,
  activeReport: ReportType | Object,
  categories: Array<CategoryType>,
  disableTexts: boolean,
  saveReports: Function,
  selected: Array<string>,
  term: string,
  texts: Array<TextType>,
};

type State = {
  dragSelected: Array<string>,
};

/**
 * The interface to build a report.
 */
export class Reports extends Component<Props, State> {
  static defaultProps = {
    activeClass: {},
    activePupil: {},
    activeReport: {},
    categories: [],
    disableTexts: false,
    saveReports: () => {},
    term: '',
    texts: [],
  };

  props: Props;
  state: State;
  pupilId: string;
  handleEndDrag: () => {};
  handleTextMove: () => {};
  handleTextToggle: () => {};

  constructor(props: Props) {
    super(props);

    this.state = {
      dragSelected: [],
    };

    this.pupilId = props.activePupil.id;
    this.handleEndDrag = this.handleEndDrag.bind(this);
    this.handleTextMove = this.handleTextMove.bind(this);
    this.handleTextToggle = this.handleTextToggle.bind(this);
  }

  /**
   * Method called by drag and drop when a draging ends.
   */
  handleEndDrag() {
    if (this.state.dragSelected.length < 1) {
      return;
    }

    this.props.saveReports(
      this.props.activeReport.id,
      this.props.activeClass.id,
      this.props.activePupil.id,
      [...this.state.dragSelected],
      () => {},
      true
    );

    this.setState({ dragSelected: [] });
  }

  /**
   * Method called by drag and drop when a drag source is hovering over a drop target.
   */
  handleTextMove(sourceId: string, targetId: string, before: boolean = false) {
    let dragSelected = [...this.props.selected];
    const sourceIndex = dragSelected.indexOf(sourceId);
    let targetIndex = dragSelected.indexOf(targetId);

    if (sourceIndex < 0 || targetIndex < 0) {
      return;
    }
    if (before && targetIndex > 0) {
      targetIndex -= 1;
    }

    dragSelected = moveItem(dragSelected, sourceId, sourceIndex, targetIndex);
    this.setState({ dragSelected });
  }

  /**
   * Toggles the selected state of a text.
   */
  handleTextToggle = (textId: string) => (event: SyntheticEvent<>) => {
    let selected = [...this.props.selected];
    const textIndex = selected.indexOf(textId);

    if (textIndex > -1) {
      selected = removeItem(selected, textIndex);
    } else {
      selected.push(textId);
    }

    this.props.saveReports(
      this.props.activeReport.id,
      this.props.activeClass.id,
      this.props.activePupil.id,
      selected,
      () => {},
      false
    );
  };

  render() {
    const selectedTexts = this.state.dragSelected.length > 0 ? this.state.dragSelected : this.props.selected;

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
            disableTexts={this.props.disableTexts}
            handleTextToggle={this.handleTextToggle}
            selectedTexts={selectedTexts}
            term={this.props.term}
            texts={this.props.texts}
          />
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state: Object, props: Props) => {
  return {
    selected: getSelectedTexts(state.builder, props.activeReport.id, props.activeClass.id, props.activePupil.id),
    categories: state.categories,
    texts: state.texts,
  };
};

const mapDispatchToProps = (dispatch: DispatchType) => {
  return {
    saveReports: (
      reportId: string,
      classId: string,
      pupilId: string,
      selected: Array<string>,
      callback?: Function = () => {},
      immediate: boolean
    ) => {
      dispatch(builderActions.save(reportId, classId, pupilId, selected, callback, immediate));
    },
  };
};

Reports = DragDropContext(HTML5Backend)(Reports);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reports);
