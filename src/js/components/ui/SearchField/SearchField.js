//@flow

import * as React from 'react';
import classNames from 'classnames';
import Icon from '../../Icon/Icon';
import TextInput from '../TextInput/TextInput';
import { ICON_CLOSE, ICON_SEARCH, ICON_SEARCH_ANYWHERE } from '../../../constants/icons';
import { text } from '../../Translation/Translation';
import './SearchField.css';

type Props = {
  anywhere: boolean,
  anywhereOnClick: (event: SyntheticEvent<MouseEvent>) => void | null,
  classes: string,
  clearOnClick: (event: SyntheticEvent<MouseEvent>) => void | null,
  iconOnClick: (event: SyntheticEvent<MouseEvent>) => void | null,
  onChange: (event: SyntheticMouseEvent<HTMLInputElement>) => void | null,
  onKeyUp: (event: SyntheticMouseEvent<HTMLInputElement>) => void | null,
  placeholder: string,
  term: string,
  visible: boolean,
};

/**
 * A SearchField component.
 */
class SearchField extends React.PureComponent<Props> {
  static defaultProps = {
    anywhere: false,
    anywhereOnClick: null,
    clearOnClick: null,
    iconOnClick: null,
    onChange: null,
    onKeyUp: null,
    term: '',
    visible: false,
  };

  props: Props;

  render() {
    const { anywhereOnClick, clearOnClick, iconOnClick, onChange, onKeyUp, placeholder, term, visible } = this.props;

    return (
      <div
        className={classNames('SearchField', {
          'SearchField--visible': visible,
          [this.props.classes]: !!this.props.classes,
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
