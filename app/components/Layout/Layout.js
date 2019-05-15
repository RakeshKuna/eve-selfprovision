/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Container } from 'reactstrap';
import Header from 'components/Header';
import Footer from 'components/Footer';
import './style.scss';

const Layout = (props) => (
  <div className="app-wrapper">
    <div className="main-panel">
      <Header />
      <div className="wrapper">
        <Container>
          {props.children}
        </Container>
      </div>
    </div>
    <div className="clearfix"></div>
    <Footer />
  </div>
);

export default Layout;
