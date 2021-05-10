import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  FormText,
  InputGroup,
} from "reactstrap";
import {
  TextField,
  Input,
  InputAdornment,
  OutlinedInput,
} from "@material-ui/core";
import axios from "axios";

class NewOfferForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      product: "",
      shop: "",
      city: "",
      region: "",
      price: 0,
      image: -1,
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onImageChange = (e) => {
    this.setState({
      image: e.target.files[0],
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let form_data = new FormData();
    form_data.append("product", this.state.product);
    form_data.append("shop", this.state.shop);
    form_data.append("city", this.state.city);
    form_data.append("region", this.state.region);
    form_data.append("price", this.state.price);
    form_data.append("image", this.state.image, this.state.image.name);
    form_data.append("user", this.props.user_id);
    axios
      .post("http://localhost:8000/offers/create/", form_data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then(() => {
        this.props.resetState();
        this.props.toggle();
      })
      .catch((err) => {
        alert("Offer already exists");
      });
  };

  get_image_name = (img_path) => {
    var tokens = img_path.split("/");
    var image_name = tokens[tokens.length - 1];
    return image_name;
  };

  defaultIfEmpty = (value) => {
    return value === "" ? "" : value;
  };

  defaultIfEmptyPrice = (value) => {
    return value === 0 ? 0 : value;
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label for="product">Name of the product:</Label>
          <TextField
            required
            fullWidth
            label="Required"
            variant="outlined"
            size="small"
            type="text"
            name="product"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.product)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="shop">Name of the shop:</Label>
          <TextField
            required
            fullWidth
            label="Required"
            variant="outlined"
            size="small"
            type="text"
            name="shop"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.shop)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="city">City of the shop:</Label>
          <TextField
            required
            fullWidth
            label="Required"
            variant="outlined"
            size="small"
            type="text"
            name="city"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.city)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="region">Region:</Label>
          <TextField
            required
            fullWidth
            label="Required"
            variant="outlined"
            size="small"
            type="text"
            name="region"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.region)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="price">Price:</Label>
          <InputGroup>
            <OutlinedInput
              required
              fullWidth
              size="small"
              type="number"
              startAdornment={
                <InputAdornment position="start">€</InputAdornment>
              }
              name="price"
              onChange={this.onChange}
              value={this.defaultIfEmptyPrice(this.state.price)}
            />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for="image">Photo:</Label>
          <Input
            required
            fullWidth
            type="file"
            name="image"
            id="image"
            onChange={this.onImageChange}
          />
          <FormText color="muted">Upload a photo of the product</FormText>
        </FormGroup>
        <Button className="btn-block">Send</Button>
      </Form>
    );
  }
}

export default NewOfferForm;
