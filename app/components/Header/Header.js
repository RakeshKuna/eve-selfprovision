import React from 'react';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import EvergentLogo from '../../images/Evergent_logo.png';
import './style.scss';
import Logout from '../../containers/Logout';

// const FontAwesome = require('react-fontawesome');

const user = JSON.parse(localStorage.getItem('user')) || {};

const Header = () => (
  <div className="header">
    <div className="logo">
      <NavLink tag={Link} to="/home"><img src={EvergentLogo} width="180px" alt="EvergentLogo" /></NavLink>
    </div>
    <div className="float-right">
      <div className="welcom_data">
        <p>Welcome {user.apiUser}</p>
      </div>
      <Logout />
      <div className="clearfix"></div>
    </div>
    <div className="clearfix"></div>
  </div>
);
export default Header;
