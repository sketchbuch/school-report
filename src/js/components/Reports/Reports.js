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
import categoryDefault, { CategoryFactory } from '../../types/category';
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
  catLabel: string,
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
  catAnywhereIconClick: (event: SyntheticEvent<MouseEvent>) => void;
  catClick: () => {};
  catPbChange: (catPage: number) => {};
  catSearch: (event: SyntheticEvent<HTMLInputElement>) => void;
  catSearchIconClick: (event: SyntheticEvent<MouseEvent>) => void;
  endDrag: () => {};
  pupilId: string;
  textMove: (sourceId: string, targetId: string, before: boolean) => {};
  textToggle: (textId: string) => {};

  constructor(props: Props) {
    super(props);

    this.state = {
      catId: 'category-all',
      catLabel: '',
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

    this.catAnywhereIconClick = this.catAnywhereIconClick.bind(this);
    this.catClick = this.catClick.bind(this);
    this.catSearch = this.catSearch.bind(this);
    this.catSearchIconClick = this.catSearchIconClick.bind(this);
    this.endDrag = this.endDrag.bind(this);
    this.catPbChange = this.catPbChange.bind(this);
    this.pupilId = props.activePupil.id;
    this.textMove = this.textMove.bind(this);
    this.textToggle = this.textToggle.bind(this);
    this.textToggle = this.textToggle.bind(this);
  }

  /**
   * Method called by drag and drop when a draging ends.
   */
  endDrag() {
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
  textMove(sourceId: string, targetId: string, before: boolean = false) {
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
  textToggle = (textId: string) => (event: SyntheticEvent<>) => {
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

  catPbChange(catPage: number) {
    this.setState({ catPage });
  }

  catClick = (catId: string, catLabel: string) => (event: SyntheticEvent<>) => {
    this.setState({ catId, catLabel });
  };

  catSearchIconClick(event: SyntheticEvent<MouseEvent>) {
    const newState = { catSearch: !this.state.catSearch };
    if (newState.catSearch === false) {
      newState.catTerm = '';
      newState.catPage = 1;
    }

    this.setState(newState);
  }

  catAnywhereIconClick(event: SyntheticEvent<MouseEvent>) {
    this.setState({ catSearchAnywhere: !this.state.catSearchAnywhere });
  }

  catSearch(event: SyntheticEvent<HTMLInputElement>) {
    if (event.type === 'keyup') {
      if (event.key === 'Escape') {
        this.catSearchIconClick(event);
      }
    } else {
      const newState = { catTerm: event.currentTarget.value };
      if (newState.catTerm !== this.state.catTerm) {
        newState.catPage = 1;
      }

      this.setState(newState);
    }
  }

  getCatTexts(): TextType[] {
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

    if (this.state.catTerm !== '') {
      visibleTexts = visibleTexts.filter(text => text.contains(this.state.catTerm, this.state.catSearchAnywhere));
    }

    return visibleTexts;
  }

  getCats(): CategoryType[] {
    const cats = [...this.props.categories];

    // AddCategory All
    const all = CategoryFactory({ ...categoryDefault, label: text('CatsAll', 'CatSelect') }, Date.now());
    all.id = 'category-all';
    cats.unshift(all);
    const uncategorised = CategoryFactory(
      { ...categoryDefault, label: text('CatsUncategorised', 'CatSelect') },
      Date.now()
    );
    uncategorised.id = 'category-nocat';
    cats.unshift(uncategorised);

    return cats;
  }

  render() {
    const cats = this.getCats();
    const catTexts = this.getCatTexts();
    const selectedTexts = this.state.dragSelected.length > 0 ? this.state.dragSelected : this.props.selected;

    return (
      <section className="Reports">
        <div className="Reports__column Reports__column--cats">
          <Sidebar footer={false}>
            <SidebarHeader controlsExpanded={this.state.catSearch} title={text('Header-category', 'SidebarHeader')}>
              <SearchField
                anywhere={this.state.catSearchAnywhere}
                anywhereOnClick={this.catAnywhereIconClick}
                clearOnClick={this.catSearchIconClick}
                iconOnClick={this.catSearchIconClick}
                onKeyUp={this.catSearch}
                onChange={this.catSearch}
                placeholder={text('SearchPlaceholder-category', 'SidebarHeader')}
                term={this.state.catTerm}
                visible={this.state.catSearch}
              />
            </SidebarHeader>
            <SidebarList
              curPage={this.state.catPage}
              dispatch={() => {}}
              items={cats}
              listType="category"
              noItemsTxt={text('Categories', 'SidebarNoItems')}
              onChange={this.catPbChange}
              reportSidebar={this.state.catId}
              sortOrder={categorySort}
              onReportClick={this.catClick}
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
            textToggle={this.textToggle}
            selectedTexts={selectedTexts}
            term={this.props.textTerm}
            texts={catTexts}
          >
            <SidebarHeader controlsExpanded={this.state.catSearch} title={this.state.catLabel}>
              <SearchField
                anywhere={this.state.catSearchAnywhere}
                anywhereOnClick={this.catAnywhereIconClick}
                clearOnClick={this.catSearchIconClick}
                iconOnClick={this.catSearchIconClick}
                onKeyUp={this.catSearch}
                onChange={this.catSearch}
                placeholder={text('SearchPlaceholder-text', 'SidebarHeader', {
                  CAT_LABEL: this.state.catLabel,
                })}
                term={this.state.catTerm}
                visible={this.state.catSearch}
              />
            </SidebarHeader>
          </ReportsAvailableTexts>
        </div>
        <div className="Reports__column Reports__column--seltexts">
          <ReportsSelectedTexts
            activePupil={this.props.activePupil}
            endDrag={this.endDrag}
            textMove={this.textMove}
            textToggle={this.textToggle}
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
