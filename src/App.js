import {connect} from 'react-redux';

import setBenchmark from './actions/setBenchmark';
import addCoreAsset from './actions/addCoreAssets';
import addOtherAsset from './actions/addOtherAssets';

import Dashboard from './components/Dashboard';

// Map to Global State
function mapStateToProps(state){
    
    return {
        user: state.user,
        benchmarkTitles: state.benchmarkTitles,
        benchmarkRatios: state.benchmarkRatios,
        coreAssets: state.coreAssets
    }
}

// Map Actions
function mapDispatchToProps(dispatch){
    
    return {
        onSetBenchmark: (user, benchmarkName) => dispatch(setBenchmark(user, benchmarkName)),
        onAddCoreAsset: (account) => dispatch(addCoreAsset(account)),
        onAddOtherAsset: (other) => dispatch(addOtherAsset(other))
    }
}


var connectedComponents = connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);

export default connectedComponents;
