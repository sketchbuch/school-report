// @flow

import * as React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../Icon/Icon';
import './SidebarInner.css';

type Props = {
  children?: React.Node,
  description: string,
  icon: string,
  label: string,
  link: string,
  onClick: Function | null,
};

const ItemContent = (props: Props) => {
  return (
    <React.Fragment>
      <Icon type={props.icon} />
      <span className="SidebarInner__text">
        <span className="SidebarInner__label">{props.label}</span>
        <span className="SidebarInner__description">{props.description}</span>
      </span>
      {props.children}
    </React.Fragment>
  )
}


/**
* A sidebar item inner element.
*/
class SidebarInner extends React.Component<Props> {
  static defaultProps = {
    description: '',
    icon: '',
    label: '',
    link: '',
    onClick: null,
  };

  props: Props;

  render() {
    if (this.props.link) {
      return <Link className="SidebarInner" to={this.props.link}><ItemContent {...this.props} /></Link>
    } else {
      return <div onClick={this.props.onClick} className="SidebarInner"><ItemContent {...this.props} /></div>
    }
  }
}

export default SidebarInner;
