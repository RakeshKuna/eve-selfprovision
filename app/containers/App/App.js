/**
*
* App
*
* This component is the skeleton around the actual pages, and should only
* contain code that should be seen on all pages. (e.g. navigation bar)
*/

import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from 'helpers';
import { alertActions } from 'actions';
import { Button } from 'reactstrap';
import routes from '../../routes/routes';
import './style.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    history.listen(() => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  handleClearAlert = () => {
    const { dispatch } = this.props;
    dispatch(alertActions.clear());
  }

  render() {
    const { alert } = this.props;
    return (
      <div className="wrap d-flex h-100">
        {alert.message &&
          <div className={`alert alert_custom ${alert.type}`}>
            {alert.message}
            <Button onClick={this.handleClearAlert} close className="small" />
          </div>
        }
        <Router history={history}>
          <Route>{routes}</Route>
        </Router>
      </div>

    );
  }
}
function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}
export default connect(mapStateToProps)(App);
