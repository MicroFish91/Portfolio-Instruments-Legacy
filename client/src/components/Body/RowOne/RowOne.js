import React, { Component } from "react";
import NetWorthCard from "./NetWorthCard";
import RothCard from "./RothCard";
import TaxableCard from "./TaxableCard";
import TraditionalCard from "./TraditionalCard";

class RowOne extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="row row-cards">
        <TaxableCard totals={this.props.rowOneTotals.taxable} />

        <RothCard totals={this.props.rowOneTotals.roth} />

        <TraditionalCard totals={this.props.rowOneTotals.traditional} />

        <NetWorthCard totals={this.props.rowOneTotals.netWorth} />
      </div>
    );
  }
}

export default RowOne;
