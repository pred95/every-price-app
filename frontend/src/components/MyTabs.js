import React, { Component } from "react";
import { Tabs, Tab, AppBar} from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import OfferList from "./OfferList";

class MyTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  checkUser = (e, value) => {
    if (this.props.loggedIn) {
      this.handleChange(e, value);
    } else {
      if (this.state.value !== value && this.state.value === 1) {
        this.handleChange(e, value);
      } else if (this.state.value !== value) {
        this.props.openError();
      } else {
        this.props.closeError();
      }
    }
  };

  handleChange = (e, value) => {
    if (this.state.value !== value) {
      this.setState({ value });
    }
  };

  handleChangeIndex = (index) => {
    this.setState({ value: index });
  };

  render() {
    var myOffers = [];
    if (this.props.loggedIn) {
      myOffers = this.props.offerData.filter((offer) => {
        return offer.user === this.props.username;
      });
    }
    return (
      <div>
        <AppBar
          position="static"
          style={{ background: "#388ce9", color: "white" }}
        >
          <Tabs
            indicatorColor="primary"
            value={this.state.value}
            onChange={this.checkUser}
            centered
          >
            <Tab label="All offers" />
            <Tab label="My offers" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <OfferList
            className="all-offers"
            offerData={this.props.offerData}
            resetState={this.props.resetState}
            loggedIn={this.props.loggedIn}
            tab={"allOffers"}
          />
          <OfferList
            className="my-offers"
            offerData={myOffers}
            resetState={this.props.resetState}
            loggedIn={this.props.loggedIn}
            tab={"myOffers"}
            setLoggedOut={this.props.setLoggedOut}
          />
        </SwipeableViews>
      </div>
    );
  }
}

export default MyTabs;
