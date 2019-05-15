import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col, CustomInput } from 'reactstrap';
import FormValidator from 'commons';
import { history } from 'helpers';
import { alertActions } from 'actions';
import userService from 'services';
import CountryCode from 'helpers/CountryCode.json';
import StateCode from 'helpers/StateCode.json';
import { store } from '../store';

import './style.scss';

export class AddBusinessUnit extends Component {
  constructor(props) {
    super(props);
    store.dispatch(alertActions.clear());
    this.validator = new FormValidator([
      {
        field: 'channelPartnerName',
        method: 'isEmpty',
        validWhen: false,
        message: 'Channel Partner Name is required.'
      },
      {
        field: 'channelPartnerId',
        method: 'isEmpty',
        validWhen: false,
        message: 'Channel Partner Id is required.'
      },
      {
        field: 'chargedCurrency',
        method: 'isEmpty',
        validWhen: false,
        message: 'Charged Currency is required.'
      }, {
        field: 'timeZone',
        method: 'isEmpty',
        validWhen: false,
        message: 'Time Zone is required.'
      },
      {
        field: 'channelPartnerType',
        method: 'isEmpty',
        validWhen: false,
        message: 'Channel Partner Type is required.'
      },
      {
        field: 'country',
        method: 'isEmpty',
        validWhen: false,
        message: 'Country is required.'
      },
      {
        field: 'state',
        method: 'isEmpty',
        validWhen: false,
        message: 'State is required.'
      },
      {
        field: 'county',
        method: 'isEmpty',
        validWhen: false,
        message: 'County is required.'
      },
      {
        field: 'city',
        method: 'isEmpty',
        validWhen: false,
        message: 'City is required.'
      },
      {
        field: 'taxType',
        method: 'isEmpty',
        validWhen: false,
        message: 'Tax Type is required.'
      },
      {
        field: 'themeColor',
        method: 'isEmpty',
        validWhen: false,
        message: 'Theme Color is required.'
      }
    ]);

    this.state = {
      channelPartnerName: '',
      channelPartnerId: '',
      channelPartnerType: '',
      chargedCurrency: '',
      country: '',
      state: '',
      city: '',
      county: '',
      currency: '',
      taxType: '',
      themeColor: '',
      timeZone: [],
      imageDir: '',
      errors: [],
      isFormValid: true,
      isFormSubmitted: false,
      period: '',
      duration: '',
      productPrice: '',
      isFreeTrail: false,
      isFreeTrailDisabled: true,
      isProductChecked: false,
      validation: this.validator.valid(),
      showLoader: false
    };
    this.cur = [
      { name: 'INR', icon: '₹' },
      { name: 'USD', icon: '$' },
      { name: 'EUR', icon: '€' }
    ];
    this.CountryCode = CountryCode;
    this.StateCode = StateCode;
    this.submitted = false;
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckChange = this.handleCheckChange.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
  }

  handleSubmit = (e, from) => {
    e.preventDefault();
    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    this.submitted = true;
    if (validation.isValid) {
      this.setState({ showLoader: true });
      const BuDetails = {
        channelPartnerName: this.state.channelPartnerName,
        channelPartnerId: this.state.channelPartnerId,
        chargedCurrency: this.state.chargedCurrency,
        timeZone: [this.state.timeZone],
        channelPartnerType: this.state.channelPartnerType,
        currency: this.state.chargedCurrency,
        country: this.state.country,
        state: this.state.state,
        county: this.state.county,
        city: this.state.city,
        taxType: this.state.taxType,
        themeColor: this.state.themeColor,
        imageDir: 'evergent',
        frequency: this.state.frequency,
        prorate: this.state.frequency,
        productPrice: this.state.productPrice
      };
      delete BuDetails.showLoader;
      BuDetails.sku = `${BuDetails.channelPartnerId}_SVOD_${BuDetails.frequency}`;
      BuDetails.name = `SVOD_${BuDetails.frequency}`;
      BuDetails.displayName = `SVOD${BuDetails.frequency}`;
      if (this.state.isProductChecked) {
        BuDetails.productInfoMsgs = [{
          sku: BuDetails.sku,
          name: BuDetails.name,
          description: BuDetails.displayName,
          displayName: BuDetails.displayName,
          recurringInd: false,
          frequency: this.state.frequency,
          prorate: this.state.frequency,
          productPrice: this.state.productPrice,
          isRenewable: true
        }];
      }
      userService.addBusinessUnit(BuDetails)
        .then(
          () => {
            if (this.state.isFreeTrail) {
              const promotionObj = {
                channelPartnerID: BuDetails.channelPartnerId,
                cpDescription: 'test',
                deleteFlag: 'F',
                description: BuDetails.displayName,
                displayName: BuDetails.displayName,
                duration: '10',
                endDate: '02/26/2019 00:00:00',
                isBillAfterPeriod: true,
                period: 'NoOfYears',
                productAreaCode: '001',
                productItems: [BuDetails.name],
                promotionID: 'testccb',
                promotionName: 'testccb',
                promotionType: 'Flat',
                amount: '0.50',
                startDate: '02/25/2019 00:00:00'

                // channelPartnerID: BuDetails.channelPartnerId,
                // productItems: 'SVOD',
                // productAreaCode: '001',
                // servicetype: 'SVOD',
                // prodCategory: 'Subscription',
                // recurringInd: 'F',
                // frequency: 'Monthly',
                // period: 'NoOfDays',
                // duration: '10',
                // effStartDate: '01/27/2018',
                // productPrice: '5',
                // isRenewable: 'T',
                // promotionID: 'SVOD_freetrail',
                // promotionName: 'SVOD freetrail',
                // promotionType: 'Free',

                // "channelPartnerID":BuDetails.channelPartnerId,
                // "promotionID" : 'SVOD_freetrail',
                // "promotionName" : 'SVOD freetrail',
                // "promotionType" : 'Free',
                // "productItems" : 'SVOD',
                // "period": _this.state.period,
                // "duration" : _this.state.duration,
                // "productAreaCode" : "001",
                // "startDate" : new Date(),
                // // "packageItems" : 'Full Package',
                // 3"productPrice": BuDetails.productPrice
              };
              setTimeout(() => {
                userService.addUpdatePromotion(promotionObj)
                  .then(
                    () => {
                      store.dispatch(alertActions.success('Sucess'));
                      this.setState({ showLoader: false });
                      this.handleSuccess(BuDetails, from);
                    },
                    (error) => {
                      this.setState({ showLoader: false });
                      store.dispatch(alertActions.error(error.toString()));
                    });
              }, 10000);
            } else {
              this.setState({ showLoader: false });
              store.dispatch(alertActions.success('Sucess'));
              this.handleSuccess(BuDetails, from);
            }
          },
          (error) => {
            this.setState({ showLoader: false });
            store.dispatch(alertActions.error(error.toString()));
          }
        );
    } else {
      // empty
    }
  }

  handleSuccess =(BuDetails, from) => {
    this.setState({
      channelPartnerName: '',
      channelPartnerId: '',
      channelPartnerType: '',
      chargedCurrency: '',
      country: '',
      state: '',
      city: '',
      county: '',
      taxType: '',
      themeColor: '',
      timeZone: [],
      imageDir: '',
      errors: [],
      isFormValid: true,
      isFormSubmitted: false,
      period: '',
      duration: '',
      BuDetails: '',
      validation: this.validator.valid()
    });
    if (from === 'saveAndContinue') {
      this.props.setChannelPartnerId(BuDetails.channelPartnerId);
      this.props.setActive('products');
    } else if (from === 'save') {
      history.push('/home');
    }
  }

  handleChange =(e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
    if (name === 'chargedCurrency') {
      const listmain = this.cur.filter((curitem) => curitem.name === value);
      const moneySymbol = listmain.map((list) => list.icon.toLocaleString());
      this.setState({ moneySymbol });
    }
    // if(name == 'channelPartnerId'){
    //   this.setState({channelPartnerId:e.target.value.toUpperCase()})
    // }
  }

  handleCheckChange =(e) => {
    this.setState({
      [e.target.name]: e.target.checked,
      isFreeTrailDisabled: !e.target.checked
    });
  }

  handleRadioChange = (e) => {
    this.setState({
      [e.target.name]: e.target.checked
    });
  }

  render() {
    const validation = this.submitted ? // if the form has been submitted at least once
      this.validator.validate(this.state) : // then check validity every time we render
      this.state.validation;
    return (
      <Form>
        <Row>
          <Col lg={4} md={6}>
            <FormGroup>
              <Label className="required" for="channelPartnerName">Service Provider Name</Label>
              <Input
                type="text"
                name="channelPartnerName"
                id="ServiceProviderName"
                placeholder="Name"
                onChange={this.handleChange}
              />
              <Label className="error-msg">{validation.channelPartnerName.message}</Label>
            </FormGroup>
          </Col>
          <Col lg={4} md={6}>
            <FormGroup>
              <Label className="required" for="channelPartnerId">Service Provider Id</Label>
              <Input
                type="text"
                name="channelPartnerId"
                id="ServiceProviderId"
                placeholder="Id"
                onChange={this.handleChange}
              />
              <Label className="error-msg">{validation.channelPartnerId.message}</Label>
            </FormGroup>
          </Col>
          <Col lg={4} md={6}>
            <FormGroup>
              <Label className="required" for="chargedCurrency">Charged Currency</Label>
              <Input type="select" name="chargedCurrency" id="exampleSelect" onChange={this.handleChange}>
                <option>Select</option>
                <option>USD</option>
                <option>EUR</option>
                <option>AUD</option>
                <option>PHP</option>
              </Input>
              <Label className="error-msg">{validation.chargedCurrency.message}</Label>
            </FormGroup>
          </Col>
          <Col lg={4} md={6}>
            <FormGroup>
              <Label className="required" for="timeZone">TimeZone</Label>
              <Input type="select" name="timeZone" id="exampleSelect" onChange={this.handleChange}>
                <option>Select</option>
                <option>GMT-Europe/Dublin</option>
                <option>GMT-America/Danmark</option>
              </Input>
              <Label className="error-msg">{validation.timeZone.message}</Label>
            </FormGroup>
          </Col>
          <Col lg={4} md={6}>
            <FormGroup>
              <Label className="required" for="channelPartnerType">Business Model</Label>
              <Input type="select" name="channelPartnerType" id="exampleSelect" onChange={this.handleChange}>
                <option>Select</option>
                <option>WISP</option>
                <option>VDSL</option>
                <option>TELCOM</option>
                <option>CONVERGENT</option>
              </Input>
              <Label className="error-msg">{validation.channelPartnerType.message}</Label>
            </FormGroup>
          </Col>
          <Col lg={4} md={6}>
            <FormGroup>
              <Label className="required" for="country">Country Code</Label>
              <Input type="select" name="country" id="country" onChange={this.handleChange}>
                {this.CountryCode.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </Input>
              <Label className="error-msg">{validation.country.message}</Label>
            </FormGroup>
          </Col>
          <Col lg={4} md={6}>
            <FormGroup>
              <Label className="required" for="state">State</Label>
              <Input type="select" name="state" id="state" onChange={this.handleChange}>
                {this.StateCode.map((state) => (
                  <option key={state.code} value={state.code}>
                    {state.name}
                  </option>
                ))}
              </Input>
              <Label className="error-msg">{validation.state.message}</Label>
            </FormGroup>
          </Col>
          <Col lg={4} md={6}>
            <FormGroup>
              <Label className="required" for="county">Country</Label>
              <Input type="select" name="county" id="county" onChange={this.handleChange}>
                <option>Select</option>
                <option>United States</option>
              </Input>
              <Label className="error-msg">{validation.county.message}</Label>
            </FormGroup>
          </Col>
          <Col lg={4} md={6}>
            <FormGroup>
              <Label className="required" for="city">City</Label>
              <Input type="select" name="city" id="city" onChange={this.handleChange}>
                <option>Select</option>
                <option>San Francisco</option>
                <option>Los Angeles</option>
                <option>Chicago</option>
                <option>Boston</option>
              </Input>
              <Label className="error-msg">{validation.city.message}</Label>
            </FormGroup>
          </Col>
          <Col lg={4} md={6}>
            <FormGroup>
              <Label className="required" for="taxType">Tax Type</Label>
              <Input type="select" name="taxType" id="taxType" onChange={this.handleChange}>
                <option>Select</option>
                <option>Regular</option>
                <option>VAT</option>
              </Input>
              <Label className="error-msg">{validation.taxType.message}</Label>
            </FormGroup>
          </Col>
          <Col lg={4} md={6}>
            <FormGroup>
              <Label className="required" for="themeColor">Theme Color</Label>
              <Input type="select" name="themeColor" id="themeColor" onChange={this.handleChange}>
                <option>Select</option>
                <option>Green</option>
                <option>Blue</option>
              </Input>
              <Label className="error-msg">{validation.themeColor.message}</Label>
            </FormGroup>
          </Col>
        </Row>
        <hr />
        <h4 className="mt-4 mb-3">Offered products & promotions</h4>
        <h5>Basic Subscriptions</h5>
        <Row>
          <Col lg={6} className="mb-3">
            <div className="form-inline offered-alignment">
              <FormGroup check>
                <Label check>
                  <Input type="radio" onChange={this.handleRadioChange} id="isProductChecked" name="isProductChecked" /> SVOD
                </Label>
                <Input type="select" name="frequency" id="frequency" onChange={this.handleChange}>
                  <option>Select</option>
                  <option>Monthly</option>
                  <option>Yearly</option>
                </Input>
                <span> {this.state.moneySymbol}</span>
                <Input className="price" type="text" name="productPrice" id="productPrice" placeholder="2.15" onChange={this.handleChange} />
              </FormGroup>
            </div>
          </Col>
          <Col lg={6}>
            <FormGroup check>
              <CustomInput className="mr-4" onChange={this.handleCheckChange} id="isFreeTrail" name="isFreeTrail" type="checkbox" label="Free Trail" />
              <Row>
                <Col xs="4" sm="3">
                  <Input type="text" name="duration" id="duration" placeholder="14" onChange={this.handleChange} disabled={this.state.isFreeTrailDisabled} />
                </Col>
                <Col xs="6" sm="5">
                  <Input type="select" name="period" id="period" onChange={this.handleChange} disabled={this.state.isFreeTrailDisabled}>
                    <option>Select</option>
                    <option>Days</option>
                    <option>Weeks</option>
                    <option>Monthly</option>
                  </Input>
                </Col>
              </Row>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col className="text-right mt-5">
            {this.state.showLoader &&
              <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" alt="" />
            }
            <Button color="primary" className="m-1 ml-0" onClick={(e) => { this.handleSubmit(e, 'saveAndContinue'); }}>SAVE AND CONTINUE</Button>
            <Button color="primary" className="m-1 ml-0" onClick={(e) => { this.handleSubmit(e, 'save'); }}>SAVE</Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default AddBusinessUnit;
