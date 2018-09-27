import React, { Component } from 'react';

class Institutions extends Component {

    static defaultProps = {
        
    }

    render() {

        return (
            <div>
                <div class="col-lg-6 col-md-12">
                    <div class="card">
                        <div class="card-status bg-success br-tr-3 br-tl-3"></div>
                        <div class="card-header">
                            <h3 class="card-title">Financial Institutions</h3>
                        </div>
                        <div class="card-body">
                            <div class="current-progress">
                                <div class="progress-content">
                                    <div class="row">
                                        <div class="col-lg-4 mt-2">
                                            <div class="progress-text">Vanguard</div>
                                        </div>
                                        <div class="col-lg-8">
                                            <div class="current-progressbar">
                                                <div class="progress progress-md">
                                                    <div class="progress-bar bg-gradient-teal" style="width: 25%">25%</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="progress-content">
                                    <div class="row">
                                        <div class="col-lg-4 mt-2">
                                            <div class="progress-text">Fidelity</div>
                                        </div>
                                        <div class="col-lg-8">
                                            <div class="current-progressbar">
                                                <div class="progress progress-md">
                                                    <div class="progress-bar bg-gradient-indigo" style="width: 47%">47%</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="progress-content">
                                    <div class="row">
                                        <div class="col-lg-4 mt-2">
                                            <div class="progress-text">Schwab</div>
                                        </div>
                                        <div class="col-lg-8">
                                            <div class="current-progressbar">
                                                <div class="progress progress-md">
                                                    <div class="progress-bar bg-gradient-orange" style="width: 55%"> 55%</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="progress-content">
                                    <div class="row">
                                        <div class="col-lg-4 mt-2">
                                            <div class="progress-text">Robinhood</div>
                                        </div>
                                        <div class="col-lg-8">
                                            <div class="current-progressbar">
                                                <div class="progress progress-md">
                                                    <div class="progress-bar bg-gradient-info" style="width: 67%">67%</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Institutions;