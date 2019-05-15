import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap';
import DatePicker from 'react-datepicker';
import FormValidator from 'commons';
import userService from 'services';
import { history } from 'helpers';
import { alertActions } from 'actions';
import 'react-datepicker/dist/react-datepicker.css';
import './style.scss';

import { store } from '../store';


export class AddProducts extends React.Component {
  constructor(props) {
    super(props);
    this.validator = new FormValidator([
      {
        field: 'servicetype',
        method: 'isEmpty',
        validWhen: false,
        message: 'Service Type is required.'
      },
      {
        field: 'prodCategory',
        method: 'isEmpty',
        validWhen: false,
        message: 'Product Category is required.'
      },
      {
        field: 'productName',
        method: 'isEmpty',
        validWhen: false,
        message: 'Product Name is required.'
      },
      {
        field: 'sku',
        method: 'isEmpty',
        validWhen: false,
        message: 'SKU is required.'
      },
      {
        field: 'prodAreaCode',
        method: 'isEmpty',
        validWhen: false,
        message: 'Product Area Code is required.'
      },
      {
        field: 'frequency',
        method: 'isEmpty',
        validWhen: false,
        message: 'Frequency is required.'
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
        field: 'productPrice',
        method: 'isEmpty',
        validWhen: false,
        message: 'Product Price is required.'
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
    this.serviceTypeArr = [{
      id: 0,
      value: 'select',
      type: 'Select',
      category: ['Select']
    }, {
      id: 1,
      value: 'SVOD',
      type: 'SVOD',
      category: ['Select', 'Subscription', 'Others']
    },
    {
      id: 2,
      value: 'TVOD',
      type: 'TVOD',
      category: ['Select', 'Movies']
    }];
    this.state = {
      channelPartnerID: this.props.match.params.id,
      servicetype: '',
      prodCategory: '',
      productName: '',
      sku: '',
      prodAreaCode: '001',
      frequency: '',
      period: '',
      duration: '',
      productPrice: '',
      effStartDate: new Date(),
      isRenewable: false,
      recurringInd: false,
      disabled: false,
      validation: this.validator.valid(),
      serviceProducts: ['Select'],
      showLoader: false
    };
    this.submitted = false;
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleCheckChange = this.handleCheckChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  componentDidMount() {
    if (this.props.location && this.props.location.pathname.indexOf('updateProduct') > 0) {
      this.headerText = 'Update Product';
      this.buttonText = 'Update';
      this.handleDetails(false);
    } else {
      this.headerText = 'Add Product';
      this.buttonText = 'Add';
      this.handleDetails(true);
    }
  }
    handleDateChange=(date) => {
      this.setState({
        effStartDate: date
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
    handleService = (e) => {
      const index = e.target.selectedIndex;
      const optionElement = e.target.childNodes[index];
      const option = parseInt(optionElement.getAttribute('data-id'), 10);
      this.setState({
        servicetype: e.target.value
      });

      const serviceProductList = this.serviceTypeArr.filter((serviceType) => serviceType.id === option);

      this.setState({
        serviceProducts: serviceProductList[0].category
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
    handleDetails=(isNew) => {
      if (isNew) {
        this.setState({
          isNew: true,
          isDisable: false
        });
      } else {
        const productObj = this.props.location.state.product;
        const proCat = productObj.productCategory;
        this.setState({
          serviceProducts: [...this.state.serviceProducts, proCat],
          servicetype: productObj.serviceType ? productObj.serviceType : '',
          prodCategory: productObj.productCategory ? productObj.productCategory : '',
          productName: productObj.productName ? productObj.productName : '',
          sku: productObj.skuORQuickCode ? productObj.skuORQuickCode : '',
          prodAreaCode: '001',
          frequency: productObj.frequency ? productObj.frequency : '',
          period: productObj.period ? productObj.period : '',
          duration: productObj.duration ? productObj.duration : '',
          productPrice: productObj.retailPrice ? productObj.retailPrice : '',
          effStartDate: new Date(),
          isRenewable: productObj.renewable ? Boolean(productObj.renewable) : '',
          recurringInd: productObj.recurringInd ? Boolean(productObj.recurringInd) : '',
          validation: this.validator.valid(),
          isNew: false,
          isDisable: true
        });
      }
    }

    AddProductSubmit = (e) => {
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
        delete obj.isNew;
        delete obj.disabled;
        delete obj.isDisable;
        delete obj.showLoader;
        delete obj.serviceProducts;
        if (this.state.isRenewable) {
          obj.isRenewable = 'T';
        } else {
          obj.isRenewable = 'F';
        }
        if (this.state.recurringInd) {
          obj.recurringInd = 'T';
        } else {
          obj.recurringInd = 'F';
        }
        obj.effStartDate = `${this.state.effStartDate.getMonth() + 1}/${this.state.effStartDate.getDate()}/${this.state.effStartDate.getFullYear()}`;
        if (!this.state.isNew) {
          delete obj.productPrice;
        }
        userService.addUpdateProducts(obj).then(
          () => {
            store.dispatch(alertActions.success('Sucess'));
            this.setState({ showLoader: false });
            history.push(`/editBu/${this.props.match.params.id}`);
          },
          (error) => {
            this.setState({ showLoader: false });
            store.dispatch(alertActions.error(error.toString()));
          });
      } else {
      // empty
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
                      <Label className="required" for="servicetype">Service Type</Label>
                      <Input onChange={this.handleService} type="select" name="servicetype" id="servicetype" value={this.state.servicetype} disabled={this.state.isDisable}>
                        {this.serviceTypeArr.map((servicetype) => (
                          <option key={servicetype.id} data-id={servicetype.id}>
                            {servicetype.type}
                          </option>
                        ))}
                      </Input>
                      <Label className="error-msg">{validation.servicetype.message}</Label>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label className="required" for="prodCategory">Category</Label>
                      <Input onChange={this.handleChange} type="select" name="prodCategory" id="prodCategory" value={this.state.prodCategory} disabled={this.state.isDisable}>
                        {this.state.serviceProducts && this.state.serviceProducts.map((serviceProduct) => (
                          <option key={serviceProduct.id} >
                            {serviceProduct}
                          </option>
                        ))}
                      </Input>
                      <Label className="error-msg">{validation.prodCategory.message}</Label>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label for="productName" className="required">Name</Label>
                      <Input onChange={this.handleChange} type="text" name="productName" id="productName" placeholder="Product Name" value={this.state.productName} disabled={this.state.isDisable} />
                      <Label className="error-msg">{validation.productName.message}</Label>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label for="sku" className="required">SKU / QuickCode</Label>
                      <Input onChange={this.handleChange} type="text" name="sku" id="sku" placeholder="SKU" value={this.state.sku} disabled={this.state.isDisable} />
                      <Label className="error-msg">{validation.sku.message}</Label>
                    </FormGroup>
                  </Col>
                  {/* <Col md="6">
                                    <FormGroup>
                                        <Label for="Name">Display Name</Label>
                                        <Input type="text" name="Name" id="Name" placeholder="Name" />
                                    </FormGroup>
                                </Col> */}
                  <Col md="6">
                    <FormGroup>
                      <Label for="prodAreaCode" className="required">Area Code</Label>
                      <Input onChange={this.handleChange} type="text" name="prodAreaCode" id="prodAreaCode" placeholder="prodAreaCode" disabled value={this.state.prodAreaCode} />
                      <Label className="error-msg">{validation.prodAreaCode.message}</Label>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label className="required" for="frequency">Frequency</Label>
                      <Input onChange={this.handleChange} type="select" name="frequency" id="frequency" value={this.state.frequency}>
                        <option>Select</option>
                        <option>Monthly</option>
                        <option>Yearly</option>
                        <option>Weekly</option>
                        <option>Daily</option>
                      </Input>
                      <Label className="error-msg">{validation.frequency.message}</Label>
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
                      <Label className="required" for="productPrice">Product Price</Label>
                      <Input onChange={this.handleChange} type="text" name="productPrice" id="productPrice" placeholder="15" value={this.state.productPrice} />
                      <Label className="error-msg">{validation.productPrice.message}</Label>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label className="required" for="effStartDate">Start Date</Label>
                      {/* <Input type="text" name="effStartDate" id="effStartDate" placeholder="2019-07-22" /> */}
                      <div className="datepicker">
                        <DatePicker minDate={new Date()} showDisabledMonthNavigation id="effStartDate" className="form-control" selected={this.state.effStartDate} onChange={this.handleDateChange} />
                      </div>
                      <Label className="error-msg">{validation.effStartDate.message}</Label>
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup check inline className="check_main">
                      {/* <Label check>
                                            <Input onChange={this.handleCheckChange} id="isRenewable" name="isRenewable" type="checkbox" />{' '} isRenewable
                                        </Label>
                                        <Label check>
                                            <Input onChange={this.handleCheckChange} id="recurringInd" name="recurringInd" type="checkbox" />{' '} Recurring
                                        </Label> */}
                      <CustomInput className="mr-4" onChange={this.handleCheckChange} id="isRenewable" name="isRenewable" type="checkbox" label="isRenewable" />
                      <CustomInput className="" onChange={this.handleCheckChange} id="recurringInd" name="recurringInd" type="checkbox" label="Recurring" />
                    </FormGroup>
                  </Col>
                  <Col sm="12" className="text-right mt-5">
                    {this.state.showLoader &&
                      <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" alt=" " />
                    }
                    <Button onClick={this.AddProductSubmit} color="primary" className="mr-2">{this.buttonText} Product</Button>
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

export default AddProducts;
