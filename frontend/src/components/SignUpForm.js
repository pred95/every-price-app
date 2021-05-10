import React, { Component } from "react";
import { Form, Label, FormGroup, Button } from "reactstrap";
import { TextField } from "@material-ui/core";

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      first_name: "",
      last_name: "",
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
        <Button className="btn-block">Submit</Button>
      </Form>
    );
  }
}

export default SignUpForm;
