import React, { Component } from "react";
import { connect } from "react-redux";
import addCoreAsset from "../../actions/addCoreAssets";

class TableInputCore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assetPositions: [
        "0.00",
        "0.00",
        "0.00",
        "0.00",
        "0.00",
        "0.00",
        "",
        "Taxable",
      ],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.holdingType = this.holdingType.bind(this);
    this.trackAmount = this.trackAmount.bind(this);
  }

  // Updates the value of each field into the component state in real time
  trackAmount(e) {
    const newPositions = this.state.assetPositions.slice();
    newPositions[e.target.id] = e.target.value;
    this.setState({ assetPositions: newPositions });
  }

  // Account Holding State Update in Real Time
  holdingType(e) {
    const newPositions = this.state.assetPositions.slice();
    newPositions[7] = e.target.value;
    this.setState({ assetPositions: newPositions });
  }

  handleSubmit(e) {
    e.preventDefault();

    const newAssets = this.state.assetPositions.slice();

    newAssets[0] = "0.00";
    newAssets[1] = "0.00";
    newAssets[2] = "0.00";
    newAssets[3] = "0.00";
    newAssets[4] = "0.00";
    newAssets[5] = "0.00";

    this.props.onAddCoreAsset({
      location: this.state.assetPositions[6],
      type: this.state.assetPositions[7],
      amountOne: this.state.assetPositions[0],
      amountTwo: this.state.assetPositions[1],
      amountThree: this.state.assetPositions[2],
      amountFour: this.state.assetPositions[3],
      amountFive: this.state.assetPositions[4],
      amountSix: this.state.assetPositions[5],
    });

    this.setState({ assetPositions: newAssets });
  }

  render() {
    const formFields = this.props.benchmarkTitles.map((title, index) => {
      return (
        <div class="form-group">
          <label class="form-label">{title.toUpperCase()} ($)</label>
          <input
            type="text"
            class="form-control"
            name="example-text-input"
            placeholder="Ex. 320.15"
            id={index}
            value={this.state.assetPositions[index]}
            onChange={this.trackAmount}
            required
          ></input>
        </div>
      );
    });

    // Even indices display array
    const leftSide = formFields.filter((_title, index) => {
      return index % 2 === 0 || index === 0;
    });

    // Odd indices display array
    const rightSide = formFields.filter((_title, index) => {
      return index % 2 !== 0;
    });

    return (
      <div class="row">
        <div class="col-lg-12">
          <form method="post" class="card" onSubmit={this.handleSubmit}>
            <div class="card-header">
              <h3 class="card-title">Core Assets</h3>
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
                      value={this.state.assetPositions[6]}
                      id="6"
                      onChange={this.trackAmount}
                      required
                    ></input>
                  </div>

                  {leftSide}

                  <button class="btn btn-primary ml-auto">
                    Add Core Assets
                  </button>
                </div>

                {/* Right Column */}
                <div class="col-md-6 col-lg-6">
                  <div class="form-group">
                    <label class="form-label">Holding Type</label>
                    <select
                      name="type"
                      class="form-control custom-select"
                      onChange={this.holdingType}
                      value={this.state.assetPositions[7]}
                    >
                      <option value="Taxable">Taxable</option>
                      <option value="Traditional">Traditional</option>
                      <option value="Roth">Roth</option>
                    </select>
                  </div>

                  {rightSide}
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
    benchmarkTitles: state.portfolioReducer.benchmarkTitles,
  };
}

// Map Actions
function mapDispatchToProps(dispatch) {
  return {
    onAddCoreAsset: (account) => dispatch(addCoreAsset(account)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TableInputCore);
