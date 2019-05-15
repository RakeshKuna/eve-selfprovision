import React from 'react';
import { shallow } from 'enzyme';
import { AddBusinessUnit } from '../AddBusinessUnit';

describe('AddBusinessUnit', () => {
  it('<Form> element should render', () => {
    const wrapper = shallow(<AddBusinessUnit />);
    expect(wrapper).toMatchSnapshot();
  });
  it('<Form> element should click handleSubmit', () => {
    const wrapper = shallow(<AddBusinessUnit />);
    const event = {
      preventDefault: jest.fn(),
    };
    const states = {
      channelPartnerName: 'channelPartnerName',
      channelPartnerId: 'channelPartnerId',
      channelPartnerType: 'channelPartnerType',
      chargedCurrency: 'chargedCurrency',
      country: 'country',
      state: 'state',
      city: 'city',
      county: 'county',
      taxType: 'taxType',
      themeColor: 'themeColor',
      timeZone: 'timeZone',
      imageDir: 'imageDir',
    };
    wrapper.setState(states);
    wrapper.find('Button').at(0).simulate('click', event);
  });
  it('<Form> element should click handleSubmit', () => {
    const wrapper = shallow(<AddBusinessUnit />);
    const event = {
      preventDefault: jest.fn(),
    };
    const states = {
      channelPartnerName: 'channelPartnerName',
      channelPartnerId: 'channelPartnerId',
      channelPartnerType: 'channelPartnerType',
      chargedCurrency: 'chargedCurrency',
      country: 'country',
      state: 'state',
      city: 'city',
      county: 'county',
      taxType: 'taxType',
      themeColor: 'themeColor',
      timeZone: 'timeZone',
      imageDir: 'imageDir',
    };
    wrapper.setState(states);
    wrapper.find('Button').at(1).simulate('click', event);
  });
});
