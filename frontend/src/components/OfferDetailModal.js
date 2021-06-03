import React, { Component, Fragment } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import OfferDetailCard from "./OfferDetailCard";
import {Button} from '@material-ui/core'

class OfferDetailModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }

  toggle = () => {
    this.setState((previous) => ({
      modal: !previous.modal,
    }));
  };

  render() {
    var title = "Details";
    return (
      <Fragment>
        <Button variant="contained" color="primary" onClick={() => this.toggle()}>Details</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
          <ModalBody>
            <OfferDetailCard
              offer={this.props.offer}
            />
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

export default OfferDetailModal;
