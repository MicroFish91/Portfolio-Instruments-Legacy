import React, { Component } from 'react';
import {Route} from 'react-router-dom';

import Navbar from './Navbar';
import Sidebar from './Sidebar';

import Body from './Body/Body';
import AddSnapshot from './Snapshots/AddSnapshot';
import LazyPortfolios from './LazyPortfolios/LazyPortfolios';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/dashboard.css';

class Dashboard extends Component {

    // componentWillMount(){

    //     fetch('/data')
    //     .then(response => response.json())
    //     .then(response => {
    //         console.log(response);
    //     })
    // }

    render() {

        return (

            <div>

		        <div class="app sidebar-mini rtl">
                    <div id="global-loader" ><div class="showbox"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div></div>
                        <div class="page">
                            <div class="page-main">

                                <Navbar />

                                <Sidebar />

                                {/* Change body urls */}
                                <Route exact path="/" component={Body} />

                                <Route exact path="/addSnapshot" component={AddSnapshot} />

                                <Route path="/lazyPortfolios" component={LazyPortfolios} />

                        </div>
                    </div>
                </div>

            </div>
                
        )
    }
}

export default Dashboard;