// @flow

import * as React from 'react';
import { PageBrowser } from '../../Ui';
import type { PageBrowserProps } from '../../../types/pageBrowser';
import './SidebarPageBrowser.css';

type Props = { ...PageBrowserProps };

class SidebarPageBrowser extends React.Component<Props> {
  props: Props;

  render() {
    return (
      <div className="SidebarPageBrowser">
        <PageBrowser {...this.props} />
      </div>
    );
  }
}

export default SidebarPageBrowser;
