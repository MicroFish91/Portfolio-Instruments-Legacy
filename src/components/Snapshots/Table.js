import React, { Component } from 'react'

import TableRow from './TableRow';

import '../../assets/css/dashboard.css';

class Table extends Component {

    render() {

        return (

            <div class="row">
                <div class="col-md-12 col-lg-12">
                    <div class="card">

                        <div class="card-status bg-yellow br-tr-3 br-tl-3"></div>
                        <div class="card-header">
                            <div class="card-title">Data Tables</div>
                        </div>

                        <div class="card-body">
                            <div class="table-responsive">
                                <table id="example" class="table table-striped table-bordered" style={{"width":"100%", "border-top":"1px solid grey"}}>

                                    <thead>
                                        <tr>
                                            <th class="wd-10p">Location</th>
                                            <th class="wd-10p">Type</th>
                                            <th class="wd-10p">Stocks (SCV)</th>
                                            <th class="wd-10p">Bonds (LT)</th>
                                            <th class="wd-10p">Cash</th>
                                            <th class="wd-10p">Gold</th>
                                            <th class="wd-10p">Position5</th>
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

                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default Table;