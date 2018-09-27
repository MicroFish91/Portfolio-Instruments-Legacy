import React, { Component } from 'react';

class Institution extends Component {
    render() {
        return (
            <div class="progress-content">
                <div class="row">
                    <div class="col-lg-4 mt-2">
                        <div class="progress-text">Vanguard</div>
                    </div>
                    <div class="col-lg-8">
                        <div class="current-progressbar">
                            <div class="progress progress-md">
                                <div class="progress-bar bg-gradient-teal" style={{"width": "25%"}}>25%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Institution;
