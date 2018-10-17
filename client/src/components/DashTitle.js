import React, { Component } from 'react';

//import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import '../assets/css/dashboard.css';

class DashTitle extends Component {

    render() {

        return (

            <div>

                <div class="page-header">
                    <h4 class="page-title">{this.props.title}</h4>
                    
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">{this.props.titleTwo}</a></li>
                        <li class="breadcrumb-item active" aria-current="page">{this.props.title}</li>
                    </ol>
                </div>
                
            </div>
        )
    }
}

export default DashTitle;
