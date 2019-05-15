import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { LoginClass as Login } from '../Login';


const initialState = {};
// here it is possible to pass in any middleware if needed into //configureStore
const mockStore = configureStore();
const store = mockStore(initialState);
const props = {
  dispatch: jest.fn(),
};
const wrapper = shallow(<Login store={store} {...props} />);
describe('Login Component', () => {
  it('<Form> element should render', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('<Form> element should click handleSubmit', () => {
    const event = {
      preventDefault: jest.fn(),
    };
    const states = {
      apiUser: 'ccb3dev',
      apiPassword: 'password1'
    };
    wrapper.setState(states);
    wrapper.find('Form').simulate('handleSubmit', event);
  });
  it('should respond to change event and change the state of the Login Component', () => {
    const event = {
      preventDefault: jest.fn(),
    };
    wrapper.find('#name').simulate('handleChange', { target: { name: 'apiUser', value: 'ccb3dev' } }, event);
    expect(wrapper.state('apiUser')).toEqual('ccb3dev');
  });
  it('should respond to change event and change the state of the Login Component', () => {
    wrapper.find('#password').simulate('handleChange', { target: { name: 'apiPassword', value: 'password1' } });
    expect(wrapper.state('apiPassword')).toEqual('password1');
  });
});

