// @flow

import * as React from 'react';
import type { Dispatch } from 'redux';
import { Formik } from 'formik';
import type { FormikProps } from 'formik';
import { RouteComponentProps } from 'react-router';
import { toastr } from 'react-redux-toastr';
import EditPanel from '../../EditPanel/EditPanel';
import EditPanelContent from '../../EditPanel/Content/EditPanelContent';
import EditPanelHeader from '../../EditPanel/Header/EditPanelHeader';
import setTitle from '../../../utils/setTitle';
import type { ActionCreator } from '../../../types/action';
import type { CategoryType } from '../../../types/category';
import type { DomainType } from '../../../types/domain';
import type { FsObject } from '../../../types/fsObject';
import type { SidebarListTypes } from '../../../types/sidebarList';
import type { TranslationPaceholders } from '../../../types/lang';
import { text } from '../../Translation/Translation';
import { ucFirst } from '../../../utils/strings';

const setPageTitle = (isNew: boolean, domainRec: DomainType, domainType: SidebarListTypes): void => {
  const NS_TYPE: string = ucFirst(domainType);
  const NS_PREFIX: string = isNew ? 'New' : 'Edit';
  let placeholders: TranslationPaceholders = isNew
    ? {}
    : {
        LABEL: domainRec.getLabel(),
      };

  setTitle(text('WinTitle', `${NS_PREFIX}${NS_TYPE}Layout`, placeholders));
};

export type Props = {
  ...RouteComponentProps,
  actionAdd: (domainRecord: DomainType, callback: Function) => ActionCreator,
  actionUpdate: (domainRecord: DomainType, callback: Function) => ActionCreator,
  createNew?: (domain: DomainType) => DomainType,
  dispatch: Dispatch,
  domainObjects: DomainType[],
  domainRec: DomainType,
  domainType: SidebarListTypes,
  editPanelTitle: string,
  form: (formikProps: FormikProps, saving: boolean, isNew: boolean) => React.Node,
  isNew: boolean,
  persistenceErrorMsg: string,
  persistenceSuccessMsg: string,
  redirectRoute: string,
  schema: any | (() => any),
};

type State = {
  domain: CategoryType,
  error: boolean,
  saving: boolean,
};

export class Edit extends React.Component<Props, State> {
  static defaultProps = {
    domainObjects: [],
  };

  props: Props;
  state: State = {
    domain: {
      ...this.props.domainRec,
    },
    error: false,
    saving: false,
  };

  componentDidMount() {
    setPageTitle(this.props.isNew, this.props.domainRec, this.props.domainType);
  }

  componentDidUpdate() {
    const {
      actionAdd,
      actionUpdate,
      dispatch,
      domainRec,
      domainType,
      history,
      isNew,
      persistenceErrorMsg,
      redirectRoute,
    } = this.props;
    const { domain, error, saving } = this.state;

    setPageTitle(isNew, domainRec, domainType);

    if (error) {
      toastr.error(text('PersistenceError', 'Toastr'), persistenceErrorMsg);
      history.push(redirectRoute);
    } else if (saving) {
      if (isNew) {
        dispatch(actionAdd(domain, this.dataSaved));
      } else {
        dispatch(actionUpdate(domain, this.dataSaved));
      }

      this.setState({ saving: false });
    }
  }

  handleSubmit = (values: DomainType): void => {
    const now = Date.now();
    let domain;

    if (this.props.isNew && this.props.createNew) {
      domain = { ...this.props.createNew(values) };
    } else {
      domain = { ...values };
      domain.updated = now;
    }

    this.setState({
      domain,
      saving: true,
    });
  };

  dataSaved = (ioResult: FsObject): void => {
    if (ioResult.success === true) {
      toastr.success(this.props.persistenceSuccessMsg, this.state.domain.getLabel());
      this.props.history.push(this.props.redirectRoute);
    } else {
      this.setState({
        error: true,
        saving: false,
      });
    }
  };

  render() {
    const { domainRec, editPanelTitle, form, isNew, schema }: Props = this.props;
    const { saving } = this.state;

    return (
      <EditPanel>
        <EditPanelHeader title={editPanelTitle} />
        <EditPanelContent>
          <Formik
            initialValues={{ ...domainRec }}
            enableReinitialize={true}
            validationSchema={schema}
            onSubmit={this.handleSubmit}
            render={(formikProps: FormikProps): React.Node => {
              return form(formikProps, saving, isNew);
            }}
          />
        </EditPanelContent>
      </EditPanel>
    );
  }
}

export default Edit;
