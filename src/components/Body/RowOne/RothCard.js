import React, { Component } from 'react'

import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../assets/css/dashboard.css';

class RothCard extends Component {

    render() {

        return (

            <div class="col-sm-12 col-md-6 col-lg-3">
                <div class="card overflow-hidden">
                    <div class="card-status bg-teal br-tr-3 br-tl-3"></div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col">
                                <div class="text-muted">Roth</div>
                                <div class="h3 m-0  text-teal counter font-30"><b>{this.props.totals}</b></div>
                            </div>
                            <div class="col-auto align-self-center">
                                <div class="card-value float-right text-purple">
                                    <div class="icon icon-shape bg-gradient-teal rounded-circle text-white">
                                        <i class="fas fa-dollar-sign text-white"></i>
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

export default RothCard;
