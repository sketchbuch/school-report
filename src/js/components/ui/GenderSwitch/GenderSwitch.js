//@flow

import * as React from 'react';
import Icon from '../../Icon/Icon';
import { ICON_PUPILS_FEMALE, ICON_PUPILS_MALE } from '../../../constants/icons';
import './GenderSwitch.css';

type Props = {
  value?: string,
  large?: boolean,
  name: string,
  onBlur: Function,
  onChange: Function,
  titleFemale: string,
  titleMale: string,
};

/**
 * A gender switch using icons.
 */
class GenderSwitch extends React.Component<Props> {
  static defaultProps = {
    value: '',
    large: false,
    name: 'gender',
    onBlur: null,
    onChange: null,
    titleFemale: 'F',
    titleMale: 'M',
  };

  props: Props;

  render() {
    const {
      value,
      large,
      name,
      onBlur,
      onChange,
      titleFemale,
      titleMale,
    } = this.props;

    let classes = 'GenderSwitch';
    if (large) {
      classes += ' GenderSwitch--large';
    }

    return (
      <div className={classes}>
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
