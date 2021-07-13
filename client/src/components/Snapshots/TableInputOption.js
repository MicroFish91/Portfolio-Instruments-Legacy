import React, { Component } from "react";
import { connect } from "react-redux";
import addOtherAsset from "../../actions/addOtherAssets";
import { ASSET_TYPES } from "../../constants";
import { findIndex } from "../../utils/tableFormatUtils";

class TableInputOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assetPositions: ["", "Taxable", "0.00", ""],
    };
    this.assetType = this.assetType.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.holdingType = this.holdingType.bind(this);
    this.trackAmount = this.trackAmount.bind(this);
  }

  static defaultProps = {
    assetTypes: ASSET_TYPES,
  };

  // Account Asset Choice State Update in Real Time
  assetType(e) {
    const newPositions = this.state.assetPositions.slice();
    newPositions[3] = e.target.value;
    this.setState({ assetPositions: newPositions });
  }

  handleSubmit(e) {
    e.preventDefault();

    let newAssets = this.state.assetPositions.slice();
    newAssets[2] = "0.00";

    let ticker = findIndex(this.props.assetTypes, this.state.assetPositions[3]);
    ticker = this.props.assetTypes[ticker].split(" ");
    ticker = ticker[0];

    this.props.onAddOtherAsset({
      location: this.state.assetPositions[0],
      type: this.state.assetPositions[1],
      amount: this.state.assetPositions[2],
      assetType: ticker,
    });

    this.setState({ assetPositions: newAssets });
  }

  // Account Holding State Updates
  holdingType(e) {
    const newPositions = this.state.assetPositions.slice();
    newPositions[1] = e.target.value;
    this.setState({ assetPositions: newPositions });
  }

  // Tracks the value of each field
  trackAmount(e) {
    const newPositions = this.state.assetPositions.slice();
    newPositions[e.target.id] = e.target.value;
    this.setState({ assetPositions: newPositions });
  }

  render() {
    // Filter out benchmark core assets
    let assetMap = this.props.assetTypes.filter((asset) => {
      const valueId = asset.split(" ");
      // See if current asset is a benchmark title, filter if so, else return
      if (this.props.benchmarkTitles.includes(valueId[0])) {
        return false;
      }
      return true;
    });

    // Reformat select - option syntax to assetMap
    assetMap = assetMap.map((asset, index) => {
      const valueId = asset.split(" ");
      let displayValue = asset.split(" ");

      displayValue.shift();
      displayValue = displayValue.join(" ");

      // Initialize initial asset type if first render after filtering benchmarkTitles
      if (this.state.assetPositions[3] === "" && index === 0) {
        const newPositions = this.state.assetPositions.slice();
        newPositions[3] = displayValue;
        this.setState({ assetPositions: newPositions });
      }

      return (
        <option key={valueId[0]} value={valueId[0]}>
          {displayValue}
        </option>
      );
    });

    return (
      <div class="row">
        <div class="col-lg-12">
          <form method="post" class="card" onSubmit={this.handleSubmit}>
            <div class="card-header">
              <h3 class="card-title">Miscellaneous Assets</h3>
            </div>
            <div class="card-body">
              <div class="row">
                {/* Left Column */}
                <div class="col-md-6 col-lg-6">
                  <div class="form-group">
                    <label class="form-label">Holding Location</label>
                    <input
                      type="text"
                      class="form-control"
                      name="example-text-input"
                      placeholder="Ex. Vanguard"
                      id="0"
                      value={this.state.assetPositions[0]}
                      onChange={this.trackAmount}
                      required
                    ></input>
                  </div>

                  <div class="form-group">
                    <label class="form-label">Amount ($)</label>
                    <input
                      type="text"
                      class="form-control"
                      name="example-text-input"
                      placeholder="Ex. 320.25"
                      id="2"
                      value={this.state.assetPositions[2]}
                      onChange={this.trackAmount}
                      required
                    ></input>
                  </div>

                  <button type="submit" class="btn btn-primary ml-auto">
                    Add Misc Asset
                  </button>
                </div>

                {/* Right Column */}
                <div class="col-md-6 col-lg-6">
                  <div class="form-group">
                    <label class="form-label">Holding Type</label>
                    <select
                      name="type"
                      class="form-control custom-select"
                      id="1"
                      onChange={this.holdingType}
                      value={this.state.assetPositions[1]}
                    >
                      <option value="Taxable">Taxable</option>
                      <option value="Traditional">Traditional</option>
                      <option value="Roth">Roth</option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label class="form-label">Asset Type</label>
                    <select
                      name="assets"
                      class="form-control custom-select"
                      onChange={this.assetType}
                      value={this.state.assetPositions[3]}
                    >
                      {assetMap}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

// Map to Global State
function mapStateToProps(state) {
  return {
    user: state.portfolioReducer.user,
    benchmarkTitles: state.portfolioReducer.benchmarkTitles,
    coreAssets: state.portfolioReducer.coreAssets,
  };
}

// Map Actions
function mapDispatchToProps(dispatch) {
  return {
    onAddOtherAsset: (other) => dispatch(addOtherAsset(other)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TableInputOption);
