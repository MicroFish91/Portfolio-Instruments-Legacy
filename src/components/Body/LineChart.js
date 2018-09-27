import React, { Component } from 'react';

import { Line } from 'react-chartjs-2';

class LineChart extends Component {

    static defaultProps = {
        data: {
            labels: [ "January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    label: "My First dataset",
                    borderColor: "rgba(0,0,0,.09)",
                    borderWidth: "1",
                    backgroundColor: "rgba(0,0,0,.07)",
                    data: [ 22, 44, 67, 43, 76, 45, 12 ]
                },
                {
                    label: "My Second dataset",
                    borderColor: "rgba(0, 123, 255, 0.9)",
                    borderWidth: "1",
                    backgroundColor: "rgba(0, 123, 255, 0.5)",
                    pointHighlightStroke: "rgba(26,179,148,1)",
                    data: [ 16, 32, 18, 26, 42, 33, 44 ]
                }
            ]
        },

        options: {
            responsive: true,
            tooltips: {
                mode: 'index',
                intersect: false
            },
            hover: {
                mode: 'nearest',
                intersect: true
            }
        },

        height: 105
    }

    render() {

        return (

            <div>

                <div class="row">
                    <div class="col-lg-12 col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">Net Worth</h3>
                            </div>
                            <div class="card-body">
                                <Line data={this.props.data} options={this.props.options} height={this.props.height} />
                            </div>
                        </div>
                    </div>
                </div>
        
            </div>
        )
    }

}

export default LineChart;
