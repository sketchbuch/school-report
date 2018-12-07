// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import InfoMsg from '../../components/InfoMsg/InfoMsg';
import Icon from '../../components/Icon/Icon';
import Sidebar from '../../components/Sidebar/Sidebar';
import SidebarList from '../../components/Sidebar/List/SidebarList';
import SidebarFooter from '../../components/Sidebar/Footer/SidebarFooter';
import SidebarHeader from '../../components/Sidebar/Header/SidebarHeader';
import NavButtonCircular from '../../components/ui/NavButtonCircular/NavButtonCircular';
import EditPupilLayout from './Edit/EditPupilLayout';
import DeletePupilsLayout from './Delete/DeletePupilsLayout';
import NewPupilLayout from './New/NewPupilLayout';
import { text }  from '../../components/Translation/Translation';
import { pupilSort } from '../../types/pupil';
import type { ClassType } from '../../types/class';
import type { PupilType } from '../../types/pupil';
import { ICON_ADD, ICON_DELETE } from '../../constants/icons';
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
  pupils: Array<PupilType>,
};


/**
* Layout for displaying pupils.
*/
export class PupilsLayout extends Component<Props> {
  static defaultProps = {
      activeClass: {},
      pupils: [],
   };

  props: Props;

  componentDidMount() {
    setTitle(text('WinTitle', 'Pupils', { CLASS_NAME: this.getClassLabel() }));
  }

  componentDidUpdate() {
    if (window.location.pathname === ROUTE_PUPILS.replace(':classId', this.props.match.params.classId)) setTitle(text('WinTitle', 'Pupils', { CLASS_NAME: this.getClassLabel() }));
  }

  /**
  * Returns the class name or id if not found.
  *
  * @return string
  */
  getClassLabel(): string {
    return (this.props.activeClass.label !== undefined) ? this.props.activeClass.label : this.props.match.params.classId;
  }

  render() {
    const HAS_PUPILS = (this.props.pupils.length > 0) ? true : false;
    const leftActions = (
      <NavButtonCircular
        to={ROUTE_NEW_PUPIL.replace(':classId', this.props.match.params.classId)}
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
        to={ROUTE_DEL_PUPILS.replace(':classId', this.props.match.params.classId)}
        className="SidebarFooter__action"
        buttontype="neg-rollover"
        action="delete-pupils"
        title={text('PupilDelete', 'Actions')}
      >
        <Icon type={ICON_DELETE} />
      </NavButtonCircular>
    );

    return (
      <div className="Panel">
        <Sidebar>
          <SidebarHeader 
            title={text('Header-pupil', 'SidebarHeader')}
            subtitle={text('Subheader-count', 'SidebarHeader', { COUNT: this.props.pupils.length })}
          />
          <SidebarList dispatch={this.props.dispatch} listType="pupil" items={this.props.pupils} noItemsTxt={text('Pupils', 'SidebarNoItems')} sortOrder={pupilSort} />
          <SidebarFooter leftActions={leftActions} rightActions={rightActions} />
        </Sidebar>
        <Switch>
          <Route path={ROUTE_EDIT_PUPIL} render={routerProps => <EditPupilLayout {...routerProps} dispatch={this.props.dispatch} pupils={this.props.pupils} activeClass={this.props.activeClass} />} />
          <Route path={ROUTE_DEL_PUPILS} render={routerProps => <DeletePupilsLayout {...routerProps} dispatch={this.props.dispatch} pupils={this.props.pupils} activeClass={this.props.activeClass} />} />
          <Route path={ROUTE_NEW_PUPIL} render={routerProps => <NewPupilLayout {...routerProps} dispatch={this.props.dispatch} pupils={this.props.pupils} activeClass={this.props.activeClass} />} />
          <Route path={ROUTE_PUPILS} render={routerProps => <InfoMsg {...routerProps} headine={text('Pupils', 'InfoMsg', { CLASS_NAME: this.getClassLabel() })} subtext={text('PupilsMsg', 'InfoMsg', { CLASS_NAME: this.getClassLabel() })} />} />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state: Object, props: Props) => {
  return {
    activeClass: getActiveClass(state.classes, props.match.params.classId),
    pupils: getClassPupils(state.pupils, props.match.params.classId),
  };
};


export default connect(mapStateToProps)(PupilsLayout);
