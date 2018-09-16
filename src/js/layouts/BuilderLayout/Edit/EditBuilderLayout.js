// @flow

import React, { Component, Fragment } from 'react';
import TextInput from '../../../components/ui/TextInput/TextInput';
import EditPanel from '../../../components/EditPanel/EditPanel';
import EditPanelHeader from '../../../components/EditPanel/Header/EditPanelHeader';
import EditPanelContent from '../../../components/EditPanel/Content/EditPanelContent';
import Reports from '../../../components/Reports/Reports';
import InfoMsg from '../../../components/InfoMsg/InfoMsg';
import Icon from '../../../components/Icon/Icon';
import { text }  from '../../../components/Translation/Translation';
import { getItemById } from '../../../utils/arrays';
import type { ReportType } from '../../../types/report';
import type { SidebarBuilderItemType } from '../../../types/sidebarBuilderItem';
import { ICON_CLOSE } from '../../../constants/icons';

type Props = {
  activeReport: ReportType | Object,
  history: Object,
  items: Array<SidebarBuilderItemType>,
  location: Object,
  match: Object,
  textCount: number,
};

type State = {
  term: string,
};


/**
* Layout for creating a report.
*/
export class EditBuilderLayout extends Component<Props, State> {
  static defaultProps = {
    activeReport: {},
    items: [],
    textCount: 0,
  };

  props: Props;
  state: State;
  handleClear: Function;
  handleSearch: Function;

  constructor(props: Props){
    super(props);

    this.state = {
      term: '',
    };

    this.handleClear = this.handleClear.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleClear(event: SyntheticInputEvent<HTMLInputElement>) {
    this.setState({ term: '' });
  }

  handleSearch(event: SyntheticInputEvent<HTMLInputElement>) {
    const term = event.currentTarget.value;
    this.setState({ term });
  }

  render() {
    const activeItem = getItemById(this.props.items, this.props.match.params.classId);
    const activePupil = getItemById(activeItem.pupils, this.props.match.params.pupilId);
    let searchBox = null;

    if (this.props.textCount > 0) {
      searchBox = (
        <Fragment>
          <TextInput 
              className="EditPanelHeader__search"
              onChange={this.handleSearch} 
              placeholder={text('SearchPlaceholder', 'EditPanelHeader')}
              value={this.state.term}
          />
          <span 
            className="EditPanelHeader__searchclear" 
            onClick={this.handleClear} 
            title={text('Clear', 'ItemSelection')}
          >
            <Icon type={ ICON_CLOSE } />
          </span>
        </Fragment>
      );
    }

    return (
      <EditPanel>
        <EditPanelHeader title={text('ReportBuilder', 'EditPanelHeader', { 'PUPIL_NAME': activePupil.getLabel(), 'CLASS_NAME': activeItem.classRec.getLabel() })}>{searchBox}</EditPanelHeader>
        <EditPanelContent noPadding={true}>
          {this.props.textCount > 0 ? (
            <Reports 
              activeClass={activeItem.classRec}  
              activePupil={activePupil} 
              activeReport={this.props.activeReport}
              term={this.state.term}
            />
          ) : (
            <InfoMsg 
              headine={text('BuilderNoTexts', 'InfoMsg')} 
              subtext={text('BuilderNoTextsMsg', 'InfoMsg')} 
            />
          )}
        </EditPanelContent>
      </EditPanel>
    )
  }
}


export default EditBuilderLayout;
