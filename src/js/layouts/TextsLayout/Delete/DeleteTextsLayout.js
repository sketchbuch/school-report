// @flow

import React, { Component } from 'react';
import type { Dispatch } from 'redux';
import { Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { toastr } from 'react-redux-toastr';
import * as textActions from '../../../actions/textActions';
import { Button } from '../../../components/Ui';
import EditPanel from '../../../components/EditPanel/EditPanel';
import EditPanelContent from '../../../components/EditPanel/Content/EditPanelContent';
import EditPanelHeader from '../../../components/EditPanel/Header/EditPanelHeader';
import Translation, { text } from '../../../components/Translation/Translation';
import setTitle from '../../../utils/title';
import type { FsObject } from '../../../types/fsObject';
import { ROUTE_TEXTS } from '../../../constants/routes';

export type Props = {
  ...RouteComponentProps,
  dispatch: Dispatch,
};

type State = {
  deleting: boolean,
  error: boolean,
};

export class DeleteTextsLayout extends Component<Props, State> {
  props: Props;
  state: State = {
    deleting: false,
    error: false,
  };

  componentDidMount() {
    setTitle(text('WinTitle', 'DeleteTextsLayout'));
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.state.error) {
      toastr.error(text('PersistenceError', 'Toastr'), text('PersistenceDeleteError', 'Texts'));
      this.props.history.push(ROUTE_TEXTS);
    } else if (this.state.deleting) {
      this.props.dispatch(textActions.deleteAll(this.dataSaved));
      this.setState({ deleting: false });
    }
  }

  handleClick = (event: SyntheticMouseEvent<HTMLElement>): void => {
    event.preventDefault();
    this.setState({ deleting: true });
  };

  dataSaved = (ioResult: FsObject): void => {
    if (ioResult.success === true) {
      toastr.success(text('PersistenceDeleted', 'Texts'));
      this.props.history.push(ROUTE_TEXTS);
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
        <EditPanelHeader title={text('DeleteTexts', 'EditPanelHeader')} />
        <EditPanelContent>
          <h2 className="form__headline">
            {this.state.deleting ? (
              <Translation name="HeadlineDeleting" ns="DeleteTextsLayout" />
            ) : (
              <Translation name="Headline" ns="DeleteTextsLayout" />
            )}
          </h2>
          <form className="form">
            <div className="fieldwrap">
              <Button
                type="button"
                onClick={this.handleClick}
                buttontype="warning"
                disabled={this.state.deleting}
                busy={this.state.deleting}
              >
                <Translation name="BtnLabel" ns="DeleteTextsLayout" />
              </Button>
            </div>

            {!this.state.deleting && (
              <p className="form__submsg">
                <Link to={ROUTE_TEXTS}>
                  <Translation name="BackToClasses" ns="Classes" />
                </Link>
              </p>
            )}
          </form>
        </EditPanelContent>
      </EditPanel>
    );
  }
}

export default DeleteTextsLayout;
