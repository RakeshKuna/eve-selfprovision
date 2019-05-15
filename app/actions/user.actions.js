import { appConstants } from '../constants';
import userService from '../services';
import { alertActions } from '../actions';
import { history } from '../helpers';

const login = (apiUser, apiPassword) => {
  function request(user) { return { type: appConstants.LOGIN_REQUEST, user }; }

  function success(user) { return { type: appConstants.LOGIN_SUCCESS, user }; }

  function failure(error) { return { type: appConstants.LOGIN_FAILURE, error }; }
  return (dispatch) => {
    dispatch(request({ apiUser }));

    userService.login(apiUser, apiPassword)
      .then(
        (user) => {
          dispatch(success(user));
          history.push('/home');
        },
        (error) => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
  };
};

const logout = () => {
  userService.logout();
  return { type: appConstants.LOGOUT };
};
const userActions = {
  login,
  logout
};


export default userActions;
