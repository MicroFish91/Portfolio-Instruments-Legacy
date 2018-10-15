import React, { Component } from 'react';

class Institution extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div class="progress-content">
                <div class="row">
                    <div class="col-lg-4 mt-2">
                        <div class="progress-text">{this.props.title}</div>
                    </div>
                    <div class="col-lg-8">
                        <div class="current-progressbar">
                            <div class="progress progress-md">
                                <div class="progress-bar bg-gradient-teal" style={{"width": this.props.percentage}}>{this.props.percentage}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Institution;
