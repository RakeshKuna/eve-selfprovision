import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Layout from 'components/Layout';
// import Dashboard from 'containers/Dashboard';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      localStorage.getItem('user') ?
        <Layout {...props} >
          <Component {...props} />
        </Layout>
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )}
  />
);

export default PrivateRoute;

