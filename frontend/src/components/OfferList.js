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
import { withStyles } from "@material-ui/styles";
import _debounce from "lodash.debounce";
import ConfirmRemovalModal from "./ConfirmRemovalModal";
import OfferDetailModal from "./OfferDetailModal";

const columns = [
  { id: "product", label: "Product" },
  { id: "price", label: "Price" },
  { id: "city", label: "City" },
  { id: "date", label: "Date" },
];

const styles = (theme) => ({
  paper: {
    width: "100%",
  },
  container: {
    marginTop: "5px",
    marginBottom: "10px",
  },
  cell: {
    fontSize: "120%",
  },
});

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
    const { classes } = this.props;
    const offerData = this.props.offerData;
    return (
      <Paper className={classes.paper}>
        <TableContainer
          className={classes.container}
          style={{ maxHeight: this.state.maxHeight }}
        >
          <Table stickyHeader size="small" aria-label="sticky table">
            <TableHead>
              <TableRow key="header">
                <TableCell
                  className={classes.cell}
                  key="photo-head"
                  align="center"
                >
                  Photo
                </TableCell>
                {columns.map((column) => (
                  <TableCell
                    className={classes.cell}
                    key={columns.id}
                    align="center"
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell key="buttons-head"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!offerData || offerData.length <= 0 ? (
                <TableRow key="empty">
                  <TableCell
                    className={classes.cell}
                    key="no-data"
                    align="center"
                  >
                    <b>Ops, no offer here yet.</b>
                  </TableCell>
                </TableRow>
              ) : (
                offerData.map((offer) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={offer.id}
                    >
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
                          <TableCell
                            className={classes.cell}
                            key={column.id}
                            align="center"
                          >
                            {value}
                          </TableCell>
                        );
                      })}
                      <TableCell key="buttons" align="center">
                        <OfferDetailModal
                          offer={offer}
                          resetState={this.props.resetState}
                          username={this.props.username}
                        />
                        &nbsp;&nbsp;
                        {this.props.tab === "myOffers" && (
                          <ConfirmRemovalModal
                            id={offer.id}
                            resetState={this.props.resetState}
                            loggedIn={this.props.loggedIn}
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

export default withStyles(styles)(OfferList);
