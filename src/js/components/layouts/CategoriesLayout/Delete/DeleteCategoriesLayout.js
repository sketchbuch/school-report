// @flow

import React, { Component } from 'react';
import { toastr } from 'react-redux-toastr'
import { Link } from 'react-router-dom';
import EditPanel from '../../../EditPanel/EditPanel';
import EditPanelHeader from '../../../EditPanel/Header/EditPanelHeader';
import EditPanelContent from '../../../EditPanel/Content/EditPanelContent';
import Button from '../../../ui/Button/Button';
import Translation, { text }  from '../../../Translation/Translation';
import * as categoryActions from '../../../../actions/categoryActions';
import { ROUTE_CATEGORIES } from '../../../../constants/routes';
import setTitle from '../../../../utils/title';

type Props = {
  dispatch: Function,
  history: Object,
  location: Object,
  match: Object,
};

type State = {
  deleting: boolean,
  error: boolean,
};


/**
* Layout for deleting all categories.
*/
export class DeleteCategoriesLayout extends Component<Props, State> {
  static defaultProps = {
    texts: [],
  };

  dataSaved: Function;
  props: Props;
  handleClick: Function;

  constructor(props: Props) {
    super(props);

    this.state = {
      deleting: false,
      error: false,
    };

    this.dataSaved = this.dataSaved.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    setTitle(text('WinTitle', 'DeleteCategoriesLayout'));
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.state.error) {
      toastr.error(text('PersistenceError', 'Toastr'), text('PersistenceDeleteError', 'Categories'));
      this.props.history.push(ROUTE_CATEGORIES);
    } else if (this.state.deleting) {
      this.props.dispatch(categoryActions.deleteAll(this.dataSaved));
      this.setState({ deleting: false });
    }
  }

  handleClick(event: SyntheticInputEvent<HTMLInputElement>) {
    event.preventDefault();
    this.setState({ deleting: true, });
  }

  /**
  * Callback used by electron fs functions.
  *
  * @param object ioResult An object: {success: boolean, errorObj?: object, data?: json}
  */
  dataSaved(ioResult: Object) {
    if (ioResult.success === true) {
      toastr.success(text('PersistenceDeleted', 'Categories'));
      this.props.history.push(ROUTE_CATEGORIES);
    } else {
      this.setState({
        deleting: false,
        error: true,
      });
    }
  }

  render() {
    return (
      <EditPanel>
        <EditPanelHeader title={text('DeleteCategories', 'EditPanelHeader')} />
        <EditPanelContent>
          <h2 className="form__headline">
            {this.state.deleting ? (
              <Translation name="HeadlineDeleting" ns="DeleteCategoriesLayout" />
            ) : (
              <Translation name="Headline" ns="DeleteCategoriesLayout" />
            )}
          </h2>
          <form className="form">
            <div className="fieldwrap">
              <Button type="button" onClick={this.handleClick} buttontype="warning" disabled={this.state.deleting} busy={this.state.deleting}>
                <Translation name="BtnLabel" ns="DeleteCategoriesLayout" />
              </Button>
            </div>

            {!this.state.deleting &&
              <p className="form__submsg">
                <Link to={ROUTE_CATEGORIES}><Translation name="BackToCategories" ns="Categories" /></Link>
              </p>
            }
          </form>
        </EditPanelContent>
      </EditPanel>
    )
  }
}


export default DeleteCategoriesLayout;