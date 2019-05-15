import React from 'react';
import { userActions } from 'actions';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import './style.scss';

const FontAwesome = require('react-fontawesome');

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.handelClick = this.handelClick.bind(this);
  }
    handelClick =() => {
      this.props.dispatch(userActions.logout());
    }
    render() {
      return (
        <div className="logout">
          <Button className="logout_btn" color="link" onClick={this.handelClick}>
            Logout
            <FontAwesome name="power-off" />
          </Button>
        </div>
      );
    }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapDispatchToProps)(Logout);

