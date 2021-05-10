import React, { Component, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import axiosInstance from "../axios/axiosInstance";
import OfferDetailCard from "./OfferDetailCard";

class OfferDetailModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      username: "",
    };
  }

  get_username = () => {
    axiosInstance.get(`/auth/get-user/` + this.props.offer.user).then((res) => {
      this.setState({
        username: res.data.username,
      });
    });
  };

  toggle = () => {
    this.setState((previous) => ({
      modal: !previous.modal,
    }));
    this.get_username();
  };

  render() {
    var title = "Details";
    return (
      <Fragment>
        <Button onClick={() => this.toggle()}>Details</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
          <ModalBody>
            <OfferDetailCard
              offer={this.props.offer}
              username={this.state.username}
            />
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

export default OfferDetailModal;
