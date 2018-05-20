// @flow

import * as React from 'react';
import { text } from '../../Translation/Translation';
import Icon from '../../Icon/Icon';
import AddButton from '../../ui/AddButton/AddButton';
import { ICON_ADD } from '../../../constants/icons';
import './ReportsTexts.css';

type Props = {
};


/**
* A list of available texts.
*/
export class ReportsTexts extends React.Component<Props> {
  static defaultProps = {
  };

  props: Props;

  render() {
    return (
      <div className="ReportsTexts">
        <AddButton title={text('TextAdd', 'Actions')}>
          <Icon type={ ICON_ADD } />
        </AddButton>
      </div>
    )
  }
}


export default ReportsTexts;
