import React, { Component } from "react";
import { AppBar, Toolbar, Button, Typography } from "@material-ui/core";

class Nav extends Component {
  loggedOutNav = () => {
    return (
      <Toolbar>
        <Typography>Please log in</Typography>
        <span className="auth-buttons">
          <Button
            variant="contained"
            onClick={() => this.props.displayModal("login")}
          >
            Login
          </Button>
          &nbsp;&nbsp;
          <Button
            variant="contained"
            onClick={() => this.props.displayModal("signup")}
          >
            Register
          </Button>
        </span>
      </Toolbar>
    );
  };

  loggedInNav = () => {
    return (
      <Toolbar>
        <Typography>
          Welcome, <em>{this.props.username}</em>
        </Typography>
        <span className="auth-buttons">
          <Button
            variant="contained"
            onClick={() => this.props.handleLogout()}
          >
            Logout
          </Button>
        </span>
      </Toolbar>
    );
  };

  render() {
    return (
      <AppBar position="static" style={{ background: "white", color: "black" }}>
        {this.props.loggedIn ? this.loggedInNav() : this.loggedOutNav()}
      </AppBar>
    );
  }
}

export default Nav;
