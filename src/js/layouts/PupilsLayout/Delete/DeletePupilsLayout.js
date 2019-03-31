// @flow

import React, { Component } from 'react';
import type { Dispatch } from 'redux';
import { Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { toastr } from 'react-redux-toastr';
import EditPanel from '../../../components/EditPanel/EditPanel';
import EditPanelHeader from '../../../components/EditPanel/Header/EditPanelHeader';
import EditPanelContent from '../../../components/EditPanel/Content/EditPanelContent';
import { Button } from '../../../components/Ui';
import Translation, { text } from '../../../components/Translation/Translation';
import * as pupilActions from '../../../actions/pupilActions';
import type { ClassType } from '../../../types/class';
import type { FsObject } from '../../../types/fsObject';
import type { PupilType } from '../../../types/pupil';
import { ROUTE_PUPILS } from '../../../constants/routes';
import setTitle from '../../../utils/title';

export type Props = {
  ...RouteComponentProps,
  activeClass: ClassType,
  dispatch: Dispatch,
  pupils: PupilType[],
};

type State = {
  deleting: boolean,
  error: boolean,
};

export class DeletePupilsLayout extends Component<Props, State> {
  static defaultProps = {
    activeClass: {},
    pupils: [],
  };

  props: Props;
  state: State = {
    deleting: false,
    error: false,
  };

  componentDidMount() {
    setTitle(
      text('WinTitle', 'DeletePupilsLayout', {
        CLASS_NAME: this.getClassLabel(),
      })
    );
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.state.error) {
      toastr.error(
        text('PersistenceError', 'Toastr'),
        text('PersistenceDeleteByClassError', 'Pupils', {
          CLASS_NAME: this.getClassLabel(),
        })
      );
      this.props.history.push(ROUTE_PUPILS.replace(':classId', this.props.activeClass.id));
    } else if (this.state.deleting) {
      this.props.dispatch(pupilActions.deletePupils(this.props.activeClass.id, this.dataSaved));
      this.setState({ deleting: false });
    }
  }

  handleClick = (event: SyntheticMouseEvent<HTMLElement>): void => {
    event.preventDefault();

    this.setState({
      deleting: true,
    });
  };

  dataSaved = (ioResult: FsObject): void => {
    if (ioResult.success === true) {
      toastr.success(
        text('PersistenceDeletedByClass', 'Pupils', {
          CLASS_NAME: this.getClassLabel(),
        })
      );
      this.props.history.push(ROUTE_PUPILS.replace(':classId', this.props.activeClass.id));
    } else {
      this.setState({
        deleting: false,
        error: true,
      });
    }
  };

  getClassLabel(): string {
    if (this.props.activeClass.label) {
      return this.props.activeClass.label;
    }
    return this.props.match.params.classId;
  }

  render() {
    return (
      <EditPanel>
        <EditPanelHeader title={text('DeletePupils', 'EditPanelHeader')} />
        <EditPanelContent>
          <h2 className="form__headline">
            {this.state.deleting ? (
              <Translation name="HeadlineDeleting" ns="DeletePupilsLayout" />
            ) : (
              <Translation
                name="Headline"
                ns="DeletePupilsLayout"
                placeholders={{
                  CLASS_NAME: this.getClassLabel(),
                }}
              />
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
                <Translation name="BtnLabel" ns="DeletePupilsLayout" />
              </Button>
            </div>

            {!this.state.deleting && (
              <p className="form__submsg">
                <Link to={ROUTE_PUPILS.replace(':classId', this.props.activeClass.id)}>
                  <Translation name="Back" ns="DeletePupilsLayout" />
                </Link>
              </p>
            )}
          </form>
        </EditPanelContent>
      </EditPanel>
    );
  }
}

export default DeletePupilsLayout;
