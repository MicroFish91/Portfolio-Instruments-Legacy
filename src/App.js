import {connect} from 'react-redux';

import setBenchmark from './actions/setBenchmark';

import Dashboard from './components/Dashboard';

// Map to Global State
function mapStateToProps(state){
    
    return {
        benchmarkTitles: state.benchmarkTitles,
        benchmarkRatios: state.benchmarkRatios
    }
}

// Map Actions
function mapDispatchToProps(dispatch){
    
    return {
        onSetBenchmark: (benchmarkName) => dispatch(setBenchmark(benchmarkName))
    }
}


var connectedComponents = connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);

export default connectedComponents;
