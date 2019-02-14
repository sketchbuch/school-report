// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import DeleteTextsLayout from './Delete/DeleteTextsLayout';
import EditTextLayout from './Edit/EditTextLayout';
import Icon from '../../components/Icon/Icon';
import InfoMsg from '../../components/InfoMsg/InfoMsg';
import NavButtonCircular from '../../components/ui/NavButtonCircular/NavButtonCircular';
import NewTextLayout from './New/NewTextLayout';
import CatSelect from '../../components/CatSelect/CatSelect';
import SearchField from '../../components/ui/SearchField/SearchField';
import Sidebar from '../../components/Sidebar/Sidebar';
import SidebarFooter from '../../components/Sidebar/Footer/SidebarFooter';
import SidebarHeader from '../../components/Sidebar/Header/SidebarHeader';
import SidebarList from '../../components/Sidebar/List/SidebarList';
import setTitle from '../../utils/title';
import type { CategoryType } from '../../types/category';
import type { TextType } from '../../types/text';
import { ICON_ADD, ICON_DELETE } from '../../constants/icons';
import { ROUTE_DEL_TEXTS, ROUTE_EDIT_TEXT, ROUTE_NEW_TEXT, ROUTE_TEXTS } from '../../constants/routes';
import { text } from '../../components/Translation/Translation';
import { textSort } from '../../types/text';

type Props = {
  categories: Array<CategoryType>,
  curLang: string,
  dispatch: Function,
  history: Object,
  location: Object,
  match: Object,
  texts: Array<TextType>,
};

type State = {
  anywhere: boolean,
  curPage: number,
  option: string,
  searchVisible: boolean,
  term: string,
};

/**
 * Layout for displaying classes.
 */
export class TextsLayout extends React.Component<Props, State> {
  static defaultProps = {
    categories: [],
    texts: [],
  };

  props: Props;
  state: State;
  handleFilterChanage: (event: SyntheticInputEvent<HTMLInputElement>) => void;
  handlePbChange: (curPage: number) => void;
  handleSearch: (event: SyntheticInputEvent<HTMLInputElement>) => void;
  handleSearchAnywhereClick: (event: SyntheticEvent<MouseEvent>) => void;
  handleSearchIconClick: (event: SyntheticEvent<MouseEvent>) => void;

  constructor(props: Props) {
    super(props);

    this.state = {
      anywhere: false,
      curPage: 1,
      option: 'category-all',
      searchVisible: false,
      term: '',
    };

    this.handleFilterChanage = this.handleFilterChanage.bind(this);
    this.handlePbChange = this.handlePbChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchAnywhereClick = this.handleSearchAnywhereClick.bind(this);
    this.handleSearchIconClick = this.handleSearchIconClick.bind(this);
  }

  componentDidMount() {
    setTitle(text('WinTitle', 'Texts'));
  }

  componentDidUpdate() {
    if (window.location.pathname === ROUTE_TEXTS) {
      setTitle(text('WinTitle', 'Texts'));
    }
  }

  handleFilterChanage(event: SyntheticInputEvent<HTMLInputElement>) {
    const option = event.target.value;

    if (this.state.option !== option) {
      this.setState({ option, term: '', curPage: 1 });
    } else {
      this.setState({ option });
    }
  }

  handleSearch(event: SyntheticInputEvent<HTMLInputElement>) {
    if (event.type === 'keyup') {
      if (event.key === 'Escape') {
        this.handleSearchIconClick(event);
      }
    } else {
      const newState = { term: event.currentTarget.value };
      if (newState.term !== this.state.term) {
        newState.curPage = 1;
      }

      this.setState(newState);
    }
  }

  handlePbChange(curPage: number) {
    this.setState({ curPage });
  }

  handleSearchIconClick(event: SyntheticEvent<MouseEvent>) {
    const newState = { searchVisible: !this.state.searchVisible };
    if (newState.searchVisible === false) {
      newState.term = '';
      newState.curPage = 1;
    }

    this.setState(newState);
  }

  handleSearchAnywhereClick(event: SyntheticEvent<MouseEvent>) {
    this.setState({ anywhere: !this.state.anywhere });
  }

  render() {
    const HAS_TEXTS = this.props.texts.length > 0 ? true : false;
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
    let searchBox = null;

    if (HAS_TEXTS) {
      searchBox = (
        <SearchField
          anywhere={this.state.anywhere}
          anywhereOnClick={this.handleSearchAnywhereClick}
          clearOnClick={this.handleSearchIconClick}
          iconOnClick={this.handleSearchIconClick}
          onKeyUp={this.handleSearch}
          onChange={this.handleSearch}
          placeholder={text('SearchPlaceholder-text', 'SidebarHeader')}
          term={this.state.term}
          visible={this.state.searchVisible}
        />
      );
    }

    return (
      <div className="Panel">
        <Sidebar>
          <SidebarHeader
            controlsExpanded={this.state.searchVisible}
            title={text('Header-text', 'SidebarHeader')}
            subtitle={text('Subheader-count', 'SidebarHeader', {
              COUNT: this.props.texts.length,
            })}
          >
            {searchBox}
          </SidebarHeader>
          <SidebarList
            curPage={this.state.curPage}
            dispatch={this.props.dispatch}
            filter={this.state.option}
            items={this.props.texts}
            listType="text"
            noItemsTxt={text('Texts', 'SidebarNoItems')}
            onChange={this.handlePbChange}
            sortOrder={textSort}
            term={this.state.term}
            termAnywhere={this.state.anywhere}
            usePb
          >
            <CatSelect
              categories={this.props.categories}
              onChange={this.handleFilterChanage}
              option={this.state.option}
              selectedCount={0}
              texts={this.props.texts}
              useSelected={false}
            />
          </SidebarList>
          <SidebarFooter leftActions={leftActions} rightActions={rightActions} />
        </Sidebar>
        <Switch>
          <Route
            path={ROUTE_EDIT_TEXT}
            render={routerProps => (
              <EditTextLayout
                {...routerProps}
                dispatch={this.props.dispatch}
                categories={this.props.categories}
                texts={this.props.texts}
              />
            )}
          />
          <Route
            path={ROUTE_DEL_TEXTS}
            render={routerProps => <DeleteTextsLayout {...routerProps} dispatch={this.props.dispatch} />}
          />
          <Route
            path={ROUTE_NEW_TEXT}
            render={routerProps => (
              <NewTextLayout
                {...routerProps}
                curLang={this.props.curLang}
                categories={this.props.categories}
                dispatch={this.props.dispatch}
              />
            )}
          />
          <Route
            path={ROUTE_TEXTS}
            render={routerProps => (
              <InfoMsg {...routerProps} headine={text('Texts', 'InfoMsg')} subtext={text('TextsMsg', 'InfoMsg')} />
            )}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state: Object) => ({
  categories: state.categories,
  curLang: state.languages.current,
  texts: state.texts,
});

export default connect(mapStateToProps)(TextsLayout);
