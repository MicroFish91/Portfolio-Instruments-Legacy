import React, { Component } from 'react'
import {connect} from 'react-redux';

import TableRow from './TableRow';

import '../../assets/css/dashboard.css';

class Table extends Component {

    render() {

        var headers = this.props.benchmarkTitles.map(title => {
            return <th class="wd-10p">{title}</th>;
        });

        return (

            <div class="row">
                <div class="col-md-12 col-lg-12">
                    <div class="card">

                        <div class="card-status bg-yellow br-tr-3 br-tl-3"></div>
                        <div class="card-header">
                                <input type="text" class="form-control" name="example-text-input" placeholder="Snapshot Title Goes Here"></input>
                        </div>

                        <div class="card-body">
                            <div class="table-responsive">
                                <table id="example" class="table table-striped table-bordered" style={{"width":"100%", "border-top":"1px solid grey"}}>

                                    <thead>
                                        <tr>
                                            <th class="wd-10p">Location</th>
                                            <th class="wd-10p">Type</th>
                                            {headers}
                                            <th class="wd-10p">Other</th>
                                            <th class="wd-10p">Total</th>
                                            <th class="wd-10p"></th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        <TableRow />
                                        <TableRow />
                                        <TableRow />
                                        <TableRow />

                                    </tbody>

                                </table>

                                <button type="submit" class="btn btn-primary ml-auto">Save Snapshot</button>

                            </div>
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
        benchmarkTitles: state.benchmarkTitles
    }
}


export default connect(
    mapStateToProps,
    null
)(Table);