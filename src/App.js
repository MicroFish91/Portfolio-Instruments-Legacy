import {connect} from 'react-redux';

import setBenchmark from './actions/setBenchmark';
import addCoreAsset from './actions/addCoreAssets';

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
        onAddCoreAsset: (account) => dispatch(addCoreAsset(account))
    }
}


var connectedComponents = connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);

export default connectedComponents;
