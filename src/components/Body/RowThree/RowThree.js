import React, { Component } from 'react';
import {connect} from 'react-redux';

import Institutions from './Institutions';

class RowThree extends Component {

    constructor(props){
        super(props);
    }

    percentArray(rowOneObject){

        var percentArray = [];

        percentArray.push(parseFloat(rowOneObject.taxable / rowOneObject.netWorth * 100).toFixed(2) + "%");

        percentArray.push(parseFloat(rowOneObject.roth / rowOneObject.netWorth * 100).toFixed(2) + "%");

        percentArray.push(parseFloat(rowOneObject.traditional / rowOneObject.netWorth * 100).toFixed(2) + "%");

        return percentArray;

    }

    render() {

        var percents;

        // Tax Shelter
        if(this.props.rowOneTotals.hasOwnProperty("netWorth")){
            percents = this.percentArray(this.props.rowOneTotals);
        } else {
            percents = ["0%", "0%", "0%"];
        }

        console.log(this.props.rowThreeTotals); 

        return (

            <div class="row">

                <Institutions rowThreeTotals={this.props.rowThreeTotals.data} institutionTitle={"Financial Institutions"} />

                <Institutions percentsArray={percents} institutionTitle={"Tax Shelter"} />

            </div>
        )
    }
}

// Map to Global State
function mapStateToProps(state){
    
    return {
        user: state.portfolioReducer.user,
        benchmarkName: state.portfolioReducer.benchmarkName,
        benchmarkTitles: state.portfolioReducer.benchmarkTitles,
        benchmarkRatios: state.portfolioReducer.benchmarkRatios
    }
}


export default connect(
    mapStateToProps,
    null
)(RowThree);