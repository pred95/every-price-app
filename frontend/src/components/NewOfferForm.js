import React, { Component } from "react";
import { Form, FormGroup, Label, FormText } from "reactstrap";
import {
  TextField,
  Input,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button,
} from "@material-ui/core";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import axios from "axios";
import { BACKEND_URL, REGIONS } from "../constants/constants";
import axiosInstance from "../axios/axiosInstance";

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
      disabled: false,
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
    this.setState({
      disabled: true,
    });
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
      .post(BACKEND_URL + "offers/create/", form_data, {
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
        axiosInstance
          .post(`auth/token/refresh/`, {
            refresh: localStorage.getItem("refresh_token"),
          })
          .then((res) => {
            localStorage.setItem("access_token", res.data.access);
          });
        axios
          .post(BACKEND_URL + "offers/create/", form_data, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
          })
          .then(() => {
            this.props.resetState();
            this.props.toggle();
          })
          .catch((err) => alert("Offer already exists"));
      });
    this.setState({
      disabled: false,
    });
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
            label="Product"
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
            label="Shop"
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
            label="City"
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
          <FormControl required variant="outlined" size="small" fullWidth>
            <InputLabel>Region</InputLabel>
            <Select
              label="Region"
              name="region"
              onChange={this.onChange}
              value={this.defaultIfEmpty(this.state.region)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {REGIONS.map((value, index) => {
                return <MenuItem value={value}>{value}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </FormGroup>
        <FormGroup>
          <Label for="price">Price:</Label>
          <CurrencyTextField
            variant="outlined"
            required
            fullWidth
            size="small"
            currencySymbol="€"
            step="0,1"
            outputFormat="number"
            textAlign="left"
            name="price"
            onChange={this.onChange}
            value={this.defaultIfEmptyPrice(this.state.price)}
          />
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
        <Button
          variant="contained"
          type="submit"
          className="btn-block"
          disabled={this.state.disabled}
        >
          {this.state.disabled ? "Sending..." : "Submit"}
        </Button>
      </Form>
    );
  }
}

export default NewOfferForm;
