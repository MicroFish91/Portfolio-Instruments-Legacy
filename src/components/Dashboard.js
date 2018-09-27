import React, { Component } from 'react';

import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Body from './Body/Body';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/dashboard.css';

class Dashboard extends Component {

    render() {

        return (

            <div>

		        <div class="app sidebar-mini rtl">
                    <div id="global-loader" ><div class="showbox"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div></div>
                        <div class="page">
                            <div class="page-main">

                                <Navbar />

                                <Sidebar />

                                <Body />

                        </div>
                    </div>
                </div>

            </div>
                
        )
    }
}

export default Dashboard;