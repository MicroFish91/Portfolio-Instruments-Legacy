import React, { Component } from 'react'
import {connect} from 'react-redux';

import DashTitle from '../DashTitle';   
import RowOne from './RowOne/RowOne';
import LineChart from './LineChart'; 
import RowThree from './RowThree/RowThree';
import RowFour from './RowFour/RowFour';
import Footer from '../Footer';

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/dashboard.css';

class Body extends Component {

    constructor(props){
        super(props);
        this.state = {
            rowOneTotals: {},
            rowThreeTotals: {},
            rowFourTotals: {}
        }
    }

    componentWillMount(){

        // Update Row One State Values
        fetch(`/dashboardRowOne${this.props.user}`)
        .then(response => response.json())
        .then(response => this.setState({rowOneTotals: response}))

        // Update Row Three State Values
        fetch(`/dashBoardRowThree${this.props.user}`)
        .then(response => response.json())
        .then(response => this.setState({rowThreeTotals: response}))

        // Update Row Four State Values
        fetch(`/dashBoardRowFour${this.props.user}`)
        .then(response => response.json())
        .then(response => this.setState({rowFourTotals: response}))

    }

    render() {

        return (

            <div>

                <div class="app-content my-3 my-md-5">
					<div class="side-app">

                        <DashTitle title={"Dashboard View"} titleTwo={"Home"} />
                    
                        <RowOne rowOneTotals={this.state.rowOneTotals} />

                        <LineChart />

                        <RowThree rowOneTotals={this.state.rowOneTotals} rowThreeTotals={this.state.rowThreeTotals} />

                        <RowFour rowFourTotals={this.state.rowFourTotals} />

                        <Footer />

                    </div>
                    

                </div>
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
)(Body);

