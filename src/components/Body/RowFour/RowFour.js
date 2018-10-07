import React, { Component } from 'react';
import {connect} from 'react-redux';

import DashBoardChart from './DashBoardChart';


class RowFour extends Component {

    constructor(props){
        super(props);
    }

    render() {

        return (
            
            <div class="row">

                <DashBoardChart placeHolder={"Current Portfolio"} />

                <DashBoardChart name={this.props.benchmarkName} ratios={this.props.benchmarkRatios} titles={this.props.benchmarkTitles} placeHolder={"Current Benchmark: "} />
            
            </div>
        )
    }
}

// Map to Global State
function mapStateToProps(state){
    
    return {
        benchmarkName: state.benchmarkName,
        benchmarkTitles: state.benchmarkTitles,
        benchmarkRatios: state.benchmarkRatios
    }
}


export default connect(
    mapStateToProps,
    null
)(RowFour);