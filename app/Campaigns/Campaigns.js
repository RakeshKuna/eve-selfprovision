/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { ETable } from 'containers/ETable';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { history } from 'helpers';
import userService from 'services';
import { alertActions } from 'actions';
import { store } from '../store';


export class Campaigns extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false
    };
    this.columns = [{
      Header: 'Product',
      accessor: 'product' // String-based value accessors!
    }, {
      Header: 'DMA Name',
      accessor: 'dmaName'
    }, {
      Header: 'Start Date',
      accessor: 'startDate'
    }, {
      Header: 'Promotion Type',
      accessor: 'promotionType' // String-based value accessors!
    }, {
      Header: 'Promotion Name',
      accessor: 'promotionName'
    }, {
      Header: 'Promotional Price',
      accessor: 'promotionalPrice'
    }, {
      Header: 'Display Name',
      accessor: 'displayName'
    }, {
      Header: 'Promotion ID',
      accessor: 'promotionID'
    }, {
      Header: 'SKU OR QuickCode',
      accessor: 'skuORQuickCode'
    }, {
      Header: 'Actions',
      accessor: '[row identifier to be passed to button]',
      Cell: (row) => (<Button color="primary" onClick={() => this.editCampaigns(row.original)} className="view_btn">Edit</Button>),
      filterable: false
    }];
  }


     getCampaigns=(skus) => {
       this.setState({
         loading: true
       });
       userService.getPromotionsList(this.props.channelPartnerId, skus)
         .then(
           (success) => {
             if (!Array.isArray(success.promotionsResponseMessage)) {
               success.promotionsResponseMessage = [success.promotionsResponseMessage];
             }
             success.promotionsResponseMessage.forEach((result) => {
               if (parseInt(result.startDate, 10)) {
                 const startDate = new Date(parseInt(result.startDate, 10));
                 result.startDate = `${startDate.getMonth() + 1}/${startDate.getDate()}/${startDate.getFullYear()}`;
               }
               // result.startDate = new Date(parseInt(result.startDate)).toLocaleDateString();
             });
             this.setState({
               data: success.promotionsResponseMessage,
               loading: false
             });
           },
           (error) => {
             store.dispatch(alertActions.error(error));
             this.setState({
               loading: false
             });
           });
     }
     editCampaigns=(campaign) => {
       history.push({ pathname: `/${this.props.channelPartnerId}/updateCampaign/${campaign.promotionName}`, state: { campaign } });
     }
     render() {
       return (
         <div>
           <Row className="mb-4">
             <Col sm={8}>
               <h2>Campaigns</h2>
             </Col>
             <Col sm={4} className="text-right">
               <Button color="primary" className="mr-2" tag={Link} to={`/${this.props.channelPartnerId}/addCampaign`}>ADD</Button>
             </Col>
           </Row>
           <Row>
             <Col>
               <ETable key="A" data={this.state.data} columns={this.columns} loading={this.state.loading} />
             </Col>
           </Row>
         </div>
       );
     }
}
export default Campaigns;
