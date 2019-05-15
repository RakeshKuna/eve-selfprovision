import React from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, NavLink } from 'reactstrap';
import { userActions } from 'actions';
import { connect } from 'react-redux';
import Evergent from '../../images/Evergent-logo.png';
import './style.scss';

export class LoginClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiUser: '',
      apiPassword: '',
      submitted: false
    };
    this.props.dispatch(userActions.logout());
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
    handleChange=(e) => {
      e.preventDefault();
      const { name, value } = e.target;
      this.setState({ [name]: value });
    }
    handleSubmit=(e) => {
      e.preventDefault();
      this.setState({ submitted: true });
      const { apiUser, apiPassword } = this.state;
      const { dispatch } = this.props;
      if (apiUser && apiPassword) {
        dispatch(userActions.login(apiUser, apiPassword));
      }
    }
    render() {
      const { loggingIn } = this.props;
      const { apiUser, apiPassword, submitted } = this.state;
      return (
        <Container>
          <Row>
            <Col sm="12" md={{ size: 8, offset: 2 }} lg={{ size: 6, offset: 3 }}>
              <div className="login">
                <div className="brand_logo">
                  <NavLink><img src={Evergent} className="" width="250px" alt="" /></NavLink>
                </div>
                <div className="login_container">
                  <h1 className="text-center mb-3 text-secondary-color">Login</h1>
                  <hr className="mb-4" />
                  <Form className="loginform" name="form" onSubmit={this.handleSubmit}>
                    <FormGroup className={(submitted && !apiUser ? ' has-error' : '')}>
                      <Label for="username">User Name</Label>
                      <Input type="text" name="apiUser" id="name" value={apiUser} onChange={this.handleChange} autoComplete="off" />
                      {submitted && !apiUser &&
                      <div className="error-block">User Name is required</div>
                      }
                    </FormGroup>
                    <FormGroup className={(submitted && !apiPassword ? ' has-error' : '')}>
                      <Label for="password">Password</Label>
                      <Input type="password" name="apiPassword" id="password" value={apiPassword} onChange={this.handleChange} autoComplete="off" />
                      {submitted && !apiPassword &&
                      <div className="error-block">Password is required</div>
                      }
                    </FormGroup>
                    <Button color="primary">Login</Button>
                    {loggingIn &&
                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" alt="loading" />
                    }
                  </Form>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      );
    }
}

function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  return {
    loggingIn
  };
}

const connectedLoginPage = connect(mapStateToProps)(LoginClass);
export { connectedLoginPage as Login };
