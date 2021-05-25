import React, { Component, Fragment } from "react";
import { Snackbar } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axiosInstance from "./axios/axiosInstance";
import Nav from "./components/Nav";
import AuthModal from "./components/AuthModal";
import Home from "./components/Home";
import ResetPasswordForm from "./components/ResetPasswordForm";
import EmailActivated from "./components/EmailActivated";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayedModal: "",
      showModal: false,
      loggedIn: localStorage.getItem("access_token") ? true : false,
      user_id: 0,
      username: "",
      showBar: false,
      message: "",
    };
  }

  componentDidMount() {
    console.log(`loggedIn`, this.state.loggedIn)
    if (this.state.loggedIn) {
      axiosInstance
        .get(`auth/current-user/`)
        .then((res) => {
          this.setState({
            user_id: res.data.id,
            username: res.data.username,
          });
        })
        .catch((err) => {
          axiosInstance
            .post(`auth/token/refresh/`, {
              refresh: localStorage.getItem("refresh_token"),
            })
            .then((res) => {
              localStorage.removeItem("access_token");
              localStorage.setItem("access_token", res.data.access);
              axiosInstance.get(`auth/current-user/`).then((res) => {
                this.setState({
                  user_id: res.data.id,
                  username: res.data.username,
                });
              });
            })
            .catch(() => {
              localStorage.removeItem("access_token");
              localStorage.removeItem("refresh_token");
              this.setState({
                loggedIn: false,
                username: "",
              });
            });
        });
    } else {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    }
  }

  handleLogin = (e, data) => {
    e.preventDefault();
    axiosInstance
      .post(`auth/login/`, {
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        localStorage.setItem("access_token", res.data.tokens.access);
        localStorage.setItem("refresh_token", res.data.tokens.refresh);
        this.setState({
          loggedIn: true,
          displayedModal: "",
          username: res.data.username,
          user_id: res.data.id,
        });
        this.toggle();
      })
      .catch((err) => {
        alert(err.response.data.detail);
      });
  };

  handleSignup = (e, data) => {
    e.preventDefault();
    axiosInstance
      .post(`auth/register/`, {
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        username: data.username,
        password: data.password,
      })
      .then(() => {
        this.toggle();
        this.setState({
          showBar: true,
          message:
            "We have sent a link to your email. Click it to activate your account!",
        });
      })
      .catch((error) => {
        if (error.response.data.password !== undefined) {
          alert(
            "Password error: " + error.response.data.password[0].toLowerCase()
          );
        }
        if (error.response.data.error !== undefined) {
          alert(error.response.data.error[0]);
        }
      });
  };

  handleLogout = () => {
    if (this.state.loggedIn) {
      axiosInstance
        .post(`auth/logout/`, {
          refresh: localStorage.getItem("refresh_token"),
        })
        .then(() => {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          this.setState({
            loggedIn: false,
            username: "",
          });
        })
        .catch((err) => {
          axiosInstance
            .post(`auth/token/refresh/`, {
              refresh: localStorage.getItem("refresh_token"),
            })
            .then((res) => {
              localStorage.setItem("access_token", res.data.access);
              axiosInstance
                .post(`auth/logout/`, {
                  refresh: localStorage.getItem("refresh_token"),
                })
                .then(() => {
                  localStorage.removeItem("access_token");
                  localStorage.removeItem("refresh_token");
                  this.setState({
                    loggedIn: false,
                    username: "",
                  });
                });
            })
            .catch(() => {
              localStorage.removeItem("access_token");
              localStorage.removeItem("refresh_token");
              this.setState({
                loggedIn: false,
                username: "",
              });
            });
        });
    }
  };

  handleRequestPasswordReset = (e, data) => {
    e.preventDefault();
    axiosInstance
      .post(`auth/request-reset-email/`, {
        email: data.email,
      })
      .then(() => {
        this.toggle();
        this.setState({
          showBar: true,
          message:
            "We have sent a link to your email. Click it to reset your password.",
        });
      })
      .catch((err) => {
        alert(err.response.data.error);
      });
  };

  handleSocialLogin = (data) => {
    axiosInstance
      .post(`social_auth/google/`, {
        auth_token: data.tokenId,
      })
      .then((res) => {
        console.log(`res`, res)
        localStorage.setItem("access_token", res.data.tokens.access);
        localStorage.setItem("refresh_token", res.data.tokens.refresh);
        this.setState({
          loggedIn: true,
          displayedModal: "",
          username: res.data.username,
          user_id: res.data.id,
        });
        this.toggle();
      })
      .catch((err) => {
        alert(err.response.data.detail);
      });
  };

  displayModal = (modal) => {
    this.setState({
      displayedModal: modal,
    });
    this.toggle();
  };

  toggle = () => {
    this.setState((previous) => ({
      showModal: !previous.showModal,
    }));
  };

  render() {
    let modal;
    switch (this.state.displayedModal) {
      case "login":
        modal = (
          <AuthModal
            handler={this.handleLogin}
            handlerResetPassword={this.handleRequestPasswordReset}
            handleSocialLogin={this.handleSocialLogin}
            toggle={this.toggle}
            modal={this.state.showModal}
            title="Log in"
          />
        );
        break;
      case "signup":
        modal = (
          <AuthModal
            handler={this.handleSignup}
            toggle={this.toggle}
            modal={this.state.showModal}
            handleSocialLogin={this.handleSocialLogin}
            title="Sign up"
          />
        );
        break;
      default:
        modal = null;
    }
    return (
      <Fragment>
        {this.state.showBar ? (
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={this.state.showBar}
            autoHideDuration={4000}
            onClose={() => {
              this.setState({ showBar: false });
            }}
          >
            <Alert
              severity="success"
              onClose={() => {
                this.setState({ showBar: false });
              }}
            >
              <AlertTitle>Success</AlertTitle>
              {this.state.message}
            </Alert>
          </Snackbar>
        ) : null}
        <Router>
          <div>
            <Route exact path="/">
              <Nav
                loggedIn={this.state.loggedIn}
                displayModal={this.displayModal}
                handleLogout={this.handleLogout}
                username={this.state.username}
              />
              {modal}
              <div className="header">
                <img
                  className="logo"
                  src={process.env.PUBLIC_URL + "/static/logo.png"}
                  alt="logo.png"
                />
                <h1>Welcome to EveryPrice</h1>
              </div>

              <Home
                user_id={this.state.user_id}
                username={this.state.username}
                loggedIn={this.state.loggedIn}
              />
            </Route>
            <Route path="/reset-password">
              <ResetPasswordForm />
            </Route>
            <Route path="/email-activated">
              <EmailActivated />
            </Route>
          </div>
        </Router>
      </Fragment>
    );
  }
}

export default App;
