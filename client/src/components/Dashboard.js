import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import initializeUser from "../actions/initializeUser";
import setBenchmark from "../actions/setBenchmark";
import Body from "./Body/Body";
import LazyPortfolios from "./LazyPortfolios/LazyPortfolios";
import Navbar from "./Navbar";
import requireAuth from "./requireAuth";
import Sidebar from "./Sidebar";
import AddSnapshot from "./Snapshots/AddSnapshot";
import PortfolioSnapshots from "./Snapshots/PortfolioSnapshots";
import RebalanceWizard from "./Snapshots/RebalanceWizard";

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // Check if Any Snapshots Have Been Entered Previously
    fetch(`/portfolioSnapshots${localStorage.getItem("user")}`)
      .then((result) => result.json())
      .then((dataOne) => {
        // If a snapshot has already been entered before
        if (dataOne.data) {
          // Initialize User and Benchmark
          fetch(`/getBenchmark${localStorage.getItem("user")}`)
            .then((result) => result.json())
            .then((data) => {
              this.props.onInitializeUser(
                localStorage.getItem("user"),
                data.benchmark
              );
            })
            .catch((error) => console.log(error));
        }
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <div>
        {!this.props.hasSnapshots ? (
          <div class="app sidebar-mini rtl">
            <div class="page">
              <div class="page-main">
                <Navbar />

                <Sidebar />

                <Route
                  path="/dashboard/lazyPortfolios"
                  component={LazyPortfolios}
                />

                <Route
                  exact
                  path="/dashboard/addSnapshot"
                  component={AddSnapshot}
                />

                <Route path="/dashboard/general" component={LazyPortfolios} />
              </div>
            </div>
          </div>
        ) : (
          <div class="app sidebar-mini rtl">
            <div class="page">
              <div class="page-main">
                <Navbar />

                <Sidebar />

                {/* Change body urls */}
                <Route exact path="/dashboard" component={Body} />

                <Route
                  exact
                  path="/dashboard/addSnapshot"
                  component={AddSnapshot}
                />

                <Route
                  path="/dashboard/lazyPortfolios"
                  component={LazyPortfolios}
                />

                <Route path="/dashboard/general" component={LazyPortfolios} />

                <Route
                  exact
                  path="/dashboard/portfolioSnapshots"
                  component={PortfolioSnapshots}
                />

                <Route
                  exact
                  path="/dashboard/rebalanceWizard"
                  component={RebalanceWizard}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

// Map to Global State
function mapStateToProps(state) {
  return {
    user: state.portfolioReducer.user,
    coreAssets: state.portfolioReducer.coreAssets,
    benchmarkTitles: state.portfolioReducer.benchmarkTitles,
    hasSnapshots: state.portfolioReducer.hasSnapshots,
  };
}

// Map Actions
function mapDispatchToProps(dispatch) {
  return {
    onSetBenchmark: (user, benchmark) =>
      dispatch(setBenchmark(user, benchmark)),
    onInitializeUser: (user, benchmarkName) =>
      dispatch(initializeUser(user, benchmarkName)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(requireAuth(Dashboard));
