//@flow

import * as React from 'react';
import classNames from 'classnames';
import Icon from '../../Icon/Icon';
import { ICON_PUPILS_FEMALE, ICON_PUPILS_MALE } from '../../../constants/icons';
import './GenderSwitch.css';

// TODO - fix types
export type Props = {
  large?: boolean,
  name: string,
  onBlur: Function,
  onChange: Function,
  titleFemale: string,
  titleMale: string,
  value?: string,
};

class GenderSwitch extends React.Component<Props> {
  static defaultProps = {
    large: false,
    name: 'gender',
    onBlur: null,
    onChange: null,
    titleFemale: 'F',
    titleMale: 'M',
    value: '',
  };

  props: Props;

  render() {
    const { value, large, name, onBlur, onChange, titleFemale, titleMale } = this.props;

    return (
      <div className={classNames('GenderSwitch', { 'GenderSwitch--large': large })}>
        <label title={titleMale}>
          <input
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            checked={value === 'm' ? true : false}
            type="radio"
            value="m"
          />
          <Icon type={ICON_PUPILS_MALE} />
        </label>
        <label title={titleFemale}>
          <input
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            checked={value === 'f' ? true : false}
            type="radio"
            value="f"
          />
          <Icon type={ICON_PUPILS_FEMALE} />
        </label>
      </div>
    );
  }
}

export default GenderSwitch;
