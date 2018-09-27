import React, { Component } from 'react'

import DashTitle from './DashTitle';   
import RowOne from './RowOne/RowOne';
import LineChart from './LineChart'; 

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/dashboard.css';

class Body extends Component {

    render() {

        return (

            <div>

                <div class="app-content my-3 my-md-5">
					<div class="side-app">

                        <DashTitle />
                    
                        <RowOne />

                        <LineChart />

                    </div>
                    

                </div>
            </div>
        )
    }
}

export default Body;
