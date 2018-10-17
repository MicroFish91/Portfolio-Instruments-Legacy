import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import { connect } from 'react-redux';

import Navbar from './Navbar';
import Sidebar from './Sidebar';

import Body from './Body/Body';
import AddSnapshot from './Snapshots/AddSnapshot';
import LazyPortfolios from './LazyPortfolios/LazyPortfolios';

import requireAuth from './requireAuth';
import initializeUser from '../actions/initializeUser';

import '../assets/css/dashboard.css';

class Dashboard extends Component {

    constructor(props){
        super(props);
    }

    componentWillMount(){
        
        this.props.onInitializeUser(localStorage.getItem('user'));

    }

    render() {

        return (

            <div>

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

                        </div>
                    </div>
                </div>

            </div>
                
        )
    }

}


// Map Actions
function mapDispatchToProps(dispatch){
    
    return {
        onInitializeUser: (user) => dispatch(initializeUser(user))
    }
}


// export default requireAuth(Dashboard);

export default connect(null, mapDispatchToProps)(requireAuth(Dashboard))