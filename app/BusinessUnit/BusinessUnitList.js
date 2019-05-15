import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import { ETable } from 'containers/ETable';
import { Link } from 'react-router-dom';
import userService from 'services';
import { alertActions } from 'actions';
import { store } from '../store';

export class BusinessUnitList extends React.Component {
  constructor() {
    super();

    this.state = {
      data: [],
      loading: false
    };

    this.columns = [{
      Header: 'Channel Partner Id',
      accessor: 'channelPartnerId' // String-based value accessors!
    }, {
      Header: 'Channel Partner Name',
      accessor: 'channelPartnerName' // String-based value accessors!
    }, {
      Header: 'Channel Partner Type',
      accessor: 'channelPartnerType'
    }, {
      Header: 'Currency',
      accessor: 'currency'
    }, {
      Header: 'Actions',
      accessor: '[row identifier to be passed to button]',
      Cell: (row) => (<Button color="primary" className="view_btn" tag={Link} to={`/editBu/${row.original.channelPartnerId}`}>View</Button>),
      filterable: false
    }];
  }

  componentDidMount() {
    this.handleLoad(true);
    userService.getBuList()
      .then(
        (success) => {
          if (Array.isArray(success.channelPartenrs)) {
            this.setState({
              data: success.channelPartenrs
            });
          } else {
            this.setState({
              data: [success.channelPartenrs]
            });
          }
          this.handleLoad(false);
        },
        (error) => {
          store.dispatch(alertActions.error(error));
          this.handleLoad(false);
        }
      );
  }

  // editBu(value) {
  //   // console.log(value);
  // }
 handleLoad=(loading) => {
   if (loading) {
     this.setState({
       loading: true
     });
   } else {
     this.setState({
       loading: false
     });
   }
 }
 render() {
   return (
     <div>
       <Row className="mb-4">
         <Col sm={8}>
           <h2>Business Unit List</h2>
         </Col>
         <Col sm={4} className="text-right">
           <Button color="primary" tag={Link} to="/addBU">Create BU</Button>
         </Col>
       </Row>
       <ETable key="A" data={this.state.data} columns={this.columns} loading={this.state.loading} />
     </div>
   );
 }
}
export default BusinessUnitList;
