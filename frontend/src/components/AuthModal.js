import React, { Component, Fragment } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import RequestResetPasswordForm from "./RequestResetPasswordForm";

class AuthModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showResetPassword: false,
    };
  }

  showResetPassword = (e) => {
    this.props.toggle();
    this.setState({ showResetPassword: true });
    this.props.toggle();
  };

  render() {
    return (
      <Fragment>
        <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
          <ModalHeader toggle={this.props.toggle}>
            {this.state.showResetPassword
              ? "Reset your password"
              : this.props.title}
          </ModalHeader>
          <ModalBody>
            {this.props.title === "Log in" ? (
              this.state.showResetPassword ? (
                <RequestResetPasswordForm
                  handler={this.props.handlerResetPassword}
                />
              ) : (
                <LoginForm
                  handler={this.props.handler}
                  showResetPassword={this.showResetPassword}
                  handleSocialLogin={this.props.handleSocialLogin}
                />
              )
            ) : (
              <SignUpForm handler={this.props.handler} />
            )}
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

export default AuthModal;
