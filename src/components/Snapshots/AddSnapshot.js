import React, { Component } from 'react'

import DashTitle from '../DashTitle';
import TableInput from './TableInput';
import Table from './Table';
import Footer from '../Footer';

class AddSnapshot extends Component {

    render() {

        return (
            <div class="app-content my-3 my-md-5">
                <div class="side-app"> 
            
                    <DashTitle title={"Add Snapshot"} titleTwo={"Portfolio Wizard"} />

                    <TableInput />

                    <Table />

                    <Footer />
            
                </div>
            </div>
        )
    }
}

export default AddSnapshot;