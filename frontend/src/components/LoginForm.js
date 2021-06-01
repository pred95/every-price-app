import React, { Component } from "react";
import { Form, Label, FormGroup } from "reactstrap";
import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { GoogleLogin } from "react-google-login";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      showPassword: false,
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

  failureResponse = (response) => {
    console.log(`response`, response);
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
            type={this.state.showPassword ? "text" : "password"}
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.showPassword}
                onChange={() => {
                  this.setState((prev) => ({
                    showPassword: !prev.showPassword,
                  }));
                }}
              />
            }
            label="Show password?"
          />
        </FormGroup>
        <Button type="submit" className="btn-block" variant="contained">
          Submit
        </Button>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          Forgot your password?
          <Button
            size="small"
            onClick={this.props.showResetPassword}
            style={{
              color: "#3ca5ea",
              borderBottomColor: "#3ca5ea",
              borderBottomWidth: 1,
            }}
          >
            Click here!
          </Button>
        </div>
        <p style={{ textAlign: "center" }}>or</p>
        <GoogleLogin
          className="btn-block"
          clientId="885483439166-5qaj888eml61rdmrcn6s8fgrdocdp0k0.apps.googleusercontent.com"
          buttonText="Continue with Google"
          onSuccess={this.props.handleSocialLogin}
          onFailure={this.failureResponse}
        />
      </Form>
    );
  }
}

export default LoginForm;
