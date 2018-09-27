import React, { Component } from 'react';

import TaxableCard from './TaxableCard';
import RothCard from './RothCard';
import TraditionalCard from './TraditionalCard';
import NetWorthCard from './NetWorthCard';

import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../assets/css/dashboard.css';

class RowOne extends Component {

    render() {

        return (

            <div class="row row-cards">
                
                <TaxableCard />

                <RothCard />

                <TraditionalCard />

                <NetWorthCard />
        
            </div>
        )
    }

    componentDidMount(){



    }

}

export default RowOne;
