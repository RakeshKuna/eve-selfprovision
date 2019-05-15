import React from 'react';
import { shallow } from 'enzyme';
import { BusinessUnitList } from '../BusinessUnitList';

describe('BusinessUnitList', () => {
  it('<Row> element should render', () => {
    const wrapper = shallow(<BusinessUnitList />);
    expect(wrapper).toMatchSnapshot();
  });
  it('<Row> on Button redirect', () => {
    const wrapper = shallow(<BusinessUnitList />);
    wrapper.find('Button').at(0).props('to');
  });
});
