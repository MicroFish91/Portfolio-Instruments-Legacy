import React, { Component } from 'react';
import RebalanceRow from './RebalanceRow';


class RebalanceResults extends Component {

    constructor(props){
        super(props);
    }

    render() {

        var rows = this.props.differences.map((object, index) => {

            return <RebalanceRow key={index} differences={object} index={index} />;

        })
        
        return (         

            <form method="post" class="card">
                <div class="card-header">
                    <h3 class="card-title">Asset Rebalance Results</h3>
                </div>

                <div class="card-body">
                    <div class="row">

                        {
                            (this.props.needsRebalance)
                            ? <div> Verdict: Based on a {this.props.rebalancePercent}% rebalance band, <u>your portfolio needs to be rebalanced.</u> </div>
                            : <div> Verdict: Based on a {this.props.rebalancePercent}% rebalance band, <u> your portfolio does not need to be rebalanced.</u> </div>
                        }

                        <br></br>
                        <br></br>

                        <div class="table-responsive">
                            <table id="example" class="table table-striped table-bordered" style={{"width":"100%", "border-top":"1px solid grey"}}>

                                <thead>
                                    <tr>
                                        <th class="wd-25p">Asset Type</th>
                                        <th class="wd-25p">Current Allocation</th>
                                        <th class="wd-25p">Potential Adjustment</th>
                                        <th class="wd-25p">Goal Allocation</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    
                                    {rows}

                                </tbody>

                            </table>
                        </div>

                    </div>
                </div>
            </form>

        )
    }

}

export default RebalanceResults;