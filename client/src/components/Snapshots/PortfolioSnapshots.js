import React, { Component } from 'react';

import DashTitle from "../DashTitle";
import Footer from "../Footer";


class PortfolioSnapshots extends Component {

    constructor(props){
        super(props);
    }
    
    render() {
        
        return (         

            <div class="app-content my-3 my-md-5">
                <div class="side-app">

                <DashTitle title={"Portfolio Snapshots"} titleTwo={"Portfolio Wizard"} />
                
                {/* Table */}
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
                                                <th class="wd-15p">First name</th>
                                                <th class="wd-15p">Last name</th>
                                                <th class="wd-20p">Position</th>
                                                <th class="wd-15p">Start date</th>
                                                <th class="wd-10p">Salary</th>
                                                <th class="wd-25p">E-mail</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Bella</td>
                                                <td>Chloe</td>
                                                <td>System Developer</td>
                                                <td>2018/03/12</td>
                                                <td>$654,765</td>
                                                <td>b.Chloe@datatables.net</td>
                                            </tr>
                                            <tr>
                                                <td>Donna</td>
                                                <td>Bond</td>
                                                <td>Account Manager</td>
                                                <td>2012/02/21</td>
                                                <td>$543,654</td>
                                                <td>d.bond@datatables.net</td>
                                            </tr>
                                            <tr>
                                                <td>Harry</td>
                                                <td>Carr</td>
                                                <td>Technical Manager</td>
                                                <td>20011/02/87</td>
                                                <td>$86,000</td>
                                                <td>h.carr@datatables.net</td>
                                            </tr>
                                            <tr>
                                                <td>Lucas</td>
                                                <td>Dyer</td>
                                                <td>Javascript Developer</td>
                                                <td>2014/08/23</td>
                                                <td>$456,123</td>
                                                <td>l.dyer@datatables.net</td>
                                            </tr>
                                            <tr>
                                                <td>Karen</td>
                                                <td>Hill</td>
                                                <td>Sales Manager</td>
                                                <td>2010/7/14</td>
                                                <td>$432,230</td>
                                                <td>k.hill@datatables.net</td>
                                            </tr>
                                            <tr>
                                                <td>Dominic</td>
                                                <td>Hudson</td>
                                                <td>Sales Assistant</td>
                                                <td>2015/10/16</td>
                                                <td>$654,300</td>
                                                <td>d.hudson@datatables.net</td>
                                            </tr>
                                            <tr>
                                                <td>Herrod</td>
                                                <td>Chandler</td>
                                                <td>Integration Specialist</td>
                                                <td>2012/08/06</td>
                                                <td>$137,500</td>
                                                <td>h.chandler@datatables.net</td>
                                            </tr>
                                            <tr>
                                                <td>Jonathan</td>
                                                <td>Ince</td>
                                                <td>junior Manager</td>
                                                <td>2012/11/23</td>
                                                <td>$345,789</td>
                                                <td>j.ince@datatables.net</td>
                                            </tr>
                                            <tr>
                                                <td>Leonard</td>
                                                <td>Ellison</td>
                                                <td>Junior Javascript Developer</td>
                                                <td>2010/03/19</td>
                                                <td>$205,500</td>
                                                <td>l.ellison@datatables.net</td>
                                            </tr>
                                            <tr>
                                                <td>Madeleine</td>
                                                <td>Lee</td>
                                                <td>Software Developer</td>
                                                <td>20015/8/23</td>
                                                <td>$456,890</td>
                                                <td>m.lee@datatables.net</td>
                                            </tr>
                                            <tr>
                                                <td>Madeleine</td>
                                                <td>Lee</td>
                                                <td>Software Developer</td>
                                                <td>20015/8/23</td>
                                                <td>$456,890</td>
                                                <td>m.lee@datatables.net</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                          
                        </div>
                        

                    </div>
                </div>
                
                <Footer />

            </div>
        </div>

        )
    }

    // Put JQuery Here
    componentDidMount(){

        

    }

}

export default PortfolioSnapshots;