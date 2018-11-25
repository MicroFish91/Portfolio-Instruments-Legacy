import React, { Component } from 'react';
import {connect} from 'react-redux';

import RebalanceResults from './RebalanceResults';

import DashTitle from "../DashTitle";
import Footer from "../Footer";


class RebalanceWizard extends Component {

    constructor(props){
        super(props);
        this.state = {
            rebalanceCheck: false,
            rebalancePercent: null,
            needsRebalance: false,
            currentAssets: [],
            differences: [],
            netWorth: null
        }
    }

    componentWillMount(){

        // Pulls in Current Snapshot's Total Net Worth
        fetch(`/dashboardRowOne${this.props.user}`)
        .then(response => response.json())
        .then(response => this.setState({netWorth: response.netWorth}))
        .catch(error => console.log(error))

        // Pulls in Current Snapshot's Asset Percentages
        fetch(`/dashBoardRowFour${this.props.user}`)
        .then(response => response.json())
        .then(response => {

            var newAssets = response.data.slice();

            for (let x = response.data.length; x < this.props.benchmarkRatios.length; x++) {

                newAssets.push("0");

            }

            this.setState({currentAssets: newAssets})
        })
        .catch(error => console.log(error))

    }

    computeDifferences(e){

        e.preventDefault();

        var differences = [];
        var rebalanceCheck = false;

        // Compute Differences for Each Asset Class
        for (let index = 0; index < this.props.benchmarkRatios.length; index++){

            // Configure differences by raw value, percent, & new total
            var difference = {};

            difference.currentPercent = this.state.currentAssets[index];

            difference.currentAmount = (difference.currentPercent / 100 * this.state.netWorth).toFixed(2);

            difference.finalAmount = (this.state.netWorth * this.props.benchmarkRatios[index] / 100).toFixed(2);

            difference.finalPercent = (difference.finalAmount / this.state.netWorth * 100).toFixed(2);

            difference.differenceAmount = ((difference.currentAmount - difference.finalAmount) * (-1)).toFixed(2);

            difference.differencePercent = ((difference.currentAmount - difference.finalAmount) / this.state.netWorth * 100 * (-1)).toFixed(2);

            differences.push(difference);
            
        }

        // Cycle through all assets
        differences.forEach(object => {

            // Check if any assets are outside of a rebalance band
            if (parseFloat(this.state.rebalancePercent) <= Math.abs(parseFloat(object.differencePercent))) {

                rebalanceCheck = true;

            }

        })

        this.setState({needsRebalance: rebalanceCheck, rebalanceCheck: true, differences: differences});

    }

    updatePercent(e){

        this.setState({rebalancePercent: e.target.value});

    }

    render() {
        
        return (         

            <div class="app-content my-3 my-md-5">
                <div class="side-app">

                <DashTitle title={"Rebalance Wizard"} titleTwo={"Portfolio Wizard"} />

                <form method="post" class="card">
                        <div class="card-header">
                            <h3 class="card-title">Rebalance Settings</h3>
                        </div>

                        <div class="card-body">
                            <div class="row">

                            Portfolio rebalancing is used to assess the current balance of investments in a portfolio, ensuring that the portfolio stays in accordance with the original target risk/reward ratio.  Please enter in a target % tolerance to analyze against.  General reference baselines are 5%, 10%, 15%, 20%, or 25%.

                                <div class="form-group" style={divStyle}>

                                    <br></br>

                                    <label class="form-label">Rebalance Tolerance (%)</label>
                                    <input type="number" class="form-control" name="example-text-input" min="1" max="100" placeholder="%" onChange={(e) => this.updatePercent(e)}></input>

                                    <br></br>

                                    <button type="submit" class="btn btn-primary ml-auto" style={buttonStyle} onClick={(e) => this.computeDifferences(e)}>Analyze Portfolio</button>

                                </div>

                            </div>
                        </div>
                    </form>

                {
                    (this.state.rebalanceCheck && this.state.differences.length)
                    ? <RebalanceResults rebalancePercent={this.state.rebalancePercent} differences={this.state.differences} needsRebalance={this.state.needsRebalance} />
                    : <div></div>
                }
                
                <Footer />

            </div>
        </div>

        )
    }

}


var divStyle = {

    align: 'center',
    width: "20%"

}

var buttonStyle = {

    margin: '3%',
    align: 'center',
    height: '6vh'

}

// Map to Global State
function mapStateToProps(state){
    
    return {
        user: state.portfolioReducer.user,
        benchmarkTitles: state.portfolioReducer.benchmarkTitles,
        benchmarkRatios: state.portfolioReducer.benchmarkRatios
    }
}


export default connect(
    mapStateToProps,
    null
)(RebalanceWizard);