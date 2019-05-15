import React from 'react';
import { shallow } from 'enzyme';
import { Products } from '../Products';

describe('Products', () => {
  it('<Row> element should render', () => {
    const wrapper = shallow(<Products />);
    expect(wrapper).toMatchSnapshot();
  });
  it('<Row> on Button redirect', () => {
    const wrapper = shallow(<Products />);
    wrapper.find('Button').at(0).props('to');
  });
});
