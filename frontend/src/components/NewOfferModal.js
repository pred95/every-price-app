import React, { Component, Fragment } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { Button, Snackbar } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import NewOfferForm from "./NewOfferForm";

class NewOfferModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      showError: false,
    };
  }

  checkUser = () => {
    this.props.loggedIn ? this.toggle() : this.setState({ showError: true });
  };

  toggle = () => {
    this.setState((previous) => ({
      modal: !previous.modal,
    }));
  };

  render() {
    var title = "Creating a new offer";
    const button = (
      <Button
        className="float-right"
        variant="contained"
        color="primary"
        onClick={this.checkUser}
      >
        Create a new offer
      </Button>
    );

    return (
      <Fragment>
        {button}
        {this.state.showError ? (
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={this.state.showError}
            autoHideDuration={4000}
            onClose={() => {
              this.setState({ showError: false });
            }}
          >
            <Alert
              severity="error"
              onClose={() => {
                this.setState({ showError: false });
              }}
            >
              <AlertTitle>Error</AlertTitle>
              You have to log in to create a new offer.
            </Alert>
          </Snackbar>
        ) : (
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
            <ModalBody>
              <NewOfferForm
                resetState={this.props.resetState}
                toggle={this.toggle}
                offer={this.props.offer}
                username={this.props.username}
                setLoggedOut={this.props.setLoggedOut}
              />
            </ModalBody>
          </Modal>
        )}
      </Fragment>
    );
  }
}

export default NewOfferModal;
