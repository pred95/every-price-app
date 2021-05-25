import React, { Component } from "react";
import { Form, Label, FormGroup } from "reactstrap";
import { TextField, Button } from "@material-ui/core";

class RequestResetPasswordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
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
        <Button className="btn-block" type="submit" variant="contained">Submit</Button>
      </Form>
    );
  }
}

export default RequestResetPasswordForm;
