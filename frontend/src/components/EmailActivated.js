import React, { Component } from "react";
import { withRouter } from "react-router";
import { Button } from "@material-ui/core";

class EmailActivated extends Component {
  render() {
    return (
      <div className="email-activated">
        <div className="header">
          <img
            className="logo"
            src={process.env.PUBLIC_URL + "/images/logo.png"}
            alt="logo.png"
          />
          <h1>EveryPrice</h1>
        </div>
        <p>Your account has been successfully activated!</p>
        <Button
          variant="contained"
          onClick={() => this.props.history.push("/")}
        >
          Go to home!
        </Button>
      </div>
    );
  }
}

export default withRouter(EmailActivated);
