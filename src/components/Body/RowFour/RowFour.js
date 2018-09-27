import React, { Component } from 'react';

import DashBoardChart from './DashBoardChart';


class RowFour extends Component {

    render() {

        return (
            
            <div class="row">

                <DashBoardChart />

                <DashBoardChart />
            
            </div>
        )
    }
}

export default RowFour;