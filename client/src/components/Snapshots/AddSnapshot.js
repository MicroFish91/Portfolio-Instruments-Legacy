import React, { Component } from "react";
import DashTitle from "../DashTitle";
import Footer from "../Footer";
import Table from "./Table";
import TableInputCore from "./TableInputCore";
import TableInputOption from "./TableInputOption";

class AddSnapshot extends Component {
  render() {
    return (
      <div class="app-content my-3 my-md-5">
        <div class="side-app">
          <DashTitle title={"Add Snapshot"} titleTwo={"Portfolio Wizard"} />

          <TableInputCore />

          <TableInputOption />

          <Table />

          <Footer />
        </div>
      </div>
    );
  }
}

export default AddSnapshot;
