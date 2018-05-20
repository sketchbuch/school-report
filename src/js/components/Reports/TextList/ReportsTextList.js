// @flow

import * as React from 'react';
import NoItems from '../../NoItems/NoItems';
import Translation from '../../Translation/Translation';
import type { TextType } from '../../../types/text';
import './ReportsTextList.css';

type Props = {
  texts: Array<TextType>,
};


/**
* Selected texts for a pupil in a report.
*/
export class ReportsTextList extends React.Component<Props> {
  static defaultProps = {
    texts: [],
  };

  props: Props;

  render() {
    const { texts } = this.props;

    return (
      <div className="ReportsTextList">
        {texts.length > 0 ? (
          <ul className="ReportsTextList_list">
            {texts.map(text => (
              <li key={text.id} className="ReportsTextList__item">
                {text.getLabel(100)}
              </li>
            ))}
          </ul>
        ) : (
          <NoItems><Translation name="None" ns="ReportsTextList" /></NoItems>
        )}
      </div>
    )
  }
}


export default ReportsTextList;
