import React, { Component } from 'react';

class NetWorthCard extends Component {

    render() {

        return (

            <div class="col-sm-12 col-md-6 col-lg-3">
                <div class="card overflow-hidden">
                    <div class="card-status bg-blue br-tr-3 br-tl-3"></div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col">
                                <div class="text-muted">Net Worth</div>
                                <div class="h3 m-0  text-blue counter font-30">5067.00</div>
                            </div>
                            <div class="col-auto align-self-center">
                                <div class="icon icon-shape bg-gradient-blue rounded-circle text-white">
                                    <i class="fas fa-dollar-sign text-white"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
						
        )
    }
}

export default NetWorthCard;