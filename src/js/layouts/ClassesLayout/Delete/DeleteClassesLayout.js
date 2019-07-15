// @flow

import React, { Component } from 'react';
import type { Dispatch } from 'redux';
import { Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { toastr } from 'react-redux-toastr';
import * as classActions from '../../../actions/classActions';
import { Button, FieldWrap, Form, FormCancel } from '../../../components/Ui';
import EditPanel from '../../../components/EditPanel/EditPanel';
import EditPanelContent from '../../../components/EditPanel/Content/EditPanelContent';
import EditPanelHeader from '../../../components/EditPanel/Header/EditPanelHeader';
import Translation, { text } from '../../../components/Translation/Translation';
import setTitle from '../../../utils/setTitle';
import type { FsObject } from '../../../types/fsObject';
import { ROUTE_CLASSES } from '../../../constants/routes';

export type Props = {
  ...RouteComponentProps,
  dispatch: Dispatch,
};

type State = {
  deleting: boolean,
  error: boolean,
};

export class DeleteClassesLayout extends Component<Props, State> {
  props: Props;
  state: State = {
    deleting: false,
    error: false,
  };

  componentDidMount() {
    setTitle(text('WinTitle', 'DeleteClassesLayout'));
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.state.error) {
      toastr.error(text('PersistenceError', 'Toastr'), text('PersistenceDeleteError', 'Classes'));
      this.props.history.push(ROUTE_CLASSES);
    } else if (this.state.deleting) {
      this.props.dispatch(classActions.deleteAll(this.dataSaved));
      this.setState({ deleting: false });
    }
  }

  handleClick = (event: SyntheticMouseEvent<HTMLElement>): void => {
    event.preventDefault();
    this.setState({ deleting: true });
  };

  dataSaved = (ioResult: FsObject): void => {
    if (ioResult.success === true) {
      toastr.success(text('PersistenceDeleted', 'Classes'));
      this.props.history.push(ROUTE_CLASSES);
    } else {
      this.setState({
        deleting: false,
        error: true,
      });
    }
  };

  render() {
    return (
      <EditPanel>
        <EditPanelHeader title={text('DeleteClasses', 'EditPanelHeader')} />
        <EditPanelContent>
          <h2 className="form__headline">
            {this.state.deleting ? (
              <Translation name="HeadlineDeleting" ns="DeleteClassesLayout" />
            ) : (
              <Translation name="Headline" ns="DeleteClassesLayout" />
            )}
          </h2>
          <Form>
            <FieldWrap>
              <Button
                type="button"
                onClick={this.handleClick}
                buttontype="warning"
                disabled={this.state.deleting}
                busy={this.state.deleting}
              >
                <Translation name="BtnLabel" ns="DeleteClassesLayout" />
              </Button>
            </FieldWrap>

            {!this.state.deleting && (
              <FormCancel>
                <Link to={ROUTE_CLASSES}>
                  <Translation name="BackToClasses" ns="Classes" />
                </Link>
              </FormCancel>
            )}
          </Form>
        </EditPanelContent>
      </EditPanel>
    );
  }
}

export default DeleteClassesLayout;
