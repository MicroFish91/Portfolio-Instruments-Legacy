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
            rowOneTotals: {}
        }
    }

    componentWillMount(){

        // Update Row One State Values
        fetch(`/dashboardRowOne${this.props.user}`)
        .then(response => response.json())
        .then(response => this.setState({rowOneTotals: response}))

    }

    render() {

        return (

            <div>

                <div class="app-content my-3 my-md-5">
					<div class="side-app">

                        <DashTitle title={"Dashboard View"} titleTwo={"Home"} />
                    
                        <RowOne rowOneTotals={this.state.rowOneTotals} />

                        <LineChart />

                        <RowThree />

                        <RowFour />

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
        user: state.user,
        benchmarkName: state.benchmarkName,
        benchmarkTitles: state.benchmarkTitles,
        benchmarkRatios: state.benchmarkRatios
    }
}


export default connect(
    mapStateToProps,
    null
)(Body);

