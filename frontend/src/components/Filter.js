import React, { Component } from "react";
import { InputGroup, Input, Form } from "reactstrap";
import { Button } from "@material-ui/core";

class Filter extends Component {
  render() {
    return (
      <Form inline>
        <Button
          classes={{ label: "filter-button" }}
          variant="outlined"
          color="inherit"
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
              <option>Abruzzo</option>
              <option>Basilicata</option>
              <option>Calabria</option>
              <option>Campania</option>
              <option>Emilia Romagna</option>
              <option>Friuli-Venezia Giulia</option>
              <option>Lazio</option>
              <option>Liguria</option>
              <option>Lombardia</option>
              <option>Marche</option>
              <option>Molise</option>
              <option>Piemonte</option>
              <option>Puglia</option>
              <option>Sardegna</option>
              <option>Sicilia</option>
              <option>Toscana</option>
              <option>Trentino-Alto Adige</option>
              <option>Umbria</option>
              <option>Val d'Aosta</option>
              <option>Veneto</option>
            </Input>
          </InputGroup>
        )}
      </Form>
    );
  }
}

export default Filter;
