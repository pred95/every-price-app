import React, { Component } from "react";
import { Container, Spinner } from "reactstrap";
import axiosInstance from "../axios/axiosInstance";
import MyTabs from "./MyTabs";
import NewOfferModal from "./NewOfferModal";
import Filter from "./Filter";
import DownloadButton from "./DownloadButton";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      offerData: [],
      myOfferData: [],
      filterProduct: "",
      filterCity: "",
      filterRegion: "",
      showFilter: false,
    };
  }
  buttonText = "Filter offers?";

  resetState = () => {
    this.setState({
      error: null,
      isLoaded: false,
      offerData: [],
      myOfferData: [],
      filterProduct: "",
      filterCity: "",
      filterRegion: "",
      showFilter: false,
    });
    this.getOffers();
  };

  getOffers = () => {
    axiosInstance.get(`offers/`).then(
      (res) => {
        this.setState({
          isLoaded: true,
          offerData: res.data.data,
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error,
        });
      }
    );
  };

  componentDidMount() {
    this.resetState();
  }

  onFilterChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  toggle = () => {
    this.setState({
      showFilter: !this.state.showFilter,
    });
    if (this.state.showFilter) {
      this.resetFilter();
      this.buttonText = "Filter offers?";
    } else {
      this.buttonText = "Show all?";
    }
  };

  resetFilter = () => {
    this.setState({
      filterProduct: "",
      filterCity: "",
      filterRegion: "",
    });
  };

  render() {
    const filteredData = this.state.offerData.filter((offer) => {
      return (
        offer.product
          .toLowerCase()
          .startsWith(this.state.filterProduct.toLowerCase()) === true &&
        offer.city
          .toLowerCase()
          .startsWith(this.state.filterCity.toLowerCase()) === true &&
        offer.region.startsWith(this.state.filterRegion) === true
      );
    });
    if (this.state.error) {
      return <div>Error: {this.state.error.message}</div>;
    } else if (!this.state.isLoaded) {
      return (
        <Container className="loading">
          Loading...
          <Spinner color="primary" />
        </Container>
      );
    } else {
      return (
        <div className="home-container">
          <div className="offer-container">
            <MyTabs
              resetState={this.resetState}
              loggedIn={this.props.loggedIn}
              user_id={this.props.user_id}
              username={this.props.username}
              offerData={filteredData}
            />
            <Filter
              text={this.buttonText}
              handler={{
                filterChange: this.onFilterChange,
                toggle: this.toggle,
              }}
              showFilter={this.state.showFilter}
            />
            <div className="new-offer-download-container">
              <DownloadButton offerData={filteredData} />
              <NewOfferModal
                resetState={this.resetState}
                user_id={this.props.user_id}
                loggedIn={this.props.loggedIn}
                setLoggedOut={this.props.setLoggedOut}
              />
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Home;
