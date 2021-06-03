import React, { Component } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
} from "@material-ui/core";
import _debounce from "lodash.debounce";
import ConfirmRemovalModal from "./ConfirmRemovalModal";
import OfferDetailModal from "./OfferDetailModal";

const columns = [
  { id: "product", label: "Product" },
  { id: "price", label: "Price" },
  { id: "city", label: "City" },
  { id: "date", label: "Date" },
];

class OfferList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maxHeight: window.innerHeight / 1.5,
    };
  }

  setWindowHeight = () => {
    this.setState({
      maxHeight: window.innerHeight / 1.5,
    });
  };

  componentDidMount() {
    window.addEventListener(
      "resize",
      _debounce(() => {
        this.setWindowHeight();
      }, 250)
    );
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.setWindowHeight);
  }

  render() {
    const offerData = this.props.offerData;
    return (
      <Paper>
        <TableContainer style={{ maxHeight: this.state.maxHeight }}>
          <Table stickyHeader size="small" aria-label="sticky table">
            <TableHead>
              <TableRow key="header">
                <TableCell key="photo-head" align="center">
                  Photo
                </TableCell>
                {columns.map((column) => (
                  <TableCell key={columns.id} align="center">
                    {column.label}
                  </TableCell>
                ))}
                <TableCell key="buttons-head"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!offerData || offerData.length <= 0 ? (
                <TableRow key="mpty">
                  <TableCell key="no-data" align="center">
                    <b>Ops, no offer here yet.</b>
                  </TableCell>
                </TableRow>
              ) : (
                offerData.map((offer) => {
                  return (
                    <TableRow tabIndex={-1} key={offer.id}>
                      <TableCell key="photo" align="center">
                        <img
                          className="photo"
                          alt={offer.product + " photo"}
                          src={offer.image}
                        />
                      </TableCell>
                      {columns.map((column) => {
                        var value = "";
                        if (column.id === "price") {
                          value = "€ " + offer[column.id];
                        } else {
                          value = offer[column.id];
                        }
                        return (
                          <TableCell key={column.id} align="center">
                            {value}
                          </TableCell>
                        );
                      })}
                      <TableCell key="buttons" align="center">
                        <OfferDetailModal
                          offer={offer}
                          resetState={this.props.resetState}
                        />
                        &nbsp;&nbsp;
                        {this.props.tab === "myOffers" && (
                          <ConfirmRemovalModal
                            id={offer.id}
                            resetState={this.props.resetState}
                            loggedIn={this.props.loggedIn}
                            setLoggedOut={this.props.setLoggedOut}
                          />
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    );
  }
}

export default OfferList;
