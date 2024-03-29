import { connect } from "react-redux";
import addCoreAsset from "./actions/addCoreAssets";
import addOtherAsset from "./actions/addOtherAssets";
import initializeUser from "./actions/initializeUser";
import removeUser from "./actions/removeUser";
import saveSnapshot from "./actions/saveSnapshot";
import setBenchmark from "./actions/setBenchmark";
import Dashboard from "./components/Dashboard";

// Map to Global State
function mapStateToProps(state) {
  return {
    user: state.portfolioReducer.user,
    benchmarkName: state.portfolioReducer.benchmarkName,
    benchmarkTitles: state.portfolioReducer.benchmarkTitles,
    benchmarkRatios: state.portfolioReducer.benchmarkRatios,
    coreAssets: state.portfolioReducer.coreAssets,
  };
}

// Map Actions
function mapDispatchToProps(dispatch) {
  return {
    onInitializeUser: (user) => dispatch(initializeUser(user)),
    onSetBenchmark: (user, benchmarkName) =>
      dispatch(setBenchmark(user, benchmarkName)),
    onAddCoreAsset: (account) => dispatch(addCoreAsset(account)),
    onAddOtherAsset: (other) => dispatch(addOtherAsset(other)),
    onSaveSnapshot: () => dispatch(saveSnapshot()),
    onRemoveUser: () => dispatch(removeUser()),
  };
}

var connectedComponents = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

export default connectedComponents;
