import React, { Component } from 'react';
import {connect} from 'react-redux';

class TableInputCore extends Component {

    render() {

        // Map format for all input fields based on titles of benchmark assets
        var formFields = this.props.benchmarkTitles.map(title => {
            
            return <div class="form-group">
            <label class="form-label">{title.toUpperCase()} ($)</label>
            <input type="text" class="form-control" name="example-text-input" placeholder="Ex. 320.15"></input>
            </div>;

        });

        // Even indices display array
        var leftSide = formFields.filter((title, index) => {
            return ((index % 2 === 0) || (index === 0));
        });

        // Odd indices display array
        var rightSide = formFields.filter((title, index) => {
            return (index % 2 !== 0);
        });

        return (

            <div class="row">
                <div class="col-lg-12">
                    <form  method="post" class="card">
                        <div class="card-header">
                            <h3 class="card-title">Core Assets</h3>
                        </div>
                        <div class="card-body">
                            <div class="row">

                                {/* Left Column */}
                                <div class="col-md-6 col-lg-6">

                                    <div class="form-group">
                                        <label class="form-label">Holding Location</label>
                                        <input type="text" class="form-control" name="example-text-input" placeholder="Ex. Vanguard"></input>
                                    </div>

                                    {leftSide}   

                                <button type="submit" class="btn btn-primary ml-auto">Add Core Assets</button>

                                

                                </div>

                                {/* Right Column */}
                                <div class="col-md-6 col-lg-6">

                                <div class="form-group">
                                    <label class="form-label">Holding Type</label>
                                    <select name="type" class="form-control custom-select">
                                        <option value="taxable">Taxable</option>
                                        <option value="taxable">Traditional</option>
                                        <option value="taxable">Roth</option>
                                    </select>
                                </div>

                                {rightSide}

                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        )
    }
}

// Map to Global State
function mapStateToProps(state){
    
    return {
        benchmarkTitles: state.benchmarkTitles
    }
}


export default connect(
    mapStateToProps,
    null
)(TableInputCore);
