import React, { Component } from "react";
import { ListGroupItem, ListGroup, Input, Label, Row, Col } from "reactstrap";
import { Card, CardMedia, CardContent, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

const styles = (theme) => ({
  card: {
    width: "100%",
    margin: "auto",
  },
  media: {
    height: 300,
    width: "100%",
    objectFit: "contain",
  },
});

class OfferDetailCard extends Component {
  get_image_name = (img_path) => {
    var tokens = img_path.split("/");
    var image_name = tokens[tokens.length - 1];
    return image_name;
  };

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          component="img"
          alt={this.props.offer.product + " photo"}
          height="150"
          width="100%"
          objectFit="cover"
          image={"/images/" + this.get_image_name(this.props.offer.image)}
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

export default withStyles(styles)(OfferDetailCard);
