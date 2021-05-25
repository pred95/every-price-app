import React, { Component } from "react";
import { InputGroup, Input, Form } from "reactstrap";
import { Button } from "@material-ui/core";
import { REGIONS } from "../constants/constants";

class Filter extends Component {
  render() {
    return (
      <Form inline>
        <Button
          variant="contained"
          size="small"
          onClick={this.props.handler.toggle}
          style={{marginTop: 5}}
        >
          {this.props.text}
        </Button>
        &nbsp;
        {this.props.showFilter && (
          <InputGroup>
            <Input
              className="input mb-2 mr-sm-1 mb-sm-0"
              type="text"
              name="filterProduct"
              onChange={this.props.handler.filterChange}
              placeholder="Enter a product..."
              bsSize="sm"
            />
            <Input
              className="input mb-2 mr-sm-1 mb-sm-0"
              type="text"
              name="filterCity"
              onChange={this.props.handler.filterChange}
              placeholder="Enter a city"
              bsSize="sm"
            />
            <Input
              className="input mb-2 mr-sm-1 mb-sm-0"
              type="select"
              name="filterRegion"
              onChange={this.props.handler.filterChange}
              size="sm"
            >
              <option></option>
              {REGIONS.map((value, index) => {
                return <option>{value}</option>;
              })}
            </Input>
          </InputGroup>
        )}
      </Form>
    );
  }
}

export default Filter;
