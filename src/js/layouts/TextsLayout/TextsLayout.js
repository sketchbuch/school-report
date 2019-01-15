// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import ReportsCatSelect from '../../components/Reports/CatSelect/ReportsCatSelect';
import InfoMsg from '../../components/InfoMsg/InfoMsg';
import TextInput from '../../components/ui/TextInput/TextInput';
import Icon from '../../components/Icon/Icon';
import Sidebar from '../../components/Sidebar/Sidebar';
import SidebarHeader from '../../components/Sidebar/Header/SidebarHeader';
import SidebarList from '../../components/Sidebar/List/SidebarList';
import SidebarFooter from '../../components/Sidebar/Footer/SidebarFooter';
import NavButtonCircular from '../../components/ui/NavButtonCircular/NavButtonCircular';
import EditTextLayout from './Edit/EditTextLayout';
import DeleteTextsLayout from './Delete/DeleteTextsLayout';
import NewTextLayout from './New/NewTextLayout';
import { text } from '../../components/Translation/Translation';
import { textSort } from '../../types/text';
import type { CategoryType } from '../../types/category';
import type { TextType } from '../../types/text';
import { ICON_ADD, ICON_CLOSE, ICON_DELETE } from '../../constants/icons';
import { ROUTE_DEL_TEXTS, ROUTE_EDIT_TEXT, ROUTE_NEW_TEXT, ROUTE_TEXTS } from '../../constants/routes';
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

type State = {
  curPage: number,
  option: string,
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
  handleClear: (event: SyntheticInputEvent<HTMLInputElement>) => void;
  handleSearch: (event: SyntheticInputEvent<HTMLInputElement>) => void;
  handleFilterChanage: (event: SyntheticInputEvent<HTMLInputElement>) => void;
  handlePbChange: (curPage: number) => void;

  constructor(props: Props) {
    super(props);

    this.state = {
      curPage: 1,
      option: 'category-all',
      term: '',
    };

    this.handleClear = this.handleClear.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleFilterChanage = this.handleFilterChanage.bind(this);
    this.handlePbChange = this.handlePbChange.bind(this);
  }

  componentDidMount() {
    setTitle(text('WinTitle', 'Texts'));
  }

  componentDidUpdate() {
    if (window.location.pathname === ROUTE_TEXTS) {
      setTitle(text('WinTitle', 'Texts'));
    }
  }

  handleClear(event: SyntheticInputEvent<HTMLInputElement>) {
    this.setState({ term: '', curPage: 1 });
  }

  handleSearch(event: SyntheticInputEvent<HTMLInputElement>) {
    const term = event.currentTarget.value;
    this.setState({ term, curPage: 1 });
  }

  handleFilterChanage(event: SyntheticInputEvent<HTMLInputElement>) {
    const option = event.target.value;

    if (this.state.option !== event.target.value) {
      this.setState({ option, term: '', curPage: 1 });
    } else {
      this.setState({ option });
    }
  }

  handlePbChange(curPage: number) {
    this.setState({ curPage });
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
        <React.Fragment>
          <TextInput
            className="SidebarHeader__search"
            onChange={this.handleSearch}
            placeholder={text('SearchPlaceholder', 'SidebarHeader')}
            value={this.state.term}
          />
          <span
            className="SidebarHeader__searchclear"
            onClick={this.handleClear}
            title={text('Clear', 'ItemSelection')}
          >
            <Icon type={ICON_CLOSE} />
          </span>
        </React.Fragment>
      );
    }

    return (
      <div className="Panel">
        <Sidebar>
          <SidebarHeader
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
            usePb
          >
            <ReportsCatSelect
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
