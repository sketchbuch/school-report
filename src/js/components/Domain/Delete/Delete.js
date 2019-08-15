// @flow

import React, { Component } from 'react';
import type { Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';
import { toastr } from 'react-redux-toastr';
import EditPanel from '../../../components/EditPanel/EditPanel';
import EditPanelContent from '../../../components/EditPanel/Content/EditPanelContent';
import EditPanelHeader from '../../../components/EditPanel/Header/EditPanelHeader';
import setTitle from '../../../utils/setTitle';
import type { ActionCreator } from '../../../types/action';
import type { FsObject } from '../../../types/fsObject';
import type { SidebarListTypes } from '../../../types/sidebarList';
import { Button, FormHeader, FieldWrap, Form, FormCancel } from '../../../components/Ui';
import { text } from '../../Translation/Translation';
import { ucFirst } from '../../../utils/strings';

const setPageTitle = (domainType: SidebarListTypes): void => {
  const NS_TYPE: string = ucFirst(domainType);
  setTitle(text('WinTitle', `Delete${NS_TYPE}Layout`));
};

export type Props = {
  ...RouteComponentProps,
  actionDeleteAll: (callback: Function) => ActionCreator,
  butCancelName: string,
  butCancelNs: string,
  butDeleteLabel: string,
  dispatch: Dispatch,
  domainType: SidebarListTypes,
  editPanelTitle: string,
  formHeadline: string,
  formHeadlineDeleting: string,
  persistenceErrorMsg: string,
  persistenceSuccessMsg: string,
  redirectRoute: string,
};

type State = {
  deleting: boolean,
  error: boolean,
};

export class Delete extends Component<Props, State> {
  props: Props;
  state: State = {
    deleting: false,
    error: false,
  };

  componentDidMount() {
    setPageTitle(this.props.domainType);
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const { actionDeleteAll, dispatch, domainType, history, persistenceErrorMsg, redirectRoute } = this.props;
    const { deleting, error } = this.state;

    setPageTitle(domainType);

    if (error) {
      toastr.error(text('PersistenceError', 'Toastr'), persistenceErrorMsg);
      history.push(redirectRoute);
    } else if (deleting) {
      dispatch(actionDeleteAll(this.dataSaved));
      this.setState({ deleting: false });
    }
  }

  handleClick = (event: SyntheticMouseEvent<HTMLElement>): void => {
    event.preventDefault();
    this.setState({ deleting: true });
  };

  dataSaved = (ioResult: FsObject): void => {
    if (ioResult.success === true) {
      toastr.success(this.props.persistenceSuccessMsg);
      this.props.history.push(this.props.redirectRoute);
    } else {
      this.setState({
        deleting: false,
        error: true,
      });
    }
  };

  render() {
    const {
      butCancelName,
      butCancelNs,
      butDeleteLabel,
      editPanelTitle,
      formHeadline,
      formHeadlineDeleting,
      redirectRoute,
    } = this.props;
    const { deleting } = this.state;

    return (
      <EditPanel>
        <EditPanelHeader title={editPanelTitle} />
        <EditPanelContent>
          <Form>
            <FormHeader>{deleting ? formHeadlineDeleting : formHeadline}</FormHeader>
            <FieldWrap>
              <Button type="button" onClick={this.handleClick} buttontype="warning" disabled={deleting} busy={deleting}>
                {butDeleteLabel}
              </Button>
            </FieldWrap>

            {!deleting && <FormCancel name={butCancelName} ns={butCancelNs} to={redirectRoute} />}
          </Form>
        </EditPanelContent>
      </EditPanel>
    );
  }
}

export default Delete;
