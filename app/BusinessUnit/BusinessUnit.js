/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { TabContent, TabPane, Nav, NavItem, NavLink, Button } from 'reactstrap';
import classnames from 'classnames';
import { Products } from 'Products';
import { Campaigns } from 'Campaigns';
import { withRouter } from 'react-router';
import './style.scss';
import { AddBusinessUnit } from './AddBusinessUnit';

const FontAwesome = require('react-fontawesome');

class BusinessUnit extends React.Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.campaignChild = React.createRef();
    this.setActiveTab = this.setActiveTab.bind(this);
    if (this.props.location && this.props.location.pathname.indexOf('editBu') > 0) {
      this.state = {
        activeTab: 'products',
        shouldHide: true
      };
      this.channelPartnerId = this.props.match.params.id;
    } else {
      this.state = {
        activeTab: 'addBU',
        shouldHide: false,
        tabDisabled: true
      };
      this.channelPartnerId = null;
    }
    this.sku = [];
  }

  componentDidMount() {
    // Will be called in the edit flow
    if (this.props.match.params.id) {
      this.setActiveTab('products');
    }
  }

  setSku = (sku) => {
    this.sku = sku;
  }

  setChannelPartnerId = (id) => {
    this.channelPartnerId = id;
  }

  setActiveTab =(tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
        tabDisabled: false
      });
    }
    switch (tab) {
      case 'products':
        this.refs.child.getProducts();
        break;
      case 'campaigns':
        this.refs.campaignChild.getCampaigns(this.sku);
        break;
      default:
    }
  }

  render() {
    const child = 'child';
    const campaignChild = 'campaignChild';
    return (
      <div className="tabs_main">
        <Button className="mb-3 link_btn" tag={Link} to={'/home'} color="link"><FontAwesome name="angle-left" /> Back</Button>

        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === 'addBU' }, { hidden: this.state.shouldHide === true })}
              onClick={() => { this.setActiveTab('addBU'); }}
            >
              Add Business Unit
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === 'products' })}
              onClick={() => { this.setActiveTab('products'); }}
              disabled={this.state.tabDisabled}
            >
              Products
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === 'campaigns' })}
              onClick={() => { this.setActiveTab('campaigns'); }}
              disabled={this.state.tabDisabled}
            >
              Campaigns
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="addBU">
            <AddBusinessUnit setActive={this.setActiveTab} setChannelPartnerId={this.setChannelPartnerId} />
          </TabPane>
          <TabPane tabId="products">
            {/* <Button tag={Link} to="/addProduct">Add Product</Button> */}
            <Products channelPartnerId={this.channelPartnerId} ref={child} setSku={this.setSku} />
          </TabPane>
          <TabPane tabId="campaigns">
            <Campaigns channelPartnerId={this.channelPartnerId} ref={campaignChild} />
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
export default withRouter(BusinessUnit);

