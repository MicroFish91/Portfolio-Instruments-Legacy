import React, { Component } from 'react';

import RebalanceResults from './RebalanceResults';

import DashTitle from "../DashTitle";
import Footer from "../Footer";


class RebalanceWizard extends Component {

    constructor(props){
        super(props);
    }

    render() {
        
        return (         

            <div class="app-content my-3 my-md-5">
                <div class="side-app">

                <DashTitle title={"Rebalance Wizard"} titleTwo={"Portfolio Wizard"} />

                <form method="post" class="card">
                        <div class="card-header">
                            <h3 class="card-title">Rebalance Band</h3>
                        </div>

                        <div class="card-body">
                            <div class="row">

                            Portfolio rebalancing is used to assess the current balance of investments in a portfolio, ensuring that the portfolio stays in accordance with the original target risk/reward ratio.  Please enter in a target % tolerance to analyze against.  Generally reference baselines are 5%, 10%, 15%, 20%, or 25%.

                                <div class="form-group" style={divStyle}>

                                    <br></br>

                                    <label class="form-label">Rebalance Tolerance (%)</label>
                                    <input type="number" class="form-control" name="example-text-input" min="1" max="100" placeholder="%"></input>

                                    <br></br>

                                    <button type="submit" class="btn btn-primary ml-auto" style={buttonStyle}>Analyze Portfolio</button>

                                </div>

                            </div>
                        </div>
                    </form>

                <RebalanceResults />
                
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

export default RebalanceWizard;