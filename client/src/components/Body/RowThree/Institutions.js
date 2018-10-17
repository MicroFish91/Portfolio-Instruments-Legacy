import React, { Component } from 'react';
import {connect} from 'react-redux';

import Institution from './Institution';

//import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../assets/css/dashboard.css';

class Institutions extends Component {

    constructor(props){
        super(props);
    }

    static defaultProps = {
        shelters: ["Taxable", "Roth", "Traditional"]
    }

    render() {

        var institutions = [];

        if(this.props.institutionTitle === "Tax Shelter" && this.props.percentsArray) {

            institutions = this.props.percentsArray.map((percent, index) => {

                return <Institution key={this.props.shelters[index]} title={this.props.shelters[index]} percentage={percent} />;

            })

        } else {
            
        }

        if((this.props.institutionTitle === "Financial Institutions") && (this.props.rowThreeTotals)){

            institutions = this.props.rowThreeTotals.list.map(property => {

                var newPercent = this.props.rowThreeTotals[property] + "%";
 
                return <Institution key={property} title={property} percentage={newPercent} />;
 
            })
 
         } 

        return (
            <div class="col-lg-6 col-md-12">
                <div class="card">
                    <div class="card-status bg-success br-tr-3 br-tl-3"></div>
                    <div class="card-header">
                        <h3 class="card-title">{this.props.institutionTitle}</h3>
                    </div>
                    <div class="card-body">
                        <div class="current-progress">

                            {institutions}
                                    
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

// Map to Global State
function mapStateToProps(state){
    
    return {
        user: state.portfolioReducer.user,
        benchmarkName: state.portfolioReducer.benchmarkName,
        benchmarkTitles: state.portfolioReducer.benchmarkTitles,
        benchmarkRatios: state.portfolioReducer.benchmarkRatios
    }
}


export default connect(
    mapStateToProps,
    null
)(Institutions);