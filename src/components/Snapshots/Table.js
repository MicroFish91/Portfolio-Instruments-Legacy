import React, { Component } from 'react'
import {connect} from 'react-redux';

import saveSnapshot from '../../actions/saveSnapshot';

import TableRow from './TableRow';

import '../../assets/css/dashboard.css';

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
            newArray.push(account.amountOne);

            if (account.amountTwo !== 0) {
                newArray.push(account.amountTwo);
            }

            if (account.amountThree !== 0) {
                newArray.push(account.amountThree);
            }

            if (account.amountFour !== 0) {
                newArray.push(account.amountFour);
            }

            if (account.amountFive !== 0) {
                newArray.push(account.amountFive);
            }

            if (account.amountSix !== 0) {
                newArray.push(account.amountSix);
            }

            if (account.hasOwnProperty("other")){
            
                let otherTotal = 0;

                account["other"].forEach(other => {
                    otherTotal += parseInt(other.amount);
                });

                newArray.push(otherTotal);

            }

            newArray.push(account.total);

            return <TableRow accountInfo={newArray} />;

        });

        return (

            <div class="row">
                <div class="col-md-12 col-lg-12">
                    <div class="card">

                        <div class="card-status bg-yellow br-tr-3 br-tl-3"></div>
                        <div class="card-header">
                                <input type="text" class="form-control" name="example-text-input" placeholder="Snapshot Title Goes Here" value={this.state.snapshotTitle} onChange={this.updateTitle.bind(this)}></input>
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