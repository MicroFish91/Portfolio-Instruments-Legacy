import React, { Component } from 'react';

import Navbar from './Navbar';
import Sidebar from './Sidebar';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class Dashboard extends Component {

    render() {

        return (

            <div>

                <Navbar />

			    <Sidebar />

            </div>
                
        )
    }
}

export default Dashboard;