import React, { Component } from "react";
import { withRouter } from "react-router";
import { Button } from "@material-ui/core";

class EmailActivated extends Component {
  render() {
    return (
      <div className="email-activated">
        <p>Your account has been successfully activated!</p>
        <Button
          variant="contained"
          color="primary"
          onClick={() => this.props.history.push("/")}
        >
          Go to home!
        </Button>
      </div>
    );
  }
}

export default withRouter(EmailActivated);
