import React, { Component } from "react";
import { withRouter } from "react-router";
import { Form, Label, Button, FormGroup } from "reactstrap";
import { TextField } from "@material-ui/core";
import axiosInstance from "../axios/axiosInstance";

class ResetPasswordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  handleResetPassword = (e, data) => {
    e.preventDefault();
    const params = window.location.href.split("/")[4].split("&?");
    const uidb64 = params[2].split("=")[1];
    const token = params[3].split("=")[1];
    axiosInstance
      .patch(`auth/password-reset-complete/`, {
        password: data.password,
        uidb64: uidb64,
        token: token,
      })
      .then(() => {
        this.props.history.push("/");
      })
      .catch((err) => {
        alert(err.response.data.password[0]);
      });
  };

  render() {
    return (
      <div className="col-md-12 center">
        <Form
          className="new-password-form"
          onSubmit={(e) => this.handleResetPassword(e, this.state)}
        >
          <FormGroup>
            <Label for="password" style={{ color: "black" }}>
              New password
            </Label>
            <TextField
              required
              fullWidth
              label="Required"
              variant="outlined"
              size="small"
              type="password"
              name="password"
              style={{ background: "white" }}
              value={this.state.password}
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button className="new-password-button">Submit</Button>
        </Form>
      </div>
    );
  }
}

export default withRouter(ResetPasswordForm);
