import React, { Component } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import { Button } from "@material-ui/core";

class DownloadButton extends Component {
  constructor(props) {
    super(props);
    const defaultFileType = "json";
    this.fileNames = {
      json: "offers.json",
      csv: "offers.csv",
      text: "offers.txt",
    };
    this.state = {
      fileType: defaultFileType,
      fileDownloadUrl: null,
      status: "",
    };
  }

  changeFileType = (e) => {
    const value = e.target.value;
    this.setState({ fileType: value.toLowerCase() });
  };

  download = (e) => {
    e.preventDefault();
    let output;
    if (this.state.fileType === "json") {
      output = JSON.stringify({ offers: this.props.offerData }, null, 4);
    } else if (this.state.fileType === "csv") {
      let contents = [];
      contents.push([
        "id",
        "product",
        "shop",
        "city",
        "region",
        "price",
        "date",
        "image",
        "user",
      ]);
      this.props.offerData.forEach((row) => {
        contents.push([
          row.id,
          row.product,
          row.shop,
          row.city,
          row.region,
          row.price,
          row.date,
          row.image,
          row.user,
        ]);
      });
      output = this.makeCSV(contents);
    } else if (this.state.fileType === "text") {
      output = "";
      this.props.offerData.forEach((row) => {
        output += `${row.id}, ${row.product}, ${row.shop}, ${row.city}, ${row.price}, ${row.date}, ${row.image}, ${row.user}\n`;
      });
    }

    const blob = new Blob([output]);
    const fileDownloadUrl = URL.createObjectURL(blob);
    this.setState({ fileDownloadUrl: fileDownloadUrl }, () => {
      this.dofileDownload.click();
      URL.revokeObjectURL(fileDownloadUrl);
      this.setState({ fileDownloadUrl: "" });
    });
  };

  makeCSV = (content) => {
    let csv = "";
    content.forEach((value) => {
      value.forEach((item, i) => {
        let innerValue = item === null ? "" : item.toString();
        let result = innerValue.replace(/"/g, '""');
        if (result.search(/("|,|\n)/g) >= 0) {
          result = '"' + result + '"';
        }
        if (i > 0) {
          csv += ",";
        }
        csv += result;
      });
      csv += "\n";
    });
    return csv;
  };

  render() {
    return (
      <Form inline>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="fileType" className="mb-2 mr-sm-2 mb-sm-0" bssize="sm">
            File type:
          </Label>
          <Input
            type="select"
            onChange={this.changeFileType}
            value={this.state.fileType}
            className="mb-2 mr-sm-2 mb-sm-0"
            size="sm"
            style={{borderColor:"black"}}
          >
            <option>csv</option>
            <option>json</option>
            <option>text</option>
          </Input>
        </FormGroup>
        <Button
          onClick={this.download}
          variant="contained"
          color="primary"
          size="small"
        >
          Download this file!
        </Button>
        <a
          className="hidden"
          download={this.fileNames[this.state.fileType]}
          href={this.state.fileDownloadUrl}
          ref={(e) => (this.dofileDownload = e)}
        >
          download it
        </a>
      </Form>
    );
  }
}

export default DownloadButton;
