// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import InfoMessage from '../../components/InfoMessage/InfoMessage';
import Icon from '../../components/Icon/Icon';
import Sidebar from '../../components/Sidebar/Sidebar';
import SidebarHeader from '../../components/Sidebar/Header/SidebarHeader';
import SidebarList from '../../components/Sidebar/List/SidebarList';
import SidebarFooter from '../../components/Sidebar/Footer/SidebarFooter';
import NavButtonCircular from '../../components/ui/NavButtonCircular/NavButtonCircular';
import EditTextLayout from './Edit/EditTextLayout';
import DeleteTextsLayout from './Delete/DeleteTextsLayout';
import NewTextLayout from './New/NewTextLayout';
import { text }  from '../../components/Translation/Translation';
import { textSort } from '../../types/text';
import type { CategoryType } from '../../types/category';
import type { TextType } from '../../types/text';
import { ICON_ADD, ICON_DELETE } from '../../constants/icons';
import {
  ROUTE_DEL_TEXTS,
  ROUTE_EDIT_TEXT,
  ROUTE_NEW_TEXT,
  ROUTE_TEXTS,
} from '../../constants/routes';
import setTitle from '../../utils/title';

type Props = {
  categories: Array<CategoryType>,
  curLang: string,
  dispatch: Function,
  history: Object,
  location: Object,
  match: Object,
  texts: Array<TextType>,
};


/**
* Layout for displaying classes.
*/
export class TextsLayout extends Component<Props> {
  static defaultProps = {
      categories: [],
      texts: [],
   };

  props: Props;

  componentDidMount() {
    setTitle(text('WinTitle', 'Texts'));
  }

  componentDidUpdate() {
    if (window.location.pathname === ROUTE_TEXTS) setTitle(text('WinTitle', 'Texts'));
  }

  render() {
    const HAS_TEXTS = (this.props.texts.length > 0) ? true : false;
    const leftActions = (
      <NavButtonCircular
        to={ROUTE_NEW_TEXT}
        className="SidebarFooter__action"
        buttontype="pos-rollover"
        action="add-text"
        title={text('TextAdd', 'Actions')}
      >
        <Icon type={ICON_ADD} />
      </NavButtonCircular>
    );
    const rightActions = (
      <NavButtonCircular
        disabled={!HAS_TEXTS}
        to={ROUTE_DEL_TEXTS}
        className="SidebarFooter__action"
        buttontype="neg-rollover"
        action="delete-texts"
        title={text('TextDelete', 'Actions')}
      >
        <Icon type={ICON_DELETE} />
      </NavButtonCircular>
    );

    return (
      <div className="Panel">
        <Sidebar>
          <SidebarHeader title={text('Header-text', 'SidebarHeader')} />
          <SidebarList dispatch={this.props.dispatch} listType="text" items={this.props.texts} noItemsTxt={text('Texts', 'SidebarNoItems')} sortOrder={textSort} />
          <SidebarFooter leftActions={leftActions} rightActions={rightActions} />
        </Sidebar>
        <Switch>
          <Route path={ROUTE_EDIT_TEXT} render={ routerProps => <EditTextLayout {...routerProps} dispatch={this.props.dispatch} categories={this.props.categories} texts={this.props.texts} />} />
          <Route path={ROUTE_DEL_TEXTS} render={ routerProps => <DeleteTextsLayout {...routerProps} dispatch={this.props.dispatch} />} />
          <Route path={ROUTE_NEW_TEXT} render={ routerProps => <NewTextLayout {...routerProps} curLang={this.props.curLang} categories={this.props.categories} dispatch={this.props.dispatch} />} />
          <Route path={ROUTE_TEXTS} render={routerProps => <InfoMessage {...routerProps} headine={text('Texts', 'InfoMessage')} subtext={text('TextsMsg', 'InfoMessage')} />} />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state: Object) => (
  {
    categories: state.categories,
    curLang: state.languages.current,
    texts: state.texts,
  }
);


export default connect(mapStateToProps)(TextsLayout);
