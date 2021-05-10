import React, { Component } from "react";
import { Form, Label, Button, FormGroup } from "reactstrap";
import { TextField } from "@material-ui/core";
import { GoogleLogin } from "react-google-login";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState((prevstate) => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  render() {
    return (
      <Form onSubmit={(e) => this.props.handler(e, this.state)}>
        <FormGroup>
          <Label for="email">Email</Label>
          <TextField
            required
            fullWidth
            label="Required"
            variant="outlined"
            size="small"
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <TextField
            required
            fullWidth
            label="Required"
            variant="outlined"
            size="small"
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </FormGroup>
        <Button className="btn-block">Submit</Button>
        <p>
          Forgot your password?
          <Button color="link" size="sm" onClick={this.props.showResetPassword}>
            Click here!
          </Button>
        </p>
        <p>or</p>
        <GoogleLogin
          className="btn-block"
          clientId="885483439166-5qaj888eml61rdmrcn6s8fgrdocdp0k0.apps.googleusercontent.com"
          buttonText="Continue with Google"
          onSuccess={this.props.handleSocialLogin}
        />
      </Form>
    );
  }
}

export default LoginForm;
