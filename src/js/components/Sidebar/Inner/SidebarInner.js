// @flow

import * as React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Icon from '../../Icon/Icon';
import './SidebarInner.css';

// TODO - fix types
type Props = {
  children?: React.Node,
  description: string,
  icon: string,
  id: string,
  label: string,
  link: string,
  linkEdit: string,
  onClick: Function | null,
  onSubClick?: (id: string, label: string) => (event: SyntheticMouseEvent<HTMLElement>) => void,
  selected: boolean,
};

const ItemContent = (props: Props) => {
  return (
    <React.Fragment>
      <span className="SidebarInner__icon">
        <Icon type={props.icon} />
      </span>
      <span className="SidebarInner__text">
        <span className="SidebarInner__label">{props.label}</span>
        <span className="SidebarInner__description">{props.description}</span>
      </span>
      {props.children}
    </React.Fragment>
  );
};

class SidebarInner extends React.Component<Props> {
  static defaultProps = {
    description: '',
    icon: '',
    label: '',
    link: '',
    linkEdit: '',
    onClick: null,
    selected: false,
  };

  props: Props;

  render() {
    let isSelected = false;
    if (this.props.link === window.location.pathname) {
      isSelected = true;
    } else if (this.props.linkEdit === window.location.pathname) {
      isSelected = true;
    } else if (this.props.selected) {
      isSelected = true;
    }

    if (this.props.onSubClick) {
      return (
        <div
          className={classNames('SidebarInner', { 'SidebarInner--selected': isSelected })}
          onClick={this.props.onSubClick && this.props.onSubClick(this.props.id, this.props.label)}
        >
          <ItemContent {...this.props} />
        </div>
      );
    } else if (this.props.link) {
      return (
        <Link className={isSelected ? 'SidebarInner SidebarInner--selected' : 'SidebarInner'} to={this.props.link}>
          <ItemContent {...this.props} />
        </Link>
      );
    } else {
      return (
        <div onClick={this.props.onClick} className="SidebarInner">
          <ItemContent {...this.props} />
        </div>
      );
    }
  }
}

export default SidebarInner;
