import React, { Component } from "react";
import { InputGroup, Input, Form } from "reactstrap";
import { Button } from "@material-ui/core";
import { REGIONS } from "../constants/constants";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beforeDate: false,
      afterDate: false,
    };
  }

  render() {
    return (
      <Form inline style={{ marginTop: 5 }}>
        <Button
          variant="contained"
          size="small"
          onClick={this.props.handler.toggle}
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
              placeholder="Enter a city..."
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
            <Input
              className="input mb-2 mr-sm-1 mb-sm-0"
              type={this.state.beforeDate ? "date" : "text"}
              name="filterDateBefore"
              onFocus={() => {
                this.setState((prev) => ({
                  beforeDate: !prev.beforeDate,
                }));
              }}
              onBlur={() => {
                this.setState((prev) => ({
                  beforeDate: !prev.beforeDate,
                }));
              }}
              onChange={this.props.handler.filterChange}
              placeholder="Offers before this date"
              bsSize="sm"
            />
            <Input
              className="input mb-2 mr-sm-1 mb-sm-0"
              type={this.state.afterDate ? "date" : "text"}
              onFocus={() => {
                this.setState((prev) => ({
                  afterDate: !prev.afterDate,
                }));
              }}
              onBlur={() => {
                this.setState((prev) => ({
                  afterDate: !prev.afterDate,
                }));
              }}
              name="filterDateAfter"
              onChange={this.props.handler.filterChange}
              placeholder="Offers after this date"
              bsSize="sm"
            />
          </InputGroup>
        )}
      </Form>
    );
  }
}

export default Filter;
