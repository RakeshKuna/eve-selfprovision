import React from 'react';
import { mount } from 'enzyme';

import Footer from '../index';

describe('<Footer />', () => {
  it('should render the credits', () => {
    const wrapper = mount(<Footer />);
    expect(wrapper.text()).toEqual('Made by Wavelabs');
  });
});
