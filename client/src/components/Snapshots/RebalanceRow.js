import React, { Component } from 'react';
import {connect} from 'react-redux';

class RebalanceRow extends Component {

    constructor(props){
        super(props);
    }

    render() {
        
        return (         

            <tr>

                <td>{this.props.benchmarkTitles[this.props.index].toUpperCase()}</td>
                <td>${this.props.differences.currentAmount} ({this.props.differences.currentPercent}%)</td>
                <td>${this.props.differences.differenceAmount} ({this.props.differences.differencePercent}%)</td>
                <td>${this.props.differences.finalAmount} ({this.props.differences.finalPercent}%)</td>

            </tr>

        )
    }

}

// Map to Global State
function mapStateToProps(state){
    
    return {
        benchmarkTitles: state.portfolioReducer.benchmarkTitles,
    }
}


export default connect(
    mapStateToProps,
    null
)(RebalanceRow);