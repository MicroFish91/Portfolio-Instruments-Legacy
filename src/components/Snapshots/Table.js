import React, { Component } from 'react'
import {connect} from 'react-redux';

import saveSnapshot from '../../actions/saveSnapshot';
import TableRow from './TableRow';


class Table extends Component {

    constructor(props){
        super(props);
        this.state = {
            snapshotTitle: ""
        }
    }

    updateTitle(event){

        this.setState({snapshotTitle: event.target.value});

    }

    createSnapshot(event){

        event.preventDefault();
        
        // Post to database
        fetch("/saveSnapshot", {
            headers: {
                'content-type': "application/json"
            },
            method: "POST",
            body: JSON.stringify({user: this.props.user, snapshotName: this.state.snapshotTitle, coreAssets: this.props.coreAssets, benchmarkTitles: this.props.benchmarkTitles})
        })

        this.props.onSaveSnapshot();

    }

    render() {

        // Map Table Headers
        var headers = this.props.benchmarkTitles.map(title => {
            return <th class="wd-10p">{title} ($)</th>;
        });

        // Map Table Rows
        var rows = this.props.coreAssets.map(account => {

            let newArray = [];
            
            // Object: {location, type, amountOne, amountTwo, amountThree, amountFour, amountFive, amountSix}

            newArray.push(account.location);
            newArray.push(account.type);

            // amountOne
            if(account.amountOne){

                newArray.push(parseFloat(account.amountOne).toFixed(2));

            } else {

                newArray.push("");
            }

            // amountTwo
            if (this.props.benchmarkTitles.length > 1) {

                if(account.amountTwo){
                    newArray.push(parseFloat(account.amountTwo).toFixed(2));
                } else {
                    newArray.push("");
                }
            } 

            // amountThree
            if (this.props.benchmarkTitles.length > 2) {

                if(account.amountThree){
                    newArray.push(parseFloat(account.amountThree).toFixed(2));
                } else {
                    newArray.push("");
                }
            } 

            // amountFour
            if (this.props.benchmarkTitles.length > 3) {

                if(account.amountFour){
                    newArray.push(parseFloat(account.amountFour).toFixed(2));
                } else {
                    newArray.push("");
                }
            } 

            // amountFive
            if (this.props.benchmarkTitles.length > 4) {

                if(account.amountFive){
                    newArray.push(parseFloat(account.amountFive).toFixed(2));
                } else {
                    newArray.push("");
                }
            } 

            // amountSix
            if (this.props.benchmarkTitles.length > 5) {

                if(account.amountSix){
                    newArray.push(parseFloat(account.amountSix).toFixed(2));
                } else {
                    newArray.push("");
                }
            } 

            // Other
            if (account.hasOwnProperty("other")){
            
                let otherTotal = 0.00;

                account["other"].forEach(other => {
                    otherTotal += (parseFloat(other.amount).toFixed(2));
                });

                newArray.push(otherTotal);

            } else {
                newArray.push("");
            }

            newArray.push(parseFloat(account.total).toFixed(2));

            return <TableRow accountInfo={newArray} />;

        });

        return (

            <div class="row">
                <div class="col-md-12 col-lg-12">
                    <div class="card">

                        <div class="card-status bg-yellow br-tr-3 br-tl-3"></div>

                        <div class="row">
                            {/* Title */}
                            <div class="col-md-7 col-lg-7">
                                <div class="card-header">
                                <input type="text" class="form-control" name="example-text-input" placeholder="Snapshot Title Goes Here" value={this.state.snapshotTitle} onChange={this.updateTitle.bind(this)}></input>
                                </div>
                            </div>

                            {/* Date */}
                            <div class="col-md-5 col-lg-5">
                                <div class="card-header">
                                    <input type="date" class="form-control" placeholder="Snapshot Date"></input>
                                </div>
                            </div>

                        </div>

                        <div class="card-body">
                            <div class="table-responsive">
                                <table id="example" class="table table-striped table-bordered" style={{"width":"100%", "border-top":"1px solid grey"}}>

                                    <thead>
                                        <tr>
                                            <th class="wd-10p">Location</th>
                                            <th class="wd-10p">Type</th>
                                            {headers}
                                            <th class="wd-10p">Other ($)</th>
                                            <th class="wd-10p">Total ($)</th>
                                            <th class="wd-10p"></th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {rows}

                                    </tbody>

                                </table>

                                <br></br>

                                <div class="form-group">
                                    <label class="form-label">Notes</label>
                                    <textarea class="form-control" name="example-textarea-input" rows="2" placeholder="Enter notes here"></textarea>
                                </div>

                                <br></br>

                                <button type="submit" class="btn btn-primary ml-auto" onClick={this.createSnapshot.bind(this)}>Save Snapshot</button>

                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}


// Map to Global State
function mapStateToProps(state){
    
    return {
        user: state.user,
        coreAssets: state.coreAssets,
        benchmarkTitles: state.benchmarkTitles
    }
}


// Map Actions
function mapDispatchToProps(dispatch){
    
    return {
        onSaveSnapshot: () => dispatch(saveSnapshot())
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Table);