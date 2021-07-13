import React, { Component } from "react";
import { Route } from "react-router-dom";
import { PORTFOLIO_BENCHMARKS } from "../../constants";
import DashTitle from "../DashTitle";
import General from "./General";
import PortfolioCard from "./PortfolioCard";

class LazyPortfolios extends Component {
  static defaultProps = {
    assetInfo: {
      assetTitles: PORTFOLIO_BENCHMARKS.assetTitles,
      assetRatios: PORTFOLIO_BENCHMARKS.assetRatios,
      assetNames: PORTFOLIO_BENCHMARKS.assetNames,
      assetSubtitles: PORTFOLIO_BENCHMARKS.assetSubtitles,
      assetDescriptions: PORTFOLIO_BENCHMARKS.assetDescriptions,
      assetCAGR: PORTFOLIO_BENCHMARKS.assetCAGR,
      assetSTD: PORTFOLIO_BENCHMARKS.assetSTD,
      assetWorstDraw: PORTFOLIO_BENCHMARKS.assetWorstDraw,
      assetLongestDraw: PORTFOLIO_BENCHMARKS.assetLongestDraw,
      linkTo: PORTFOLIO_BENCHMARKS.linkTo,
      colors: [
        ["#f66d9b"],
        ["#f66d9b", "#8ecf4d"],
        ["#f66d9b", "#8ecf4d", "#4ecc48"],
        ["#f66d9b", "#8ecf4d", "#4ecc48", "#f999b9"],
        ["#f66d9b", "#8ecf4d", "#4ecc48", "#f999b9"],
        ["#f66d9b", "#8ecf4d", "#4ecc48", "#f999b9", "#5797fc"],
        ["#f66d9b", "#8ecf4d", "#4ecc48", "#f999b9"],
        ["#f66d9b", "#8ecf4d", "#4ecc48", "#f999b9", "#5797fc"],
      ],
    },
  };

  render() {
    // Map "Individual" Portfolio Components to portfolios
    const individualPortfolios = this.props.assetInfo.assetTitles.map(
      (data, index) => {
        return (
          <Route
            key={this.props.assetInfo.assetNames[index]}
            exact
            path={this.props.assetInfo.linkTo[index]}
            render={() => (
              <PortfolioCard assetInfo={this.props.assetInfo} index={index} />
            )}
          />
        );
      }
    );

    // Map "General" Portfolio Components to portfolios
    const generalPortfolios = this.props.assetInfo.assetTitles.map(
      (data, index) => {
        return (
          <Route
            key={index}
            exact
            path="/dashboard/general"
            render={() => (
              <PortfolioCard assetInfo={this.props.assetInfo} index={index} />
            )}
          />
        );
      }
    );

    return (
      <div class="app-content my-3 my-md-5">
        <div class="side-app">
          <DashTitle title={"Lazy Portfolios"} titleTwo={"General"} />

          <Route exact path="/dashboard/general" component={General} />

          {generalPortfolios}

          {individualPortfolios}
        </div>
      </div>
    );
  }
}

export default LazyPortfolios;
