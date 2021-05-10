import React, { Component, Fragment } from "react";
import { Modal, ModalHeader, Button, ModalFooter } from "reactstrap";
import { Snackbar } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import axiosInstance from "../axios/axiosInstance";

class ConfirmRemovalModal extends Component {
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

  deleteOffer = (id) => {
    axiosInstance.delete(`offers/delete/` + id).then(() => {
      this.props.resetState();
      this.toggle();
    });
  };

  render() {
    return (
      <Fragment>
        <Button color="danger" onClick={() => this.checkUser()}>
          Remove
        </Button>
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
              You have to log in to delete an offer.
            </Alert>
          </Snackbar>
        ) : (
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>
              Do you really want to remove this offer?
            </ModalHeader>
            <ModalFooter>
              <Button type="button" onClick={() => this.toggle()}>
                Cancel
              </Button>
              <Button
                type="button"
                color="primary"
                onClick={() => this.deleteOffer(this.props.id)}
              >
                Yes
              </Button>
            </ModalFooter>
          </Modal>
        )}
      </Fragment>
    );
  }
}

export default ConfirmRemovalModal;
