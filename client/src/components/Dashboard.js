import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import { connect } from 'react-redux';

import Navbar from './Navbar';
import Sidebar from './Sidebar';

import Body from './Body/Body';
import AddSnapshot from './Snapshots/AddSnapshot';
import LazyPortfolios from './LazyPortfolios/LazyPortfolios';
import PortfolioSnapshots from './Snapshots/PortfolioSnapshots';

import requireAuth from './requireAuth';
import setBenchmark from '../actions/setBenchmark';
import initializeUser from '../actions/initializeUser';

// import '../assets/css/dashboard.css';

class Dashboard extends Component {

    constructor(props){
        super(props);
    }

    componentWillMount(){

        console.log(localStorage.getItem('user'));

        // Check if Any Snapshots Have Been Entered Previously
        fetch(`/portfolioSnapshots${localStorage.getItem('user')}`)
        .then(result => result.json())
        .then(dataOne => { 

            // If a snapshot has already been entered before
            if (dataOne.data){

                // Initialize User and Benchmark
                fetch(`/getBenchmark${localStorage.getItem('user')}`)
                .then(result => result.json())
                .then(data => {

                    this.props.onInitializeUser(localStorage.getItem('user'), data.benchmark);

                })
                .catch(error => console.log(error))

            }

        })
        .catch(error => console.log(error))

    }

    render() {

        return (

            <div>

                {   (!this.props.hasSnapshots)
                    ? <div class="app sidebar-mini rtl">
                    {/* <div id="global-loader"><div class="showbox"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div></div> */}
                        <div class="page">
                            <div class="page-main">

                                <Navbar />

                                <Sidebar />

                                <Route path="/dashboard/lazyPortfolios" component={LazyPortfolios} />

                                <Route exact path="/dashboard/addSnapshot" component={AddSnapshot} />

                                <Route path="/dashboard/general" component={LazyPortfolios} />

                        </div>
                    </div>
                </div>
                
                :
                
                <div class="app sidebar-mini rtl">
                    {/* <div id="global-loader"><div class="showbox"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div></div> */}
                        <div class="page">
                            <div class="page-main">

                                <Navbar />

                                <Sidebar />

                                {/* Change body urls */}
                                <Route exact path="/dashboard" component={Body} />

                                <Route exact path="/dashboard/addSnapshot" component={AddSnapshot} />

                                <Route path="/dashboard/lazyPortfolios" component={LazyPortfolios} />

                                <Route path="/dashboard/general" component={LazyPortfolios} />

                                <Route exact path="/dashboard/portfolioSnapshots" component={PortfolioSnapshots} />
                            
                        </div>
                    </div>
                </div>

                }

            </div>
                
        )
    }

}

// Map to Global State
function mapStateToProps(state){
    
    return {
        user: state.portfolioReducer.user,
        coreAssets: state.portfolioReducer.coreAssets,
        benchmarkTitles: state.portfolioReducer.benchmarkTitles,
        hasSnapshots: state.portfolioReducer.hasSnapshots
    }
}

// Map Actions
function mapDispatchToProps(dispatch){
    
    return {
        onSetBenchmark: (user, benchmark) => dispatch(setBenchmark(user, benchmark)),
        onInitializeUser: (user, benchmarkName) => dispatch(initializeUser(user, benchmarkName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(requireAuth(Dashboard))