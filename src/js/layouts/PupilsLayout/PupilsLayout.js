// @flow

import * as React from 'react';
import type { Dispatch } from 'redux';
import type { FormikProps } from 'formik';
import { Route, Switch } from 'react-router-dom';
import { RouteComponentProps, RouteChildrenProps } from 'react-router';
import { connect } from 'react-redux';
import * as pupilActions from '../../actions/pupilActions';
import Form from './Form/Form';
import InfoMsg from '../../components/InfoMsg/InfoMsg';
import Sidebar from '../../components/Sidebar/Sidebar';
import SidebarFooter from '../../components/Sidebar/Footer/SidebarFooter';
import SidebarHeader from '../../components/Sidebar/Header/SidebarHeader';
import SidebarList from '../../components/Sidebar/List/SidebarList';
import getDomainRec from '../../utils/domain';
import pupilDefault, { PupilFactory, pupilSort } from '../../types/pupil';
import setLayoutTitle from '../../utils/setLayoutTitle';
import type { ClassType } from '../../types/class';
import type { PupilSortOptions, PupilType } from '../../types/pupil';
import type { ReduxState } from '../../types/reduxstate';
import type { SidebarListTypes } from '../../types/sidebarList';
import type { WithSearchProps } from '../../hoc/withSearch';
import withSearch from '../../hoc/withSearch';
import { ActionButton, Delete, Edit, SearchBox } from '../../components/Domain';
import { ROUTE_DEL_PUPILS, ROUTE_EDIT_PUPIL, ROUTE_NEW_PUPIL, ROUTE_PUPILS } from '../../constants/routes';
import { getActiveClass, getClassPupils } from '../../utils/redux';
import { pupilSchema } from '../../validation/schemas';
import { text } from '../../components/Translation/Translation';

export type Props = {
  ...RouteComponentProps,
  activeClass: ClassType | Object,
  dispatch: Dispatch,
  pupilsSort: PupilSortOptions,
  pupils: PupilType[],
} & WithSearchProps;

const DOMAIN_TYPE: SidebarListTypes = 'pupil';

export const getClassLabel = (props: Props): string => {
  return props.activeClass.label !== undefined ? props.activeClass.label : props.match.params.classId;
};

export class PupilsLayout extends React.Component<Props> {
  static defaultProps = {
    pupils: [],
  };

  props: Props;

  componentDidMount() {
    setLayoutTitle(text('WinTitle', 'Pupils', { CLASS_NAME: getClassLabel(this.props) }));
  }

  componentDidUpdate() {
    setLayoutTitle(
      text('WinTitle', 'Pupils', {
        CLASS_NAME: getClassLabel(this.props),
      }),
      ROUTE_PUPILS.replace(':classId', this.props.match.params.classId)
    );
  }

  renderActionsLeft = (): React.Node => {
    return (
      <ActionButton
        domainType={DOMAIN_TYPE}
        title={text('PupilAdd', 'Actions')}
        to={ROUTE_NEW_PUPIL.replace(':classId', this.props.match.params.classId)}
      />
    );
  };

  renderActionsRight = (disabled: boolean): React.Node => {
    return (
      <ActionButton
        disabled={!disabled}
        domainType={DOMAIN_TYPE}
        title={text('PupilDelete', 'Actions')}
        to={ROUTE_DEL_PUPILS.replace(':classId', this.props.match.params.classId)}
        type="delete"
      />
    );
  };

  renderDelete = (routerProps: RouteChildrenProps): React.Node => {
    return (
      <Delete
        {...routerProps}
        actionDeleteAll={pupilActions.deletePupils}
        butCancelName="BackToPupils"
        butCancelNs="Pupils"
        butDeleteLabel={text('BtnLabel', 'DeletePupilsLayout')}
        dispatch={this.props.dispatch}
        domainType={DOMAIN_TYPE}
        editPanelTitle={text('DeletePupils', 'EditPanelHeader')}
        formHeadline={text('Headline', 'DeletePupilsLayout')}
        formHeadlineDeleting={text('HeadlineDeleting', 'DeletePupilsLayout')}
        persistenceErrorMsg={text('PersistenceError', 'Pupils')}
        persistenceSuccessMsg={text('PersistenceDeleted', 'Pupils')}
        redirectRoute={ROUTE_PUPILS}
      />
    );
  };

  renderEdit = (routerProps: RouteChildrenProps): React.Node => {
    const {
      match: { params },
    }: RouteChildrenProps = routerProps;
    const { pupils, dispatch }: Props = this.props;
    const domainRec = getDomainRec(pupilDefault, pupils, params, 'pupilId');

    return (
      <Edit
        {...routerProps}
        actionAdd={pupilActions.add}
        actionUpdate={pupilActions.update}
        dispatch={dispatch}
        domainObjects={pupils}
        domainRec={domainRec}
        domainType={DOMAIN_TYPE}
        editPanelTitle={text('EditPupil', 'EditPanelHeader', { PUPIL_NAME: domainRec.getLabel() })}
        form={this.renderForm}
        isNew={false}
        persistenceErrorMsg={text('PersistenceEditError', 'Pupils')}
        persistenceSuccessMsg={text('PersistenceEdit', 'Pupils')}
        redirectRoute={ROUTE_PUPILS}
        schema={pupilSchema}
      />
    );
  };

  renderForm = (formikProps: FormikProps, saving: boolean, isNew: boolean): React.Node => {
    return <Form {...formikProps} isNew={isNew} saving={saving} />;
  };

  renderInfo = (routerProps: RouteChildrenProps): React.Node => {
    const classLabel: string = getClassLabel(this.props);

    return (
      <InfoMsg
        {...routerProps}
        headine={text('Pupils', 'InfoMsg', {
          CLASS_NAME: classLabel,
        })}
        subtext={text('PupilsMsg', 'InfoMsg', {
          CLASS_NAME: classLabel,
        })}
      />
    );
  };

  renderNew = (routerProps: RouteChildrenProps): React.Node => {
    return (
      <Edit
        {...routerProps}
        actionAdd={pupilActions.add}
        actionUpdate={pupilActions.update}
        createNew={(values: PupilType): PupilType => {
          return PupilFactory(values, Date.now(), this.props.activeClass.id);
        }}
        dispatch={this.props.dispatch}
        domainObjects={this.props.pupils}
        domainRec={{ ...pupilDefault }}
        domainType={DOMAIN_TYPE}
        editPanelTitle={text('AddPupil', 'EditPanelHeader')}
        form={this.renderForm}
        isNew
        persistenceErrorMsg={text('PersistenceNewError', 'Pupils')}
        persistenceSuccessMsg={text('PersistenceNew', 'Pupils')}
        redirectRoute={ROUTE_PUPILS}
        schema={pupilSchema}
      />
    );
  };

  render() {
    const { pupils, dispatch, search }: Props = this.props;
    const HAS_PUPILS: boolean = pupils.length > 0 ? true : false;

    return (
      <div className="Panel">
        <Sidebar>
          <SidebarHeader
            controlsExpanded={search.visible}
            title={text('Header-' + DOMAIN_TYPE, 'SidebarHeader')}
            subtitle={text('Subheader-count', 'SidebarHeader', {
              COUNT: pupils.length,
            })}
          >
            <SearchBox domainType={DOMAIN_TYPE} hasSearch={HAS_PUPILS} search={search} />
          </SidebarHeader>
          <SidebarList
            curPage={search.page}
            dispatch={dispatch}
            items={pupils}
            listType={DOMAIN_TYPE}
            noItemsTxt={text('Pupils', 'SidebarNoItems')}
            onPbChange={search.handlePageChange}
            sortOrder={pupilSort[this.props.pupilsSort]}
            term={search.term}
            termAnywhere={search.anywhere}
            usePb
          />
          <SidebarFooter leftActions={this.renderActionsLeft()} rightActions={this.renderActionsRight(HAS_PUPILS)} />
        </Sidebar>
        <Switch>
          <Route path={ROUTE_EDIT_PUPIL} render={routerProps => this.renderEdit(routerProps)} />
          <Route path={ROUTE_DEL_PUPILS} render={routerProps => this.renderDelete(routerProps)} />
          <Route path={ROUTE_NEW_PUPIL} render={routerProps => this.renderNew(routerProps)} />
          <Route path={ROUTE_PUPILS} render={routerProps => this.renderInfo(routerProps)} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState, props: Props) => {
  return {
    activeClass: getActiveClass(state.classes, props.match.params.classId),
    pupils: getClassPupils(state.pupils, props.match.params.classId),
    pupilsSort: state.settings.pupilsSort,
  };
};

export default connect(mapStateToProps)(withSearch(PupilsLayout));
