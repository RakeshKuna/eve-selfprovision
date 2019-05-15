import React from 'react';
import { shallow } from 'enzyme';
import { AddProducts } from '../AddProducts';

describe('AddProducts', () => {
  it('<Form> element should render', () => {
    const props = {
      match: { params: { id: 'id' } },
    };
    const wrapper = shallow(<AddProducts {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('<Form> element should render with location', () => {
    const props = {
      match: { params: { id: 'id' } },
      location: { pathname: 'updateProduct' },
    };
    const wrapper = shallow(<AddProducts {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('<Form> element should click AddProductSubmit', () => {
    const props = {
      match: { params: { id: 'id' } },
      location: { pathname: 'updateProduct' },
    };
    const wrapper = shallow(<AddProducts {...props} />);
    const event = {
      preventDefault: jest.fn(),
    };
    const states = {
      servicetype: 'servicetype',
      prodCategory: 'prodCategory',
      productName: 'productName',
      sku: 'sku',
      prodAreaCode: 'prodAreaCode',
      frequency: 'frequency',
      period: 'period',
      duration: 'duration',
      productPrice: 'productPrice',
      effStartDate: new Date(),
      isRenewable: 'isRenewable',
      recurringInd: 'recurringInd'
    };
    wrapper.setState(states);
    wrapper.find('Button').first().simulate('click', event);
  });
});
