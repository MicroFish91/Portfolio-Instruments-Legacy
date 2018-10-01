import React, { Component } from 'react';
import {connect} from 'react-redux';

import addOtherAsset from '../../actions/addOtherAssets';


class TableInputOption extends Component {

    constructor(props){
        super(props);
        this.state = {
            assetPositions: ["", "Taxable", "", ""]
        }
    }

    static defaultProps = {
        assetTypes: [
            "mm Cash/Money Market",
            "bills Fixed Income: Bills (1 YR or Less)",
            "stb Fixed Income: Short Term Bonds (1 - 3 YRS)",
            "itb Fixed Income: Intermediate Term Bonds (3 - 15 YRS)",
            "ltb Fixed Income: Long Term Bonds (15 - 30 YRS)",
            "commodoties Real Assets: Commodoties",
            "gold Real Assets: Gold",
            "reits Real Assets: Real Estate Invesment Trusts (REITs)",
            "tsm Equities: Total Stock Market (TSM)",
            "dlcb Equities: Domestic Large Cap Blend (DLCB)",
            "dlcg Equities: Domestic Large Cap Growth (DLCG)",
            "dlcv Equities: Domestic Large Cap Value (DLCV)",
            "dmcb Equities: Domestic Medium Cap Blend (DMCB)",
            "dmcg Equities: Domestic Medium Cap Growth (DMCG)",
            "dmcv Equities: Domestic Medium Cap Value (DMCV)",
            "dscb Equities: Domestic Small Cap Blend (DSCB)",
            "dscg Equities: Domestic Small Cap Growth (DSCG)",
            "dscv Equities: Domestic Small Cap Value (DSCV)",
            "ilcb Equities: International Large Cap Blend (ILCB)",
            "ilcg Equities: International Large Cap Growth (ILCG)",
            "ilcv Equities: International Large Cap Value (ILCV)",
            "imcb Equities: International Medium Cap Blend (IMCB)",
            "imcg Equities: International Medium Cap Growth (IMCG)",
            "imcv Equities: International Medium Cap Value (IMCV)",
            "iscb Equities: International Small Cap Blend (ISCB)",
            "iscg Equities: International Small Cap Growth (ISCG)",
            "iscv Equities: International Small Cap Value (ISCV)"
        ]
    }

    // Updates the value of each field into the component state in real time
    trackAmount(event){

        // Copy by value to work around immutability
        let newPositions = this.state.assetPositions.slice();

        newPositions[event.target.id] = event.target.value;

        // Set State
        this.setState({assetPositions: newPositions});

    }

    render() {

        // Filter out benchmark core assets
        var assetMap = this.props.assetTypes.filter(asset => {

            let valueId = asset.split(" ");

            // See if current asset is a benchmark title, filter if so, else return
            if (this.props.benchmarkTitles.includes(valueId[0])){
                return false;
            }

            return true;

        });

        // Reformat select - option syntax to assetMap
        assetMap = assetMap.map((asset, index) => {

            let valueId = asset.split(" ");
            let displayValue = asset.split(" ");

            displayValue.shift();
            displayValue = displayValue.join(" ");

            // Initialize initial asset type if first render after filtering benchmarkTitles
            if((this.state.assetPositions[3] === "") && (index === 0)){
                
                let newPositions = this.state.assetPositions.slice();

                newPositions[3] = displayValue;

                this.setState({assetPositions: newPositions});
            }

            return <option key={valueId[0]} value={valueId[0]}>{displayValue}</option>;

        });

        return (
            
            <div class="row">
                <div class="col-lg-12">
                    <form  method="post" class="card">
                        <div class="card-header">
                            <h3 class="card-title">Miscellaneous Assets</h3>
                        </div>
                        <div class="card-body">
                            <div class="row">

                                {/* Left Column */}
                                <div class="col-md-6 col-lg-6">

                                    <div class="form-group">
                                        <label class="form-label">Holding Location</label>
                                        <input type="text" class="form-control" name="example-text-input" placeholder="Ex. Vanguard" id="0" value={this.state.assetPositions[0]} onChange={this.trackAmount.bind(this)}></input>
                                    </div>

                                    <div class="form-group">
                                        <label class="form-label">Amount ($)</label>
                                        <input type="text" class="form-control" name="example-text-input" placeholder="Ex. 320.25" id="2" value={this.state.assetPositions[2]} onChange={this.trackAmount.bind(this)}></input>
                                    </div>

                                <button type="submit" class="btn btn-primary ml-auto" onClick={(event) => {
                                        event.preventDefault();

                                        var newAssets = this.state.assetPositions.slice();

                                        newAssets[2] = "";

                                        this.props.onAddOtherAsset({
                                            location: this.state.assetPositions[0],
                                            type: this.state.assetPositions[1],
                                            amount: this.state.assetPositions[2],
                                            assetType: this.state.assetPositions[3]
                                        });

                                        this.setState({assetPositions: newAssets});
                                }}>Add Misc Asset</button>

                                </div>

                                {/* Right Column */}
                                <div class="col-md-6 col-lg-6">

                                <div class="form-group">
                                    <label class="form-label">Holding Type</label>
                                    <select name="type" class="form-control custom-select" id="1" onChange={this.trackAmount.bind(this)} value={this.state.assetPositions[1]}>
                                        <option value="taxable">Taxable</option>
                                        <option value="taxable">Traditional</option>
                                        <option value="taxable">Roth</option>
                                    </select>
                                </div>

                                <div class="form-group">
                                    <label class="form-label">Asset Type</label>
                                    <select name="assets" class="form-control custom-select" onChange={this.trackAmount.bind(this)} value={this.state.assetPositions[3]}>
                                        
                                        {assetMap}
                                                    
                                    </select>
                                </div>

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
        user: state.user,
        benchmarkTitles: state.benchmarkTitles,
        coreAssets: state.coreAssets
    }
}

// Map Actions
function mapDispatchToProps(dispatch){
    
    return {
        onAddOtherAsset: (other) => dispatch(addOtherAsset(other))
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TableInputOption);