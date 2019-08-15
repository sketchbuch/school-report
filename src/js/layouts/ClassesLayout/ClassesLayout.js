// @flow

import * as React from 'react';
import type { Dispatch } from 'redux';
import type { FormikProps } from 'formik';
import { Route, Switch } from 'react-router-dom';
import { RouteComponentProps, RouteChildrenProps } from 'react-router';
import { connect } from 'react-redux';
import * as classActions from '../../actions/classActions';
import Form from './Form/Form';
import InfoMsg from '../../components/InfoMsg/InfoMsg';
import Sidebar from '../../components/Sidebar/Sidebar';
import SidebarFooter from '../../components/Sidebar/Footer/SidebarFooter';
import SidebarHeader from '../../components/Sidebar/Header/SidebarHeader';
import SidebarList from '../../components/Sidebar/List/SidebarList';
import classDefault, { ClassFactory, classSort } from '../../types/class';
import { classSchema } from '../../validation/schemas';
import getDomainRec from '../../utils/domain';
import setLayoutTitle from '../../utils/setLayoutTitle';
import type { ClassType } from '../../types/class';
import type { PupilType } from '../../types/pupil';
import type { ReduxState } from '../../types/reduxstate';
import type { SidebarListTypes } from '../../types/sidebarList';
import type { TranslationPaceholders } from '../../types/lang';
import type { WithSearchProps } from '../../hoc/withSearch';
import withSearch from '../../hoc/withSearch';
import { ActionButton, Delete, Edit, SearchBox } from '../../components/Domain';
import { ROUTE_DEL_CLASSES, ROUTE_EDIT_CLASS, ROUTE_NEW_CLASS, ROUTE_CLASSES } from '../../constants/routes';
import { text } from '../../components/Translation/Translation';

export type Props = {
  ...RouteComponentProps,
  classes: ClassType[],
  dispatch: Dispatch,
  pupils: PupilType[],
} & WithSearchProps;

const DOMAIN_TYPE: SidebarListTypes = 'class';

export class ClassesLayout extends React.Component<Props> {
  static defaultProps = {
    classes: [],
    pupils: [],
  };

  props: Props;

  componentDidMount() {
    setLayoutTitle(text('WinTitle', 'Classes'));
  }

  componentDidUpdate() {
    setLayoutTitle(text('WinTitle', 'Classes'), ROUTE_CLASSES);
  }

  renderActionsLeft = (): React.Node => {
    return (
      <ActionButton domainType={DOMAIN_TYPE} title={text('ClassAdd', 'Actions')} to={ROUTE_NEW_CLASS} type="add" />
    );
  };

  renderActionsRight = (disabled: boolean): React.Node => {
    return (
      <ActionButton
        disabled={!disabled}
        domainType={DOMAIN_TYPE}
        title={text('ClassDelete', 'Actions')}
        to={ROUTE_DEL_CLASSES}
        type="delete"
      />
    );
  };

  renderDelete = (routerProps: RouteChildrenProps): React.Node => {
    return (
      <Delete
        {...routerProps}
        actionDeleteAll={classActions.deleteAll}
        butCancelName="BackToClasses"
        butCancelNs="Classes"
        butDeleteLabel={text('BtnLabel', 'DeleteClassLayout')}
        dispatch={this.props.dispatch}
        domainType={DOMAIN_TYPE}
        editPanelTitle={text('DeleteClasses', 'EditPanelHeader')}
        formHeadline={text('Headline', 'DeleteClassLayout')}
        formHeadlineDeleting={text('HeadlineDeleting', 'DeleteClassLayout')}
        persistenceErrorMsg={text('PersistenceError', 'Classes')}
        persistenceSuccessMsg={text('PersistenceDeleted', 'Classes')}
        redirectRoute={ROUTE_CLASSES}
      />
    );
  };

  renderEdit = (routerProps: RouteChildrenProps): React.Node => {
    const {
      match: { params },
    }: RouteChildrenProps = routerProps;
    const { classes, dispatch }: Props = this.props;
    const domainRec = getDomainRec(classDefault, classes, params, 'classId');
    const placeholders: TranslationPaceholders = { CLASS: domainRec.getLabel() };

    return (
      <Edit
        {...routerProps}
        actionAdd={classActions.add}
        actionUpdate={classActions.update}
        dispatch={dispatch}
        domainObjects={classes}
        domainRec={domainRec}
        domainType={DOMAIN_TYPE}
        editPanelTitle={text('EditClass', 'EditPanelHeader', placeholders)}
        form={this.renderForm}
        isNew={false}
        persistenceErrorMsg={text('PersistenceEditError', 'Classes')}
        persistenceSuccessMsg={text('PersistenceEdit', 'Classes')}
        redirectRoute={ROUTE_CLASSES}
        schema={classSchema}
        winTitlePlaceholders={placeholders}
      />
    );
  };

  renderForm = (formikProps: FormikProps, saving: boolean, isNew: boolean): React.Node => {
    return <Form {...formikProps} isNew={isNew} saving={saving} />;
  };

  renderInfo = (routerProps: RouteChildrenProps): React.Node => {
    return <InfoMsg {...routerProps} headine={text('Classes', 'InfoMsg')} subtext={text('ClassesMsg', 'InfoMsg')} />;
  };

  renderNew = (routerProps: RouteChildrenProps): React.Node => {
    return (
      <Edit
        {...routerProps}
        actionAdd={classActions.add}
        actionUpdate={classActions.update}
        createNew={(values: ClassType): ClassType => {
          return ClassFactory(values, Date.now());
        }}
        dispatch={this.props.dispatch}
        domainObjects={this.props.classes}
        domainRec={{ ...classDefault }}
        domainType={DOMAIN_TYPE}
        editPanelTitle={text('AddClass', 'EditPanelHeader')}
        form={this.renderForm}
        isNew
        persistenceErrorMsg={text('PersistenceNewError', 'Classes')}
        persistenceSuccessMsg={text('PersistenceNew', 'Classes')}
        redirectRoute={ROUTE_CLASSES}
        schema={classSchema}
      />
    );
  };

  render() {
    const { classes, dispatch, search }: Props = this.props;
    const HAS_CLASSES: boolean = classes.length > 0 ? true : false;

    return (
      <div className="Panel">
        <Sidebar>
          <SidebarHeader
            controlsExpanded={search.visible}
            title={text('Header-' + DOMAIN_TYPE, 'SidebarHeader')}
            subtitle={text('Subheader-count', 'SidebarHeader', {
              COUNT: classes.length,
            })}
          >
            <SearchBox domainType={DOMAIN_TYPE} hasSearch={HAS_CLASSES} search={search} />
          </SidebarHeader>
          <SidebarList
            curPage={search.page}
            dispatch={dispatch}
            items={classes}
            listType={DOMAIN_TYPE}
            noItemsTxt={text('Classes', 'SidebarNoItems')}
            onPbChange={search.handlePageChange}
            sortOrder={classSort}
            term={search.term}
            termAnywhere={search.anywhere}
            usePb
          />
          <SidebarFooter leftActions={this.renderActionsLeft()} rightActions={this.renderActionsRight(HAS_CLASSES)} />
        </Sidebar>
        <Switch>
          <Route path={ROUTE_EDIT_CLASS} render={routerProps => this.renderEdit(routerProps)} />
          <Route path={ROUTE_DEL_CLASSES} render={routerProps => this.renderDelete(routerProps)} />
          <Route path={ROUTE_NEW_CLASS} render={routerProps => this.renderNew(routerProps)} />
          <Route path={ROUTE_CLASSES} render={routerProps => this.renderInfo(routerProps)} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  classes: state.classes,
  pupils: state.pupils,
});

export default connect(mapStateToProps)(withSearch(ClassesLayout));
