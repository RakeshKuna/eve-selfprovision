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
import userService from 'services';
import { history } from 'helpers';

export class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false
    };
    this.columns = [{
      Header: 'Currency Code',
      accessor: 'currencyCode'
    }, {
      Header: 'Product Description',
      accessor: 'productDescription'
    }, {
      Header: 'Product Category',
      accessor: 'productCategory'
    }, {
      Header: 'Channel Partner Description',
      accessor: 'channelPartnerDescription'
    }, {
      Header: 'Renewable',
      accessor: 'renewable'
    }, {
      Header: 'Service Type',
      accessor: 'serviceType'
    }, {
      Header: 'Period',
      accessor: 'period'
    }, {
      Header: 'Basic Service',
      accessor: 'basicService'
    }, {
      Header: 'SKU OR Quick Code',
      accessor: 'skuORQuickCode'
    }, {
      Header: 'DMA Name',
      accessor: 'dmaName'
    }, {
      Header: 'Retail Price',
      accessor: 'retailPrice'
    }, {
      Header: 'Duration',
      accessor: 'duration'
    }, {
      Header: 'Display Order',
      accessor: 'displayOrder'
    }, {
      Header: 'is Ads Enabled',
      accessor: 'isAdsEnabled'
    }, {
      Header: 'Display Name',
      accessor: 'displayName'
    }, {
      Header: 'Product Name',
      accessor: 'productName'
    }, {
      Header: 'Actions',
      accessor: '[row identifier to be passed to button]',
      Cell: (row) => (<Button color="primary" onClick={() => this.editProducts(row.original)} className="view_btn">Edit</Button>),
      filterable: false
    }];
  }

     getProducts=() => {
       this.setState({
         loading: true
       });
       userService.getProductsList(this.props.channelPartnerId)
         .then(
           (success) => {
             if (!Array.isArray(success.productsResponseMessage)) {
               success.productsResponseMessage = [success.productsResponseMessage];
             }
             this.setState({
               data: success.productsResponseMessage,
               loading: false
             });

             const skus = [];
             success.productsResponseMessage.forEach((element) => {
               skus.push(element.skuORQuickCode);
             });
             this.props.setSku(skus);
           },
           () => {
             this.setState({
               loading: false
             });
           }
         );
     }
     editProducts=(product) => {
       history.push({ pathname: `/${this.props.channelPartnerId}/updateProduct/${product.productName}`, state: { product } });
     }
     render() {
       return (
         <div>
           <Row className="mb-4">
             <Col sm={8}>
               <h2>Products</h2>
             </Col>
             <Col sm={4} className="text-right">
               <Button color="primary" className="mr-2" tag={Link} to={`/businessUnit/${this.props.channelPartnerId}/addProduct`}>ADD</Button>
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
export default Products;
