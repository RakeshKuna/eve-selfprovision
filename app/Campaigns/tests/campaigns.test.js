import React from 'react';
import { shallow } from 'enzyme';
import { Campaigns } from '../Campaigns';

describe('Campaigns', () => {
  it('<Row> element should render', () => {
    const wrapper = shallow(<Campaigns />);
    expect(wrapper).toMatchSnapshot();
  });
  it('<Row> on Button redirect', () => {
    const wrapper = shallow(<Campaigns />);
    wrapper.find('Button').at(0).props('to');
  });
});
