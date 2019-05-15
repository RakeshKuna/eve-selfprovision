import React from 'react';
import { shallow } from 'enzyme';
import { AddCampaigns } from '../AddCampaigns';

describe('AddCampaigns', () => {
  it('<Form> element should render', () => {
    const props = {
      match: { params: { id: 'id' } }
    };
    const wrapper = shallow(<AddCampaigns {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('<Form> element should render with location', () => {
    const props = {
      match: { params: { id: 'id' } },
      location: { pathname: 'updateCampaign' }
    };
    const wrapper = shallow(<AddCampaigns {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('<Form> element should click AddPromotionSubmit', () => {
    const props = {
      match: { params: { id: 'id' } },
      location: { pathname: 'updateCampaign' }
    };
    const wrapper = shallow(<AddCampaigns {...props} />);
    const event = {
      preventDefault: jest.fn(),
    };
    const states = {
      promotionName: 'promotionName',
      promotionID: 'promotionID',
      promotionType: 'promotionType',
      productItems: 'productItems',
      period: 'period',
      duration: 'duration',
      productAreaCode: 'productAreaCode',
      effStartDate: new Date(),
    };
    wrapper.setState(states);
    wrapper.find('Button').first().simulate('click', event);
  });
});
