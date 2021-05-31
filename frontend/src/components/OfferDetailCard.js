import React, { Component } from "react";
import { ListGroupItem, ListGroup, Input, Label, Row, Col } from "reactstrap";
import { Card, CardMedia, CardContent, Typography } from "@material-ui/core";
import _debounce from "lodash.debounce";

class OfferDetailCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maxHeight: window.innerHeight / 1.3,
    };
  }

  setWindowHeight = () => {
    this.setState({
      maxHeight: window.innerHeight / 1.3,
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
    window.removeEventListener("resize", this.setWindowHeight());
  }

  render() {
    return (
      <Card style={{ maxHeight: this.state.maxHeight, overflowY: "auto" }}>
        <CardMedia
          component="img"
          alt={this.props.offer.product + " photo"}
          height="150"
          width="100%"
          objectFit="cover"
          image={this.props.offer.image}
          title={this.props.offer.product + " photo"}
        />
        <CardContent>
          <Typography align="center" gutterBottom variant="h5" component="h2">
            <strong>{this.props.offer.product}</strong>
          </Typography>
          <ListGroup>
            <ListGroupItem>
              <Row>
                <Label for="shop" sm={6}>
                  Name of the <strong>shop</strong>:
                </Label>
                <Col sm={6}>
                  <Input
                    type="text"
                    className="detail-field"
                    name="shop"
                    value={this.props.offer.shop}
                    readOnly
                    disabled
                  />
                </Col>
              </Row>
            </ListGroupItem>
            <ListGroupItem>
              <Row>
                <Label for="city" sm={6}>
                  <strong>City</strong> of the shop:
                </Label>
                <Col sm={6}>
                  <Input
                    type="text"
                    className="detail-field"
                    name="city"
                    value={this.props.offer.city}
                    readOnly
                    disabled
                  />
                </Col>
              </Row>
            </ListGroupItem>
            <ListGroupItem>
              <Row>
                <Label for="region" sm={6}>
                  <strong>Region</strong>:
                </Label>
                <Col sm={6}>
                  <Input
                    type="text"
                    className="detail-field"
                    name="region"
                    value={this.props.offer.region}
                    readOnly
                    disabled
                  />
                </Col>
              </Row>
            </ListGroupItem>
            <ListGroupItem>
              <Row>
                <Label for="price" sm={6}>
                  <strong>Price</strong> (€):
                </Label>
                <Col sm={6}>
                  <Input
                    type="text"
                    className="detail-field"
                    name="price"
                    value={this.props.offer.price}
                    readOnly
                    disabled
                  />
                </Col>
              </Row>
            </ListGroupItem>
            <ListGroupItem>
              <Row>
                <Label for="date" sm={6}>
                  <strong>Date</strong> of the registration:
                </Label>
                <Col sm={6}>
                  <Input
                    type="text"
                    className="detail-field"
                    name="date"
                    value={this.props.offer.date}
                    readOnly
                    disabled
                  />
                </Col>
              </Row>
            </ListGroupItem>
            <ListGroupItem>
              <Row>
                <Label for="username" sm={6}>
                  Posted by:
                </Label>
                <Col sm={6}>
                  <em>{this.props.username}</em>
                </Col>
              </Row>
            </ListGroupItem>
          </ListGroup>
        </CardContent>
      </Card>
    );
  }
}

export default OfferDetailCard;
