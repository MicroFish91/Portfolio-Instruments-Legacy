import {connect} from 'react-redux';

import setBenchmark from './actions/setBenchmark';

import Dashboard from './components/Dashboard';

// Map to Global State
function mapStateToProps(state){
    
    return {
        user: state.user,
        benchmarkTitles: state.benchmarkTitles,
        benchmarkRatios: state.benchmarkRatios
    }
}

// Map Actions
function mapDispatchToProps(dispatch){
    
    return {
        onSetBenchmark: (user, benchmarkName) => dispatch(setBenchmark(user, benchmarkName))
    }
}


var connectedComponents = connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);

export default connectedComponents;
