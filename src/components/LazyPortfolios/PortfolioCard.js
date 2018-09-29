import React, { Component } from 'react';

import { Pie } from 'react-chartjs-2';



class PortfolioCard extends Component {

    render() {

        var dataSet = {
            data: {
                labels: this.props.assetInfo.assetTitles[this.props.index],
                datasets: [{
                  data: this.props.assetInfo.assetRatios[this.props.index],
                  backgroundColor: this.props.assetInfo.colors[this.props.index],
                  hoverBackgroundColor: this.props.assetInfo.colors[this.props.index]
                }]
            }
        }

        return (

            <div class="card">
                <div class="row">
                    <div class="col-md-12 col-lg-6 pr-0 d-none d-lg-block">
                        <div class="card">
                            <div class="card-body">
                                <Pie data={dataSet.data} />
                            </div>
                        </div>
                    </div>

                    <div class="col-md-12 col-lg-6  pl-0 ">
                        <div class="card-body p-6 about-con pabout">
                            <h2 class="mb-4 font-weight-semibold">{this.props.assetInfo.assetNames[this.props.index]}</h2>
                            <h4 class="leading-normal">{this.props.assetInfo.assetSubtitles[this.props.index]}</h4>
                            <p class="leading-normal">{this.props.assetInfo.assetDescriptions[this.props.index]}<br></br> <br></br>
                            <b><u>Real CAGR</u></b>: {this.props.assetInfo.assetCAGR[this.props.index]}<br></br>
                            <b><u>Std. Dev.</u></b>: {this.props.assetInfo.assetSTD[this.props.index]}<br></br>
                            <b><u>Worst Drawdown</u></b>: {this.props.assetInfo.assetWorstDraw[this.props.index]}<br></br>
                            <b><u>Longest Drawdown</u></b>: {this.props.assetInfo.assetLongestDraw[this.props.index]}<br></br> </p>
                            <a href="" class="btn btn-indigo btn-lg mt-2">View More</a>&nbsp;&nbsp; 
                            <a href="" class="btn btn-indigo btn-lg mt-2">Set Benchmark</a>
                        </div>
                    </div>
                </div> 
            </div>  

        )
    }
}

export default PortfolioCard;