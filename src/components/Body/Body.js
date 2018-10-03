import React, { Component } from 'react'

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
    }

    render() {

        return (

            <div>

                <div class="app-content my-3 my-md-5">
					<div class="side-app">

                        <DashTitle title={"Dashboard View"} titleTwo={"Home"} />
                    
                        <RowOne />

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

export default Body;
