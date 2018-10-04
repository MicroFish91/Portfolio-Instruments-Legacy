import React, { Component } from 'react';

import Institution from './Institution';

import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../assets/css/dashboard.css';

class Institutions extends Component {

    constructor(props){
        super(props);
    }

    render() {

        return (
                <div class="col-lg-6 col-md-12">
                    <div class="card">
                        <div class="card-status bg-success br-tr-3 br-tl-3"></div>
                        <div class="card-header">
                            <h3 class="card-title">{this.props.institutionTitle}</h3>
                        </div>
                        <div class="card-body">
                            <div class="current-progress">

                                <Institution />

                                <Institution />

                                <Institution />

                                <Institution />
                                      
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}

export default Institutions;