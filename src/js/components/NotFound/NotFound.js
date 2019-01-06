// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import Translation from '../Translation/Translation';
import { ROUTE_HOME } from '../../constants/routes';
import './NotFound.css';

/**
 * NotFound
 */
const NotFound = () => (
  <section className="NotFound">
    <p className="NotFound__msg">
      <Translation name="Message" ns="NotFound" />
    </p>
    <p className="NotFound__submsg">
      <Link to={ROUTE_HOME}>
        <Translation name="Back" ns="NotFound" />
      </Link>
    </p>
  </section>
);

export default NotFound;
