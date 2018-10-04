import React, { Component } from 'react';

import { Pie } from 'react-chartjs-2';

class DashBoardChart extends Component {

    constructor(props){
        super(props);
    }

    static defaultProps = {
		data: {
            labels: [
              'MFA',
              'NON-MFA'
            ],
            datasets: [{
              data: [1, 3],
              backgroundColor: [
              '#FF6384',
              '#36A2EB'
              ],
              hoverBackgroundColor: [
              '#FF6384',
              '#36A2EB'
              ]
            }]
        }  
    }

    render() {

        // if (this.props.titles !== undefined){

        //     var color = ["#d3ffce", "#ffe4e1", "#c6e2ff", "#faebd7", "#fff68f", "#6dc066"];

        //     color = color.slice(0, this.props.titles.length);

        //     var data = {
        //         data: {
        //             labels: this.props.titles,
        //             datasets: [{
        //             data: this.props.ratios,
        //             backgroundColor: color,
        //             hoverBackgroundColor: color
        //             }]
        //         }  
        //     };
        // }

        // console.log(data);

        return (

            <div class="col-lg-6 col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Pie Chart 4</h3>
                    </div>
                    <div class="card-body">
                        <Pie data={this.props.data} />
                    </div>
                </div>
            </div>
        
        )
    }
}

export default DashBoardChart;