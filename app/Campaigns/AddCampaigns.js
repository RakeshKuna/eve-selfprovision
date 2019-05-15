import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import FormValidator from 'commons';
import { withRouter } from 'react-router';
import { history } from 'helpers';
import userService from 'services';
import { alertActions } from 'actions';
import { store } from '../store';
import './style.scss';

export class AddCampaigns extends React.Component {
  constructor(props) {
    super(props);
    // console.log(store);
    this.validator = new FormValidator([
      {
        field: 'promotionName',
        method: 'isEmpty',
        validWhen: false,
        message: 'Promotion Name is required.'
      },
      {
        field: 'promotionID',
        method: 'isEmpty',
        validWhen: false,
        message: 'Promotion ID is required.'
      },
      {
        field: 'promotionType',
        method: 'isEmpty',
        validWhen: false,
        message: 'Promotion Type is required.'
      },
      {
        field: 'productItems',
        method: 'isEmpty',
        validWhen: false,
        message: 'Product Items is required.'
      },
      {
        field: 'period',
        method: 'isEmpty',
        validWhen: false,
        message: 'Period is required.'
      },
      {
        field: 'duration',
        method: 'isEmpty',
        validWhen: false,
        message: 'Duration is required.'
      },
      {
        field: 'productAreaCode',
        method: 'isEmpty',
        validWhen: false,
        message: 'Product Area Code is required.'
      },
      {
        field: 'effStartDate',
        method: 'isEmpty',
        validWhen: false,
        message: 'Start Date is required.'
      }
    ]);
    this.periodArr = [{
      value: '',
      name: 'Select'
    }, {
      value: 'LifeTime',
      name: 'Life Time'
    },
    {
      value: 'NoOfDays',
      name: 'No of Days'
    },
    {
      value: 'NoOfMonths',
      name: 'No of Months'
    },
    {
      value: 'NoOfYears',
      name: 'No of Years'
    }];
    this.state = {
      promotionName: '',
      promotionID: '',
      displayName: '',
      promotionType: '',
      // promotionalProductOrPackage: '',
      productItems: [],
      period: '',
      duration: '',
      productAreaCode: '001',
      // packageItems:'',
      effStartDate: new Date(),
      effEndDate: new Date(),
      productTypesArr: [],
      disabled: false,
      validation: this.validator.valid(),
      showLoader: false
    };
    this.submitted = false;
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
    this.handleCheckChange = this.handleCheckChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }


  componentDidMount() {
    this.getProducts();
    if (this.props.location && this.props.location.pathname.indexOf('updateCampaign') > 0) {
      this.headerText = 'Update Promotions/Campaigns';
      this.buttonText = 'Update';
      this.handleDetails(true);
    } else {
      this.headerText = 'Add Promotions/Campaigns';
      this.buttonText = 'Add';
      this.handleDetails(false);
    }
  }

    getProducts =() => {
      userService.getProductsList(this.props.match.params.id)
        .then(
          (success) => {
            if (!Array.isArray(success.productsResponseMessage)) {
              success.productsResponseMessage = [success.productsResponseMessage];
            }
            this.setState({
              productTypesArr: success.productsResponseMessage,
            });
          },
          () => {
            // console.log(error);
            this.setState({
              loading: false
            });
          });
    }

    handleChangeStart =(date) => {
      this.setState({
        effStartDate: date
      });
    }
    handleChangeEnd =(date) => {
      this.setState({
        effEndDate: date
      });
    }
    handleCheckChange=(e) => {
      this.setState({
        [e.target.name]: e.target.checked
      });
    }
    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
    handleSelectChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      });
      if (e.target.value === 'LifeTime') {
        this.setState({ disabled: true, duration: ' ' });
      } else {
        this.setState({ disabled: false });
      }
    }
    handleDetails = (isDisable) => {
      if (isDisable) {
        const campaignObj = this.props.location.state.campaign;
        const startdatelist = campaignObj.startDate;
        this.setState({
          displayName: campaignObj.displayName ? campaignObj.displayName : '',
          duration: campaignObj.duration ? campaignObj.duration : '',
          effStartDate: new Date(startdatelist),
          promotionID: campaignObj.promotionID ? campaignObj.promotionID : '',
          promotionName: campaignObj.promotionName ? campaignObj.promotionName : '',
          promotionType: campaignObj.promotionType ? campaignObj.promotionType : '',
          productAreaCode: '001',
          isDisable: true
        });
      } else {
        this.setState({
          isDisable: false
        });
      }
    }

    AddPromotionSubmit = (e) => {
      e.preventDefault();
      const validation = this.validator.validate(this.state);
      this.setState({ validation });
      this.submitted = true;
      if (validation.isValid) {
        this.setState({ showLoader: true });
        const obj = {
          ...this.state
        };
        delete obj.validation;
        delete obj.ignore_whitespace;
        delete obj.productTypesArr;
        delete obj.disabled;
        delete obj.isDisable;
        delete obj.showLoader;
        obj.channelPartnerID = this.props.match.params.id;
        // obj.promotionalProductOrPackage = 'Full Package';
        // obj.productItems= "Full Package";
        obj.amount = '10';
        obj.productItems = [this.state.productItems];
        userService.addUpdatePromotion(obj).then(
          () => {
            store.dispatch(alertActions.success('Sucess'));
            this.setState({ showLoader: false });
            // history.push('/editBu/'+this.props.match.params.id);
            history.push(`/editBu/${this.props.match.params.id}`);
          },
          (error) => {
            this.setState({ showLoader: false });
            store.dispatch(alertActions.error(error.toString()));
          });
      } else {
        // store.dispatch("Please fix form validations");
      }
    }
    render() {
      const validation = this.submitted ? // if the form has been submitted at least once
        this.validator.validate(this.state) : // then check validity every time we render
        this.state.validation;
      return (
        <div>
          <Row>
            <Col md={{ size: 10, offset: 1 }}>
              <h3>{this.headerText}</h3>
              <hr />
              <Form>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label for="promotionName" className="required">Promotion Name</Label>
                      <Input onChange={this.handleChange} type="text" name="promotionName" id="promotionName" placeholder="Promotion Name" value={this.state.promotionName} disabled={this.state.isDisable} />
                      <Label className="error-msg">{validation.promotionName.message}</Label>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label for="promotionID" className="required">Promotion Id</Label>
                      <Input onChange={this.handleChange} type="text" name="promotionID" id="promotionID" placeholder="Promotion Id" value={this.state.promotionID} disabled={this.state.isDisable} />
                      <Label className="error-msg">{validation.promotionID.message}</Label>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label for="displayName">Display Name</Label>
                      <Input onChange={this.handleChange} type="text" name="displayName" id="displayName" placeholder="Name" value={this.state.displayName} />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label className="required" for="effStartDate">Start Date</Label>
                      <div className="datepicker">
                        {/* minDate={new Date()} showDisabledMonthNavigation */}
                        <DatePicker
                          id="effStartDate"
                          className="form-control"
                          selected={this.state.effStartDate}
                          selectsStart
                          effStartDate={this.state.effStartDate}
                          effEndDate={this.state.effEndDate}
                          onChange={this.handleChangeStart}
                          minDate={new Date()}
                        />
                      </div>
                      <Label className="error-msg">{validation.effStartDate.message}</Label>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label for="effEndDate">End Date</Label>
                      <div className="datepicker">
                        <DatePicker
                          id="effEndDate"
                          className="form-control"
                          selected={this.state.effEndDate}
                          selectsEnd
                          startDate={this.state.effStartDate}
                          effEndDate={this.state.effEndDate}
                          onChange={this.handleChangeEnd}
                          minDate={new Date()}
                        />
                      </div>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label for="promotionType" className="required">Promotion Type</Label>
                      <Input onChange={this.handleChange} type="select" name="promotionType" id="promotionType" value={this.state.promotionType}>
                        <option>Select</option>
                        <option>Free</option>
                        <option>Flat</option>
                        <option>Flat off</option>
                        <option>Percentage</option>
                        <option>Percentage Off</option>
                      </Input>
                      <Label className="error-msg">{validation.promotionType.message}</Label>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label className="required" for="period">Period</Label>
                      <Input onChange={this.handleSelectChange} type="select" name="period" id="period" value={this.state.period}>
                        {this.periodArr.map((period) => (
                          <option key={period.value} value={period.value}>
                            {period.name}
                          </option>
                        ))}
                      </Input>
                      <Label className="error-msg">{validation.period.message}</Label>
                    </FormGroup>
                  </Col>
                  {!this.state.disabled &&
                  <Col md="6">
                    <FormGroup>
                      <Label className="required" for="duration">Duration</Label>
                      <Input onChange={this.handleChange} type="text" name="duration" id="duration" placeholder="14" value={this.state.duration} />
                      <Label className="error-msg">{validation.duration.message}</Label>
                    </FormGroup>
                  </Col>}
                  <Col md="6">
                    <FormGroup>
                      <Label for="productItems" className="required">Product Items</Label>
                      <Input onChange={this.handleChange} type="select" name="productItems" id="productItems" value={this.state.productItems}>
                        <option>select</option>
                        {this.state.productTypesArr.map((period) => (
                          <option key={period.productName} value={period.productName}>
                            {period.productName}
                          </option>
                        ))}
                      </Input>
                      <Label className="error-msg">{validation.productItems.message}</Label>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label className="required" for="productAreaCode">Product Area Code</Label>
                      <Input onChange={this.handleChange} type="text" name="productAreaCode" id="productAreaCode" placeholder="Promotion Area code" value={this.state.productAreaCode} disabled />
                      <Label className="error-msg">{validation.productAreaCode.message}</Label>
                    </FormGroup>
                  </Col>
                  <Col sm="12" className="text-right mt-5">
                    {this.state.showLoader &&
                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" alt="img" />
                    }
                    <Button onClick={this.AddPromotionSubmit} color="primary" className="mr-2">{this.buttonText} Promotion</Button>
                    <Button tag={Link} to={`/editBu/${this.props.match.params.id}`} color="primary">Cancel</Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </div>
      );
    }
}

export default withRouter(AddCampaigns);
