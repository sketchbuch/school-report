// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import InfoMsg from '../../components/InfoMsg/InfoMsg';
import TextInput from '../../components/ui/TextInput/TextInput';
import Icon from '../../components/Icon/Icon';
import Sidebar from '../../components/Sidebar/Sidebar';
import SidebarList from '../../components/Sidebar/List/SidebarList';
import SidebarFooter from '../../components/Sidebar/Footer/SidebarFooter';
import SidebarHeader from '../../components/Sidebar/Header/SidebarHeader';
import NavButtonCircular from '../../components/ui/NavButtonCircular/NavButtonCircular';
import EditPupilLayout from './Edit/EditPupilLayout';
import DeletePupilsLayout from './Delete/DeletePupilsLayout';
import NewPupilLayout from './New/NewPupilLayout';
import { text } from '../../components/Translation/Translation';
import { pupilSort } from '../../types/pupil';
import type { ClassType } from '../../types/class';
import type { PupilSortOptions, PupilType } from '../../types/pupil';
import { ICON_ADD, ICON_CLOSE, ICON_DELETE } from '../../constants/icons';
import {
  ROUTE_DEL_PUPILS,
  ROUTE_EDIT_PUPIL,
  ROUTE_NEW_PUPIL,
  ROUTE_PUPILS,
} from '../../constants/routes';
import { getActiveClass, getClassPupils } from '../../utils/redux';
import setTitle from '../../utils/title';

type Props = {
  activeClass: ClassType | Object,
  dispatch: Function,
  location: Object,
  match: Object,
  pupilsSort: PupilSortOptions,
  pupils: Array<PupilType>,
};

type State = {
  curPage: number,
  term: string,
};

/**
 * Layout for displaying pupils.
 */
export class PupilsLayout extends Component<Props, State> {
  static defaultProps = {
    activeClass: {},
    pupils: [],
  };

  props: Props;
  state: State;
  handleClear: (event: SyntheticInputEvent<HTMLInputElement>) => void;
  handleSearch: (event: SyntheticInputEvent<HTMLInputElement>) => void;
  handlePbChange: (curPage: number) => void;

  constructor(props: Props) {
    super(props);

    this.state = {
      curPage: 1,
      term: '',
    };

    this.handleClear = this.handleClear.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handlePbChange = this.handlePbChange.bind(this);
  }

  componentDidMount() {
    setTitle(text('WinTitle', 'Pupils', { CLASS_NAME: this.getClassLabel() }));
  }

  componentDidUpdate() {
    if (
      window.location.pathname ===
      ROUTE_PUPILS.replace(':classId', this.props.match.params.classId)
    ) {
      setTitle(
        text('WinTitle', 'Pupils', { CLASS_NAME: this.getClassLabel() })
      );
    }
  }

  handleClear(event: SyntheticInputEvent<HTMLInputElement>) {
    this.setState({ term: '', curPage: 1 });
  }

  handleSearch(event: SyntheticInputEvent<HTMLInputElement>) {
    const term = event.currentTarget.value;
    this.setState({ term, curPage: 1 });
  }

  handlePbChange(curPage: number) {
    this.setState({ curPage });
  }

  /**
   * Returns the class name or id if not found.
   *
   * @return string
   */
  getClassLabel(): string {
    return this.props.activeClass.label !== undefined
      ? this.props.activeClass.label
      : this.props.match.params.classId;
  }

  render() {
    const HAS_PUPILS = this.props.pupils.length > 0 ? true : false;
    const leftActions = (
      <NavButtonCircular
        to={ROUTE_NEW_PUPIL.replace(
          ':classId',
          this.props.match.params.classId
        )}
        className="SidebarFooter__action"
        buttontype="pos-rollover"
        action="add-pupil"
        title={text('PupilAdd', 'Actions')}
      >
        <Icon type={ICON_ADD} />
      </NavButtonCircular>
    );
    const rightActions = (
      <NavButtonCircular
        disabled={!HAS_PUPILS}
        to={ROUTE_DEL_PUPILS.replace(
          ':classId',
          this.props.match.params.classId
        )}
        className="SidebarFooter__action"
        buttontype="neg-rollover"
        action="delete-pupils"
        title={text('PupilDelete', 'Actions')}
      >
        <Icon type={ICON_DELETE} />
      </NavButtonCircular>
    );
    let searchBox = null;

    if (HAS_PUPILS) {
      searchBox = (
        <React.Fragment>
          <TextInput
            className="SidebarHeader__search"
            onChange={this.handleSearch}
            placeholder={text('SearchPlaceholder', 'SidebarHeader')}
            value={this.state.term}
          />
          <span
            className="SidebarHeader__searchclear"
            onClick={this.handleClear}
            title={text('Clear', 'ItemSelection')}
          >
            <Icon type={ICON_CLOSE} />
          </span>
        </React.Fragment>
      );
    }

    return (
      <div className="Panel">
        <Sidebar>
          <SidebarHeader
            title={text('Header-pupil', 'SidebarHeader')}
            subtitle={text('Subheader-count', 'SidebarHeader', {
              COUNT: this.props.pupils.length,
            })}
          >
            {searchBox}
          </SidebarHeader>
          <SidebarList
            curPage={this.state.curPage}
            dispatch={this.props.dispatch}
            items={this.props.pupils}
            listType="pupil"
            noItemsTxt={text('Pupils', 'SidebarNoItems')}
            onChange={this.handlePbChange}
            sortOrder={pupilSort[this.props.pupilsSort]}
            term={this.state.term}
            usePb
          />
          <SidebarFooter
            leftActions={leftActions}
            rightActions={rightActions}
          />
        </Sidebar>
        <Switch>
          <Route
            path={ROUTE_EDIT_PUPIL}
            render={routerProps => (
              <EditPupilLayout
                {...routerProps}
                dispatch={this.props.dispatch}
                pupils={this.props.pupils}
                activeClass={this.props.activeClass}
              />
            )}
          />
          <Route
            path={ROUTE_DEL_PUPILS}
            render={routerProps => (
              <DeletePupilsLayout
                {...routerProps}
                dispatch={this.props.dispatch}
                pupils={this.props.pupils}
                activeClass={this.props.activeClass}
              />
            )}
          />
          <Route
            path={ROUTE_NEW_PUPIL}
            render={routerProps => (
              <NewPupilLayout
                {...routerProps}
                dispatch={this.props.dispatch}
                pupils={this.props.pupils}
                activeClass={this.props.activeClass}
              />
            )}
          />
          <Route
            path={ROUTE_PUPILS}
            render={routerProps => (
              <InfoMsg
                {...routerProps}
                headine={text('Pupils', 'InfoMsg', {
                  CLASS_NAME: this.getClassLabel(),
                })}
                subtext={text('PupilsMsg', 'InfoMsg', {
                  CLASS_NAME: this.getClassLabel(),
                })}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state: Object, props: Props) => {
  return {
    activeClass: getActiveClass(state.classes, props.match.params.classId),
    pupils: getClassPupils(state.pupils, props.match.params.classId),
    pupilsSort: state.settings.pupilsSort,
  };
};

export default connect(mapStateToProps)(PupilsLayout);
