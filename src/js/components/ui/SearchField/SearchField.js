//@flow

import * as React from 'react';
import classNames from 'classnames';
import Icon from '../../Icon/Icon';
import TextInput from '../TextInput/TextInput';
import { ICON_CLOSE, ICON_SEARCH, ICON_SEARCH_ANYWHERE } from '../../../constants/icons';
import { text } from '../../Translation/Translation';
import './SearchField.css';

export type Props = {
  anywhere: boolean,
  anywhereOnClick: (event: SyntheticMouseEvent<HTMLElement>) => void,
  classes: string,
  clearOnClick: (event: SyntheticMouseEvent<HTMLElement>) => void,
  iconOnClick: (event: SyntheticEvent<EventTarget>) => void,
  onChange: (event: SyntheticKeyboardEvent<HTMLInputElement>) => void,
  onKeyUp: (event: SyntheticKeyboardEvent<HTMLInputElement>) => void,
  placeholder: string,
  term: string,
  visible: boolean,
};

class SearchField extends React.PureComponent<Props> {
  static defaultProps = {
    anywhere: false,
    classes: '',
    placeholder: '',
    term: '',
    visible: false,
  };

  props: Props;

  render() {
    const {
      anywhereOnClick,
      classes,
      clearOnClick,
      iconOnClick,
      onChange,
      onKeyUp,
      placeholder,
      term,
      visible,
    } = this.props;

    return (
      <div
        className={classNames('SearchField', {
          'SearchField--visible': visible,
          [classes]: !!classes,
        })}
      >
        {visible ? (
          <React.Fragment>
            <TextInput
              className="SearchField__input"
              onKeyUp={onKeyUp}
              onChange={onChange}
              placeholder={placeholder}
              value={term}
            />
            <span
              className={classNames('SearchField__icon SearchField__icon--anywhere', {
                'SearchField__icon--active': this.props.anywhere,
              })}
              title={text('Anywhere', 'SearchField')}
              onClick={anywhereOnClick}
            >
              <span className="SearchField__iconInner">
                <Icon type={ICON_SEARCH_ANYWHERE} />
              </span>
            </span>
            <span
              className="SearchField__icon SearchField__icon--clear"
              onClick={clearOnClick}
              title={text('Clear', 'SearchField')}
            >
              <Icon type={ICON_CLOSE} />
            </span>
          </React.Fragment>
        ) : (
          <span className="SearchField__icon SearchField__icon--toggle" onClick={iconOnClick}>
            <Icon type={ICON_SEARCH} />
          </span>
        )}
      </div>
    );
  }
}

export default SearchField;
