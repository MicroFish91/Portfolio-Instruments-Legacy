import React, { Component } from 'react';


class General extends Component {

    render() {

        return (

            <div class="card">
                <div class="row">
                    <div class="col-md-12 col-lg-12  pl-0 ">
                        <div class="card-body p-6 about-con pabout">
                            <h2 class="mb-4 font-weight-semibold"><u>General Information</u></h2>
                            <p class="leading-normal">Selecting a benchmark portfolio is the first step of the portfolio buildling process.  The following lazy portfolios have been hand-selected as good benchmarks against which to tailor your personal portfolio.  Review each of the portfolios below and select the one that most aligns with your preferred investing style. </p>
                            
                            <p class="leading-normal">To see additional information on each portfolio, click the "View More" button.  When you have made a decision, click the "Set Benchmark" button to continue.</p>
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default General;