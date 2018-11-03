import React, { Component } from 'react';

import { Line } from 'react-chartjs-2';

class LineChart extends Component {

    constructor(props){
        super(props);
    }

    render() {

        if (this.props.rowTwoTotals.data !== undefined){

            // Chart Info
            var data = {
                labels: this.props.rowTwoTotals.labels,
                datasets: [
                    {
                        label: this.props.rowTwoTotals.labelOne,
                        borderColor: "rgba(0,0,0,.09)",
                        borderWidth: "1",
                        backgroundColor: "rgba(0,0,0,.07)",
                        data: this.props.rowTwoTotals.data[1]
                    },
                    {
                        label: this.props.rowTwoTotals.labelTwo,
                        borderColor: "rgba(0, 123, 255, 0.9)",
                        borderWidth: "1",
                        backgroundColor: "rgba(0, 123, 255, 0.5)",
                        pointHighlightStroke: "rgba(26,179,148,1)",
                        data: this.props.rowTwoTotals.data[0]
                    }
                ]
            }

            var options = {
                responsive: true,
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                }
            }
        }

        return (

            <div>

                <div class="row">
                    <div class="col-lg-12 col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">Net Worth</h3>
                            </div>
                            <div class="card-body">

                            {
                                (this.props.rowTwoTotals !== undefined)
                                ? <Line data={data} options={options} height={100} />
                                : <Line />
                            }

                            </div>
                        </div>
                    </div>
                </div>
        
            </div>
        )
    }

}

export default LineChart;
