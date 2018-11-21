import React, { Component } from 'react';

import DashTitle from "../DashTitle";
import SnapshotRow from "../Snapshots/SnapshotRow";
import Footer from "../Footer";


class PortfolioSnapshots extends Component {

    constructor(props){
        super(props);
        this.state = {
            index: 0,
            snapshotsArray: []
        }
    }

    componentWillMount(){

        // Get List of All Snapshots
        fetch(`/portfolioSnapshots${localStorage.getItem('user')}`)
        .then(result => result.json())
        .then(data => {

            var transferArray = [];
            var finalArray = [];

            if (data.data){

                // Cycle through Snapshots
                data.data.forEach((snapshot, index) => {

                    // If numbers 1 - 9 of new list
                    if ((index + 1) % 10 !== 0){

                        transferArray.push(snapshot);

                    // If resetting to new list
                    } else {

                        transferArray.push(snapshot);
                        finalArray.push(transferArray);
                        transferArray = [];

                    }

                    // If on last element of an array, push remaining into finalArray
                    if ((index === (data.data.length - 1)) && transferArray.length){

                        finalArray.push(transferArray);

                    }
                })

            this.setState({snapshotsArray: finalArray.slice()});

            }
            
        })

    }

    // If delete button is pressed
    onDelete(){

        // Get List of All Snapshots
        fetch(`/portfolioSnapshots${localStorage.getItem('user')}`)
        .then(result => result.json())
        .then(data => {

            console.log('made it');

            var transferArray = [];
            var finalArray = [];

            if (data.data){

                // Cycle through Snapshots
                data.data.forEach((snapshot, index) => {

                    // If numbers 1 - 9 of new list
                    if ((index + 1) % 10 !== 0){

                        transferArray.push(snapshot);

                    // If resetting to new list
                    } else {

                        transferArray.push(snapshot);
                        finalArray.push(transferArray);
                        transferArray = [];

                    }

                    // If on last element of an array, push remaining into finalArray
                    if ((index === (data.data.length - 1)) && transferArray.length){

                        finalArray.push(transferArray);

                    }
                })

            console.log('made it');

            this.setState({snapshotsArray: finalArray.slice()});

            }
            
        })
    
    }

    // Increment Table Index
    onNextClick(){

        let newIndex = this.state.index + 1
        this.setState({index: newIndex })

    }

    // Decrement Table Index
    onPreviousClick(){

        let newIndex = this.state.index - 1; 
        this.setState({index: newIndex })

    }
    
    render() {

        // If snapshots exist, display them
        if (this.state.snapshotsArray.length){

            // Filter snapshots by index of the user
            var rows = this.state.snapshotsArray[this.state.index].map(snapshots => {

                return <SnapshotRow onDelete={this.onDelete.bind(this)} snapshots={snapshots} index={this.state.index} />;

            })

        }
        
        return (         

            <div class="app-content my-3 my-md-5">
                <div class="side-app">

                <DashTitle title={"Portfolio Snapshots"} titleTwo={"Portfolio Wizard"} />
                
                {/* Table */}
                <div class="row">
                    <div class="col-md-12 col-lg-12">
                        <div class="card">
                            <div class="card-status bg-yellow br-tr-3 br-tl-3"></div>
                            <div class="card-header">
                                <div class="card-title">Snapshots List</div>
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table id="example" class="table table-striped table-bordered" style={{"width":"100%", "border-top":"1px solid grey"}}>
                                        <thead>
                                            <tr>
                                                <th class="wd-20p">Title</th>
                                                <th class="wd-15p">Benchmark</th>
                                                <th class="wd-30p">Notes</th>
                                                <th class="wd-15p">Date</th>
                                                <th class="wd-10p">Net Worth</th>
                                                <th class="wd-10p">Delete</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            
                                            {rows}

                                        </tbody>

                                    </table>
                                </div>

                                {
                                    ((this.state.index !== (this.state.snapshotsArray.length - 1)) && this.state.snapshotsArray.length !== 1)
                                    ? <button type="submit" class="btn btn-primary ml-auto" onClick={() => this.onNextClick()}>Next</button>
                                    : <div></div>
                                }

                                &nbsp; &nbsp;
                                
                                {
                                    (this.state.index !== 0)
                                    ? <button type="submit" class="btn btn-primary ml-auto" onClick={() => this.onPreviousClick()}>Previous</button>
                                    : <div></div>
                                }

                                <br></br>

                            </div>
                          
                        </div>
                        

                    </div>
                </div>
                
                <Footer />

            </div>
        </div>

        )
    }

}

export default PortfolioSnapshots;