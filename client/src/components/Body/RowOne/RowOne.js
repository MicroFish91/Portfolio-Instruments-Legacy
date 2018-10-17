import React, { Component } from 'react';

import TaxableCard from './TaxableCard';
import RothCard from './RothCard';
import TraditionalCard from './TraditionalCard';
import NetWorthCard from './NetWorthCard';

//import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../assets/css/dashboard.css';

class RowOne extends Component {

    constructor(props){
        super(props);
    }

    render() {

        return (

            <div class="row row-cards">
                
                <TaxableCard totals={this.props.rowOneTotals.taxable} />

                <RothCard totals={this.props.rowOneTotals.roth} />

                <TraditionalCard totals={this.props.rowOneTotals.traditional} />

                <NetWorthCard totals={this.props.rowOneTotals.netWorth} />
        
            </div>
        )
    }

}

export default RowOne;