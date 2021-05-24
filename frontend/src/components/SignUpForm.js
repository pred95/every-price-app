import React, { Component } from "react";
import { Form, Label, FormGroup } from "reactstrap";
import { TextField, Button } from "@material-ui/core";
import GoogleLogin from "react-google-login";

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      disabled: false,
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
      <Form
        onSubmit={(e) => {
          this.setState({ disabled: true });
          this.props.handler(e, this.state);
          this.setState({ disabled: false });
        }}
      >
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
          <Label for="first_name">First name</Label>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            type="text"
            name="first_name"
            value={this.state.first_name}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="last_name">Last name</Label>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            type="text"
            name="last_name"
            value={this.state.last_name}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="username">Username</Label>
          <TextField
            required
            fullWidth
            label="Required"
            variant="outlined"
            size="small"
            type="text"
            name="username"
            value={this.state.username}
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
        <Button
          variant="contained"
          type="submit"
          className="btn-block"
          disabled={this.state.disabled}
        >
          {this.state.disabled ? "Sending..." : "Submit"}
        </Button>
        <p style={{ alignText: "center" }}>or</p>
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

export default SignUpForm;
