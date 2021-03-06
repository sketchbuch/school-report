// @flow

import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import type { Dispatch } from 'redux';
import { DragDropContext } from 'react-dnd';
import { connect } from 'react-redux';
import * as builderActions from '../../actions/builderActions';
import ReportsAvailableTexts from './Available/ReportsAvailableTexts';
import ReportsCategories from './Categories/ReportsCategories';
import ReportsSelectedTexts from './Selected/ReportsSelectedTexts';
import type { CategoryType } from '../../types/category';
import type { ClassType } from '../../types/class';
import type { PupilType } from '../../types/pupil';
import type { ReduxState } from '../../types/reduxstate';
import type { ReportType } from '../../types/report';
import type { TextType } from '../../types/text';
import { CATEGORY_ALL } from '../../constants/misc';
import { getSelectedTexts } from '../../utils/redux';
import { moveItem, removeItem } from '../../utils/reducers/array';
import { text } from '../Translation/Translation';
import './Reports.css';

// TODO: fix types
export type Props = {
  activeClass: ClassType,
  activePupil: PupilType,
  activeReport: ReportType,
  categories: CategoryType[],
  disableTexts: boolean,
  saveReports: Function,
  selected: string[],
  texts: TextType[],
};

type State = {
  catId: string,
  catLabel: string,
  dragSelected: string[],
};

export class Reports extends Component<Props, State> {
  static defaultProps = {
    activeClass: {},
    activePupil: {},
    activeReport: {},
    categories: [],
    disableTexts: false,
    saveReports: () => {},
    texts: [],
  };

  props: Props;
  state: State = {
    catId: CATEGORY_ALL,
    catLabel: text('CatsAll', 'CatSelect'),
    dragSelected: [],
  };
  pupilId: string = this.props.activePupil.id;

  handleEndDrag = (): void => {
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
  };

  handleTextMove = (sourceId: string, targetId: string, before: boolean = false): void => {
    let dragSelected: string[] = [...this.props.selected];
    const sourceIndex: number = dragSelected.indexOf(sourceId);
    let targetIndex: number = dragSelected.indexOf(targetId);

    if (sourceIndex < 0 || targetIndex < 0) {
      return;
    }
    if (before && targetIndex > 0) {
      targetIndex -= 1;
    }

    dragSelected = moveItem(dragSelected, sourceId, sourceIndex, targetIndex);
    this.setState({ dragSelected });
  };

  handleTextToggle = (textId: string) => (event: SyntheticEvent<>): void => {
    let selected: string[] = [...this.props.selected];
    const textIndex: number = selected.indexOf(textId);

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

  catClick = (catId: string, catLabel: string) => (event: SyntheticMouseEvent<HTMLElement>): void => {
    this.setState({ catId, catLabel });
  };

  render() {
    const { catId, catLabel, dragSelected } = this.state;
    const { activePupil, categories, disableTexts, selected, texts } = this.props;
    const selectedTexts: string[] = dragSelected.length > 0 ? dragSelected : selected;

    return (
      <section className="Reports">
        <div className="Reports__column Reports__columnAvailable">
          <div className="Reports__columnWrapper">
            <ReportsCategories
              catClick={this.catClick}
              catId={catId}
              categories={categories}
              selectedTexts={selectedTexts}
              texts={texts}
            />
            <ReportsAvailableTexts
              activePupil={activePupil}
              categories={categories}
              categoryId={catId}
              categoryLabel={catLabel}
              disableTexts={disableTexts}
              selectedTexts={selectedTexts}
              onTextToggle={this.handleTextToggle}
              texts={texts}
            />
          </div>
        </div>
        <div className="Reports__column Reports__columnSelected">
          <ReportsSelectedTexts
            activePupil={activePupil}
            onEndDrag={this.handleEndDrag}
            selectedTexts={selectedTexts}
            onTextMove={this.handleTextMove}
            onTextToggle={this.handleTextToggle}
            texts={texts}
          />
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state: ReduxState, props: Props) => {
  return {
    selected: getSelectedTexts(state.builder, props.activeReport.id, props.activeClass.id, props.activePupil.id),
    categories: state.categories,
    texts: state.texts,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    saveReports: (
      reportId: string,
      classId: string,
      pupilId: string,
      selected: string[],
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
