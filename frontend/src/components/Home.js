import React, { Component } from "react";
import { Container, Spinner } from "reactstrap";
import axiosInstance from "../axios/axiosInstance";
import MyTabs from "./MyTabs";
import NewOfferModal from "./NewOfferModal";
import Filter from "./Filter";
import DownloadButton from "./DownloadButton";
import { Snackbar } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";

class Home extends Component {
  constructor(props) {
    const today = new Date();
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      offerData: [],
      myOfferData: [],
      filterProduct: "",
      filterCity: "",
      filterRegion: "",
      filterDateBefore:
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate(),
      filterDateAfter: "1900-1-1",
      showFilter: false,
      showError: false,
    };
  }
  buttonText = "Filter offers?";

  openError = () => {
    this.setState({
      showError: true,
    });
  };

  closeError = () => {
    this.setState({
      showError: false,
    });
  };

  resetState = () => {
    const today = new Date();
    this.setState({
      error: null,
      isLoaded: false,
      offerData: [],
      myOfferData: [],
      filterProduct: "",
      filterCity: "",
      filterRegion: "",
      filterDateBefore:
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate(),
      filterDateAfter: "1900-1-1",
      showFilter: false,
      showError: false,
    });
    this.getOffers();
  };

  getOffers = () => {
    axiosInstance
      .get(`offers/`)
      .then((res) => {
        this.setState({
          isLoaded: true,
          offerData: res.data.data,
        });
      })
      .catch(() => {
        axiosInstance
          .post(`auth/token/refresh/`, {
            refresh: localStorage.getItem("refresh_token"),
          })
          .then((res) => {
            localStorage.removeItem("access_token");
            localStorage.setItem("access_token", res.data.access);
            axiosInstance
              .get(`offers/`)
              .then((res) => {
                this.setState({
                  isLoaded: true,
                  offerData: res.data.data,
                });
              })
              .catch((error) => {
                this.setState({
                  isLoaded: true,
                  error,
                });
              });
          })
          .catch(() => {
            alert("Something went wrong. Please log in again");
            this.props.setLoggedOut();
          });
      });
  };

  componentDidMount() {
    this.resetState();
  }

  onFilterChange = (e) => {
    const today = new Date();
    if (e.target.name === "filterDateBefore" && e.target.value === "") {
      this.setState({
        filterDateBefore:
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate(),
      });
    } else if (e.target.name === "filterDateAfter" && e.target.value === "") {
      this.setState({
        filterDateAfter: "1900-1-1",
      });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
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
    const today = new Date();
    this.setState({
      filterProduct: "",
      filterCity: "",
      filterRegion: "",
      filterDateBefore:
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate(),
      filterDateAfter: "1900-1-1",
    });
  };

  render() {
    if (this.state.filterDateAfter === "") {
      this.setState({
        filterDateAfter: "1900-1-1",
      });
    }
    const filteredData = this.state.offerData.filter((offer) => {
      return (
        offer.product
          .toLowerCase()
          .startsWith(this.state.filterProduct.toLowerCase()) === true &&
        offer.city
          .toLowerCase()
          .startsWith(this.state.filterCity.toLowerCase()) === true &&
        offer.region.startsWith(this.state.filterRegion) === true &&
        offer.date >= this.state.filterDateAfter &&
        offer.date <= this.state.filterDateBefore
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
            {this.state.showError && (
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
                  You have to log in to see your offers.
                </Alert>
              </Snackbar>
            )}
            <MyTabs
              resetState={this.resetState}
              loggedIn={this.props.loggedIn}
              username={this.props.username}
              offerData={filteredData}
              setLoggedOut={this.props.setLoggedOut}
              openError={this.openError}
              closeError={this.closeError}
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
                username={this.props.username}
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
