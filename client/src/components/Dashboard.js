import React, { Component } from 'react';
import {Route} from 'react-router-dom';

import Navbar from './Navbar';
import Sidebar from './Sidebar';

import Body from './Body/Body';
import AddSnapshot from './Snapshots/AddSnapshot';
import LazyPortfolios from './LazyPortfolios/LazyPortfolios';

import requireAuth from './requireAuth';

import '../assets/css/dashboard.css';

class Dashboard extends Component {

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

// export default requireAuth(Dashboard);

export default Dashboard;