// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import * as builderActions from '../../actions/builderActions';
import ReportsAvailableTexts from './Available/ReportsAvailableTexts';
import ReportsSelectedTexts from './Selected/ReportsSelectedTexts';
import SearchField from '../ui/SearchField/SearchField';
import Sidebar from '../Sidebar/Sidebar';
import SidebarHeader from '../Sidebar/Header/SidebarHeader';
import SidebarList from '../Sidebar/List/SidebarList';
import type { CategoryType } from '../../types/category';
import type { ClassType } from '../../types/class';
import type { DispatchType } from '../../types/functions';
import type { PupilType } from '../../types/pupil';
import type { ReportType } from '../../types/report';
import type { TextType } from '../../types/text';
import { categorySort } from '../../types/category';
import { getSelectedTexts } from '../../utils/redux';
import { moveItem, removeItem } from '../../utils/reducers/array';
import { text } from '../Translation/Translation';
import './Reports.css';

type Props = {
  activeClass: ClassType | Object,
  activePupil: PupilType | Object,
  activeReport: ReportType | Object,
  categories: Array<CategoryType>,
  disableTexts: boolean,
  saveReports: Function,
  selected: Array<string>,
  texts: Array<TextType>,
};

type State = {
  catId: string,
  catPage: number,
  catSearch: boolean,
  catSearchAnywhere: boolean,
  catTerm: string,
  dragSelected: Array<string>,
  textPage: number,
  textSearch: boolean,
  textSearchAnywhere: boolean,
  textTerm: string,
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
    texts: [],
  };

  props: Props;
  state: State;
  pupilId: string;
  handleCatAnywhereIconClick: (event: SyntheticEvent<MouseEvent>) => void;
  handleCatClick: () => {};
  handleCatSearch: (event: SyntheticEvent<HTMLInputElement>) => void;
  handleCatSearchIconClick: (event: SyntheticEvent<MouseEvent>) => void;
  handleEndDrag: () => {};
  handlePbChange: (catPage: number) => {};
  handleTextMove: (sourceId: string, targetId: string, before: boolean) => {};
  handleTextToggle: (textId: string) => {};

  constructor(props: Props) {
    super(props);

    this.state = {
      catId: 'category-all',
      catPage: 1,
      catSearch: false,
      catSearchAnywhere: false,
      catTerm: '',
      dragSelected: [],
      textPage: 1,
      textSearch: false,
      textSearchAnywhere: false,
      textTerm: '',
    };

    this.handleCatAnywhereIconClick = this.handleCatAnywhereIconClick.bind(this);
    this.handleCatClick = this.handleCatClick.bind(this);
    this.handleCatSearch = this.handleCatSearch.bind(this);
    this.handleCatSearchIconClick = this.handleCatSearchIconClick.bind(this);
    this.handleEndDrag = this.handleEndDrag.bind(this);
    this.handlePbChange = this.handlePbChange.bind(this);
    this.handleTextMove = this.handleTextMove.bind(this);
    this.handleTextToggle = this.handleTextToggle.bind(this);
    this.handleTextToggle = this.handleTextToggle.bind(this);
    this.pupilId = props.activePupil.id;
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

  handlePbChange(catPage: number) {
    this.setState({ catPage });
  }

  handleCatClick = (catId: string) => (event: SyntheticEvent<>) => {
    this.setState({ catId });
  };

  handleCatSearchIconClick(event: SyntheticEvent<MouseEvent>) {
    const newState = { catSearch: !this.state.catSearch };
    if (newState.catSearch === false) {
      newState.catTerm = '';
      newState.catPage = 1;
    }

    this.setState(newState);
  }

  handleCatAnywhereIconClick(event: SyntheticEvent<MouseEvent>) {
    this.setState({ catSearchAnywhere: !this.state.catSearchAnywhere });
  }

  handleCatSearch(event: SyntheticEvent<HTMLInputElement>) {
    if (event.type === 'keyup') {
      if (event.key === 'Escape') {
        this.handleCatSearchIconClick(event);
      }
    } else {
      const newState = { catTerm: event.currentTarget.value };
      if (newState.catTerm !== this.state.catTerm) {
        newState.catPage = 1;
      }

      this.setState(newState);
    }
  }

  getCatTexts() {
    let visibleTexts = [];

    if (this.state.catId !== 'category-all') {
      if (this.state.catId === 'category-nocat') {
        visibleTexts = this.props.texts.filter(text => text.categories.length === 0);
      } else if (this.state.catId === 'category-selected') {
        visibleTexts = this.props.texts.filter(text => this.props.selectedTexts.indexOf(text.id) > -1);
      } else if (this.state.catId === 'category-unselected') {
        visibleTexts = this.props.texts.filter(text => this.props.selectedTexts.indexOf(text.id) < 0);
      } else {
        visibleTexts = this.props.texts.filter(text => text.categories.includes(this.state.catId));
      }
    } else {
      visibleTexts = [...this.props.texts];
    }

    if (this.state.textTerm !== '') {
      visibleTexts = visibleTexts.filter(text => text.contains(this.state.textTerm, true));
    }

    return visibleTexts;
  }

  render() {
    const catTexts = this.getCatTexts();
    const selectedTexts = this.state.dragSelected.length > 0 ? this.state.dragSelected : this.props.selected;

    return (
      <section className="Reports">
        <div className="Reports__column Reports__column--cats">
          <Sidebar footer={false}>
            <SidebarHeader controlsExpanded={this.state.catSearch} title={text('Header-category', 'SidebarHeader')}>
              <SearchField
                anywhere={this.state.catSearchAnywhere}
                anywhereOnClick={this.handleCatAnywhereIconClick}
                clearOnClick={this.handleCatSearchIconClick}
                iconOnClick={this.handleCatSearchIconClick}
                onKeyUp={this.handleCatSearch}
                onChange={this.handleCatSearch}
                placeholder={text('SearchPlaceholder-category', 'SidebarHeader')}
                term={this.state.catTerm}
                visible={this.state.catSearch}
              />
            </SidebarHeader>
            <SidebarList
              catPage={this.state.catPage}
              dispatch={() => {}}
              items={this.props.categories}
              listType="category"
              noItemsTxt={text('Categories', 'SidebarNoItems')}
              onChange={this.handlePbChange}
              reportSidebar={this.state.catId}
              sortOrder={categorySort}
              onReportClick={this.handleCatClick}
              term={this.state.catTerm}
              termAnywhere={this.state.catSearchAnywhere}
              usePb
            />
          </Sidebar>
        </div>
        <div className="Reports__column Reports__column--cattexts Reports__column--offset">
          <ReportsAvailableTexts
            activePupil={this.props.activePupil}
            categories={this.props.categories}
            disableTexts={this.props.disableTexts}
            handleTextToggle={this.handleTextToggle}
            selectedTexts={selectedTexts}
            term={this.props.textTerm}
            texts={catTexts}
          />
        </div>
        <div className="Reports__column Reports__column--seltexts">
          <ReportsSelectedTexts
            activePupil={this.props.activePupil}
            handleEndDrag={this.handleEndDrag}
            handleTextMove={this.handleTextMove}
            handleTextToggle={this.handleTextToggle}
            selectedTexts={selectedTexts}
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
